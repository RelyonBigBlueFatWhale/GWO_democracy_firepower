define([
  "coui://ui/mods/com.pa.quitch.gwaioverhaul/shared/cards.js",
  "coui://ui/mods/com.pa.quitch.gwaioverhaul/shared/units.js",
], function (gwoCard, gwoUnit) {
  return {
    visible: _.constant(true),
    describe: _.constant("!LOC:Jig 自我保护系统 — 为 Jig 加装 Artemis 磁轨炮。"),
    summarize: _.constant("!LOC:Jig 自我保护系统"),
    icon: _.constant("coui://ui/mods/com.pa.quitch.gwaioverhaul/gw_play/img/tech/gwc_orbital_fighter_upgrade.png"),
    audio: function () { return { found: "/VO/Computer/gw/board_tech_available_weapon_upgrade" }; },
    getContext: gwoCard.getContext,
    deal: function (system, context, inventory) {
      var chance = 0;
      if (gwoCard.hasUnit(inventory.units(), gwoUnit.jig)) chance = 200;
      return { params: { allowOverflow: true }, chance: chance };
    },
    buff: function (inventory) {
      inventory.maxCards(inventory.maxCards() + 1);
      inventory.addMods([
        { file: gwoUnit.jig, path: "tools", op: "push", value: { spec_id: gwoUnit.artemisWeapon, aim_bone: "bone_root", record_index: -1, fire_event: "fired", muzzle_bone: "bone_root" } },
        { file: gwoUnit.jig, path: "tools.0.spec_id", op: "tag" },
      ]);
    },
    dull: function () {},
  };
});
