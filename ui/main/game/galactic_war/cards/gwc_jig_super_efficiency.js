define([
  "coui://ui/mods/com.pa.quitch.gwaioverhaul/shared/cards.js",
  "coui://ui/mods/com.pa.quitch.gwaioverhaul/shared/units.js",
], function (gwoCard, gwoUnit) {
  return {
    visible: _.constant(true),
    describe: _.constant("!LOC:Jig 超级增效科技 — Jig 金属和能源产出提高至 20 倍。"),
    summarize: _.constant("!LOC:Jig 超级增效科技"),
    icon: _.constant("coui://ui/mods/com.pa.quitch.gwaioverhaul/gw_play/img/tech/gwc_storage_compression_upgrade.png"),
    audio: function () { return { found: "/VO/Computer/gw/board_tech_available_economy" }; },
    getContext: gwoCard.getContext,
    deal: function (system, context, inventory) {
      var chance = 0;
      if (gwoCard.hasUnit(inventory.units(), gwoUnit.jig)) chance = 200;
      return { params: { allowOverflow: true }, chance: chance };
    },
    buff: function (inventory) {
      inventory.maxCards(inventory.maxCards() + 1);
      inventory.addMods([
        { file: gwoUnit.jig, path: "production.metal", op: "multiply", value: 10 },
        { file: gwoUnit.jig, path: "production.energy", op: "multiply", value: 10 },
      ]);
      inventory.addAIMods([{ type: "factory", op: "new", toBuild: "Jig", value: [{ test_type: "DesireMetal" }, { test_type: "CanAffordBuildDemand" }] }]);
    },
    dull: function () {},
  };
});
