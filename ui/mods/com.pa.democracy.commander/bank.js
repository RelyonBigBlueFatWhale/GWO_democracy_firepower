define(function () {
  const LS_KEY = "democracy_commander";
  var self;
  var loading = false;
  const bank = function () {
    self = this;
    self.startCards = ko.observableArray();
    self.startCards.subscribe(function (value) {
      self.save();
      const unlocked = value.length;
      if (!unlocked) return;
      api.tally.getStatInt("gw_unlocked_loadouts").then(function (stat) {
        if (stat < unlocked) api.tally.setStatInt("gw_unlocked_loadouts", unlocked);
      });
    });
    self.load();
  };
  bank.prototype = {
    load: function () {
      loading = true;
      const bankJson = localStorage[LS_KEY];
      if (!_.isString(bankJson)) { self.startCards([]); loading = false; return; }
      self.startCards(JSON.parse(bankJson).startCards);
      loading = false;
    },
    save: function () { if (!loading) localStorage.setItem(LS_KEY, ko.toJSON(self)); },
    addStartCard: function (card) {
      if (self.hasStartCard(card)) return false;
      self.startCards.push(card); return true;
    },
    hasStartCard: function (card) {
      return _.some(self.startCards(), function (e) {
        return card === e || (_.isObject(card) && card.id === e.id);
      });
    },
  };
  return new bank();
});
