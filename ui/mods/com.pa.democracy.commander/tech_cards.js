function addTechCards() {
  try {
    requireGW(
      ["coui://ui/mods/com.pa.quitch.gwaioverhaul/shared/units.js"],
      function (gwoUnit) {
        if (!model.gwoCards) model.gwoCards = [];
        model.gwoCards.push(
          "gwc_omega_interceptor",
          "gwc_omega_railgun",
          "gwc_avenger_bomber",
          "gwc_solar_array_conversion",
          "gwc_jig_super_efficiency",
          "gwc_jig_self_defense",
          "gwc_anchor_heavy_platform",
          "gwc_sxx_ballistic",
          "gwc_fire_control",
          "gwc_armor_tech",
          "gwc_propulsion_tech",
          "gwc_mass_production"
        );
        if (!model.gwoCardsToUnits) model.gwoCardsToUnits = [];
        model.gwoCardsToUnits.push(
          { id: "gwc_omega_interceptor", units: [gwoUnit.omega] },
          { id: "gwc_omega_railgun", units: [gwoUnit.omega] },
          { id: "gwc_avenger_bomber", units: [gwoUnit.avenger] },
          { id: "gwc_solar_array_conversion", units: [gwoUnit.solarArray] },
          { id: "gwc_jig_super_efficiency", units: [gwoUnit.jig] },
          { id: "gwc_jig_self_defense", units: [gwoUnit.jig] },
          { id: "gwc_anchor_heavy_platform", units: [gwoUnit.anchor] },
          { id: "gwc_sxx_ballistic", units: [gwoUnit.sxx] },
          { id: "gwc_fire_control", units: [gwoUnit.commander] },
          { id: "gwc_armor_tech", units: [gwoUnit.commander] },
          { id: "gwc_propulsion_tech", units: [gwoUnit.commander] },
          { id: "gwc_mass_production", units: [gwoUnit.commander] }
        );
      }
    );
  } catch (e) { console.error(e); }
}
addTechCards();
