define([
  "coui://ui/mods/com.pa.quitch.gwaioverhaul/shared/cards.js",
  "coui://ui/mods/com.pa.quitch.gwaioverhaul/shared/units.js",
], function (gwoCard, gwoUnit) {
  return {
    visible: _.constant(true),
    describe: _.constant("!LOC:太阳能板高效质能转化 — 轨道太阳能阵列额外提供每秒 40 金属。"),
    summarize: _.constant("!LOC:太阳能板高效质能转化"),
    icon: _.constant("coui://ui/mods/com.pa.quitch.gwaioverhaul/gw_play/img/tech/gwc_storage_compression_upgrade.png"),
    audio: function () { return { found: "/VO/Computer/gw/board_tech_available_economy" }; },
    getContext: gwoCard.getContext,
    deal: function (system, context, inventory) {
      var chance = 0;
      if (gwoCard.hasUnit(inventory.units(), gwoUnit.solarArray)) chance = 200;
      return { params: { allowOverflow: true }, chance: chance };
    },
    buff: function (inventory) {
      inventory.maxCards(inventory.maxCards() + 1);
      inventory.addMods([{ file: gwoUnit.solarArray, path: "production.metal", op: "replace", value: 40 }]);
      inventory.addAIMods([{ type: "factory", op: "new", toBuild: "SolarArray", value: [{ test_type: "DesireMetal" }, { test_type: "CanAffordBuildDemand" }] }]);
    },
    dull: function () {},
  };
});
