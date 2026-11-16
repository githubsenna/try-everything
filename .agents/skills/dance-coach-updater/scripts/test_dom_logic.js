const fs = require('fs');
const path = require('path');
const vm = require('vm');

const projectRoot = path.resolve(__dirname, '../../../../');
const hasProject = fs.existsSync(path.join(projectRoot, '03_影音資源'));

const file1 = hasProject
  ? path.join(projectRoot, '03_影音資源/Try_Everything_五年級運動會進場舞_互動帶練系統.html')
  : path.join(__dirname, 'Try_Everything_五年級運動會進場舞_互動帶練系統.html');
const file2 = hasProject
  ? path.join(projectRoot, '04_學習單與評量/Try_Everything_運動會進場舞_八拍口訣與自練檢核單.html')
  : null;

const html1 = fs.readFileSync(file1, 'utf8');

// 靜態結構與無障礙檢查
if (html1.includes('countdown-overlay')) {
  throw new Error('Found prohibited countdown-overlay in V4 HTML!');
}
if (/KaiTi|標楷體/i.test(html1)) {
  throw new Error('Found prohibited KaiTi font reference in V4 HTML!');
}
if (!html1.includes('src="Try_Everything_鏡面教學原片.mp4"')) {
  throw new Error('Missing local MP4 video source in V4 HTML!');
}
const titleMatch = html1.match(/<title>([\s\S]*?)<\/title>/);
const brandMatch = html1.match(/<h1[^>]*class="brand-title"[^>]*>([\s\S]*?)<\/h1>/);
if (!titleMatch || /V3|V4/i.test(titleMatch[1]) || !brandMatch || /V3|V4/i.test(brandMatch[1])) {
  throw new Error('Top title or brand heading must not contain version number V3/V4!');
}
for (const reqToken of [
  'id="overlap-note"',
  'id="btn-zoom-mode"',
  'id="live-buffer-badge"',
  'id="live-sub-hand"',
  'id="live-sub-foot"',
  'id="site-footer"',
  'id="footer-version"',
  'Version 4.04 (V4.04)',
  'id="footer-author"',
  'Made by SENNA',
  'id="btn-prev-step"',
  'id="btn-next-step"',
  'id="btn-back-to-top"',
  'aria-label="回到網頁最頂端"',
  'id="video-loading-pill"',
  'poster="data:image/jpeg;base64,'
]) {
  if (!html1.includes(reqToken)) {
    throw new Error('Missing required V4 element/token: ' + reqToken);
  }
}

function createMockDOM(idList) {
  const elements = new Map();
  const docListeners = {};

  function makeEl(id, tag = 'DIV') {
    const classes = new Set();
    const attrs = {};
    const listeners = {};
    const el = {
      id,
      tagName: tag,
      _html: '',
      textContent: '',
      src: '',
      currentTime: 0,
      playbackRate: 1,
      readyState: 4,
      paused: true,
      seeking: false,
      style: {},
      classList: {
        add: (...cs) => cs.forEach((c) => classes.add(c)),
        remove: (...cs) => cs.forEach((c) => classes.delete(c)),
        toggle: (c, force) => {
          const has = classes.has(c);
          const next = force === undefined ? !has : Boolean(force);
          if (next) classes.add(c); else classes.delete(c);
          return next;
        },
        contains: (c) => classes.has(c)
      },
      set innerHTML(v) { this._html = v; },
      get innerHTML() { return this._html; },
      getAttribute: (k) => attrs[k] ?? null,
      setAttribute: (k, v) => { attrs[k] = String(v); },
      addEventListener: (ev, fn) => { (listeners[ev] ||= []).push(fn); },
      dispatchEvent: function (ev) { (listeners[ev] || []).forEach((fn) => fn({ currentTarget: this, target: this })); },
      click: function () { (listeners.click || []).forEach((fn) => fn({ currentTarget: this, target: this, stopPropagation() {} })); },
      play: function () { this.paused = false; return Promise.resolve(); },
      pause: function () { this.paused = true; },
      load: function () {},
      closest: () => null,
      _attrs: attrs,
      _classes: classes
    };
    return el;
  }

  idList.forEach((id) => elements.set(id, makeEl(id)));

  const modeBtns = ['step', 'section', 'challenge'].map((md) => {
    const b = makeEl('', 'BUTTON');
    b.setAttribute('data-mode', md);
    if (md === 'section') b.classList.add('active');
    return b;
  });

  const speedBtns = [0.6, 0.75, 1].map((sp) => {
    const b = makeEl('', 'BUTTON');
    b.setAttribute('data-speed', sp);
    if (sp === 0.75) b.classList.add('active');
    return b;
  });

  const sheetModeBtns = ['student', 'teacher', 'both'].map((md) => {
    const b = makeEl('', 'BUTTON');
    b.setAttribute('data-mode', md);
    if (md === 'student') b.classList.add('active');
    return b;
  });

  const document = {
    head: { appendChild: () => {} },
    body: makeEl('body', 'BODY'),
    documentElement: { scrollTop: 0 },
    getElementById: (id) => {
      if (!elements.has(id)) elements.set(id, makeEl(id));
      return elements.get(id);
    },
    createElement: (tag) => makeEl('', tag.toUpperCase()),
    querySelectorAll: (sel) => {
      if (sel === '.mode-btn') return modeBtns;
      if (sel === '.speed-btn') return speedBtns;
      if (sel === '.tool-btn[data-mode]') return sheetModeBtns;
      return [];
    },
    addEventListener: (ev, fn) => { (docListeners[ev] ||= []).push(fn); }
  };

  return { elements, document, modeBtns, speedBtns, sheetModeBtns };
}

// 1. 驗證 V4.01 互動帶練系統 JS 執行與 DOM 渲染
const ids1 = [
  'dance-video', 'section-nav', 'done-count', 'sec-heading', 'sec-meta-line',
  'btn-mark-section', 'steps-grid-2x2', 'easy-tip-text', 'live-sub-tag',
  'live-sub-time', 'live-buffer-badge', 'live-sub-hand', 'live-sub-foot',
  'btn-zoom-mode', 'btn-prev-step', 'btn-next-step', 'video-loading-pill',
  'btn-back-to-top', 'challenge-banner', 'challenge-title', 'btn-challenge-next',
  'btn-challenge-retry', 'video-missing-alert', 'file-video-input',
  'btn-toggle-play', 'btn-replay', 'btn-reset-progress',
  'btn-pick-video-alert', 'btn-pick-video-small'
];
const mock1 = createMockDOM(ids1);
const script1 = html1.match(/<script>([\s\S]*?)<\/script>/)[1];

let capturedInterval = null;
const mockWindow = {
  location: { protocol: 'file:', origin: 'null' },
  scrollY: 0,
  _scrollListeners: [],
  _scrollToCalls: [],
  addEventListener: (ev, fn) => {
    if (ev === 'scroll') mockWindow._scrollListeners.push(fn);
  },
  scrollTo: (arg) => {
    mockWindow._scrollToCalls.push(arg);
    mockWindow.scrollY = (arg && typeof arg === 'object') ? (arg.top || 0) : Number(arg || 0);
  }
};
const ctx1 = vm.createContext({
  window: mockWindow,
  document: mock1.document,
  localStorage: { _m: {}, getItem(k) { return this._m[k] || null; }, setItem(k, v) { this._m[k] = v; }, removeItem(k) { delete this._m[k]; } },
  URL: { createObjectURL: () => 'blob:mock' },
  Promise, Date,
  setInterval: (fn) => { capturedInterval = fn; return 1; },
  clearInterval: () => {},
  setTimeout, clearTimeout,
  console, Number, String, Array, Set, Math, JSON, Boolean
});

vm.runInContext(script1, ctx1);

// 檢查資料完整性（28 張截圖、連續時間軸、每步皆有 hand/foot/tip/tag）
const keyframeCount = vm.runInContext('Object.keys(KEYFRAMES).length', ctx1);
const stepTotal = vm.runInContext('ALL_STEPS.length', ctx1);
const sectionTotal = vm.runInContext('DANCE_SECTIONS.length', ctx1);
console.log('V4.04 Data Check -> Keyframes:', keyframeCount, 'Sections:', sectionTotal, 'Steps:', stepTotal);
if (keyframeCount !== 28 || sectionTotal !== 8 || stepTotal !== 28) {
  throw new Error('V4.04 data completeness check failed!');
}

const timelineCheck = vm.runInContext(`(() => {
  if (ALL_STEPS[0].start !== 0 || ALL_STEPS[ALL_STEPS.length - 1].end !== 193) return 'Bad start/end';
  for (let i = 0; i < ALL_STEPS.length; i++) {
    const s = ALL_STEPS[i];
    if (!KEYFRAMES[s.id] || !s.hand || !s.foot || !s.tip || !s.tag) return 'Missing fields on ' + s.id;
    if (i < ALL_STEPS.length - 1 && s.end !== ALL_STEPS[i + 1].start) return 'Gap at ' + s.id;
  }
  return 'OK';
})()`, ctx1);
if (timelineCheck !== 'OK') throw new Error('Timeline check failed: ' + timelineCheck);

// 檢查精準切點計算與第 2 段無縫斷點
const bounds21 = vm.runInContext("getStepPlaybackBounds(ALL_STEPS.find(s => s.id === '2-1'))", ctx1);
if (bounds21.start !== 16 || bounds21.end !== 21) {
  throw new Error('Step 2-1 playback bounds mismatch: ' + JSON.stringify(bounds21));
}
const bounds23 = vm.runInContext("getStepPlaybackBounds(ALL_STEPS.find(s => s.id === '2-3'))", ctx1);
if (bounds23.start !== 25.5 || bounds23.end !== 29.5) {
  throw new Error('Step 2-3 playback bounds mismatch: ' + JSON.stringify(bounds23));
}
const bounds24 = vm.runInContext("getStepPlaybackBounds(ALL_STEPS.find(s => s.id === '2-4'))", ctx1);
if (bounds24.start !== 29.5 || bounds24.end !== 33.5) {
  throw new Error('Step 2-4 playback bounds mismatch: ' + JSON.stringify(bounds24));
}
const secBounds2 = vm.runInContext('getSectionPlaybackBounds(DANCE_SECTIONS[1])', ctx1);
if (secBounds2.start !== 16 || secBounds2.end !== 33.75 || vm.runInContext('DANCE_SECTIONS[1].timeRange', ctx1) !== '0:16–0:33.5') {
  throw new Error('Section 2 playback bounds or timeRange mismatch: ' + JSON.stringify(secBounds2));
}
console.log('V4.04 Precision Bounds Check -> Step 2-1:', bounds21.start + 's-' + bounds21.end + 's | Sec 2:', secBounds2.start + 's-' + secBounds2.end + 's');

// 檢查初始 DOM 渲染
const navHtml = mock1.elements.get('section-nav').innerHTML;
const navBtnCount = (navHtml.match(/data-sec-id="/g) || []).length;
const gridHtml1 = mock1.elements.get('steps-grid-2x2').innerHTML;
const cardCount1 = (gridHtml1.match(/data-step-id="/g) || []).length;
const imgCount1 = (gridHtml1.match(/src="data:image\/jpeg;base64,/g) || []).length;
console.log('V4 DOM Check -> Nav buttons:', navBtnCount, 'Cards per section:', cardCount1, 'Card images:', imgCount1);
if (navBtnCount !== 9 || cardCount1 !== 4 || imgCount1 !== 4) {
  throw new Error('V4 initial DOM check failed!');
}

// 測試第 2 段動作 2-1 單步精準切點、動作/提醒雙行即時字幕、上一動／下一動按鈕與段尾定格機制
const videoEl = mock1.elements.get('dance-video');
ctx1.selectSingleStep('2-1', true);
const expectedHand21 = vm.runInContext("ALL_STEPS.find(s => s.id === '2-1').hand", ctx1);
const expectedFoot21 = vm.runInContext("ALL_STEPS.find(s => s.id === '2-1').foot", ctx1);
if (
  vm.runInContext('state.practiceMode', ctx1) !== 'step' ||
  vm.runInContext('state.playbackRate', ctx1) !== 0.6 ||
  videoEl.currentTime !== 16 ||
  mock1.elements.get('live-sub-hand').textContent !== expectedHand21 ||
  mock1.elements.get('live-sub-foot').textContent !== expectedFoot21 ||
  !mock1.elements.get('live-buffer-badge').textContent.includes('單步精準切點')
) {
  throw new Error('V4.02 Step 2-1 precision/cue check failed!');
}

mock1.elements.get('btn-next-step').click();
if (vm.runInContext('state.activeStepId', ctx1) !== '2-2' || videoEl.currentTime !== 21) {
  throw new Error('V4.02 btn-next-step check failed! Got ' + vm.runInContext('state.activeStepId', ctx1) + ' @ ' + videoEl.currentTime);
}
mock1.elements.get('btn-prev-step').click();
if (vm.runInContext('state.activeStepId', ctx1) !== '2-1' || videoEl.currentTime !== 16) {
  throw new Error('V4.02 btn-prev-step check failed! Got ' + vm.runInContext('state.activeStepId', ctx1) + ' @ ' + videoEl.currentTime);
}

if (typeof capturedInterval === 'function') {
  videoEl.currentTime = 20.95;
  vm.runInContext('state.lastSeekAt = 0', ctx1);
  capturedInterval();
  if (!vm.runInContext('state.isHoldingEnd', ctx1) || !videoEl.paused) {
    throw new Error('V4.02 350ms end-hold freeze check failed!');
  }
}

// 測試放大影片／手機平板大字模式切換
const zoomBtn = mock1.elements.get('btn-zoom-mode');
zoomBtn.click();
if (!vm.runInContext('state.zoomMode', ctx1) || !mock1.document.body.classList.contains('zoom-mode') || !zoomBtn.textContent.includes('開啟')) {
  throw new Error('V4.01 zoom-mode enable failed!');
}
zoomBtn.click();
if (vm.runInContext('state.zoomMode', ctx1) || mock1.document.body.classList.contains('zoom-mode') || !zoomBtn.textContent.includes('關閉')) {
  throw new Error('V4.01 zoom-mode disable failed!');
}

// 測試手機／平板往下滑動顯示「回到最頂端」按鈕與點擊返回頂部
const backToTopBtn = mock1.elements.get('btn-back-to-top');
if (backToTopBtn.classList.contains('visible')) {
  throw new Error('Back-to-top button should start hidden when scrollY === 0');
}
mockWindow.scrollY = 320;
mockWindow._scrollListeners.forEach((fn) => fn());
if (!backToTopBtn.classList.contains('visible')) {
  throw new Error('Back-to-top button failed to become visible at scrollY = 320');
}
backToTopBtn.click();
if (
  mockWindow._scrollToCalls.length === 0 ||
  mockWindow._scrollToCalls[mockWindow._scrollToCalls.length - 1].top !== 0 ||
  mockWindow.scrollY !== 0
) {
  throw new Error('Back-to-top click failed to scroll window to top 0');
}

// 測試第 3 段間奏一合併為 2 大組合、第 5 段複習標記、第 7 段橋段維持 2 大組合與第 8 段結尾左跨修正
ctx1.selectSection(3, false);
const sec3CardsHtml = mock1.elements.get('steps-grid-2x2').innerHTML;
if (!sec3CardsHtml.includes('data-step-id="3-1"') || !sec3CardsHtml.includes('data-step-id="3-2"') || sec3CardsHtml.includes('data-step-id="3-3"')) {
  throw new Error('V4.04 Section 3 2-card consolidation check failed!');
}
ctx1.selectSection(5, false);
if (!mock1.elements.get('sec-heading').textContent.includes('同前奏＋主歌一')) {
  throw new Error('V4.02 Section 5 repeat label check failed: ' + mock1.elements.get('sec-heading').textContent);
}
ctx1.selectSection(7, false);
const sec7CardsHtml = mock1.elements.get('steps-grid-2x2').innerHTML;
if (!sec7CardsHtml.includes('data-step-id="7-1"') || !sec7CardsHtml.includes('data-step-id="7-2"') || sec7CardsHtml.includes('data-step-id="7-3"')) {
  throw new Error('V4.02 Section 7 2-card consolidation check failed!');
}

// 測試切換到第 8 段 -> 檢查左跨標籤 -> 點擊動作 8-4 -> 切換 Step2 / Step3 / 全曲連跳
ctx1.selectSection(8, false);
const sec8CardsHtml = mock1.elements.get('steps-grid-2x2').innerHTML;
if (!mock1.elements.get('sec-heading').textContent.includes('第 8 段：結尾') || !sec8CardsHtml.includes('左跨')) {
  throw new Error('Section switch to 8 or 8-1 left-lunge label check failed!');
}

ctx1.selectSingleStep('8-4', true);
if (
  vm.runInContext('state.practiceMode', ctx1) !== 'step' ||
  vm.runInContext('state.playbackRate', ctx1) !== 0.6 ||
  mock1.elements.get('live-sub-tag').textContent !== '動作 ④【左手指前微笑定格】' ||
  videoEl.currentTime !== 187.5
) {
  throw new Error('Single step 8-4 click behavior failed!');
}

mock1.modeBtns[1].click(); // 第二步：整段 0.75x
if (vm.runInContext('state.practiceMode', ctx1) !== 'section' || vm.runInContext('state.playbackRate', ctx1) !== 0.75 || videoEl.currentTime !== 171.5) {
  throw new Error('Step 2 section loop toggle failed!');
}

mock1.modeBtns[2].click(); // 第三步：原速過關挑戰 1.0x
if (vm.runInContext('state.practiceMode', ctx1) !== 'challenge' || vm.runInContext('state.playbackRate', ctx1) !== 1 || videoEl.currentTime !== 171.5) {
  throw new Error('Step 3 challenge mode toggle failed!');
}

// 模擬本段挑戰完成
vm.runInContext('handleSectionComplete(getActiveSection())', ctx1);
if (!mock1.elements.get('challenge-banner').classList.contains('visible') || !videoEl.paused) {
  throw new Error('Challenge complete banner failed!');
}

// 測試全曲連跳
ctx1.selectFullSong(true);
if (vm.runInContext('state.practiceMode', ctx1) !== 'all' || vm.runInContext('state.playbackRate', ctx1) !== 1 || videoEl.currentTime !== 0) {
  throw new Error('Full song mode failed!');
}

// 測試手機端 readyState === 0 延遲跳轉佇列與原生播放防護（V4.03/V4.04：3-2 起點為 41.6s）
videoEl.readyState = 0;
videoEl.currentTime = 0;
videoEl.paused = true;
ctx1.selectSingleStep('3-2', true);
if (vm.runInContext('state.pendingSeekTime', ctx1) !== 41.6) {
  throw new Error('V4.04 mobile deferred seek queue failed! pendingSeekTime=' + vm.runInContext('state.pendingSeekTime', ctx1));
}
videoEl.currentTime = 0; // 模擬手機瀏覽器在 readyState === 0 時忽略 currentTime 設定並觸發早期 play
videoEl.dispatchEvent('play');
if (vm.runInContext('state.pendingSeekTime', ctx1) !== 41.6) {
  throw new Error('V4.04 early play prematurely cleared pendingSeekTime!');
}
videoEl.readyState = 1; // 模擬手機取得 metadata 完成
videoEl.dispatchEvent('loadedmetadata');
if (videoEl.currentTime !== 41.6 || vm.runInContext('state.pendingSeekTime', ctx1) !== null) {
  throw new Error('V4.04 loadedmetadata failed to flush pendingSeekTime! currentTime=' + videoEl.currentTime);
}
videoEl.readyState = 4;

// 2. 若於專案目錄下執行，一併驗證根目錄入口 index.html 與學習單 04_學習單與評量
if (hasProject) {
  const indexHtmlPath = path.join(projectRoot, 'index.html');
  if (!fs.existsSync(indexHtmlPath)) {
    throw new Error('Missing GitHub Pages root entry index.html!');
  }
  const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
  if (!indexHtml.includes('Made by SENNA') || !indexHtml.includes('03_影音資源/Try_Everything_五年級運動會進場舞_互動帶練系統.html')) {
    throw new Error('Root index.html missing expected author credit or target link!');
  }
  console.log('Root index.html Check -> OK');
}

if (file2 && fs.existsSync(file2)) {
  const html2 = fs.readFileSync(file2, 'utf8');
  const mock2 = createMockDOM(['sheet-student', 'sheet-teacher', 'btn-print']);
  mock2.elements.get('sheet-teacher').classList.add('hidden');
  const script2 = html2.match(/<script>([\s\S]*?)<\/script>/)[1];
  const ctx2 = vm.createContext({
    window: { print: () => {} },
    document: mock2.document
  });
  vm.runInContext(script2, ctx2);

  mock2.sheetModeBtns[1].click();
  if (!mock2.elements.get('sheet-student').classList.contains('hidden') || mock2.elements.get('sheet-teacher').classList.contains('hidden')) {
    throw new Error('Worksheet teacher mode switch failed');
  }
  console.log('Worksheet Check -> OK');
}

console.log('ALL V4.04 VERIFICATION CHECKS PASSED!');
