# GWO-民主火力 (GWO - Democracy Firepower)

Planetary Annihilation: TITANS 银河战争模组。添加**民主指挥官**起始卡牌及 **12 张**科技卡牌，以轨道战为核心，提供强大的轨道单位增益和全局科技升级。
本模组旨在于让任何能够完成简单银河战争模式的玩家轻松战胜Uber电脑，适合那些想要在银河战争中体验“释放自我”的玩家
> 依赖 [Galactic War Overhaul](https://github.com/Quitch/GW-AI-Overhaul) (GWAIO)。

---

## 卡牌列表

### 起始指挥官

| 卡牌 ID | 名称 | 效果 |
|---------|------|------|
| `gwc_start_democracy` | 民主指挥官 | 轨道专精开局（含 Helios 泰坦），72 科技槽位，轨道单位全属性大幅增强，每次探索 +2 额外选项 |

### 科技卡牌

| # | 卡牌 ID | 名称 | 目标 | 效果 |
|---|---------|------|------|------|
| 1 | `gwc_omega_interceptor` | Omega 拦截系统 | Omega | 加装战术导弹拦截光束 + 空投仓拦截光束（目前工作不正常，会在后续版本中修复） |
| 2 | `gwc_omega_railgun` | Omega 轨道炮升级 | Omega | 加装 Artemis 磁轨炮，伤害 ×3，可攻击地面/轨道/海上 |
| 3 | `gwc_avenger_bomber` | Avenger 对地轰炸升级 | Avenger | 加装 Bumblebee 轰炸炸弹，从轨道对地轰炸 |
| 4 | `gwc_solar_array_conversion` | 太阳能板高效质能转化 | Solar Array | 额外提供 40 金属/秒 |
| 5 | `gwc_jig_super_efficiency` | Jig 超级增效科技 | Jig | 金属和能源产出 ×10（叠加指挥官 ×2 = ×20） |
| 6 | `gwc_jig_self_defense` | Jig 自我保护系统 | Jig | 加装 Artemis 磁轨炮 |
| 7 | `gwc_anchor_heavy_platform` | Anchor 重型防御平台升级 | Anchor | 加装 SXX 轨道激光炮 |
| 8 | `gwc_sxx_ballistic` | SXX 实弹轰炸科技 | SXX | 加装 Kaiju 主炮，对地/对海轰炸 |
| 9 | `gwc_fire_control` | 火控系统升级 | 全局 | 全武器 +50% 射程，+50% 伤害 |
| 10 | `gwc_armor_tech` | 装甲科技升级 | 全局 | 全单位/建筑 HP ×2 |
| 11 | `gwc_propulsion_tech` | 推进器科技升级 | 全局 | 全移动单位 +50% 速度 |
| 12 | `gwc_mass_production` | 大批量生产升级 | 全局 | 全移动单位 -30% 建造成本 |

---

## 民主指挥官详细能力

| 能力 | 倍率 |
|------|------|
| 起始单位 | 全部轨道单位 + Helios 轨道泰坦 |
| 科技槽位 | 72（基础 4 + 额外 68） |
| 轨道单位建造成本 | ×0.5 |
| 轨道单位移动速度 | ×1.5 |
| 轨道武器射程 | ×2.0 |
| 轨道单位生命值 | ×2.0 |
| 轨道武器射速 | ×1.5 |
| 轨道弹药伤害 | ×1.5 |
| 轨道弹丸速度 | ×2.0 |
| 资源生产建筑产量 | ×2.0 |
| 仓库容量 | ×2.0 |
| Omega 反轨道火力射程 | 额外 ×1.5（总计 ×3.0） |
| Omega 雷达 | 500 半径轨道层 + 地面层视野 |
| 探索额外选项 | +2（每次胜利后探索多 2 张卡可选） |

---

## 安装

1. 将 `GWO_democracy_firepower` 文件夹放入 PA 的 `client_mods` 目录：
   ```
   %LOCALAPPDATA%\Uber Entertainment\Planetary Annihilation\client_mods\
   ```
2. 确保已安装 [Galactic War Overhaul](https://github.com/Quitch/GW-AI-Overhaul)
3. 启动 PA → Community Mods → 启用 **GWO-民主火力**
4. 开始新的银河战争

---

## 测试

在游戏中按左下角 X 按钮，输入卡牌 ID 并点击 + 即可添加对应科技卡。

或在 Coherent UI Debugger Console 中批量添加：

```javascript
["gwc_omega_interceptor","gwc_omega_railgun","gwc_avenger_bomber","gwc_solar_array_conversion","gwc_jig_super_efficiency","gwc_jig_self_defense","gwc_anchor_heavy_platform","gwc_sxx_ballistic","gwc_fire_control","gwc_armor_tech","gwc_propulsion_tech","gwc_mass_production"].forEach(function(id){model.cheats.giveCardId(id);model.cheats.giveCard();});
```

---

## 文件结构

```
GWO_democracy_firepower/
├── modinfo.json
└── ui/
    ├── main/game/galactic_war/cards/
    │   ├── gwc_start_democracy.js
    │   ├── gwc_omega_interceptor.js
    │   ├── gwc_omega_railgun.js
    │   ├── gwc_avenger_bomber.js
    │   ├── gwc_solar_array_conversion.js
    │   ├── gwc_jig_super_efficiency.js
    │   ├── gwc_jig_self_defense.js
    │   ├── gwc_anchor_heavy_platform.js
    │   ├── gwc_sxx_ballistic.js
    │   ├── gwc_fire_control.js
    │   ├── gwc_armor_tech.js
    │   ├── gwc_propulsion_tech.js
    │   └── gwc_mass_production.js
    └── mods/com.pa.democracy.commander/
        ├── bank.js
        ├── start_cards.js
        ├── tech_cards.js
        ├── specs.js
        └── lucky_extra.js
```

---

## 致谢

- [Galactic War Overhaul](https://github.com/Quitch/GW-AI-Overhaul) by Quitch — 本模组的基础框架
- [New-GW-Cards](https://github.com/Quitch/New-GW-Cards) — 卡牌模组模板
