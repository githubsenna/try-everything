---
name: dance-coach-updater
description: >-
  Use this skill when updating choreography timestamps, four-character cues,
  eight-beat prompts, scaffolding tips, mobile accessibility controls,
  rebuilding, verifying, archiving versions, or publishing the Shimen Elementary
  5th Grade "Try Everything" sports day dance interactive web coach and A4
  printable worksheet.
---

# 舞蹈帶練系統與口訣維護技能（Dance Coach Updater — V4.04 黃金標準）

本技能用於安全維護石門國小五年級運動會進場舞《Try Everything》互動帶練系統（`03_影音資源/Try_Everything_五年級運動會進場舞_互動帶練系統.html`）、根目錄入口 `index.html` 與 A4 雙面學習單。**切勿直接手動編輯內含大量 Base64 圖檔的成品 HTML**，請一律透過腳本重建與驗證。

---

## 一、必須堅守的 V4.04 專案黃金規範

1. **鏡像左右鐵律（以學生端為準）**：
   - 明道中學原片（`qwn-TiC8utA`）已是水平鏡像版。所有分解動作文字、`🎯 動作`／`💡 提醒` 指引與即時字幕**一律直接寫【學生自己的左右手腳】**（螢幕左邊動＝你的左手左腳；螢幕右邊動＝你的右手右腳）。
2. **單步精準切點 ＋ 連續無縫時間軸**：
   - `ALL_STEPS` 全曲 28 個分解小步驟的 `start`/`end` 與 `playStart`/`playEnd` 秒數必須維持 **`0` 到 `193` 秒 100% 無縫連續**（不可有缺口或數據重疊，以確保整段與全曲亮燈及單步銜接準確切換）。
   - **單步練習（`practiceMode === 'step'`，預設 `0.6x`）**：透過 `getStepPlaybackBounds(st)` 優先讀取每一步實測校準的 `playStart` / `playEnd`（避免早期全域緩衝切到下一動過多拍子），且於動作結束處**暫停定格 `350ms`** 後再重播，完整呈現「收手歸位與準備下一動」。
   - **整段／原速挑戰（`section` 預設 `0.75x`／`challenge` `1.0x`）**：透過 `getSectionPlaybackBounds` 於段尾追加 `SEC_POST_BUFFER = 0.25` 秒微緩衝，並以 `Math.min(t, sec.end - 0.01)` 鎖定最後一格卡片高亮不提前跳格。
   - **第 5 段複習標記與第 3/7 段精簡架構**：第 3 段間奏一與第 7 段橋段皆維持 **2 大連貫組合卡片**（`3-1`、`3-2` 及 `7-1`、`7-2`，全曲總數 **`28`** 步）；第 5 段標註為 `主歌二（同前奏＋主歌一）`（提示「🔁 前奏重跳一次 ＋ 主歌一重跳一次」）。
   - **師生溝通提示與極簡大字**：保留左欄 `#overlap-note` 說明橫幅與即時字幕 `#live-buffer-badge` 狀態標籤；卡片與即時字幕採高對比放大 **`🎯 動作`** ＋ **`💡 提醒`**（對應 `hand` 與 `foot`/`tip` 欄位）。
3. **無障礙與雙棲行動介面規範**：
   - **置頂凍結與放大視圖**：`<= 1080px` 螢幕下 `.sticky-player-wrap` 自動置頂凍結（含 `<video poster="...">`、`#video-loading-pill` 線上載入緩衝提示、醒目雙行即時字幕 `#live-sub-hand`／`#live-sub-foot`、含 `#btn-prev-step`／`#btn-next-step` 之基礎控制列）；頂部提供 `#btn-zoom-mode` 一鍵切換 `body.zoom-mode`。
   - **手機觸控與延遲載入防跳段（V4.03 起內建）**：`button` 與 `.step-card` 設 `touch-action: manipulation`，`<= 640px` 固定 `.live-subtitle` `min-height: 118px`，`updateSubtitleBar` 採 `setTextIfChanged` 僅於文字變動時寫入 DOM；`seekVideoTo` 遇 `video.readyState < 1` 寫入 `state.pendingSeekTime`（早期 `play` 不提前清空）並於 `loadedmetadata`／`loadeddata`／`canplay` 就緒時自動跳轉，`setInterval` 設 `650ms` 冷卻與 `state.isBuffering` 防重入，點擊分段按鈕統一即時播放，且原生 `<video>` `play` 事件自動校準偏離邊界之 `currentTime`。
   - **無障礙「回到最頂端」懸浮按鈕**：右下角設 `#btn-back-to-top`（`⬆ 回到頂端`，`aria-label="回到網頁最頂端"`）於捲動超過 `180px` 或 `:focus-visible` 時顯示，點擊平滑捲回頂端。
   - **標題乾淨、版本署名置底**：`<title>` 與頂部 `.brand-title` **嚴禁顯示版本號**；版本號（如 `Version 4.04 (V4.04)`）、作者署名 **`Made by SENNA`** 與 A4 學習單連結統一置於頁尾 `#site-footer`（並與根目錄 `index.html` 一致）。
   - **禁止事項**：維持同目錄 `Try_Everything_鏡面教學原片.mp4` 搭配原生 `<video>` 播放、Web Audio API 原生點擊／過關音效；**嚴禁加入 `KaiTi`（標楷體）字型宣告**或遮擋畫面的「5-6-7-8 黑幕倒數」。
4. **版本號升版與封存原則（`V4.0x` 微調 vs `V5.0` 大改版）**：
   - **小幅優化／微調（升小版號 `V4.02`、`V4.03`、`V4.04`…）**：如新增便利小按鈕、修正錯字、校準切點或精簡卡片文字，直接覆蓋本機雲端硬碟現行網頁與 `index.html`，不留多餘舊版 HTML（歷史版本由 GitHub Commit 保留）。
   - **重大架構升級（正式升 `V5.0`）**：如新增「五甲／五乙／五丙進場隊形走位圖」等全新模組或更換教學影片，應先將穩定舊版標註 `_v4_archive` 並移至封存目錄後，再產出新版成品。

---

## 二、標準更新、驗證與發布 SOP

1. **編輯舞蹈資料庫或介面腳本**
   - 修改 [scripts/build_interactive.js](./scripts/build_interactive.js) 中的 `danceData` 陣列（含 `playStart`、`playEnd`、`hand`、`foot`、`tip`、`tag`）、CSS 或互動邏輯；同步檢查 [scripts/test_dom_logic.js](./scripts/test_dom_logic.js) 的斷言條件。
   - 若需調整 28 張動作截圖的採樣秒數，請修改並執行 [scripts/extract_32_frames.js](./scripts/extract_32_frames.js)（透過無頭 Chrome 從 `03_影音資源/Try_Everything_鏡面教學原片.mp4` 重新擷取）更新 [scripts/keyframes_32.json](./scripts/keyframes_32.json)。

2. **重新建置互動網頁**
   - 執行：
     ```powershell
     node ".agents/skills/dance-coach-updater/scripts/build_interactive.js"
     ```
   - 腳本會自動讀取同目錄 `keyframes_32.json`，並覆寫輸出至 `03_影音資源/Try_Everything_五年級運動會進場舞_互動帶練系統.html`。

3. **執行自動化語法與 DOM 邏輯驗證**
   - 執行：
     ```powershell
     node ".agents/skills/dance-coach-updater/scripts/test_dom_logic.js"
     ```
   - 必須確認全部檢核通過：
     - `V4.04 Data Check -> Keyframes: 28 Sections: 8 Steps: 28`
     - `V4.04 Precision Bounds Check -> Step 2-1: 16s-21s | Sec 2: 16s-33.75s`
     - `V4 DOM Check -> Nav buttons: 9 Cards per section: 4 Card images: 4`
     - 手機端 `readyState === 0` 延遲跳轉佇列（`pendingSeekTime`）與 `loadedmetadata` 刷新驗證通過
     - `Root index.html Check -> OK`
     - `Worksheet Check -> OK`
     - `ALL V4.04 VERIFICATION CHECKS PASSED!`

4. **同步專案文件與學習單**
   - 若調整過版本號、步驟秒數或核心口訣，務必同步更新：
     - 根目錄 `index.html`（頁尾版本號與署名一致性）
     - `AGENTS.md`、`README.md` 與 `01_課程計畫/運動會進場舞_專案討論與設計決策完整紀錄.md`
     - 若動作口訣或八拍有更動，同步更新 `04_學習單與評量/Try_Everything_運動會進場舞_八拍口訣與自練檢核單.html`

5. **一鍵發布至 GitHub 與 GitHub Pages 線上網站**
   - 執行發布腳本 [scripts/publish_to_github.js](./scripts/publish_to_github.js)（可帶入更新摘要作為 Commit 訊息）：
     ```powershell
     node ".agents/skills/dance-coach-updater/scripts/publish_to_github.js" "Update V4.04: 說明本次更新重點"
     ```
   - 腳本會在作業系統暫存目錄打包推送（避免 Google 雲端硬碟出現 `.git` 同步衝突），自動更新公開儲存庫 `https://github.com/githubsenna/try-everything`（`main` 分支）與線上網址 `https://githubsenna.github.io/try-everything/`；若遇本機憑證過期，請提醒導師於瀏覽器按一次 Authorize 授權即可。
