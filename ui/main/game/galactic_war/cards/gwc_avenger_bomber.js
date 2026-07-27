define([
  "coui://ui/mods/com.pa.quitch.gwaioverhaul/shared/cards.js",
  "coui://ui/mods/com.pa.quitch.gwaioverhaul/shared/units.js",
], function (gwoCard, gwoUnit) {
  return {
    visible: _.constant(true),
    describe: _.constant("!LOC:Avenger 对地轰炸升级 — 为 Avenger 加装 Bumblebee 轰炸炸弹，从轨道对地轰炸。"),
    summarize: _.constant("!LOC:Avenger 对地轰炸升级"),
    icon: _.constant("coui://ui/mods/com.pa.quitch.gwaioverhaul/gw_play/img/tech/gwc_orbital_fighter_upgrade.png"),
    audio: function () { return { found: "/VO/Computer/gw/board_tech_available_weapon_upgrade" }; },
    getContext: gwoCard.getContext,
    deal: function (system, context, inventory) {
      var chance = 0;
      if (gwoCard.hasUnit(inventory.units(), gwoUnit.avenger)) chance = 200;
      return { params: { allowOverflow: true }, chance: chance };
    },
    buff: function (inventory) {
      inventory.maxCards(inventory.maxCards() + 1);
      inventory.addMods([
        { file: gwoUnit.avenger, path: "tools", op: "push", value: { spec_id: gwoUnit.bumblebeeWeapon, aim_bone: "bone_root", record_index: -1, fire_event: "fired", muzzle_bone: "bone_root" } },
        { file: gwoUnit.avenger, path: "tools.1.spec_id", op: "tag" },
        { file: gwoUnit.bumblebeeWeapon, path: "target_layers", op: "push", value: ["WL_Orbital"] },
      ]);
    },
    dull: function () {},
  };
});
