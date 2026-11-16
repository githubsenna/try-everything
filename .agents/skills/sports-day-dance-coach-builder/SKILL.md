---
name: sports-day-dance-coach-builder
description: >-
  Use this skill whenever the user wants to create a new elementary school
  sports day entrance dance, aerobics, or performance interactive coaching web
  system and printable A4 cue/rubric worksheet from a reference video (YouTube
  URL or local MP4). Applies the proven Shimen Elementary V4.04 Gold Standard
  architecture (precision per-step cutpoints, 2-line enlarged action+tip cues,
  prominent live subtitles, repeat tagging, consolidated bridge combos, and
  mobile deferred-seek stability) directly from the first build.
---

# 國小運動會進場舞／大會舞互動帶練系統建置萬用技能（V4.04 黃金藍圖）

當導師為**新學年度、新歌曲或新班級活動**開啟全新專案資料夾，並提供示範舞蹈影片（YouTube 連結或本機 MP4）時，直接套用本藍圖從第一版起即產出經過實戰驗證的 **V4.04 黃金標準完整教材組**，無須重覆踩坑磨合。

---

## 一、標準專案目錄與網站入口架構

於指定工作區（推薦位於 Google 雲端硬碟同步專案夾下）建立標準四層架構與根目錄入口：

```text
<專案名稱>/
├── index.html                           # GitHub Pages 短網址自動導向頁（連結互動網頁與 A4 學習單）
├── AGENTS.md                            # AI 自動載入之專案規則、課程規格與跨對話交接紀錄
├── README.md                            # 專案總覽與師生快速使用說明
├── .agents/skills/dance-coach-updater/  # 本專案專用維護腳本（build / extract / test / publish）
├── 01_課程計畫/                         # 曲目拆解規格表、設計決策與改版歷史紀錄
├── 02_教案簡報/                         # 教師免備課分節進度、操場／教室帶練口令 SOP
├── 03_影音資源/
│   ├── <曲名>_鏡面教學原片.mp4          # 同目錄離線教學原片（<= 50MB H.264 MP4）
│   └── <曲名>_互動帶練系統.html         # 單檔離線＋線上雙棲互動帶練網頁
└── 04_學習單與評量/
    └── <曲名>_八拍口訣與自練檢核單.html # A4 橫式雙面列印（學生自練版＋教師 100 分制 4 向度評量規準版）
```

---

## 二、媒體前處理與真實分解截圖管線

1. **優先取得教學原片 MP4（徹底擺脫 YouTube 內嵌封鎖）**：
   - 使用 `yt-dlp`（或接收導師提供之影片）將示範影片下載為相容性最高之 H.264 MP4（建議檔案大小控制在 `50MB` 以內，以兼顧 `file://` 本機雙擊離線播放與 GitHub Pages `HTTP 206` 串流快轉）。
   - 確認影片是否為「鏡面版」，一律將後續教材視角與實拍畫面對齊。
2. **1 步 1 圖真人截圖擷取（適度合併短橋段）**：
   - 依音樂實拍節奏分段（常為每段 `4` 個關鍵小步 ①➔②➔③➔④）；若遇 **4 個八拍且換動密集的過渡橋段或密集間奏**，優先整併為 **2 張連貫組合卡（每張包含 2 個八拍）**，避免拆成 4 格過碎難跟。
   - 透過 Node HTTP Range 伺服器搭配無頭 Chrome 精準擷取每個動作中段代表畫格（JPEG Base64）存為 `keyframes_<count>.json`，並直接將第 1 動截圖寫入 HTML `<video poster="...">` 作為預設封面。

---

## 三、國小教學設計與鏡像文字鐵律

1. **台灣繁體中文與 108 課綱術語**：全程嚴格使用 `zh-TW`（例如學習單、評量規準、彈性學習課程），嚴禁簡體字與非台灣慣用語。
2. **鏡像左右鎖定（學生本位）**：所有畫面提示、動作口訣、即時字幕皆**直接寫【學生自己的左右手腳】**（螢幕左邊動＝你的左手／左腳；螢幕右邊動＝你的右手／右腳），絕不讓學生二次左右轉換。
3. **極簡放大 2 行分解卡 ＋ 適性保底 ＋ 重複標記**：
   - 學生看影片時無法長時間閱讀細碎文字，每張步驟卡與即時字幕一律濃縮為醒目放大的 **2 行格式：`🎯 動作` ＋ `💡 提醒`**（寫入 `hand` 與 `foot`/`tip` 資料欄位維持相容性），並搭配點擊卡片直接進入 `0.6x` 單步帶練。
   - **重複段落明確標記**：若歌曲中後段重複前段動作（例如主歌二同前奏＋主歌一），直接於段落名稱、卡片與學習單標註 **`🔁 同前段重跳複習`**，減輕師生記憶負擔。
   - 每大段提供 **`🌱 慢半拍沒關係（保底動作）`** 提示，照顧動作較慢或容易轉圈頭暈的同學，維持整體畫面整齊度。
4. **反干擾原則**：**嚴禁「5-6-7-8 黑幕倒數遮罩」與多餘電子滴答聲**，亦**不硬塞無關的賓果九宮格或座號抽籤模組**，專注於「老師免備課好帶、學生無指導也能自練」。
5. **A4 雙面學習單規範**：單頁 HTML 工具列可切換「📄 學生發放版」、「👩‍🏫 教師備課與評量規準版（100 分制、4 向度 Rubrics 矩陣）」或「📑 雙面全印」，嚴禁浮水印、多餘圖標或頁碼，保留班級／座號／姓名欄位與基礎／進階小老師任務。

---

## 四、V4.04 互動播放器與雙棲介面規格

1. **三段式傻瓜帶練按鈕 ＋ 雙層慢速分流 ＋ 全曲連跳**：
   - **🐢 第一步：慢速練這 1 格（`0.6x`）**：專攻單步精準切點與換手換腳細節。
   - **🚶 第二步：慢速連跳這段 ①➔④（`0.75x` 預設）**：保留音樂律動與拍點的教師愛用跟跳速度。
   - **🏃 第三步：原速過關挑戰（`1.0x`）**：播完該段自動停住播放 Web Audio API 過關音效，跳出「前往下一段」鼓勵橫幅。
   - 頂部設全曲導覽列與 **`🏆 全曲連跳（1.0x）`**，並以 `localStorage` 記錄已學會段落打勾進度。
2. **單步精準切點校準法（取代盲目全域重疊緩衝）**：
   - **資料層與單步切點皆保持連續無間隙**：`start` / `end` 與實測微調後之 `playStart` / `playEnd` 從 `0` 秒到曲末 100% 無縫相接，確保單步循環、整段跟跳與全曲亮燈準確切換。
   - **單步模式（`step`）**：透過 `getStepPlaybackBounds(st)` 優先讀取逐格實看微調之 **`playStart` / `playEnd` 精準起迄點**（避免統一套用前後全域緩衝而切到下一動過多拍子或截斷揮拳動作），並在單步結束處**暫停定格 `350ms`** 展現完整收尾姿勢後再重播。
   - **整段／挑戰模式（`section` / `challenge`）**：段尾僅追加 `SEC_POST_BUFFER = 0.25` 秒收尾微緩衝，亮燈追蹤鎖定 `Math.min(t, sec.end - 0.01)` 確保最後一格卡片不提前跳格。
   - 左欄須附 `#overlap-note` 說明橫幅與即時 `#live-buffer-badge` 狀態標籤，讓師生清楚掌握精準切點與結尾定格機制。
3. **手機／直立平板與遠距無障礙優化**：
   - **`<= 1080px` 置頂凍結 ＋ 醒目即時字幕**：`.sticky-player-wrap` 自動固定 `<video>`、高對比放大雙行膠囊即時字幕（`.live-subtitle` 含 `#live-sub-hand`／`#live-sub-foot`）與播放控制列於頂部（`<= 640px` 限縮影片最大高度 `36vh`）。
   - **免捲動換招**：控制列內建 **`⏮ 上一動 ／ 下一動 ⏭`**（電腦同時支援鍵盤 `ArrowLeft` / `ArrowRight`、`Space` 播放暫停）。
   - **一鍵放大大字模式**：頂部提供 **`🔍 放大影片／手機平板大字模式`** 切換 `body.zoom-mode` 置中單欄放大排版。
   - **無障礙回到頂端鈕**：右下角設 `#btn-back-to-top`（`⬆ 回到頂端`，`scrollY > 180` 或 `:focus-visible` 顯現）。
   - **線上載入保護與字型禁令**：`<video>` 設 `poster` 並監聽 `waiting`／`playing` 顯示「⏳ 影片載入緩衝中…」；嚴格遵循無襯線系統字型，**禁止 `KaiTi`（標楷體）**。
   - **手機觸控與延遲跳轉防呆（V4.03 起內建）**：`button` 與 `.step-card` 設 `touch-action: manipulation`；`<= 640px` 固定 `.live-subtitle` `min-height: 118px` 搭配 `setTextIfChanged` 節流寫入避免換行推擠吃點擊；`seekVideoTo` 遇 `video.readyState < 1` 排入 `state.pendingSeekTime`（早期 `play` 不提前清空）並於 `loadedmetadata`／`loadeddata`／`canplay` 自動跳點，搭配 `650ms` 冷卻、`state.isBuffering` 防重入與原生 `<video>` `play` 邊界校準，杜絕手機誤播第 1 段 `0:00` 或點擊沒反應。
4. **版面識別與署名規範**：
   - 頂部 `<title>` 與 `.brand-title` **保持乾淨不顯示版本號**。
   - 網頁最底部頁尾 `#site-footer` 顯示完整名稱、版本號（如 `Version 1.0 (V1)`）與作者署名 **`Made by SENNA`**（若專案另有指定署名依使用者要求調整），並附上直達 A4 學習單的連結。

---

## 五、自動化驗證與 GitHub Pages 安全發布原則

1. **程式化建置 ＋ Node VM 驗證**：產出網頁與學習單時，同步撰寫 Node.js DOM/狀態測試腳本驗證時間軸連續性、截圖完整性、單步精準邊界、重複段與合併卡渲染、結尾定格機制、`上一動/下一動`、放大模式、回到頂端鈕及 A4 學習單雙版切換。
2. **暫存區乾淨推送 GitHub Pages**：
   - 為避免 Google 雲端硬碟因 `.git` 物件鎖定而同步衝突，**切勿直接在雲端硬碟目錄執行 `git init`**。
   - 一律由發布腳本將專案檔案複製到系統暫存區（`os.tmpdir()`），寫入 `.nojekyll` 後初始化 Git 並透過 `gh` CLI 推送公開儲存庫的 `main` 分支且開啟 GitHub Pages 根目錄服務（`index.html` 自動導向互動系統）。
3. **實測驗收標準**：發布後確認 GitHub Pages 建置狀態為 `built`，並驗證首頁、互動網頁與學習單皆為 HTTP `200`，且 `.mp4` 支援 `HTTP 206`（`accept-ranges: bytes`）斷點串流播放。
