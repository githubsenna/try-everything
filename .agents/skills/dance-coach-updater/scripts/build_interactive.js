const fs = require('fs');
const path = require('path');

// 讀取全曲 28 個精準校準分解動作之專屬截圖 Base64 JSON（相對於本腳本路徑）
const keyframesPath = path.resolve(__dirname, 'keyframes_32.json');
const keyframesRaw = fs.readFileSync(keyframesPath, 'utf8').replace(/^\uFEFF/, '');
const keyframes = JSON.parse(keyframesRaw);

// 自動判斷輸出路徑：若位於四層專案目錄下則輸出至 03_影音資源，否則輸出於目前目錄（便於本機沙盒測試）
const projectVideoDir = path.resolve(__dirname, '../../../../03_影音資源');
const outDir = fs.existsSync(projectVideoDir) ? projectVideoDir : __dirname;
const outFile = path.join(outDir, 'Try_Everything_五年級運動會進場舞_互動帶練系統.html');

// 全曲 8 大段落 × 28 個精準校準分解小步驟（V4.04：完成全曲自評修正—間奏一合併為2組、無縫切點、第5/6/8段圖文與鏡像方向對齊）
const danceData = [
  {
    id: 1,
    code: '01',
    name: '前奏',
    timeRange: '0:00–0:16',
    start: 0,
    end: 16.0,
    eights: '4 個八拍',
    lyricCue: '♪ Welcome to Zootopia',
    summaryRhyme: '抱肩衝天・揮拳轉身',
    easyTip: '15.5 秒最後快速轉一圈若來不及，原地雙掌向外攤開微蹲即可，第 16 秒準時接主歌一！',
    steps: [
      {
        id: '1-1',
        num: '①',
        start: 0,
        end: 5.0,
        playStart: 0.0,
        playEnd: 5.0,
        timeLabel: '0:00–0:05',
        counts: '第 1 個八拍',
        tag: '交叉抱肩＋右拳衝天',
        hand: '雙手胸前交叉抱肩打開 ➔【右手】高舉衝天小跳',
        foot: '先胸前交叉開展，接著右手用力往天空衝拳跳！',
        tip: '先胸前交叉開展，接著右手用力往天空衝拳跳！'
      },
      {
        id: '1-2',
        num: '②',
        start: 5.0,
        end: 8.5,
        playStart: 4.8,
        playEnd: 8.5,
        timeLabel: '0:05–0:08.5',
        counts: '第 2 個八拍',
        tag: '交叉開展＋左拳衝天',
        hand: '雙手胸前交叉向兩側打開 ➔ 換【左手】高舉衝天跳',
        foot: '跟第 ① 格動作一樣換邊做，左手高舉往上衝！',
        tip: '跟第 ① 格動作一樣換邊做，左手高舉往上衝！'
      },
      {
        id: '1-3',
        num: '③',
        start: 8.5,
        end: 12.8,
        playStart: 8.5,
        playEnd: 12.8,
        timeLabel: '0:08.5–0:12.8',
        counts: '第 3 個八拍',
        tag: '側身揮拳4次',
        hand: '向右微側身，單手往天空邊跳邊連續揮拳 × 4 次',
        foot: '數滿「1、2、3、4」揮完 4 拳才轉回正面！',
        tip: '數滿「1、2、3、4」揮完 4 拳才轉回正面！'
      },
      {
        id: '1-4',
        num: '④',
        start: 12.8,
        end: 16.0,
        playStart: 12.8,
        playEnd: 16.0,
        timeLabel: '0:12.8–0:16',
        counts: '第 4 個八拍',
        tag: '展臂開掌＋轉身回正',
        hand: '轉回正面雙臂大展 ➔ 雙掌向外攤開、快速轉身回正',
        foot: '15.5 秒順著音樂快速轉一圈（來不及轉可原地攤手微蹲）',
        tip: '15.5 秒順著音樂快速轉一圈（來不及轉可原地攤手微蹲）'
      }
    ]
  },
  {
    id: 2,
    code: '02',
    name: '主歌一',
    timeRange: '0:16–0:33.5',
    start: 16.0,
    end: 33.5,
    eights: '8 個八拍',
    lyricCue: '♪ I messed up tonight',
    summaryRhyme: '斜指叉腰・平展舉手',
    easyTip: '腳步只需原地輕點，不要把點步做成後勾腿；記住口訣「左指 ➔ 右指 ➔ 兩側平展 ➔ 舉手收胸」就很整齊。',
    steps: [
      {
        id: '2-1',
        num: '①',
        start: 16.0,
        end: 21.0,
        playStart: 16.0,
        playEnd: 21.0,
        timeLabel: '0:16–0:21',
        counts: '第 1–2 個八拍',
        tag: '左手斜指',
        hand: '【左手】斜上伸直指天，【右手】插腰點步',
        foot: '畫面左邊舉手＝舉你的左手，腳原地輕點',
        tip: '畫面左邊舉手＝舉你的左手，腳原地輕點'
      },
      {
        id: '2-2',
        num: '②',
        start: 21.0,
        end: 25.5,
        playStart: 21.0,
        playEnd: 25.5,
        timeLabel: '0:21–0:25.5',
        counts: '第 3–4 個八拍',
        tag: '換右手斜指',
        hand: '換邊！【右手】斜上指天，【左手】插腰點步',
        foot: '指天的手打直伸長，全班一起換邊超整齊',
        tip: '指天的手打直伸長，全班一起換邊超整齊'
      },
      {
        id: '2-3',
        num: '③',
        start: 25.5,
        end: 29.5,
        playStart: 25.5,
        playEnd: 29.5,
        timeLabel: '0:25.5–0:29.5',
        counts: '第 5–6 個八拍',
        tag: '收胸平展雙臂',
        hand: '雙手收胸前點步 ➔ 雙臂向左右兩側大大平伸展開',
        foot: '手臂往兩側水平拉長，配合輕巧點步交換重心',
        tip: '手臂往兩側水平拉長，配合輕巧點步交換重心'
      },
      {
        id: '2-4',
        num: '④',
        start: 29.5,
        end: 33.5,
        playStart: 29.5,
        playEnd: 33.5,
        timeLabel: '0:29.5–0:33.5',
        counts: '第 7–8 個八拍',
        tag: '展臂舉手收胸',
        hand: '雙臂平展律動 ➔【右手】舉到耳旁、雙手收胸前預備',
        foot: '最後一拍雙手在胸前合攏，準備接間奏轉圈！',
        tip: '最後一拍雙手在胸前合攏，準備接間奏轉圈！'
      }
    ]
  },
  {
    id: 3,
    code: '03',
    name: '間奏一',
    timeRange: '0:33.5–0:49.7',
    start: 33.5,
    end: 49.7,
    eights: '4 個八拍（2 大組合）',
    lyricCue: "♪ Birds don't just fly",
    summaryRhyme: '合十轉圈搖擺・畫圓開花定格',
    easyTip: '原本 4 格精簡成 2 大連貫組合！轉圈會暈的同學可原地小碎步不轉圈，最後一拍準時跟大家一起雙手斜指。',
    steps: [
      {
        id: '3-1',
        num: '①',
        start: 33.5,
        end: 41.6,
        playStart: 33.5,
        playEnd: 41.6,
        timeLabel: '0:33.5–0:41.6',
        counts: '第 1–2 個八拍',
        tag: '合十左轉圈＋微蹲左右擺',
        hand: '雙手胸前合十往【左】轉一圈回正面 ➔ 微蹲合十於肚前左右搖擺',
        foot: '轉完圈不停頓直接蹲低左右擺，會頭暈可改原地小碎步',
        tip: '轉完圈不停頓直接蹲低左右擺，會頭暈可改原地小碎步'
      },
      {
        id: '3-2',
        num: '②',
        start: 41.6,
        end: 49.7,
        playStart: 41.6,
        playEnd: 49.7,
        timeLabel: '0:41.6–0:49.7',
        counts: '第 3–4 個八拍',
        tag: '畫圓大開花＋斜指定格',
        hand: '雙手由下往外畫大圓展開 ➔ 站直雙手一上一下斜向指天定格',
        foot: '順著音樂像開花一樣把雙手大大張開，定格迎接副歌一！',
        tip: '順著音樂像開花一樣把雙手大大張開，定格迎接副歌一！'
      }
    ]
  },
  {
    id: 4,
    code: '04',
    name: '副歌一',
    timeRange: '0:49.7–1:23',
    start: 49.7,
    end: 83.0,
    eights: '8 個八拍',
    lyricCue: "♪ I won't give up",
    summaryRhyme: '指天出拳・壓膝扭腰',
    easyTip: '這段換手最快，記住四個大招牌動作：「指天→出拳→壓大腿→叉腰扭臀」即可；壓膝是手掌按在大腿上，不是拍腿！',
    steps: [
      {
        id: '4-1',
        num: '①',
        start: 49.7,
        end: 58.5,
        playStart: 49.7,
        playEnd: 58.5,
        timeLabel: '0:49.7–0:58.5',
        counts: '第 1–2 個八拍',
        tag: '叉腰交替指天',
        hand: '【左手】斜指天＋右手插腰，左右交替換邊',
        foot: '副歌來了！手臂伸直大大指出去',
        tip: '副歌來了！手臂伸直大大指出去'
      },
      {
        id: '4-2',
        num: '②',
        start: 58.5,
        end: 66.8,
        playStart: 58.5,
        playEnd: 66.8,
        timeLabel: '0:58.5–1:06.8',
        counts: '第 3–4 個八拍',
        tag: '側轉連續出拳',
        hand: '身體微向【左轉】，【右手】往前連續擊拳',
        foot: '出拳要有力打直，結束轉回正面',
        tip: '出拳要有力打直，結束轉回正面'
      },
      {
        id: '4-3',
        num: '③',
        start: 66.8,
        end: 74.9,
        playStart: 66.8,
        playEnd: 74.9,
        timeLabel: '1:06.8–1:14.9',
        counts: '第 5–6 個八拍',
        tag: '開腳壓膝下沉',
        hand: '雙腳打開，雙掌穩穩「壓膝蓋」隨重拍下沉',
        foot: '手掌按在大腿上壓，絕對不要用力拍腿！',
        tip: '手掌按在大腿上壓，絕對不要用力拍腿！'
      },
      {
        id: '4-4',
        num: '④',
        start: 74.9,
        end: 83.0,
        playStart: 74.9,
        playEnd: 83.0,
        timeLabel: '1:14.9–1:23',
        counts: '第 7–8 個八拍',
        tag: '叉腰開心扭臀',
        hand: '站直雙手插腰，跟著音樂左右開心扭臀',
        foot: '順序超好記：指天 ➔ 出拳 ➔ 壓膝 ➔ 叉腰扭',
        tip: '順序超好記：指天 ➔ 出拳 ➔ 壓膝 ➔ 叉腰扭'
      }
    ]
  },
  {
    id: 5,
    code: '05',
    name: '主歌二（同前奏＋主歌一）',
    timeRange: '1:23–1:56.5',
    start: 83.0,
    end: 116.5,
    eights: '8 個八拍',
    lyricCue: "♪ Look how far you've come（🔁 前奏重跳一次 ＋ 主歌一重跳一次）",
    summaryRhyme: '🔁 前奏重跳一次 ＋ 主歌一重跳一次',
    easyTip: '這整段 100% 就是把「01 前奏」與「02 主歌一」原封不動再跳一次！完全不用記新動作！',
    steps: [
      {
        id: '5-1',
        num: '①',
        start: 83.0,
        end: 91.5,
        playStart: 83.0,
        playEnd: 91.5,
        timeLabel: '1:23–1:31.5',
        counts: '第 1–2 個八拍',
        tag: '🔁 同前奏①②：抱肩衝天×2',
        hand: '【前奏重跳】胸前交叉打開＋右拳衝天跳 ➔ 換左拳衝天跳',
        foot: '跟第 1 段前奏前半完全一樣！左右各做一次抱肩衝天',
        tip: '跟第 1 段前奏前半完全一樣！左右各做一次抱肩衝天'
      },
      {
        id: '5-2',
        num: '②',
        start: 91.5,
        end: 99.0,
        playStart: 91.5,
        playEnd: 99.0,
        timeLabel: '1:31.5–1:39',
        counts: '第 3–4 個八拍',
        tag: '🔁 同前奏③④：揮拳4次＋展臂',
        hand: '【前奏重跳】側身向天揮滿 4 拳 ➔ 回正面雙臂平展攤手',
        foot: '跟第 1 段前奏後半完全一樣！數滿 4 拳再轉回正面開手',
        tip: '跟第 1 段前奏後半完全一樣！數滿 4 拳再轉回正面開手'
      },
      {
        id: '5-3',
        num: '③',
        start: 99.0,
        end: 108.5,
        playStart: 99.0,
        playEnd: 108.5,
        timeLabel: '1:39–1:48.5',
        counts: '第 5–6 個八拍',
        tag: '🔁 同主歌一①②：左右斜指',
        hand: '【主歌一重跳】左手斜上指天（右手插腰）➔ 換右手斜上指天',
        foot: '跟第 2 段主歌一前半完全一樣！手臂打直配合原地輕點步',
        tip: '跟第 2 段主歌一前半完全一樣！手臂打直配合原地輕點步'
      },
      {
        id: '5-4',
        num: '④',
        start: 108.5,
        end: 116.5,
        playStart: 108.5,
        playEnd: 116.5,
        timeLabel: '1:48.5–1:56.5',
        counts: '第 7–8 個八拍',
        tag: '🔁 同主歌一③④：平展舉手',
        hand: '【主歌一重跳】收胸雙臂向兩側平展 ➔ 右手舉耳旁收胸預備',
        foot: '跟第 2 段主歌一後半完全一樣！跳完準備跨步進副歌二',
        tip: '跟第 2 段主歌一後半完全一樣！跳完準備跨步進副歌二'
      }
    ]
  },
  {
    id: 6,
    code: '06',
    name: '副歌二',
    timeRange: '1:56.5–2:29.5',
    start: 116.5,
    end: 149.5,
    eights: '8 個八拍',
    lyricCue: '♪ I want to try everything',
    summaryRhyme: '左跨舉手・後勾壓膝・插腰扭臀',
    easyTip: '「左跨步＋左後勾」會重複循環，後半段節奏同副歌一壓膝扭臀！單腳後勾若站不穩，改原地踏步＋舉手即可。',
    steps: [
      {
        id: '6-1',
        num: '①',
        start: 116.5,
        end: 125.0,
        playStart: 116.5,
        playEnd: 125.0,
        timeLabel: '1:56.5–2:05',
        counts: '第 1–2 個八拍',
        tag: '左跨舉左手',
        hand: '【左腳】往左大跨一步踩穩，【左手】高舉過頭、【右手】叉腰',
        foot: '手腳同一邊！左腳往左跨出去，左手就跟著舉高高',
        tip: '手腳同一邊！左腳往左跨出去，左手就跟著舉高高'
      },
      {
        id: '6-2',
        num: '②',
        start: 125.0,
        end: 133.5,
        playStart: 125.0,
        playEnd: 133.5,
        timeLabel: '2:05–2:13.5',
        counts: '第 3–4 個八拍',
        tag: '左後勾舉右手',
        hand: '【左腳跟】往屁股後面勾起，改舉【右手】過頭並交替循環',
        foot: '腳跟往「後面」勾，不是往前踢！會晃可縮小步幅',
        tip: '腳跟往「後面」勾，不是往前踢！會晃可縮小步幅'
      },
      {
        id: '6-3',
        num: '③',
        start: 133.5,
        end: 141.0,
        playStart: 133.5,
        playEnd: 141.0,
        timeLabel: '2:13.5–2:21',
        counts: '第 5–6 個八拍',
        tag: '側步收胸＋開腳壓膝',
        hand: '微側身點步出拳過渡 ➔ 雙腳打開、雙掌壓大腿隨重拍下沉',
        foot: '🔁 同副歌一第 ③ 格節奏！手掌按在大腿上下壓，不拍腿出聲',
        tip: '🔁 同副歌一第 ③ 格節奏！手掌按在大腿上下壓，不拍腿出聲'
      },
      {
        id: '6-4',
        num: '④',
        start: 141.0,
        end: 149.5,
        playStart: 141.0,
        playEnd: 149.5,
        timeLabel: '2:21–2:29.5',
        counts: '第 7–8 個八拍',
        tag: '舉手插腰開心扭臀',
        hand: '單手高舉過頭、另一手插腰左右開心扭臀 ➔ 最後架起雙肘',
        foot: '🔁 同副歌一第 ④ 格開心搖擺！最後一拍雙肘架高接橋段',
        tip: '🔁 同副歌一第 ④ 格開心搖擺！最後一拍雙肘架高接橋段'
      }
    ]
  },
  {
    id: 7,
    code: '07',
    name: '橋段',
    timeRange: '2:29.5–2:51.5',
    start: 149.5,
    end: 171.5,
    eights: '4 個八拍（2 大組合）',
    lyricCue: '♪ 重低音間奏段落',
    summaryRhyme: '大力水手叉跳・右轉彩虹跳',
    easyTip: '原本 4 格精簡成 2 大連貫組合！把「大力水手秀肌肉」手肘架高，畫完頭頂大彩虹後看向右邊接結尾。',
    steps: [
      {
        id: '7-1',
        num: '①',
        start: 149.5,
        end: 158.0,
        playStart: 149.5,
        playEnd: 158.0,
        timeLabel: '2:29.5–2:38',
        counts: '第 1–2 個八拍',
        tag: '大力水手＋胸前叉跳',
        hand: '雙肘架高握拳像大力水手上下彈動 ➔ 雙手胸前交叉搭原地小開合跳',
        foot: '手肘架到跟肩膀同高最有氣勢，小跳時膝蓋微彎護腳踝',
        tip: '手肘架到跟肩膀同高最有氣勢，小跳時膝蓋微彎護腳踝'
      },
      {
        id: '7-2',
        num: '②',
        start: 158.0,
        end: 171.5,
        playStart: 158.0,
        playEnd: 171.5,
        timeLabel: '2:38–2:51.5',
        counts: '第 3–4 個八拍',
        tag: '右轉彩虹＋臉前叉跳',
        hand: '身體右轉用【左手】頭頂畫大彩虹回正面 ➔ 雙手舉臉前交叉小跳 2 下',
        foot: '畫彩虹弧度要大、眼睛跟著手看，跳完眼神看向右方接結尾！',
        tip: '畫彩虹弧度要大、眼睛跟著手看，跳完眼神看向右方接結尾！'
      }
    ]
  },
  {
    id: 8,
    code: '08',
    name: '結尾',
    timeRange: '2:51.5–3:13',
    start: 171.5,
    end: 193.0,
    eights: '8 個八拍',
    lyricCue: '♪ Try everything（三次）',
    summaryRhyme: '左跨壓膝・開腳深蹲・定格微笑',
    easyTip: '注意結尾第 1 步是往「左邊」大跨弓箭步！最後 5 秒「左手指前方、右手叉腰微笑定格」全班一起木頭人不動到音樂結束！',
    steps: [
      {
        id: '8-1',
        num: '①',
        start: 171.5,
        end: 178.0,
        playStart: 171.5,
        playEnd: 178.0,
        timeLabel: '2:51.5–2:58',
        counts: '第 1–2 個八拍',
        tag: '左跨弓箭步畫圓壓膝',
        hand: '全班向【左】大跨成弓箭步低蹲，畫大圓後雙手穩扶【左腳】膝蓋',
        foot: '畫面往左邊跨＝跨你的【左腳】！踩穩低蹲壓左膝蓋',
        tip: '畫面往左邊跨＝跨你的【左腳】！踩穩低蹲壓左膝蓋'
      },
      {
        id: '8-2',
        num: '②',
        start: 178.0,
        end: 183.0,
        playStart: 178.0,
        playEnd: 183.0,
        timeLabel: '2:58–3:03',
        counts: '第 3–4 個八拍',
        tag: '回正開腳畫大圓',
        hand: '從左弓步轉回正面開腳站立，單手由下往外畫大圓圈展開',
        foot: '順著「Try Everything」歌聲轉回正面把雙手大大張開',
        tip: '順著「Try Everything」歌聲轉回正面把雙手大大張開'
      },
      {
        id: '8-3',
        num: '③',
        start: 183.0,
        end: 187.5,
        playStart: 183.0,
        playEnd: 187.5,
        timeLabel: '3:03–3:07.5',
        counts: '第 5–6 個八拍',
        tag: '正面深蹲壓膝＋站直',
        hand: '雙腳打開往下深蹲、雙手扶雙膝 ➔ 3:07 用力站直回正面',
        foot: '先蹲低扶膝蓄力，聽到最後重拍全班一起帥氣站直！',
        tip: '先蹲低扶膝蓄力，聽到最後重拍全班一起帥氣站直！'
      },
      {
        id: '8-4',
        num: '④',
        start: 187.5,
        end: 193.0,
        playStart: 187.5,
        playEnd: 193.0,
        timeLabel: '3:07.5–3:13',
        counts: '第 7–8 個八拍',
        tag: '左手指前微笑定格',
        hand: '【左手】伸直指向正前方觀眾、【右手】帥氣叉腰微笑定格',
        foot: '像木頭人一樣撐住完全不動，等音樂 3:13 全停才放手！',
        tip: '像木頭人一樣撐住完全不動，等音樂 3:13 全停才放手！'
      }
    ]
  }
];

const html = `<!DOCTYPE html>
<html lang="zh-Hant-TW">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Try Everything｜石門國小五年級運動會進場舞互動帶練系統</title>
  <style>
    /* ========================================================================
       V4 正式發布版：黏貼重疊緩衝＋上一動/下一動切換＋手機平板遠距大字版（系統無襯線字型，全離線執行）
       ======================================================================== */
    :root {
      --bg-base: #0b1120;
      --bg-surface: #111827;
      --bg-card: #1e293b;
      --bg-card-hover: #273549;
      --border-subtle: #334155;
      --border-bright: #475569;
      --text-main: #f8fafc;
      --text-muted: #cbd5e1;
      --text-dim: #94a3b8;
      --accent-amber: #fbbf24;
      --accent-amber-bg: rgba(251, 191, 36, 0.16);
      --accent-sky: #38bdf8;
      --accent-sky-bg: rgba(56, 189, 248, 0.16);
      --accent-emerald: #34d399;
      --accent-emerald-bg: rgba(52, 211, 153, 0.16);
      --accent-rose: #fb7185;
      --radius-lg: 14px;
      --radius-md: 10px;
      --radius-sm: 8px;
      --font-sans: system-ui, -apple-system, "Microsoft JhengHei", "PingFang TC", "Noto Sans TC", sans-serif;
    }

    * { box-sizing: border-box; }

    html, body {
      margin: 0;
      padding: 0;
      font-family: var(--font-sans);
      background-color: var(--bg-base);
      color: var(--text-main);
      line-height: 1.45;
      min-height: 100vh;
    }

    button {
      font-family: inherit;
      cursor: pointer;
      touch-action: manipulation;
      -webkit-tap-highlight-color: transparent;
    }

    button:focus-visible, a:focus-visible {
      outline: 3px solid var(--accent-amber);
      outline-offset: 2px;
    }

    /* 頂部標頭與鏡像鐵則 */
    .top-bar {
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
      border-bottom: 2px solid var(--border-subtle);
      padding: 10px 18px;
    }

    .top-inner {
      max-width: 1440px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .header-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }

    .header-actions {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
    }

    .brand-title {
      margin: 0;
      font-size: clamp(1.15rem, 2vw, 1.5rem);
      font-weight: 900;
      color: var(--text-main);
    }

    .mirror-rule-pill {
      display: inline-flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
      background: var(--accent-amber-bg);
      border: 1.5px solid var(--accent-amber);
      color: #fef3c7;
      padding: 5px 12px;
      border-radius: 999px;
      font-size: 0.94rem;
      font-weight: 700;
    }

    .mirror-rule-pill strong {
      color: var(--accent-amber);
    }

    .btn-zoom-mode {
      background: var(--accent-sky-bg);
      border: 1.5px solid var(--accent-sky);
      color: #e0f2fe;
      border-radius: 999px;
      padding: 6px 14px;
      font-size: 0.9rem;
      font-weight: 800;
      transition: all 0.14s ease;
    }
    .btn-zoom-mode:hover {
      background: rgba(56, 189, 248, 0.28);
    }
    .btn-zoom-mode.active {
      background: var(--accent-amber);
      border-color: #fef3c7;
      color: #0b1120;
    }

    .progress-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: #0f172a;
      border: 1.5px solid var(--accent-emerald);
      border-radius: 999px;
      padding: 5px 14px;
      font-size: 0.9rem;
      font-weight: 800;
      color: #d1fae5;
    }

    .btn-reset-tiny {
      background: transparent;
      border: 1px solid var(--border-bright);
      color: var(--text-dim);
      font-size: 0.76rem;
      border-radius: 999px;
      padding: 2px 8px;
    }
    .btn-reset-tiny:hover { color: var(--text-main); border-color: var(--text-muted); }

    /* 8 大段落＋全曲連跳快速切換列 */
    .section-nav {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .sec-tab {
      background: var(--bg-card);
      color: var(--text-muted);
      border: 1.5px solid var(--border-subtle);
      border-radius: var(--radius-sm);
      padding: 7px 11px;
      font-size: 0.92rem;
      font-weight: 800;
      transition: all 0.14s ease;
      display: inline-flex;
      align-items: center;
      gap: 5px;
    }

    .sec-tab:hover {
      background: var(--bg-card-hover);
      border-color: var(--accent-sky);
      color: var(--text-main);
    }

    .sec-tab.active {
      background: var(--accent-sky);
      color: #0b1120;
      border-color: #7dd3fc;
      box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.35);
    }

    .sec-tab.sec-done {
      border-color: var(--accent-emerald);
    }

    .sec-tab.full-song-btn {
      margin-left: auto;
      background: rgba(251, 191, 36, 0.14);
      border-color: var(--accent-amber);
      color: #fde68a;
    }
    .sec-tab.full-song-btn.active {
      background: var(--accent-amber);
      color: #0b1120;
    }

    /* 主雙欄工作台（免捲動同框對照＋支援 Zoom 放大模式） */
    .workspace {
      max-width: 1440px;
      margin: 0 auto;
      padding: 12px 18px 28px;
      display: grid;
      grid-template-columns: 1.02fr 1fr;
      gap: 16px;
      align-items: start;
    }

    body.zoom-mode .workspace {
      grid-template-columns: 1fr;
      max-width: 1120px;
    }

    @media (max-width: 1080px) {
      .workspace {
        grid-template-columns: 1fr;
        padding: 10px 12px 28px;
      }
      .sec-tab.full-song-btn { margin-left: 0; }
      /* 手機／直立平板自動置頂凍結影片區 */
      .sticky-player-wrap {
        position: sticky;
        top: 0;
        z-index: 40;
        background: var(--bg-surface);
        padding-bottom: 10px;
        border-bottom: 1.5px solid var(--border-bright);
      }
    }

    @media (max-width: 640px) {
      .sticky-player-wrap .video-box {
        max-height: 36vh;
      }
      .sticky-player-wrap .live-subtitle {
        padding: 8px 10px;
        min-height: 118px;
      }
    }

    .panel {
      background: var(--bg-surface);
      border: 1.5px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      padding: 14px;
    }

    /* 左欄：真人 MP4 影片＋雙行超大即時字幕＋三步帶練按鈕 */
    .video-box {
      position: relative;
      width: 100%;
      aspect-ratio: 16 / 9;
      background: #020617;
      border-radius: var(--radius-md);
      overflow: hidden;
      border: 2px solid var(--border-bright);
    }

    .video-loading-pill {
      position: absolute;
      top: 10px;
      right: 10px;
      z-index: 5;
      display: none;
      align-items: center;
      gap: 6px;
      background: rgba(15, 23, 42, 0.88);
      border: 1.5px solid var(--accent-sky);
      color: #e0f2fe;
      font-size: 0.85rem;
      font-weight: 800;
      padding: 5px 12px;
      border-radius: 999px;
      pointer-events: none;
    }
    .video-loading-pill.visible { display: inline-flex; }

    #dance-video {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: contain;
      background: #000;
    }

    .video-missing-alert {
      display: none;
      margin-top: 10px;
      background: rgba(251, 113, 133, 0.16);
      border: 1.5px solid var(--accent-rose);
      border-radius: var(--radius-sm);
      padding: 10px 12px;
      font-size: 0.92rem;
      color: #ffe4e6;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 8px;
    }
    .video-missing-alert.visible { display: flex; }

    /* 影片下方大字即時口令字幕卡（看影片時餘光即可瞄到） */
    .live-subtitle {
      margin-top: 10px;
      background: linear-gradient(90deg, rgba(251, 191, 36, 0.14), rgba(15, 23, 42, 0.96));
      border: 2px solid rgba(251, 191, 36, 0.75);
      border-left: 6px solid var(--accent-amber);
      border-radius: var(--radius-md);
      padding: 12px 14px;
      box-shadow: 0 4px 14px rgba(2, 6, 23, 0.45);
    }

    .live-sub-top {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }

    .live-sub-tag {
      font-size: clamp(1.38rem, 2.5vw, 1.9rem);
      font-weight: 900;
      color: var(--accent-amber);
      line-height: 1.2;
    }

    body.zoom-mode .live-sub-tag {
      font-size: clamp(1.68rem, 3.1vw, 2.35rem);
    }

    .live-sub-meta-right {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
    }

    .live-buffer-badge {
      background: rgba(52, 211, 153, 0.16);
      border: 1px solid var(--accent-emerald);
      color: #a7f3d0;
      font-size: 0.8rem;
      font-weight: 800;
      padding: 2px 9px;
      border-radius: 999px;
    }

    .live-sub-time {
      font-variant-numeric: tabular-nums;
      font-size: 0.95rem;
      font-weight: 800;
      color: var(--accent-sky);
    }

    .live-sub-detail {
      margin-top: 9px;
      font-size: clamp(1.12rem, 1.9vw, 1.38rem);
      font-weight: 800;
      color: var(--text-main);
      line-height: 1.48;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    body.zoom-mode .live-sub-detail {
      font-size: clamp(1.26rem, 2.3vw, 1.62rem);
    }

    .live-cue-row {
      display: flex;
      align-items: baseline;
      gap: 8px;
    }

    .live-cue-tip {
      font-size: 0.92em;
      color: #fde68a;
      font-weight: 700;
    }

    .live-cue-badge {
      display: inline-block;
      min-width: 78px;
      text-align: center;
      font-size: 0.85em;
      font-weight: 900;
      color: #0b1120;
      background: var(--accent-sky);
      padding: 2px 8px;
      border-radius: 6px;
      flex-shrink: 0;
    }

    .live-cue-badge-tip {
      background: var(--accent-amber);
    }

    /* 原速過關鼓勵橫幅 */
    .challenge-banner {
      display: none;
      margin-top: 10px;
      background: rgba(52, 211, 153, 0.18);
      border: 2px solid var(--accent-emerald);
      border-radius: var(--radius-md);
      padding: 12px 14px;
      flex-direction: column;
      gap: 8px;
    }
    .challenge-banner.visible { display: flex; }

    .challenge-title {
      font-size: 1.15rem;
      font-weight: 900;
      color: #a7f3d0;
    }

    .challenge-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    /* 三步傻瓜帶練按鈕組 */
    .coach-modes {
      margin-top: 12px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
    }

    @media (max-width: 640px) {
      .coach-modes { grid-template-columns: 1fr; }
    }

    .mode-btn {
      background: var(--bg-card);
      color: var(--text-main);
      border: 2px solid var(--border-bright);
      border-radius: var(--radius-md);
      padding: 10px 10px;
      text-align: left;
      transition: all 0.14s ease;
    }

    .mode-btn:hover {
      background: var(--bg-card-hover);
      border-color: var(--accent-sky);
    }

    .mode-btn.active {
      background: var(--accent-sky-bg);
      border-color: var(--accent-sky);
      box-shadow: 0 0 0 1px var(--accent-sky);
    }

    .mode-btn-title {
      display: block;
      font-size: 0.98rem;
      font-weight: 900;
      color: var(--text-main);
    }

    .mode-btn-sub {
      display: block;
      margin-top: 3px;
      font-size: 0.82rem;
      font-weight: 600;
      color: var(--text-muted);
    }

    /* 黏貼重疊緩衝說明橫幅 */
    .overlap-note {
      margin-top: 10px;
      background: rgba(251, 191, 36, 0.1);
      border: 1.5px solid rgba(251, 191, 36, 0.6);
      border-radius: var(--radius-sm);
      padding: 9px 12px;
      font-size: 0.88rem;
      line-height: 1.48;
      color: #fef3c7;
    }
    .overlap-note strong {
      color: var(--accent-amber);
    }

    /* 基礎播放控制列 */
    .basic-controls {
      margin-top: 10px;
      padding-top: 10px;
      border-top: 1px solid var(--border-subtle);
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }

    .ctrl-group {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 6px;
    }

    .btn-primary {
      background: #0284c7;
      border: 2px solid #38bdf8;
      color: #fff;
      font-size: 1rem;
      font-weight: 900;
      padding: 8px 18px;
      border-radius: var(--radius-sm);
    }
    .btn-primary:hover { background: #0369a1; }

    .btn-sec {
      background: var(--bg-card);
      border: 1.5px solid var(--border-bright);
      color: var(--text-main);
      font-size: 0.92rem;
      font-weight: 800;
      padding: 7px 12px;
      border-radius: var(--radius-sm);
    }
    .btn-sec:hover { border-color: var(--accent-sky); background: var(--bg-card-hover); }
    .btn-sec.active {
      background: var(--accent-amber);
      color: #0b1120;
      border-color: #fde68a;
    }

    .btn-emerald {
      background: var(--accent-emerald);
      border: 2px solid #6ee7b7;
      color: #064e3b;
      font-size: 0.95rem;
      font-weight: 900;
      padding: 8px 14px;
      border-radius: var(--radius-sm);
    }
    .btn-emerald:hover { background: #10b981; }

    .quick-tip-bar {
      margin-top: 10px;
      font-size: 0.86rem;
      color: var(--text-muted);
      background: rgba(56, 189, 248, 0.08);
      border-radius: var(--radius-sm);
      padding: 8px 10px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
    }

    .quick-tip-bar a { color: var(--accent-sky); font-weight: 700; }

    /* 右欄：當前段落四格連環真人動作卡 */
    .right-header {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      padding-bottom: 10px;
      border-bottom: 1px solid var(--border-subtle);
    }

    .sec-heading {
      margin: 0;
      font-size: 1.3rem;
      font-weight: 900;
      color: var(--text-main);
    }

    .sec-meta-line {
      margin-top: 3px;
      font-size: 0.92rem;
      font-weight: 700;
      color: var(--accent-sky);
    }

    .btn-mark-done {
      background: var(--bg-card);
      border: 1.5px solid var(--border-bright);
      color: var(--text-main);
      padding: 7px 14px;
      border-radius: 999px;
      font-size: 0.92rem;
      font-weight: 800;
    }
    .btn-mark-done.checked {
      background: var(--accent-emerald);
      color: #064e3b;
      border-color: #a7f3d0;
    }

    /* 2x2 四格真人連環圖（平板／手機字體全面放大） */
    .steps-grid-2x2 {
      margin-top: 12px;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }

    @media (max-width: 640px) {
      .steps-grid-2x2 { grid-template-columns: 1fr; }
    }

    .step-card {
      background: var(--bg-card);
      border: 2px solid var(--border-subtle);
      border-radius: var(--radius-md);
      overflow: hidden;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      transition: transform 0.14s ease, border-color 0.14s ease, box-shadow 0.14s ease;
      touch-action: manipulation;
      -webkit-tap-highlight-color: transparent;
    }

    .step-card:hover {
      border-color: var(--accent-sky);
      transform: translateY(-2px);
    }

    .step-card.active-step {
      border-color: var(--accent-amber);
      background: #273244;
      box-shadow: 0 0 0 2px rgba(251, 191, 36, 0.45);
    }

    .step-card-top {
      padding: 7px 10px;
      background: #0f172a;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 6px;
      font-size: 0.88rem;
      font-weight: 800;
    }

    .step-num-badge {
      color: var(--accent-sky);
    }

    .step-live-badge {
      display: none;
      background: var(--accent-amber);
      color: #0b1120;
      padding: 2px 9px;
      border-radius: 999px;
      font-size: 0.8rem;
      font-weight: 900;
    }
    .step-card.active-step .step-live-badge { display: inline-block; }

    .step-img-wrap {
      position: relative;
      background: #020617;
    }

    .step-img-wrap img {
      width: 100%;
      aspect-ratio: 420 / 260;
      object-fit: cover;
      display: block;
    }

    .mirror-axis {
      background: #0b1120;
      color: #fde68a;
      font-size: 0.8rem;
      font-weight: 800;
      padding: 4px 8px;
      display: flex;
      justify-content: space-between;
      border-top: 1px solid var(--border-subtle);
      border-bottom: 1px solid var(--border-subtle);
    }

    .step-body {
      padding: 11px 12px 12px;
      display: flex;
      flex-direction: column;
      gap: 6px;
      flex: 1;
    }

    .step-tag-title {
      font-size: 1.32rem;
      font-weight: 900;
      color: var(--accent-amber);
      margin-bottom: 4px;
    }

    .cue-line {
      font-size: 1.12rem;
      font-weight: 800;
      color: var(--text-main);
      line-height: 1.48;
    }

    body.zoom-mode .cue-line {
      font-size: 1.22rem;
    }

    .cue-label {
      font-weight: 900;
      color: var(--accent-sky);
    }

    .cue-line.tip-line {
      color: #fde68a;
      font-size: 1.02rem;
      font-weight: 700;
      margin-top: 4px;
      padding-top: 6px;
      border-top: 1px dashed var(--border-subtle);
    }

    body.zoom-mode .cue-line.tip-line {
      font-size: 1.12rem;
    }

    .step-click-hint {
      margin-top: 4px;
      font-size: 0.84rem;
      font-weight: 800;
      color: #7dd3fc;
    }

    .easy-tip-card {
      margin-top: 12px;
      background: rgba(52, 211, 153, 0.12);
      border-left: 5px solid var(--accent-emerald);
      border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
      padding: 10px 14px;
      font-size: 0.96rem;
      line-height: 1.5;
      color: #d1fae5;
    }

    .site-footer {
      border-top: 1px solid var(--border-subtle);
      background: var(--bg-surface);
      padding: 14px 18px 20px;
      text-align: center;
      font-size: 0.9rem;
      color: var(--text-dim);
    }

    .footer-inner {
      max-width: 1440px;
      margin: 0 auto;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }

    .footer-sep { color: var(--border-bright); }
    .footer-ver { color: var(--text-muted); font-weight: 700; }
    .footer-author { color: var(--accent-amber); font-weight: 900; }
    .footer-sheet-link { color: var(--accent-sky); font-weight: 700; text-decoration: underline; }
    .footer-sheet-link:hover { color: #7dd3fc; }

    /* 無障礙懸浮「回到最頂端」按鈕（手機／平板／電腦下滑自動浮現） */
    .btn-back-to-top {
      position: fixed;
      right: 16px;
      bottom: 20px;
      z-index: 60;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      background: #0284c7;
      border: 2px solid #7dd3fc;
      color: #ffffff;
      font-size: 0.96rem;
      font-weight: 900;
      padding: 10px 15px;
      border-radius: 999px;
      box-shadow: 0 8px 22px rgba(2, 6, 23, 0.65);
      opacity: 0;
      transform: translateY(12px);
      pointer-events: none;
      transition: opacity 0.2s ease, transform 0.2s ease, background 0.15s ease;
    }
    .btn-back-to-top.visible,
    .btn-back-to-top:focus-visible {
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    }
    .btn-back-to-top:hover {
      background: #0369a1;
      border-color: var(--accent-amber);
    }
    @media (max-width: 640px) {
      .btn-back-to-top {
        right: 12px;
        bottom: 14px;
        font-size: 0.92rem;
        padding: 9px 13px;
      }
    }
  </style>
</head>
<body>
  <header class="top-bar">
    <div class="top-inner">
      <div class="header-row">
        <h1 class="brand-title">Try Everything｜五年級運動會進場舞互動帶練系統</h1>
        <div class="mirror-rule-pill">
          🪞 <strong>照鏡子直接跟跳：</strong>螢幕左邊動 ＝ 你的【左手 / 左腳】｜螢幕右邊動 ＝ 你的【右手 / 右腳】
        </div>
        <div class="header-actions">
          <button type="button" id="btn-zoom-mode" class="btn-zoom-mode">🔍 放大影片／手機平板大字模式：關閉</button>
          <div class="progress-pill">
            <span>進度：已學會 <strong id="done-count">0</strong> / 8 段</span>
            <button type="button" id="btn-reset-progress" class="btn-reset-tiny" title="清除學習紀錄">重設</button>
          </div>
        </div>
      </div>
      <nav id="section-nav" class="section-nav" aria-label="舞蹈八大段落選單"></nav>
    </div>
  </header>

  <main class="workspace">
    <!-- 左欄：真人原片 MP4 播放器（手機／直立平板自動置頂凍結）＋ 三步帶練按鈕 -->
    <section class="panel" aria-label="教學影片與帶練控制台">
      <div class="sticky-player-wrap">
        <div class="video-box">
          <video id="dance-video" src="Try_Everything_鏡面教學原片.mp4" poster="${keyframes['1-1'] || ''}" playsinline preload="auto" controls></video>
          <div id="video-loading-pill" class="video-loading-pill">⏳ 影片載入緩衝中…</div>
        </div>

        <div id="video-missing-alert" class="video-missing-alert">
          <span>⚠️ 找不到同目錄影片檔「Try_Everything_鏡面教學原片.mp4」，請手動選取電腦中的 MP4 檔：</span>
          <button type="button" id="btn-pick-video-alert" class="btn-sec">📂 選擇影片檔</button>
        </div>
        <input type="file" id="file-video-input" accept="video/mp4,video/*" style="display:none" />

        <!-- 影片下方雙行大字即時字幕卡（🎯 動作短口令 ＋ 💡 提醒） -->
        <div class="live-subtitle" aria-live="polite">
          <div class="live-sub-top">
            <span id="live-sub-tag" class="live-sub-tag">動作 ①【交叉抱肩＋右拳衝天】</span>
            <div class="live-sub-meta-right">
              <span id="live-buffer-badge" class="live-buffer-badge">🔄 段尾含 0.25 秒收尾微緩衝</span>
              <span id="live-sub-time" class="live-sub-time">0:00 ｜ 第 1 個八拍</span>
            </div>
          </div>
          <div id="live-sub-detail" class="live-sub-detail">
            <div class="live-cue-row"><span class="live-cue-badge">🎯 動作</span><span id="live-sub-hand">雙手胸前交叉抱肩打開 ➔【右手】高舉衝天小跳</span></div>
            <div class="live-cue-row live-cue-tip"><span class="live-cue-badge live-cue-badge-tip">💡 提醒</span><span id="live-sub-foot">先胸前交叉開展，接著右手用力往天空衝拳跳！</span></div>
          </div>
        </div>

        <!-- 基礎控制列（置於凍結區內，手機下滑時隨影片一起停在頂部） -->
        <div class="basic-controls">
          <div class="ctrl-group">
            <button type="button" id="btn-toggle-play" class="btn-primary">▶ 開始播放</button>
            <button type="button" id="btn-replay" class="btn-sec">🔄 重頭播</button>
            <button type="button" id="btn-prev-step" class="btn-sec" title="切到上一個分解動作（快捷鍵 ←）">⏮ 上一動</button>
            <button type="button" id="btn-next-step" class="btn-sec" title="切到下一個分解動作（快捷鍵 →）">下一動 ⏭</button>
          </div>
          <div class="ctrl-group" aria-label="播放速度調整">
            <span style="font-size:0.86rem;color:var(--text-dim);font-weight:700;">速度：</span>
            <button type="button" class="btn-sec speed-btn" data-speed="0.6">0.6倍 超慢</button>
            <button type="button" class="btn-sec speed-btn active" data-speed="0.75">0.75倍 慢速</button>
            <button type="button" class="btn-sec speed-btn" data-speed="1">1.0倍 原速</button>
          </div>
        </div>
      </div>

      <!-- 原速挑戰過關鼓勵列 -->
      <div id="challenge-banner" class="challenge-banner" aria-live="polite">
        <div id="challenge-title" class="challenge-title">🎉 太棒了！完成本段原速挑戰！</div>
        <div class="challenge-actions">
          <button type="button" id="btn-challenge-retry" class="btn-sec">🔄 再跳一次</button>
          <button type="button" id="btn-challenge-next" class="btn-emerald">✅ 我學會這段了！前往下一段 ➔</button>
        </div>
      </div>

      <!-- 三大闖關帶練按鈕 -->
      <div class="coach-modes" aria-label="帶練步驟按鈕">
        <button type="button" class="mode-btn" data-mode="step">
          <span class="mode-btn-title">🐢 第一步：慢速練這 1 格</span>
          <span class="mode-btn-sub">0.6倍速・精準切點＋結尾定格重播</span>
        </button>
        <button type="button" class="mode-btn active" data-mode="section">
          <span class="mode-btn-title">🚶 第二步：慢速連跳這整段</span>
          <span class="mode-btn-sub">0.75倍速・整段無限循環帶練</span>
        </button>
        <button type="button" class="mode-btn" data-mode="challenge">
          <span class="mode-btn-title">🏃 第三步：原速過關挑戰</span>
          <span class="mode-btn-sub">1.0倍速・播完本段自動停住</span>
        </button>
      </div>

      <!-- 精準切點＋結尾定格說明橫幅 -->
      <div id="overlap-note" class="overlap-note">
        🎯 <strong>精準切點不搶拍 ＋ 結尾定格 0.35 秒：</strong><br />
        每個分解動作皆依實際八拍時間點精準起停，並於收尾時短暫定格 0.35 秒看清結束姿勢再重播，絕不突然切斷或偷播到下一動！
      </div>

      <div class="quick-tip-bar">
        <span>💡 <strong>自練秘訣：</strong>先看右邊照片擺姿勢 ➔ 點【第二步】慢速跟跳（哪格卡住就直接點那張照片！）</span>
        <span>
          <button type="button" id="btn-pick-video-small" style="background:none;border:0;color:var(--accent-sky);font-weight:700;padding:0;text-decoration:underline;">📂 換影片</button>
          ｜ <a href="https://www.youtube.com/watch?v=qwn-TiC8utA" target="_blank" rel="noopener noreferrer">YouTube 原片 ↗</a>
        </span>
      </div>
    </section>

    <!-- 右欄：本段真人連環分解圖 -->
    <section class="panel" aria-label="目前段落分解動作">
      <div class="right-header">
        <div>
          <h2 id="sec-heading" class="sec-heading">第 1 段：前奏 (0:00–0:16)</h2>
          <div id="sec-meta-line" class="sec-meta-line">4 個八拍｜好記口訣：抱肩衝天・揮拳轉身｜♪ Welcome to Zootopia</div>
        </div>
        <button type="button" id="btn-mark-section" class="btn-mark-done">⬜ 這段我學會了</button>
      </div>

      <div id="steps-grid-2x2" class="steps-grid-2x2"></div>

      <div id="easy-tip-card" class="easy-tip-card">
        <strong>🌱 慢半拍沒關係（保底動作）：</strong><span id="easy-tip-text"></span>
      </div>
    </section>
  </main>

  <footer id="site-footer" class="site-footer" aria-label="系統版本與作者資訊">
    <div class="footer-inner">
      <span>石門國小五年級運動會進場舞互動帶練系統</span>
      <span class="footer-sep">｜</span>
      <span id="footer-version" class="footer-ver">Version 4.04 (V4.04)</span>
      <span class="footer-sep">｜</span>
      <strong id="footer-author" class="footer-author">Made by SENNA</strong>
      <span class="footer-sep">｜</span>
      <a href="../04_學習單與評量/Try_Everything_運動會進場舞_八拍口訣與自練檢核單.html" target="_blank" rel="noopener noreferrer" class="footer-sheet-link">📄 A4 八拍口訣與自練檢核單 ↗</a>
    </div>
  </footer>

  <button type="button" id="btn-back-to-top" class="btn-back-to-top" aria-label="回到網頁最頂端" title="回到網頁最頂端">⬆ 回到頂端</button>

  <script>
    // =========================================================================
    // 1. 內嵌資料：28 張真實舞者截圖 Base64 與全曲 8 段 × 28 小步（V4.04 精準校準）
    // =========================================================================
    const KEYFRAMES = ${JSON.stringify(keyframes)};
    const DANCE_SECTIONS = ${JSON.stringify(danceData)};

    const ALL_STEPS = [];
    DANCE_SECTIONS.forEach((sec) => {
      sec.steps.forEach((st) => {
        ALL_STEPS.push({
          ...st,
          sectionId: sec.id,
          sectionCode: sec.code,
          sectionName: sec.name,
          sectionStart: sec.start,
          sectionEnd: sec.end
        });
      });
    });

    // =========================================================================
    // 2. 狀態管理與本機學會進度（以「段」為單位打勾，小五生最有成就感）
    // =========================================================================
    const STORAGE_KEY = 'shimen_g5_try_everything_v2_sections';
    let learnedSections = new Set();
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      if (Array.isArray(saved)) learnedSections = new Set(saved);
    } catch (e) {}

    const state = {
      activeSectionId: 1,
      activeStepId: '1-1',
      practiceMode: 'section', // 'step' | 'section' | 'challenge' | 'all'
      playbackRate: 0.75,
      zoomMode: false,
      isHoldingEnd: false,
      lastSeekAt: 0,
      pendingSeekTime: null,
      pendingAutoPlay: false,
      isBuffering: false
    };

    const SEC_POST_BUFFER = 0.25;

    let audioCtx = null;
    let holdTimer = null;

    // V4.02：單步練習直接採用精準校準之 playStart / playEnd 端點（配合結尾定格 350ms）
    function getStepPlaybackBounds(st) {
      const start = (typeof st.playStart === 'number') ? st.playStart : st.start;
      const end = (typeof st.playEnd === 'number') ? st.playEnd : st.end;
      return {
        start: Math.max(0, Number(start.toFixed(2))),
        end: Math.min(193, Number(end.toFixed(2)))
      };
    }

    function getSectionPlaybackBounds(sec) {
      return {
        start: sec.start,
        end: Math.min(193, Number((sec.end + SEC_POST_BUFFER).toFixed(2)))
      };
    }

    function cancelHoldTimer() {
      if (holdTimer) {
        clearTimeout(holdTimer);
        holdTimer = null;
      }
      state.isHoldingEnd = false;
    }

    // =========================================================================
    // 3. Web Audio API 原生點擊與過關音效（無外部 MP3 依賴）
    // =========================================================================
    function ensureAudioCtx() {
      if (!audioCtx) {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        if (Ctx) audioCtx = new Ctx();
      }
      if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume().catch(() => {});
      }
      return audioCtx;
    }

    function playClickSound() {
      const ctx = ensureAudioCtx();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(660, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.065);
    }

    function playSuccessFanfare() {
      const ctx = ensureAudioCtx();
      if (!ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, i) => {
        const t = ctx.currentTime + i * 0.09;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.12, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.24);
      });
    }

    // =========================================================================
    // 4. DOM 快取與查詢小幫手
    // =========================================================================
    const video = document.getElementById('dance-video');
    const elSectionNav = document.getElementById('section-nav');
    const elDoneCount = document.getElementById('done-count');
    const elSecHeading = document.getElementById('sec-heading');
    const elSecMeta = document.getElementById('sec-meta-line');
    const elMarkBtn = document.getElementById('btn-mark-section');
    const elStepsGrid = document.getElementById('steps-grid-2x2');
    const elEasyTipText = document.getElementById('easy-tip-text');

    const elLiveTag = document.getElementById('live-sub-tag');
    const elLiveTime = document.getElementById('live-sub-time');
    const elLiveBufferBadge = document.getElementById('live-buffer-badge');
    const elLiveHand = document.getElementById('live-sub-hand');
    const elLiveFoot = document.getElementById('live-sub-foot');
    const elZoomBtn = document.getElementById('btn-zoom-mode');
    const elPrevStep = document.getElementById('btn-prev-step');
    const elNextStep = document.getElementById('btn-next-step');
    const elLoadingPill = document.getElementById('video-loading-pill');
    const elBackToTop = document.getElementById('btn-back-to-top');

    const elChallengeBanner = document.getElementById('challenge-banner');
    const elChallengeTitle = document.getElementById('challenge-title');
    const elChallengeNext = document.getElementById('btn-challenge-next');
    const elMissingAlert = document.getElementById('video-missing-alert');
    const elFileInput = document.getElementById('file-video-input');
    const elTogglePlay = document.getElementById('btn-toggle-play');

    function getActiveSection() {
      return DANCE_SECTIONS.find((s) => s.id === state.activeSectionId) || DANCE_SECTIONS[0];
    }

    function getActiveStep() {
      return ALL_STEPS.find((st) => st.id === state.activeStepId) || ALL_STEPS[0];
    }

    function formatClock(sec) {
      const s = Math.max(0, Math.floor(sec));
      return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
    }

    // =========================================================================
    // 5. 畫面渲染函式
    // =========================================================================
    function renderSectionNav() {
      let htmlNav = '';
      DANCE_SECTIONS.forEach((sec) => {
        const isActive = state.practiceMode !== 'all' && state.activeSectionId === sec.id;
        const isDone = learnedSections.has(sec.id);
        htmlNav += '<button type="button" class="sec-tab ' +
          (isActive ? 'active ' : '') +
          (isDone ? 'sec-done' : '') +
          '" data-sec-id="' + sec.id + '">' +
          (isDone ? '✅ ' : '') + '第' + sec.id + '段 ' + sec.name +
          '</button>';
      });
      htmlNav += '<button type="button" class="sec-tab full-song-btn ' +
        (state.practiceMode === 'all' ? 'active' : '') +
        '" data-sec-id="all">🏆 全曲連跳</button>';
      elSectionNav.innerHTML = htmlNav;
      elDoneCount.textContent = String(learnedSections.size);
    }

    function renderRightSection() {
      const sec = getActiveSection();
      const isDone = learnedSections.has(sec.id);

      elSecHeading.textContent = '第 ' + sec.id + ' 段：' + sec.name + ' (' + sec.timeRange + ')';
      elSecMeta.textContent = sec.eights + '｜好記口訣：' + sec.summaryRhyme + '｜' + sec.lyricCue;
      elEasyTipText.textContent = sec.easyTip;

      elMarkBtn.classList.toggle('checked', isDone);
      elMarkBtn.textContent = isDone ? '✅ 這段已學會' : '⬜ 這段我學會了';

      let cardsHtml = '';
      sec.steps.forEach((st) => {
        const isActive = st.id === state.activeStepId;
        cardsHtml += '<div class="step-card ' + (isActive ? 'active-step' : '') +
          '" data-step-id="' + st.id + '" tabindex="0" role="button" aria-label="練習動作 ' + st.num + ' ' + st.tag + '">' +
          '<div class="step-card-top">' +
            '<span class="step-num-badge">動作 ' + st.num + '（' + st.timeLabel + '｜' + st.counts + '）</span>' +
            '<span class="step-live-badge">👉 現在跳這格</span>' +
          '</div>' +
          '<div class="step-img-wrap">' +
            '<img src="' + (KEYFRAMES[st.id] || '') + '" alt="動作 ' + st.num + ' ' + st.tag + ' 示範照片" />' +
          '</div>' +
          '<div class="mirror-axis"><span>👈 畫面左＝你的左側</span><span>畫面右＝你的右側 👉</span></div>' +
          '<div class="step-body">' +
            '<div class="step-tag-title">【' + st.tag + '】</div>' +
            '<div class="cue-line"><span class="cue-label">🎯 動作：</span>' + st.hand + '</div>' +
            '<div class="cue-line tip-line"><span class="cue-label">💡 提醒：</span>' + st.foot + '</div>' +
            '<div class="step-click-hint">👆 點這張照片 ➔ 慢速單獨重播這 1 格</div>' +
          '</div>' +
        '</div>';
      });
      elStepsGrid.innerHTML = cardsHtml;
    }

    function setTextIfChanged(el, text) {
      if (el && el.textContent !== text) el.textContent = text;
    }

    function updateSubtitleBar(secTime) {
      const st = getActiveStep();
      setTextIfChanged(elLiveTag, '動作 ' + st.num + '【' + st.tag + '】');
      setTextIfChanged(elLiveTime, formatClock(secTime) + ' ｜ ' + st.counts);
      setTextIfChanged(elLiveHand, st.hand);
      setTextIfChanged(elLiveFoot, st.foot);
      if (elLiveBufferBadge) {
        if (state.practiceMode === 'step') {
          if (elLiveBufferBadge.style.display !== 'inline-flex') elLiveBufferBadge.style.display = 'inline-flex';
          setTextIfChanged(elLiveBufferBadge, '⏱ 單步精準切點＋結尾定格 0.35 秒');
        } else if (state.practiceMode === 'section' || state.practiceMode === 'challenge') {
          if (elLiveBufferBadge.style.display !== 'inline-flex') elLiveBufferBadge.style.display = 'inline-flex';
          setTextIfChanged(elLiveBufferBadge, '🔄 段尾含 0.25 秒收尾微緩衝');
        } else if (elLiveBufferBadge.style.display !== 'none') {
          elLiveBufferBadge.style.display = 'none';
        }
      }
    }

    function syncControlButtonsUI() {
      document.querySelectorAll('.mode-btn').forEach((btn) => {
        btn.classList.toggle('active', btn.getAttribute('data-mode') === state.practiceMode);
      });
      document.querySelectorAll('.speed-btn').forEach((btn) => {
        btn.classList.toggle('active', Math.abs(Number(btn.getAttribute('data-speed')) - state.playbackRate) < 0.05);
      });
      elTogglePlay.textContent = (video.paused && !state.isHoldingEnd) ? '▶ 開始播放' : '⏸ 暫停播放';
      if (elZoomBtn) {
        elZoomBtn.classList.toggle('active', state.zoomMode);
        elZoomBtn.textContent = state.zoomMode
          ? '🔍 放大影片／手機平板大字模式：開啟'
          : '🔍 放大影片／手機平板大字模式：關閉';
      }
    }

    function syncActiveStepHighlight() {
      document.querySelectorAll('.step-card').forEach((card) => {
        card.classList.toggle('active-step', card.getAttribute('data-step-id') === state.activeStepId);
      });
    }

    // =========================================================================
    // 6. 影片播放與三模式控制引擎
    // =========================================================================
    function applyPendingSeekIfNeeded() {
      if (state.pendingSeekTime === null) return false;
      if (typeof video.readyState === 'number' && video.readyState < 1) return false;
      const target = state.pendingSeekTime;
      const autoPlay = state.pendingAutoPlay;
      state.pendingSeekTime = null;
      state.pendingAutoPlay = false;
      state.lastSeekAt = Date.now();
      try {
        video.playbackRate = state.playbackRate;
        video.currentTime = target;
      } catch (e) {}
      if (autoPlay && video.paused) {
        const p = video.play();
        if (p && typeof p.catch === 'function') p.catch(() => {});
      }
      syncControlButtonsUI();
      return true;
    }

    function seekVideoTo(sec, shouldPlay) {
      cancelHoldTimer();
      state.lastSeekAt = Date.now();
      try {
        video.playbackRate = state.playbackRate;
      } catch (e) {}

      // 若手機瀏覽器尚未載入影片 metadata (readyState === 0)，先排入佇列避免從 0:00 誤播第 1 段
      if (typeof video.readyState === 'number' && video.readyState < 1) {
        state.pendingSeekTime = sec;
        state.pendingAutoPlay = Boolean(shouldPlay);
        try {
          video.currentTime = sec;
        } catch (e) {}
        if (shouldPlay) {
          const p = video.play();
          if (p && typeof p.catch === 'function') p.catch(() => {});
        } else if (typeof video.load === 'function') {
          try { video.load(); } catch (e) {}
        }
        syncControlButtonsUI();
        return;
      }

      state.pendingSeekTime = null;
      state.pendingAutoPlay = false;
      try {
        video.currentTime = sec;
      } catch (e) {
        state.pendingSeekTime = sec;
        state.pendingAutoPlay = Boolean(shouldPlay);
      }
      if (shouldPlay) {
        const p = video.play();
        if (p && typeof p.catch === 'function') p.catch(() => {});
      }
      syncControlButtonsUI();
    }

    function setSpeed(rate) {
      state.playbackRate = rate;
      try { video.playbackRate = rate; } catch (e) {}
      syncControlButtonsUI();
    }

    function selectSection(secId, autoPlay) {
      cancelHoldTimer();
      elChallengeBanner.classList.remove('visible');
      state.activeSectionId = secId;
      const sec = getActiveSection();
      state.activeStepId = sec.steps[0].id;
      if (state.practiceMode === 'all' || state.practiceMode === 'step') {
        state.practiceMode = 'section';
        state.playbackRate = 0.75;
      }
      renderSectionNav();
      renderRightSection();
      updateSubtitleBar(sec.start);
      seekVideoTo(sec.start, autoPlay);
    }

    function selectFullSong(autoPlay) {
      cancelHoldTimer();
      elChallengeBanner.classList.remove('visible');
      state.practiceMode = 'all';
      state.playbackRate = 1.0;
      state.activeSectionId = 1;
      state.activeStepId = '1-1';
      renderSectionNav();
      renderRightSection();
      updateSubtitleBar(0);
      seekVideoTo(0, autoPlay);
    }

    function selectSingleStep(stepId, autoPlay) {
      cancelHoldTimer();
      elChallengeBanner.classList.remove('visible');
      const st = ALL_STEPS.find((item) => item.id === stepId);
      if (!st) return;
      if (state.activeSectionId !== st.sectionId) {
        state.activeSectionId = st.sectionId;
        renderRightSection();
      }
      state.activeStepId = st.id;
      state.practiceMode = 'step';
      state.playbackRate = 0.6;
      const bounds = getStepPlaybackBounds(st);
      renderSectionNav();
      syncActiveStepHighlight();
      updateSubtitleBar(bounds.start);
      seekVideoTo(bounds.start, autoPlay);
    }

    function setPracticeMode(mode) {
      cancelHoldTimer();
      elChallengeBanner.classList.remove('visible');
      state.practiceMode = mode;
      const sec = getActiveSection();
      const st = getActiveStep();

      if (mode === 'step') {
        const bounds = getStepPlaybackBounds(st);
        state.playbackRate = 0.6;
        renderSectionNav();
        updateSubtitleBar(bounds.start);
        seekVideoTo(bounds.start, true);
      } else if (mode === 'section') {
        state.playbackRate = 0.75;
        state.activeStepId = sec.steps[0].id;
        renderSectionNav();
        syncActiveStepHighlight();
        updateSubtitleBar(sec.start);
        seekVideoTo(sec.start, true);
      } else if (mode === 'challenge') {
        state.playbackRate = 1.0;
        state.activeStepId = sec.steps[0].id;
        renderSectionNav();
        syncActiveStepHighlight();
        updateSubtitleBar(sec.start);
        seekVideoTo(sec.start, true);
      }
    }

    function handleSectionComplete(sec) {
      cancelHoldTimer();
      video.pause();
      playSuccessFanfare();
      elChallengeTitle.textContent = state.practiceMode === 'all'
        ? '🏆 太神啦！你已經用原速跳完整首《Try Everything》囉！'
        : '🎉 太棒了！完成「第 ' + sec.id + ' 段：' + sec.name + '」原速挑戰！';

      if (state.practiceMode === 'all' || sec.id >= DANCE_SECTIONS.length) {
        elChallengeNext.textContent = '✅ 標記本段學會並從第 1 段複習';
      } else {
        elChallengeNext.textContent = '✅ 我學會這段了！前往第 ' + (sec.id + 1) + ' 段 ➔';
      }
      elChallengeBanner.classList.add('visible');
      syncControlButtonsUI();
    }

    function findStepAtTime(t) {
      for (let i = 0; i < ALL_STEPS.length; i++) {
        if (t >= ALL_STEPS[i].start && t < ALL_STEPS[i].end) {
          return ALL_STEPS[i];
        }
      }
      return t >= 193 ? ALL_STEPS[ALL_STEPS.length - 1] : ALL_STEPS[0];
    }

    // 主同步計時器（每 80ms 平順精準偵測循環與步驟亮燈，單步結束短停 350ms 展現完整收尾後重播）
    setInterval(() => {
      if (state.isHoldingEnd || video.paused || video.seeking || state.isBuffering || state.pendingSeekTime !== null) return;
      if (Date.now() - state.lastSeekAt < 650) return;

      const t = video.currentTime || 0;
      const sec = getActiveSection();
      const st = getActiveStep();

      if (state.practiceMode === 'step') {
        const bounds = getStepPlaybackBounds(st);
        if (t < bounds.start - 0.5) {
          seekVideoTo(bounds.start, true);
          return;
        }
        if (t >= bounds.end - 0.08) {
          cancelHoldTimer();
          state.isHoldingEnd = true;
          video.pause();
          updateSubtitleBar(t);
          syncControlButtonsUI();
          holdTimer = setTimeout(() => {
            holdTimer = null;
            state.isHoldingEnd = false;
            if (state.practiceMode === 'step') {
              const latestBounds = getStepPlaybackBounds(getActiveStep());
              seekVideoTo(latestBounds.start, true);
            }
          }, 350);
          return;
        }
        updateSubtitleBar(t);
        return;
      }

      if (state.practiceMode === 'section') {
        const secBounds = getSectionPlaybackBounds(sec);
        if (t >= secBounds.end - 0.08 || t < secBounds.start - 0.5) {
          seekVideoTo(secBounds.start, true);
          return;
        }
        const liveStep = findStepAtTime(Math.min(t, sec.end - 0.01));
        if (liveStep.sectionId === sec.id && liveStep.id !== state.activeStepId) {
          state.activeStepId = liveStep.id;
          syncActiveStepHighlight();
        }
        updateSubtitleBar(t);
        return;
      }

      if (state.practiceMode === 'challenge') {
        const secBounds = getSectionPlaybackBounds(sec);
        if (t >= secBounds.end - 0.08) {
          handleSectionComplete(sec);
          return;
        }
        const liveStep = findStepAtTime(Math.min(t, sec.end - 0.01));
        if (liveStep.sectionId === sec.id && liveStep.id !== state.activeStepId) {
          state.activeStepId = liveStep.id;
          syncActiveStepHighlight();
        }
        updateSubtitleBar(t);
        return;
      }

      if (state.practiceMode === 'all') {
        if (t >= 192.8) {
          handleSectionComplete(DANCE_SECTIONS[DANCE_SECTIONS.length - 1]);
          return;
        }
        const liveStep = findStepAtTime(t);
        if (liveStep.sectionId !== state.activeSectionId) {
          state.activeSectionId = liveStep.sectionId;
          state.activeStepId = liveStep.id;
          renderSectionNav();
          renderRightSection();
        } else if (liveStep.id !== state.activeStepId) {
          state.activeStepId = liveStep.id;
          syncActiveStepHighlight();
        }
        updateSubtitleBar(t);
      }
    }, 80);

    // =========================================================================
    // 7. 事件監聽綁定
    // =========================================================================
    elSectionNav.addEventListener('click', (e) => {
      const btn = e.target.closest('.sec-tab');
      if (!btn) return;
      playClickSound();
      const val = btn.getAttribute('data-sec-id');
      if (val === 'all') {
        selectFullSong(true);
      } else {
        selectSection(Number(val), true);
      }
    });

    elStepsGrid.addEventListener('click', (e) => {
      const card = e.target.closest('.step-card');
      if (!card) return;
      playClickSound();
      selectSingleStep(card.getAttribute('data-step-id'), true);
    });

    elStepsGrid.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const card = e.target.closest('.step-card');
        if (!card) return;
        e.preventDefault();
        playClickSound();
        selectSingleStep(card.getAttribute('data-step-id'), true);
      }
    });

    document.querySelectorAll('.mode-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        playClickSound();
        setPracticeMode(btn.getAttribute('data-mode'));
      });
    });

    document.querySelectorAll('.speed-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        playClickSound();
        setSpeed(Number(btn.getAttribute('data-speed')));
      });
    });

    elTogglePlay.addEventListener('click', () => {
      playClickSound();
      elChallengeBanner.classList.remove('visible');
      if (video.paused && !state.isHoldingEnd) {
        const sec = getActiveSection();
        const st = getActiveStep();
        if (state.practiceMode === 'step') {
          const bounds = getStepPlaybackBounds(st);
          if (video.currentTime < bounds.start || video.currentTime >= bounds.end) {
            seekVideoTo(bounds.start, true);
          } else {
            video.playbackRate = state.playbackRate;
            const p = video.play();
            if (p && typeof p.catch === 'function') p.catch(() => {});
          }
        } else if (state.practiceMode === 'section' || state.practiceMode === 'challenge') {
          const secBounds = getSectionPlaybackBounds(sec);
          if (video.currentTime < secBounds.start || video.currentTime >= secBounds.end) {
            seekVideoTo(secBounds.start, true);
          } else {
            video.playbackRate = state.playbackRate;
            const p = video.play();
            if (p && typeof p.catch === 'function') p.catch(() => {});
          }
        } else {
          video.playbackRate = state.playbackRate;
          const p = video.play();
          if (p && typeof p.catch === 'function') p.catch(() => {});
        }
      } else {
        cancelHoldTimer();
        video.pause();
      }
      syncControlButtonsUI();
    });

    document.getElementById('btn-replay').addEventListener('click', () => {
      playClickSound();
      elChallengeBanner.classList.remove('visible');
      if (state.practiceMode === 'all') {
        seekVideoTo(0, true);
      } else if (state.practiceMode === 'step') {
        seekVideoTo(getStepPlaybackBounds(getActiveStep()).start, true);
      } else {
        seekVideoTo(getActiveSection().start, true);
      }
    });

    if (elZoomBtn) {
      elZoomBtn.addEventListener('click', () => {
        playClickSound();
        state.zoomMode = !state.zoomMode;
        if (document.body) {
          document.body.classList.toggle('zoom-mode', state.zoomMode);
        }
        syncControlButtonsUI();
      });
    }

    function stepRelative(delta) {
      const idx = ALL_STEPS.findIndex((s) => s.id === state.activeStepId);
      const baseIdx = idx >= 0 ? idx : 0;
      const nextIdx = (baseIdx + delta + ALL_STEPS.length) % ALL_STEPS.length;
      selectSingleStep(ALL_STEPS[nextIdx].id, true);
    }

    if (elPrevStep) {
      elPrevStep.addEventListener('click', () => {
        playClickSound();
        stepRelative(-1);
      });
    }

    if (elNextStep) {
      elNextStep.addEventListener('click', () => {
        playClickSound();
        stepRelative(1);
      });
    }

    function updateBackToTopVisibility() {
      if (!elBackToTop) return;
      const y = window.scrollY || window.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || 0;
      elBackToTop.classList.toggle('visible', y > 180);
    }

    if (window.addEventListener) {
      window.addEventListener('scroll', updateBackToTopVisibility, { passive: true });
    }

    if (elBackToTop) {
      elBackToTop.addEventListener('click', () => {
        playClickSound();
        if (typeof window.scrollTo === 'function') {
          try {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } catch (e) {
            window.scrollTo(0, 0);
          }
        }
        if (document.documentElement) document.documentElement.scrollTop = 0;
        if (document.body) document.body.scrollTop = 0;
      });
    }

    function toggleSectionLearned(secId, forceDone) {
      if (forceDone === true) {
        learnedSections.add(secId);
      } else if (learnedSections.has(secId)) {
        learnedSections.delete(secId);
      } else {
        learnedSections.add(secId);
      }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(learnedSections)));
      } catch (e) {}
      renderSectionNav();
      renderRightSection();
    }

    elMarkBtn.addEventListener('click', () => {
      playClickSound();
      toggleSectionLearned(state.activeSectionId);
    });

    document.getElementById('btn-reset-progress').addEventListener('click', () => {
      playClickSound();
      learnedSections.clear();
      try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
      renderSectionNav();
      renderRightSection();
    });

    document.getElementById('btn-challenge-retry').addEventListener('click', () => {
      playClickSound();
      elChallengeBanner.classList.remove('visible');
      seekVideoTo(state.practiceMode === 'all' ? 0 : getActiveSection().start, true);
    });

    elChallengeNext.addEventListener('click', () => {
      playClickSound();
      const curr = getActiveSection();
      toggleSectionLearned(curr.id, true);
      const nextId = curr.id < DANCE_SECTIONS.length ? curr.id + 1 : 1;
      state.practiceMode = 'section';
      state.playbackRate = 0.75;
      selectSection(nextId, true);
    });

    // 本機備援影片選擇器
    function triggerVideoPicker() { elFileInput.click(); }
    document.getElementById('btn-pick-video-alert').addEventListener('click', triggerVideoPicker);
    document.getElementById('btn-pick-video-small').addEventListener('click', triggerVideoPicker);
    elFileInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      video.src = URL.createObjectURL(file);
      elMissingAlert.classList.remove('visible');
      video.load();
    });

    video.addEventListener('waiting', () => {
      state.isBuffering = true;
      if (elLoadingPill) elLoadingPill.classList.add('visible');
    });
    ['loadedmetadata', 'loadeddata', 'canplay'].forEach((evName) => {
      video.addEventListener(evName, () => {
        applyPendingSeekIfNeeded();
      });
    });
    ['playing', 'canplay', 'seeked'].forEach((evName) => {
      video.addEventListener(evName, () => {
        state.isBuffering = false;
        if (elLoadingPill) elLoadingPill.classList.remove('visible');
      });
    });
    video.addEventListener('error', () => {
      state.isBuffering = false;
      if (elLoadingPill) elLoadingPill.classList.remove('visible');
      elMissingAlert.classList.add('visible');
    });
    video.addEventListener('loadeddata', () => {
      state.isBuffering = false;
      if (elLoadingPill) elLoadingPill.classList.remove('visible');
      elMissingAlert.classList.remove('visible');
      video.playbackRate = state.playbackRate;
    });
    video.addEventListener('play', () => {
      if (state.pendingSeekTime !== null) {
        applyPendingSeekIfNeeded();
        return;
      }
      const t = video.currentTime || 0;
      if (state.practiceMode === 'step') {
        const bounds = getStepPlaybackBounds(getActiveStep());
        if (t < bounds.start - 0.5 || t >= bounds.end) {
          seekVideoTo(bounds.start, false);
        }
      } else if (state.practiceMode === 'section' || state.practiceMode === 'challenge') {
        const secBounds = getSectionPlaybackBounds(getActiveSection());
        if (t < secBounds.start - 0.5 || t >= secBounds.end) {
          seekVideoTo(secBounds.start, false);
        }
      }
      syncControlButtonsUI();
    });
    video.addEventListener('pause', syncControlButtonsUI);

    // 鍵盤快捷鍵（空白鍵播放／暫停，左右方向鍵切換上一動／下一動）
    document.addEventListener('keydown', (e) => {
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'VIDEO' || e.target.getAttribute('role') === 'button')) return;
      if (e.code === 'Space') {
        e.preventDefault();
        elTogglePlay.click();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        stepRelative(-1);
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        stepRelative(1);
      }
    });

    // 初始化渲染
    renderSectionNav();
    renderRightSection();
    updateSubtitleBar(0);
    syncControlButtonsUI();
  </script>
</body>
</html>
`;

fs.writeFileSync(outFile, html, 'utf8');
console.log('Successfully generated V4.04:', outFile, 'Size:', fs.statSync(outFile).size, 'bytes');
