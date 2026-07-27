// 民主指挥官 — 每次探索额外 +2 科技选项
// 策略：探索完成后在 star.cardList 中直接追加 2 张额外数据银行卡。
// 这绕过了 GWAIO 异步初始化导致的 model.explore 包装失效问题。
(function () {
  function tryPatch() {
    var game = model.game();
    if (!game || game.isTutorial()) return;
    var inventory = game.inventory();
    if (!inventory || !_.isFunction(inventory.hasCard)) return;
    if (!inventory.hasCard("gwc_start_democracy")) return;

    var current = model.explore;
    if (!current || current._demoWrapped) return;

    var _explore = current;
    var wrapped = function (force) {
      var result = _explore.apply(this, arguments);
      if (!force && result && _.isFunction(result.then)) {
        result.then(function () {
          var star = game.galaxy().stars()[game.currentStar()];
          if (!star) return;
          var list = star.cardList();
          if (!_.isArray(list)) return;
          // 追加 2 张额外科技卡，溢出到库存时自动转为卡槽
          list.push(
            { id: "gwc_add_card_slot", allowOverflow: true, unique: Math.random() },
            { id: "gwc_add_card_slot", allowOverflow: true, unique: Math.random() }
          );
          star.cardList(list);
        });
      }
      return result;
    };
    wrapped._demoWrapped = true;
    model.explore = wrapped;
  }

  setInterval(function () {
    try { tryPatch(); } catch (e) {}
  }, 300);
})();
