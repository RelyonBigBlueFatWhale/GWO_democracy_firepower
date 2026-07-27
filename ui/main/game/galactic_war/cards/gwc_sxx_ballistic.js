define([
  "coui://ui/mods/com.pa.quitch.gwaioverhaul/shared/cards.js",
  "coui://ui/mods/com.pa.quitch.gwaioverhaul/shared/units.js",
], function (gwoCard, gwoUnit) {
  return {
    visible: _.constant(true),
    describe: _.constant("!LOC:SXX 实弹轰炸科技 — 为 SXX 加装 Kaiju 主炮，享受民主指挥官和科技卡的轨道武器加成。"),
    summarize: _.constant("!LOC:SXX 实弹轰炸科技"),
    icon: _.constant("coui://ui/mods/com.pa.quitch.gwaioverhaul/gw_play/img/tech/gwc_orbital_fighter_upgrade.png"),
    audio: function () { return { found: "/VO/Computer/gw/board_tech_available_weapon_upgrade" }; },
    getContext: gwoCard.getContext,
    deal: function (system, context, inventory) {
      var chance = 0;
      if (gwoCard.hasUnit(inventory.units(), gwoUnit.sxx)) chance = 200;
      return { params: { allowOverflow: true }, chance: chance };
    },
    buff: function (inventory) {
      inventory.maxCards(inventory.maxCards() + 1);
      inventory.addMods([
        { file: gwoUnit.sxx, path: "tools", op: "push", value: { spec_id: gwoUnit.kaijuWeapon, aim_bone: "bone_root", record_index: -1, fire_event: "fired", muzzle_bone: "bone_root" } },
        { file: gwoUnit.sxx, path: "tools.1.spec_id", op: "tag" },
        { file: gwoUnit.kaijuWeapon, path: "target_layers", op: "push", value: ["WL_Orbital"] },
      ]);
    },
    dull: function () {},
  };
});
