define([
  "coui://ui/mods/com.pa.quitch.gwaioverhaul/shared/cards.js",
  "coui://ui/mods/com.pa.quitch.gwaioverhaul/shared/unit_groups.js",
], function (gwoCard, gwoGroup) {
  return {
    visible: _.constant(true),
    describe: _.constant("!LOC:装甲科技升级 — 所有单位和建筑最大生命值 +100%。"),
    summarize: _.constant("!LOC:装甲科技升级"),
    icon: _.constant("coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_vehicle_armor.png"),
    audio: function () { return { found: "/VO/Computer/gw/board_tech_available_armor" }; },
    getContext: gwoCard.getContext,
    deal: function (system, context, inventory) {
      var chance = 0;
      if (gwoCard.hasUnit(inventory.units(), gwoGroup.combat)) chance = 200;
      return { params: { allowOverflow: true }, chance: chance };
    },
    buff: function (inventory) {
      inventory.maxCards(inventory.maxCards() + 1);
      inventory.addMods(_.map(gwoGroup.units, function (u) { return { file: u, path: "max_health", op: "multiply", value: 2.0 }; }));
    },
    dull: function () {},
  };
});
