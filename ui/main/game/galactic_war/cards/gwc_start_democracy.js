define([
  "module",
  "shared/gw_common",
  "cards/gwc_start",
  "coui://ui/mods/com.pa.democracy.commander/bank.js",
  "coui://ui/mods/com.pa.quitch.gwaioverhaul/shared/cards.js",
  "coui://ui/mods/com.pa.quitch.gwaioverhaul/shared/units.js",
  "coui://ui/mods/com.pa.quitch.gwaioverhaul/shared/unit_groups.js",
], function (module, GW, GWCStart, gwoBank, gwoCard, gwoUnit, gwoGroup) {
  var CARD = { id: module.id.substring(module.id.lastIndexOf("/") + 1) };

  var allUnits = gwoGroup.orbital.concat([gwoUnit.helios]);

  var orbitalUnitSpecs = gwoGroup.orbital.concat([
    gwoUnit.anchor, gwoUnit.umbrella, gwoUnit.kessler, gwoUnit.deepSpaceOrbitalRadar,
  ]);

  var orbitalWeaponSpecs = gwoGroup.orbitalWeapons.concat([
    gwoUnit.anchorWeaponAG, gwoUnit.anchorWeaponAO,
    gwoUnit.umbrellaWeapon, gwoUnit.umbrellaBeam, gwoUnit.kesslerWeapon,
  ]);

  var orbitalAmmoSpecs = gwoGroup.orbitalAmmo.concat([
    gwoUnit.anchorAmmoAG, gwoUnit.anchorAmmoAO,
    gwoUnit.umbrellaAmmo, gwoUnit.umbrellaBeamAmmo, gwoUnit.kesslerAmmo,
  ]);

  var orbitalProjectileAmmoSpecs = [
    gwoUnit.artemisAmmo, gwoUnit.omegaAmmo, gwoUnit.omegaAmmoAG,
  ];

  var orbitalMobileSpecs = gwoGroup.orbitalMobile;

  var metalProducers = [gwoUnit.metalExtractor, gwoUnit.metalExtractorAdvanced, gwoUnit.jig];
  var energyProducers = [gwoUnit.energyPlant, gwoUnit.energyPlantAdvanced, gwoUnit.solarArray, gwoUnit.jig];

  return {
    visible: _.constant(false),
    summarize: _.constant("!LOC:民主指挥官"),
    icon: function () { return gwoCard.loadoutIcon(CARD.id); },
    describe: _.constant("!LOC:民主指挥官以全部轨道科技开局（含轨道泰坦 Helios），拥有72个科技库槽位。轨道单位 -50% 建造成本，+50% 移速，+100% 射程，+100% 生命值，+50% 射速，+50% 伤害。所有资源生产建筑 +100% 产量，仓库 +100% 容量。Omega 配备覆盖射程的雷达，反轨道火力射程额外增强。每次探索额外 +2 科技选项。"),
    hint: function () {
      return {
        icon: "coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_commander_locked.png",
        description: "!LOC:在银河战争中赢得胜利以解锁民主指挥官。",
      };
    },
    deal: gwoCard.startCard,
    buff: function (inventory) {
      if (inventory.lookupCard(CARD) === 0) {
        var buffCount = inventory.getTag("", "buffCount", 0);
        if (!buffCount) {
          GWCStart.buff(inventory);
          // 伪造 handIsFull → cardsOfferedCount +1
          inventory.handIsFull = function () { return true; };
          // 伪造 hasCard("gwaio_start_lucky") → cardsOfferedCount +1
          var _hc = inventory.hasCard;
          inventory.hasCard = function (id) {
            if (id === "gwaio_start_lucky") return true;
            return _hc.call(this, id);
          };
          // 同时推入实体卡作为双重保险
          inventory.cards.push({ id: "gwaio_start_lucky" });
          inventory.addUnits(allUnits);
          inventory.maxCards(inventory.maxCards() + 68);

          var costMods = _.map(orbitalUnitSpecs, function (unit) {
            return { file: unit, path: "build_metal_cost", op: "multiply", value: 0.5 };
          });

          var hpMods = _.map(orbitalUnitSpecs, function (unit) {
            return { file: unit, path: "max_health", op: "multiply", value: 2.0 };
          });

          var rangeMods = _.map(orbitalWeaponSpecs, function (weapon) {
            return { file: weapon, path: "max_range", op: "multiply", value: 2.0 };
          });

          var omegaAntiOrbitalRange = [
            { file: gwoUnit.omegaWeapon, path: "max_range", op: "multiply", value: 1.5 },
          ];

          var omegaRadar = [
            { file: gwoUnit.omega, path: "recon.observer.items", op: "push", value: { layer: "orbital", channel: "radar", shape: "sphere", radius: 500 } },
            { file: gwoUnit.omega, path: "recon.observer.items", op: "push", value: { layer: "orbital", channel: "sight", shape: "sphere", radius: 500 } },
            { file: gwoUnit.omega, path: "recon.observer.items", op: "push", value: { layer: "surface_and_air", channel: "sight", shape: "capsule", radius: 500 } },
          ];

          var rofMods = _.map(orbitalWeaponSpecs, function (weapon) {
            return { file: weapon, path: "rate_of_fire", op: "multiply", value: 1.5 };
          });

          var damageMods = _.flatten(_.map(orbitalAmmoSpecs, function (ammo) {
            return [
              { file: ammo, path: "damage", op: "multiply", value: 1.5 },
              { file: ammo, path: "splash_damage", op: "multiply", value: 1.5 },
            ];
          }));

          var velocityMods = _.flatten(_.map(orbitalProjectileAmmoSpecs, function (ammo) {
            return [
              { file: ammo, path: "initial_velocity", op: "multiply", value: 2.0 },
              { file: ammo, path: "max_velocity", op: "multiply", value: 2.0 },
            ];
          }));

          var speedMods = _.map(orbitalMobileSpecs, function (unit) {
            return { file: unit, path: "navigation.move_speed", op: "multiply", value: 1.5 };
          });

          var metalProdMods = _.map(metalProducers, function (unit) {
            return { file: unit, path: "production.metal", op: "multiply", value: 2.0 };
          });

          var energyProdMods = _.map(energyProducers, function (unit) {
            return { file: unit, path: "production.energy", op: "multiply", value: 2.0 };
          });

          var metalStorageMods = [{ file: gwoUnit.metalStorage, path: "storage.metal", op: "multiply", value: 2.0 }];
          var energyStorageMods = [{ file: gwoUnit.energyStorage, path: "storage.energy", op: "multiply", value: 2.0 }];

          inventory.addMods([].concat(
            costMods, hpMods, rangeMods, omegaAntiOrbitalRange, omegaRadar,
            rofMods, damageMods, velocityMods, speedMods,
            metalProdMods, energyProdMods, metalStorageMods, energyStorageMods
          ));
          inventory.addAIMods([]);
        } else {
          inventory.maxCards(inventory.maxCards() + 1);
        }
        ++buffCount;
        inventory.setTag("", "buffCount", buffCount);
      } else {
        inventory.maxCards(inventory.maxCards() + 1);
        gwoBank.addStartCard(CARD);
      }
    },
    dull: function (inventory) {
      gwoCard.applyDulls(CARD, inventory);
    },
  };
});
