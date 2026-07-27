define([
  "coui://ui/mods/com.pa.quitch.gwaioverhaul/shared/cards.js",
  "coui://ui/mods/com.pa.quitch.gwaioverhaul/shared/units.js",
], function (gwoCard, gwoUnit) {
  return {
    visible: _.constant(true),
    describe: _.constant("!LOC:Anchor 重型防御平台升级 — 为 Anchor 加装 SXX 轨道激光炮。"),
    summarize: _.constant("!LOC:Anchor 重型防御平台升级"),
    icon: _.constant("coui://ui/mods/com.pa.quitch.gwaioverhaul/gw_play/img/tech/gwc_orbital_fighter_upgrade.png"),
    audio: function () { return { found: "/VO/Computer/gw/board_tech_available_weapon_upgrade" }; },
    getContext: gwoCard.getContext,
    deal: function (system, context, inventory) {
      var chance = 0;
      if (gwoCard.hasUnit(inventory.units(), gwoUnit.anchor)) chance = 200;
      return { params: { allowOverflow: true }, chance: chance };
    },
    buff: function (inventory) {
      inventory.maxCards(inventory.maxCards() + 1);
      inventory.addMods([
        { file: gwoUnit.anchor, path: "tools", op: "push", value: { spec_id: gwoUnit.sxxWeapon, aim_bone: "bone_root", record_index: -1, fire_event: "fired", muzzle_bone: "bone_root" } },
        { file: gwoUnit.anchor, path: "tools.3.spec_id", op: "tag" },
      ]);
    },
    dull: function () {},
  };
});
