define([
  "coui://ui/mods/com.pa.quitch.gwaioverhaul/shared/cards.js",
  "coui://ui/mods/com.pa.quitch.gwaioverhaul/shared/unit_groups.js",
], function (gwoCard, gwoGroup) {
  return {
    visible: _.constant(true),
    describe: _.constant("!LOC:大批量生产升级 — 所有移动式单位建造成本 -30%。"),
    summarize: _.constant("!LOC:大批量生产升级"),
    icon: _.constant("coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_cost_reduction.png"),
    audio: function () { return { found: "/VO/Computer/gw/board_tech_available_cost_reduction" }; },
    getContext: gwoCard.getContext,
    deal: function (system, context, inventory) {
      var chance = 0;
      if (gwoCard.hasUnit(inventory.units(), gwoGroup.mobile)) chance = 200;
      return { params: { allowOverflow: true }, chance: chance };
    },
    buff: function (inventory) {
      inventory.maxCards(inventory.maxCards() + 1);
      inventory.addMods(_.flatten(_.map(gwoGroup.mobile, function (u) { return [{ file: u, path: "build_metal_cost", op: "multiply", value: 0.7 }, { file: u, path: "build_energy_cost", op: "multiply", value: 0.7 }]; })));
    },
    dull: function () {},
  };
});
