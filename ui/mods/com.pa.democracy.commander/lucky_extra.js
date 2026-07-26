(function () {
  function tryPatch() {
    var game = model.game();
    if (!game || game.isTutorial()) return;
    var inventory = game.inventory();
    if (!inventory || !_.isFunction(inventory.hasCard)) return;
    if (!inventory.hasCard("gwc_start_democracy")) return;
    if (model._gwoDemoPatched) return;
    model._gwoDemoPatched = true;
    var _explore = model.explore;
    var _reroll = model.rerollTech;
    model.explore = function (force) {
      var star = game.galaxy().stars()[game.currentStar()];
      if (star && model.gwoRerollsUsed) {
        var orig = model.gwoRerollsUsed();
        model.gwoRerollsUsed(Math.max(0, orig - 2));
        var result = _explore.apply(this, arguments);
        model.gwoRerollsUsed(orig);
        return result;
      }
      return _explore.apply(this, arguments);
    };
    model.rerollTech = function () {
      if (model.gwoRerollsUsed) {
        var orig = model.gwoRerollsUsed();
        model.gwoRerollsUsed(Math.max(0, orig - 2));
        var result = _reroll.apply(this, arguments);
        model.gwoRerollsUsed(orig);
        return result;
      }
      return _reroll.apply(this, arguments);
    };
  }
  var timer = setInterval(function () { try { tryPatch(); } catch (e) {} }, 400);
})();
