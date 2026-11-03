# 短剧分镜提示词工业级工程规范 (Prompt Engineering Rules)

> 本规范是短剧“像素级”视觉生产的核心标准，确保大模型生成的视频具备**电影级运镜质感**、**生动的说话口型动势**、**100% 干净无文字底片**与**物种一致性**。

---

## 1. 提示词黄金九层结构模板 (9-Layer Formula)

为了让扩散模型最精确地理解镜头意图，正向 Prompt 必须按照以下标准顺序层级组装：

```text
[景别与运镜] + [核心主体与服装] + [面部表情与眼神] + [张嘴口型与语言动势] + [肢体动作与交互] + [关键道具与环境光影] + [物理动态细节] + [画质与风格] + [9:16竖屏构图锁]
```

### 字段逐层解析：
1. **景别与运镜 (Shot & Camera)**：
   - 特写 (Extreme Close-up) / 近景 (Medium Close-up) / 中景 (Medium Shot) / 全景 (Wide Shot)
   - 快速推镜 (Fast Push-in) / 环绕运镜 (Orbiting Shot) / 低角度仰拍 (Low-angle Dutch Angle) / 手持跟随微晃动 (Subtle Handheld Motion)
2. **核心主体 (Subject)**：
   - 严禁出现空泛名词，绑定已建立的角色特征（如：*25岁年轻豪门少爷林天豪，身着定制修身深黑西装*）。
3. **面部表情 (Facial Expression)**：
   - 带有剧烈戏剧冲突的微表情（如：*满脸错愕、瞳孔震颤、眉头紧锁、轻蔑冷笑*）。
4. **张嘴口型与动势 (Lip-Sync Dynamic Action - 核心重点)**：
   - **必须明确写出动作**：`面部带笑/带怒，嘴唇生动自然张开开合说话，下颌随着言语节奏明显起伏，下巴微动，面部肌肉富有张力`。
5. **肢体动作与交互 (Body Action)**：
   - 如：*猛地甩出一张支票 / 挥手阻拦 / 踩入泥潭踉跄失去平衡*。
6. **环境与光影 (Environment & Lighting)**：
   - 如：*顶级现代轻奢大理石豪宅，柔和漫射日光 / 乡村暴雨泥泞小道，阴沉乌云，雨水飞溅*。
7. **物理细节 (Physics & Motion Blur)**：
   - 水花四溅 (splashing water)、泥浆飞溅 (mud splatter)、衣角翻飞 (fluttering coat fabric)、发丝微颤。
8. **质感调性 (Cinematics)**：
   - 电影级胶片质感 (cinematic film texture, 8k resolution, photorealistic, masterpiece, high dynamic range).
9. **画幅保护 (Ratio Lock)**：
   - 9:16 竖屏短剧构图，人物处于黄金分割视觉中心。

---

## 2. 零字幕纯净视觉底片规范 (Zero-Subtitle Protocol)

### 2.1 正向提示词净化规则
- **绝对黑名单词汇**：`台词`、`字幕`、`说话内容`、`对话框`、`说：`、`喊道：`、中英文引号 `“ ”` `""`。
- **改写公式**：
  $$\text{原剧本文学台词} \longrightarrow \text{情绪词} + \text{面部微表情} + \text{发声唇部运动描述}$$

### 2.2 负向提示词工业级标准库 (Negative Prompt Standard)
每次生成任务必须无条件注入以下负向词：
```text
subtitles, subtitle bar, text, words, watermark, caption, typography, Chinese characters, black bar at bottom, banner, title, font, letters, credits, UI, interface, logo, signature, bad anatomy, deformed limbs, blurry, lowres, distorted faces, static mouth, closed lips talking
```

---

## 3. 经典戏剧冲突场景提示词模板库

### 模板 A：豪门继承人被逐出家门（戏剧反转）
```text
(Dramatic low-angle push-in shot), 25-year-old young billionaire heir in tailored luxury suit standing in grand mansion hallway, face filled with arrogant sneer shifting rapidly to utter shock and widening eyes. (Mouth opens wide talking back defensively, expressive jaw movement, agitated speech gestures), abruptly stepping back as a termination contract is thrown towards the floor. Luxury marble reflection, soft morning sunlight, cinematic high dynamic range, masterpiece, 9:16 vertical composition.
```

### 模板 B：乡村田埂摔入泥潭（滑稽落魄）
```text
(Dynamic handheld tracking medium shot), pristine white luxury sneakers stepping directly into deep brown muddy puddle, splash of thick mud flying onto high-end trousers. The young master loses balance, arms flailing frantically in the air, face contorted in comedic panic, (mouth wide open screaming and shouting in distress, animated facial contortions and moving jaw), falling backwards into the mud. Wet splash physics, rainy overcast daylight, dramatic comical lighting, 9:16 vertical cinematography.
```

### 模板 C：果园丰收喜悦对白（农产品物种锁死）
```text
(Cinematic medium shot with golden hour warm glow), protagonist holding a pair of large, perfectly round, vibrant golden-orange navel oranges freshly picked from lush green branches. (Warm joyful smile, lips moving naturally talking enthusiastically with moving chin and vivid facial expressions), gesturing with the bright citrus fruits towards the sunlit orchard hills. Deep green foliage contrasted with brilliant yellow-orange fruits, beautiful bokeh, photorealistic, 9:16 vertical frame.
```
*(注：该场景必须在负向词中强行添加：`apple, red apple, green apple, apple tree, strawberry, red fruits`)*。
