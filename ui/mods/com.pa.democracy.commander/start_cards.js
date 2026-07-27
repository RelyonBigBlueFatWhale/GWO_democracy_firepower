function addStartCards() {
  try {
    if (!model.gwoStartingCards) model.gwoStartingCards = [];
    model.gwoStartingCards.push({ id: "gwc_start_democracy" });
  } catch (e) { console.error(e); }
}
addStartCards();
