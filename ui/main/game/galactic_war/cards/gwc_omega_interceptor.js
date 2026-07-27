define([
  "coui://ui/mods/com.pa.quitch.gwaioverhaul/shared/cards.js",
  "coui://ui/mods/com.pa.quitch.gwaioverhaul/shared/units.js",
], function (gwoCard, gwoUnit) {
  return {
    visible: _.constant(true),
    describe: _.constant("!LOC:Omega 拦截系统升级 — 为 Omega 加装战术导弹拦截光束和空投仓拦截光束。"),
    summarize: _.constant("!LOC:Omega 拦截系统"),
    icon: _.constant("coui://ui/mods/com.pa.quitch.gwaioverhaul/gw_play/img/tech/gwc_orbital_fighter_upgrade.png"),
    audio: function () { return { found: "/VO/Computer/gw/board_tech_available_speed" }; },
    getContext: gwoCard.getContext,
    deal: function (system, context, inventory) {
      var chance = 0;
      if (gwoCard.hasUnit(inventory.units(), gwoUnit.omega)) chance = 200;
      return { params: { allowOverflow: true }, chance: chance };
    },
    buff: function (inventory) {
      inventory.maxCards(inventory.maxCards() + 1);
      inventory.addMods([{
        file: gwoUnit.omega, path: "tools", op: "push",
        value: [
          { spec_id: gwoUnit.gileEBeam, aim_bone: "bone_root", record_index: -1, fire_event: "fired", muzzle_bone: "bone_root" },
          { spec_id: gwoUnit.umbrellaBeam, aim_bone: "bone_root", record_index: -1, fire_event: "fired", muzzle_bone: "bone_root" },
        ],
      }]);
    },
    dull: function () {},
  };
});
