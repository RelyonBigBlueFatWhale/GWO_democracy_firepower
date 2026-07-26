function addStartCards() {
  try {
    if (!model.gwoNewStartCards) model.gwoNewStartCards = [];
    model.gwoNewStartCards.push({ id: "gwc_start_democracy" });
    if (!model.gwoStartingCards) model.gwoStartingCards = [];
    model.gwoStartingCards.push({ id: "gwc_start_democracy" });
  } catch (e) { console.error(e); }
}
addStartCards();
