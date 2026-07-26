define([
  "coui://ui/mods/com.pa.quitch.gwaioverhaul/shared/cards.js",
  "coui://ui/mods/com.pa.quitch.gwaioverhaul/shared/units.js",
], function (gwoCard, gwoUnit) {
  return {
    visible: _.constant(true),
    describe: _.constant(
      "!LOC:SXX 实弹轰炸科技 — 为 SXX 轨道激光平台加装一门 Kaiju 主炮，使其具备对地/对海重火力轰炸能力，并享受民主指挥官和科技卡的全部轨道武器加成。"
    ),
    summarize: _.constant("!LOC:SXX 实弹轰炸科技"),
    icon: _.constant(
      "coui://ui/mods/com.pa.quitch.gwaioverhaul/gw_play/img/tech/gwc_orbital_fighter_upgrade.png"
    ),
    audio: function () {
      return {
        found: "/VO/Computer/gw/board_tech_available_weapon_upgrade",
      };
    },
    getContext: gwoCard.getContext,
    deal: function (system, context, inventory) {
      var chance = 0;
      if (gwoCard.hasUnit(inventory.units(), gwoUnit.sxx)) {
        chance = 200;
      }
      return {
        params: {
          allowOverflow: true,
        },
        chance: chance,
      };
    },
    buff: function (inventory) {
      inventory.maxCards(inventory.maxCards() + 1);

      inventory.addMods([
        // 1. 添加 Kaiju 主炮到 SXX
        {
          file: gwoUnit.sxx,
          path: "tools",
          op: "push",
          value: {
            spec_id: gwoUnit.kaijuWeapon,
            aim_bone: "bone_root",
            record_index: 1,
            fire_event: "fired",
            muzzle_bone: "bone_root",
          },
        },
        // 2. Kaiju 是海军武器，追加轨道和陆地层目标
        {
          file: gwoUnit.kaijuWeapon,
          path: "target_layers",
          op: "push",
          value: ["WL_Orbital", "WL_LandHorizontal"],
        },
        // 3. 弹药 spawn_layers 追加空中层
        {
          file: gwoUnit.kaijuSecondaryAmmo,
          path: "spawn_layers",
          op: "push",
          value: "WL_Air",
        },
      ]);
    },
    dull: function () {},
  };
});
