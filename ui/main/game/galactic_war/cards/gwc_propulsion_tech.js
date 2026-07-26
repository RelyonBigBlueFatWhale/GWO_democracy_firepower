define([
  "coui://ui/mods/com.pa.quitch.gwaioverhaul/shared/cards.js",
  "coui://ui/mods/com.pa.quitch.gwaioverhaul/shared/unit_groups.js",
], function (gwoCard, gwoGroup) {
  return {
    visible: _.constant(true),
    describe: _.constant("!LOC:推进器科技升级 — 所有移动式单位移动速度 +50%。"),
    summarize: _.constant("!LOC:推进器科技升级"),
    icon: _.constant("coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_speed.png"),
    audio: function () { return { found: "/VO/Computer/gw/board_tech_available_speed" }; },
    getContext: gwoCard.getContext,
    deal: function (system, context, inventory) {
      var chance = 0;
      if (gwoCard.hasUnit(inventory.units(), gwoGroup.mobile)) chance = 200;
      return { params: { allowOverflow: true }, chance: chance };
    },
    buff: function (inventory) {
      inventory.maxCards(inventory.maxCards() + 1);
      inventory.addMods(_.map(gwoGroup.mobile, function (u) { return { file: u, path: "navigation.move_speed", op: "multiply", value: 1.5 }; }));
    },
    dull: function () {},
  };
});
