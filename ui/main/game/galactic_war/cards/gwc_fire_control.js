define([
  "coui://ui/mods/com.pa.quitch.gwaioverhaul/shared/cards.js",
  "coui://ui/mods/com.pa.quitch.gwaioverhaul/shared/unit_groups.js",
], function (gwoCard, gwoGroup) {
  return {
    visible: _.constant(true),
    describe: _.constant("!LOC:火控系统升级 — 所有武器最大射程 +50%，弹药伤害 +50%。"),
    summarize: _.constant("!LOC:火控系统升级"),
    icon: _.constant("coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_bot_combat.png"),
    audio: function () { return { found: "/VO/Computer/gw/board_tech_available_weapon_upgrade" }; },
    getContext: gwoCard.getContext,
    deal: function (system, context, inventory) {
      var chance = 0;
      if (gwoCard.hasUnit(inventory.units(), gwoGroup.combat)) chance = 200;
      return { params: { allowOverflow: true }, chance: chance };
    },
    buff: function (inventory) {
      inventory.maxCards(inventory.maxCards() + 1);
      var rangeMods = _.map(gwoGroup.weapons, function (w) { return { file: w, path: "max_range", op: "multiply", value: 1.5 }; });
      var damageMods = _.flatten(_.map(gwoGroup.ammo, function (a) { return [{ file: a, path: "damage", op: "multiply", value: 1.5 }, { file: a, path: "splash_damage", op: "multiply", value: 1.5 }]; }));
      inventory.addMods([].concat(rangeMods, damageMods));
    },
    dull: function () {},
  };
});
