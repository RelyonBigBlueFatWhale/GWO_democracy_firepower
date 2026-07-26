define([
  "coui://ui/mods/com.pa.quitch.gwaioverhaul/shared/cards.js",
  "coui://ui/mods/com.pa.quitch.gwaioverhaul/shared/units.js",
], function (gwoCard, gwoUnit) {
  return {
    visible: _.constant(true),
    describe: _.constant("!LOC:Omega 轨道炮升级 — 为 Omega 加装一门 Artemis 磁轨炮，威力提升至 3 倍，可攻击地面、轨道和海上目标。"),
    summarize: _.constant("!LOC:Omega 轨道炮升级"),
    icon: _.constant("coui://ui/mods/com.pa.quitch.gwaioverhaul/gw_play/img/tech/gwc_orbital_fighter_upgrade.png"),
    audio: function () { return { found: "/VO/Computer/gw/board_tech_available_weapon_upgrade" }; },
    getContext: gwoCard.getContext,
    deal: function (system, context, inventory) {
      var chance = 0;
      if (gwoCard.hasUnit(inventory.units(), gwoUnit.omega)) chance = 200;
      return { params: { allowOverflow: true }, chance: chance };
    },
    buff: function (inventory) {
      inventory.maxCards(inventory.maxCards() + 1);
      inventory.addMods([
        { file: gwoUnit.omega, path: "tools", op: "push", value: { spec_id: gwoUnit.artemisWeapon, aim_bone: "bone_root", record_index: 4, fire_event: "fired", muzzle_bone: "bone_root" } },
        { file: gwoUnit.artemisWeapon, path: "target_layers", op: "push", value: ["WL_LandHorizontal", "WL_WaterSurface", "WL_Seafloor"] },
        { file: gwoUnit.artemisAmmo, path: "damage", op: "multiply", value: 3.0 },
        { file: gwoUnit.artemisAmmo, path: "splash_damage", op: "multiply", value: 3.0 },
      ]);
    },
    dull: function () {},
  };
});
