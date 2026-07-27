function addSpecs() {
  try {
    requireGW(
      ["coui://ui/mods/com.pa.quitch.gwaioverhaul/shared/units.js"],
      function (gwoUnit) {
        if (!model.gwoSpecs) model.gwoSpecs = [];
        // 注册不在玩家库存中的 spec 文件，使科技卡的 mod 能生效 (BUG-009)
        model.gwoSpecs.push(
          gwoUnit.bumblebeeWeapon,
          gwoUnit.bumblebeeAmmo,
          gwoUnit.kaijuWeapon,
          gwoUnit.kaijuAmmo
        );
      }
    );
  } catch (e) { console.error(e); }
}
addSpecs();
