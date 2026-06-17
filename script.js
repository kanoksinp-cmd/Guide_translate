/* =========================================================
   Smart Mail Desk
   Rule-based (no external AI) multi-language email helper.
   Supports Thai, Japanese, and Chinese <-> English translation,
   plus Thai/English same-language tone upgrading.
   Everything below runs entirely in the browser.
   ========================================================= */

/* ---------------------------------------------------------
   1. DICTIONARIES — THAI
   --------------------------------------------------------- */
const TH_EN = {
  "สวัสดี": "hello", "ขอบคุณ": "thank you", "ขอบใจ": "thanks",
  "ขอโทษ": "sorry", "ยินดี": "pleased", "เรียน": "dear",
  "นับถือ": "regards", "สบายดี": "well", "ดีใจ": "glad",
  "เสียใจ": "regret", "กรุณา": "please", "รบกวน": "trouble",
  "สะดวก": "convenient", "ไม่สะดวก": "inconvenient",
  "ผม": "I", "ฉัน": "I", "ดิฉัน": "I", "เรา": "we", "คุณ": "you",
  "ท่าน": "you", "เขา": "he", "พวกเขา": "they", "มัน": "it", "ใคร": "who",
  "ครับ": "", "ค่ะ": "", "นะ": "", "จ้ะ": "", "จ้า": "", "ฮะ": "", "จ๊ะ": "",
  "งาน": "work", "โครงการ": "project", "รายงาน": "report", "ประชุม": "meeting",
  "นัด": "appointment", "กำหนดการ": "schedule", "กำหนด": "deadline",
  "เอกสาร": "document", "ไฟล์": "file", "อีเมล": "email", "ที่อยู่": "address",
  "เบอร์โทร": "phone number", "ราคา": "price", "ใบสั่งซื้อ": "purchase order",
  "การชำระเงิน": "payment", "ปัญหา": "problem", "วิธีแก้ไข": "solution",
  "ความช่วยเหลือ": "help", "ข้อมูล": "information", "ทีม": "team",
  "ลูกค้า": "customer", "บริษัท": "company", "สัญญา": "contract",
  "ข้อเสนอ": "proposal", "งบประมาณ": "budget", "ยอดขาย": "sales",
  "สินค้า": "product", "บริการ": "service", "สาขา": "branch",
  "แผนก": "department", "หัวหน้า": "supervisor", "พนักงาน": "employee",
  "ผู้จัดการ": "manager", "สำนักงาน": "office",
  "ส่ง": "send", "รับ": "receive", "ตรวจสอบ": "check", "ทบทวน": "review",
  "อัปเดต": "update", "อนุมัติ": "approve", "ขอ": "request",
  "ต้องการ": "need", "สามารถ": "can", "ควร": "should", "ต้อง": "must",
  "สำคัญ": "important", "เร่งด่วน": "urgent", "แนบ": "attach",
  "ติดต่อ": "contact", "ว่าง": "available", "ยุ่ง": "busy",
  "ยืนยัน": "confirm", "ยกเลิก": "cancel", "เลื่อน": "postpone",
  "ส่งมอบ": "deliver", "ทำ": "do", "เริ่ม": "start", "เสร็จ": "finish",
  "แก้ไข": "fix", "เขียน": "write", "อ่าน": "read", "พูด": "speak",
  "ฟัง": "listen", "คิด": "think", "รู้": "know", "เข้าใจ": "understand",
  "ช่วย": "help", "รอ": "wait", "มา": "come", "ไป": "go", "กลับ": "return",
  "จัด": "arrange", "เตรียม": "prepare", "จ่าย": "pay", "ซื้อ": "buy",
  "ขาย": "sell", "สั่ง": "order", "แจ้ง": "inform", "ทราบ": "be informed",
  "รีบ": "hurry", "ล่าช้า": "delayed",
  "วันนี้": "today", "พรุ่งนี้": "tomorrow", "เมื่อวาน": "yesterday",
  "สัปดาห์นี้": "this week", "สัปดาห์หน้า": "next week", "เดือนนี้": "this month",
  "เช้า": "morning", "บ่าย": "afternoon", "เย็น": "evening", "ตอนนี้": "now",
  "เดี๋ยว": "in a moment", "เร็วๆนี้": "soon", "ทันที": "immediately",
  "และ": "and", "หรือ": "or", "แต่": "but", "เพราะ": "because",
  "ดังนั้น": "therefore", "ถ้า": "if", "เมื่อ": "when", "ก่อน": "before",
  "หลัง": "after", "ระหว่าง": "during", "กับ": "with", "สำหรับ": "for",
  "ของ": "of", "ที่": "at", "จาก": "from", "ถึง": "to", "โดย": "by", "ใน": "in",
  "อะไร": "what", "ทำไม": "why", "เมื่อไหร่": "when", "ที่ไหน": "where",
  "อย่างไร": "how", "ไหม": "?", "หรือไม่": "or not",
  "ดี": "good", "ใหญ่": "big", "เล็ก": "small", "ใหม่": "new", "เก่า": "old",
  "เร็ว": "fast", "ช้า": "slow", "ง่าย": "easy", "ยาก": "difficult",
  "ได้": "can", "ให้": "for", "เลย": "", "พี่": "you", "น้อง": "you",
  "นี้": "this", "นั้น": "that", "มาก": "very", "นิดหน่อย": "a little",
  // function / grammar words (boost compositional coverage)
  "ไม่": "not", "มี": "have", "เป็น": "is", "อยู่": "currently",
  "จะ": "will", "แล้ว": "already", "อีก": "more", "บ้าง": "some",
  "เอง": "by oneself", "ทำให้": "make", "ปกติ": "normally", "บาง": "some",
  "ทุก": "every", "หลาย": "many", "น้อย": "little", "เพิ่ม": "add",
  "ลด": "reduce", "เปลี่ยน": "change", "ตาม": "follow", "จึง": "so",
  "ซึ่ง": "which", "เพื่อ": "in order to", "ตั้งแต่": "since",
  "จนถึง": "until", "หน่อย": "please", "ว่า": "that", "ตรง": "correct",
  "คล้าย": "similar", "แตกต่าง": "different", "เหมือนกัน": "the same",
  "เรื่อง": "matter", "จำเป็น": "necessary",
  // business / manufacturing / logistics
  "ตัวอย่าง": "sample", "ชิ้นงาน": "workpiece", "แบบ": "design",
  "ขนาด": "size", "ข้อกำหนด": "specification", "คุณภาพ": "quality",
  "มาตรฐาน": "standard", "ทดสอบ": "test", "ทดลอง": "trial",
  "ผลลัพธ์": "result", "จำนวน": "quantity", "ปริมาณ": "amount",
  "หน่วย": "unit", "ส่วนลด": "discount", "ภาษี": "tax",
  "ใบเสนอราคา": "quotation", "ใบแจ้งหนี้": "invoice",
  "การจัดส่ง": "shipping", "ขนส่ง": "transport", "คลังสินค้า": "warehouse",
  "สต็อก": "stock", "ดำเนินการ": "proceed", "จัดการ": "manage",
  "รับทราบ": "acknowledged", "เพิ่มเติม": "additional", "ล่าสุด": "latest",
  "รุ่น": "model", "เวอร์ชัน": "version", "ระบบ": "system",
  "ซอฟต์แวร์": "software", "ฮาร์ดแวร์": "hardware", "วัสดุ": "material",
  "โรงงาน": "factory", "ผู้ผลิต": "manufacturer", "ซัพพลายเออร์": "supplier",
  "แบบร่าง": "draft", "ภาพวาด": "drawing", "รายละเอียด": "details",
  "ข้อสงสัย": "question", "คำแนะนำ": "suggestion", "ความคิดเห็น": "opinion",
  "ตอบกลับ": "reply", "ค่าใช้จ่าย": "cost", "สอบถาม": "inquire",
  "อนุญาต": "permission", "เพื่อน": "friend", "ทีมงาน": "team members",
  "ฝ่าย": "department",
};

const TH_CASUAL = {
  "เดี๋ยว": "สักครู่", "โอเค": "ตกลง", "จ้า": "", "จ๊ะ": "", "ฮะ": "",
  "อ่ะ": "", "แบบว่า": "", "เนี่ย": "", "เหรอ": "หรือไม่", "ป่ะ": "หรือไม่",
  "ดิ": "", "ชิวๆ": "ตามสะดวก", "เร่งๆ": "โดยเร็วที่สุด", "กู": "ผม",
  "มึง": "ท่าน", "แก": "คุณ", "เคลียร์": "ดำเนินการเรียบร้อย",
  "ชัวร์": "แน่นอน", "จริงๆ": "อย่างแท้จริง",
};

const EN_CASUAL = {
  "hey": "Dear", "hi": "Dear", "yo": "Dear",
  "wanna": "would like to", "gonna": "going to", "gotta": "have to",
  "kinda": "somewhat", "sorta": "somewhat",
  "yeah": "yes", "yep": "yes", "nah": "no", "nope": "no",
  "asap": "as soon as possible", "thx": "thank you", "thanks": "thank you",
  "pls": "please", "plz": "please", "u": "you", "ur": "your",
  "btw": "by the way", "fyi": "for your information",
  "dunno": "do not know", "gimme": "give me", "lemme": "let me",
  "don't": "do not", "can't": "cannot", "won't": "will not",
  "isn't": "is not", "aren't": "are not", "wasn't": "was not",
  "weren't": "were not", "didn't": "did not", "doesn't": "does not",
  "haven't": "have not", "hasn't": "has not", "wouldn't": "would not",
  "shouldn't": "should not", "couldn't": "could not",
  "i'm": "I am", "you're": "you are", "he's": "he is", "she's": "she is",
  "it's": "it is", "we're": "we are", "they're": "they are",
  "i've": "I have", "we've": "we have", "i'll": "I will",
  "that's": "that is", "there's": "there is", "let's": "let us",
};

const EN_TH_EXTRA = {
  "the": "", "a": "", "an": "", "is": "", "are": "", "am": "",
  "was": "", "were": "", "does": "", "did": "", "be": "",
  "as soon as possible": "โดยเร็วที่สุด",
  "for your information": "เพื่อเป็นข้อมูล",
  "by the way": "อนึ่ง",
  "do not know": "ไม่ทราบ",
  "sw": "ซอฟต์แวร์", "hw": "ฮาร์ดแวร์", "qc": "การควบคุมคุณภาพ",
  "qa": "การประกันคุณภาพ", "po": "ใบสั่งซื้อ", "eta": "เวลาที่คาดว่าจะถึง",
  "bom": "รายการวัสดุ",
};

/* ---------------------------------------------------------
   1b. DICTIONARIES — JAPANESE
   (Japanese conjugates verbs heavily and packs grammar into the
   word itself, so common conjugated forms are stored as whole
   dictionary entries rather than decomposed — segmentation will
   have more gaps here than Thai for sentences using forms outside
   this list. This is a known, documented limitation.)
   --------------------------------------------------------- */
const JA_EN = {
  "こんにちは": "hello", "ありがとうございます": "thank you", "すみません": "sorry",
  "お疲れ様です": "thank you for your hard work", "よろしくお願いします": "best regards",
  "私": "I", "あなた": "you", "彼": "he", "彼女": "she", "私たち": "we",
  "皆様": "everyone",
  "仕事": "work", "プロジェクト": "project", "報告書": "report", "会議": "meeting",
  "資料": "document", "ファイル": "file", "メール": "email", "価格": "price",
  "注文書": "purchase order", "支払い": "payment", "問題": "problem",
  "情報": "information", "チーム": "team", "お客様": "customer", "会社": "company",
  "契約": "contract", "提案": "proposal", "予算": "budget", "製品": "product",
  "サービス": "service", "部署": "department", "担当者": "person in charge",
  "オフィス": "office",
  "送ります": "send", "送りました": "sent", "確認します": "check",
  "更新します": "update", "承認します": "approve", "お願いします": "please",
  "できます": "can", "必要です": "necessary", "重要です": "important",
  "急ぎ": "urgent", "連絡します": "contact", "キャンセルします": "cancel",
  "延期します": "postpone", "準備します": "prepare", "書きます": "write",
  "読みます": "read", "話します": "speak", "聞きます": "listen",
  "考えます": "think", "知っています": "know", "わかります": "understand",
  "手伝います": "help", "待ちます": "wait", "来ます": "come", "行きます": "go",
  "今日": "today", "明日": "tomorrow", "昨日": "yesterday", "今週": "this week",
  "来週": "next week", "午前": "morning", "午後": "afternoon",
  "は": "", "が": "", "を": "", "に": "to", "で": "at", "の": "of", "と": "and",
  "も": "also", "か": "?", "ね": "", "よ": "", "です": "",
  "何": "what", "なぜ": "why", "いつ": "when", "どこ": "where", "どう": "how",
  "誰": "who",
  "いい": "good", "良い": "good", "大きい": "big", "小さい": "small",
  "新しい": "new", "古い": "old", "早い": "fast", "遅い": "slow",
};

const EN_JA_EXTRA = {
  "the": "", "a": "", "an": "", "is": "", "are": "", "am": "",
};

/* ---------------------------------------------------------
   1c. DICTIONARIES — CHINESE (Mandarin, simplified)
   --------------------------------------------------------- */
const ZH_EN = {
  "你好": "hello", "您好": "hello", "谢谢": "thank you", "对不起": "sorry",
  "请": "please",
  "我": "I", "你": "you", "您": "you", "他": "he", "她": "she", "我们": "we",
  "他们": "they",
  "工作": "work", "项目": "project", "报告": "report", "会议": "meeting",
  "文件": "document", "邮件": "email", "价格": "price", "订单": "purchase order",
  "付款": "payment", "问题": "problem", "信息": "information", "团队": "team",
  "客户": "customer", "公司": "company", "合同": "contract", "提案": "proposal",
  "预算": "budget", "产品": "product", "服务": "service", "部门": "department",
  "办公室": "office",
  "发送": "send", "检查": "check", "更新": "update", "批准": "approve",
  "需要": "need", "可以": "can", "应该": "should", "必须": "must",
  "重要": "important", "紧急": "urgent", "联系": "contact", "取消": "cancel",
  "推迟": "postpone", "准备": "prepare", "写": "write", "读": "read",
  "说": "speak", "听": "listen", "想": "think", "认为": "think",
  "知道": "know", "明白": "understand", "了解": "understand", "帮助": "help",
  "帮": "help", "等": "wait", "来": "come", "去": "go", "做": "do",
  "开始": "start", "完成": "finish", "确认": "confirm", "会": "will",
  "今天": "today", "明天": "tomorrow", "昨天": "yesterday", "本周": "this week",
  "下周": "next week", "早上": "morning", "下午": "afternoon", "晚上": "evening",
  "现在": "now", "马上": "immediately",
  "和": "and", "或者": "or", "但是": "but", "因为": "because",
  "所以": "therefore", "如果": "if", "之前": "before", "之后": "after",
  "为了": "for", "关于": "about",
  "什么": "what", "为什么": "why", "什么时候": "when", "哪里": "where",
  "怎么": "how", "谁": "who",
  "了": "", "吗": "?", "的": "", "吧": "", "啊": "",
  "好": "good", "大": "big", "小": "small", "新": "new", "旧": "old",
  "快": "fast", "慢": "slow", "容易": "easy", "难": "difficult",
};

const EN_ZH_EXTRA = {
  "the": "", "a": "", "an": "", "is": "", "are": "", "am": "",
};

function buildReverse(dict) {
  const rev = {};
  for (const [k, v] of Object.entries(dict)) {
    const key = v.toLowerCase().trim();
    if (key && key !== "?" && key !== "or not" && !rev[key]) rev[key] = k;
  }
  return rev;
}

const EN_TH = Object.assign({}, buildReverse(TH_EN), EN_TH_EXTRA);
const EN_JA = Object.assign({}, buildReverse(JA_EN), EN_JA_EXTRA);
const EN_ZH = Object.assign({}, buildReverse(ZH_EN), EN_ZH_EXTRA);

/* ---------------------------------------------------------
   1d. LANGUAGE REGISTRY
   Each "other" language pairs with English as the pivot.
   scriptKind tells the tokenizer which character run type
   (from splitRuns) belongs to this language.
   --------------------------------------------------------- */
const LANGUAGES = {
  th: {
    name: "ไทย", scriptKind: "th", dict: TH_EN, reverseDict: EN_TH,
    segmentDict: Object.assign({}, TH_EN, TH_CASUAL), hasToneMode: true,
  },
  ja: {
    name: "ญี่ปุ่น", scriptKind: "cjk", dict: JA_EN, reverseDict: EN_JA,
    segmentDict: JA_EN, hasToneMode: false,
  },
  zh: {
    name: "จีน", scriptKind: "cjk", dict: ZH_EN, reverseDict: EN_ZH,
    segmentDict: ZH_EN, hasToneMode: false,
  },
};

/* ---------------------------------------------------------
   2. TOKENIZER + SEGMENTATION
   --------------------------------------------------------- */
function segmentBySegmentDict(text, dict) {
  const keys = Object.keys(dict);
  const maxLen = keys.reduce((m, k) => Math.max(m, k.length), 1);
  const tokens = [];
  let i = 0;
  let unknownBuf = "";
  const flushUnknown = () => {
    if (unknownBuf) { tokens.push({ text: unknownBuf, known: false }); unknownBuf = ""; }
  };
  while (i < text.length) {
    let matched = null;
    for (let len = Math.min(maxLen, text.length - i); len >= 1; len--) {
      const sub = text.substr(i, len);
      if (Object.prototype.hasOwnProperty.call(dict, sub)) { matched = sub; break; }
    }
    if (matched) { flushUnknown(); tokens.push({ text: matched, known: true }); i += matched.length; }
    else { unknownBuf += text[i]; i += 1; }
  }
  flushUnknown();
  return tokens;
}

// Thai block, Hiragana+Katakana+CJK ideographs (covers Japanese & Chinese), Latin, digits
function splitRuns(text) {
  const re = /([ก-๙]+)|([\u3040-\u30FF\u4E00-\u9FFF]+)|([A-Za-z']+)|([0-9]+)|(\s+)|([^\sA-Za-z0-9ก-๙\u3040-\u30FF\u4E00-\u9FFF]+)/g;
  const runs = [];
  let m;
  while ((m = re.exec(text)) !== null) {
    if (m[1]) runs.push({ type: "th", text: m[1] });
    else if (m[2]) runs.push({ type: "cjk", text: m[2] });
    else if (m[3]) runs.push({ type: "en", text: m[3] });
    else if (m[4]) runs.push({ type: "num", text: m[4] });
    else if (m[5]) runs.push({ type: "space", text: m[5] });
    else runs.push({ type: "punct", text: m[6] });
  }
  return runs;
}

// otherLangCode tells the tokenizer which script run type needs
// dictionary-based segmentation (Thai/Japanese/Chinese have no spaces
// between words); English runs are already space-delimited by splitRuns.
function tokenizeForEngine(text, otherLangCode) {
  const lang = LANGUAGES[otherLangCode];
  const runs = splitRuns(text);
  const tokens = [];
  for (const run of runs) {
    if (lang && run.type === lang.scriptKind) {
      const segs = segmentBySegmentDict(run.text, lang.segmentDict);
      for (const s of segs) tokens.push({ kind: run.type, text: s.text, known: s.known });
    } else {
      tokens.push({ kind: run.type, text: run.text, known: true });
    }
  }
  return tokens;
}

function capitalizeSentences(str) {
  return str.replace(/(^\s*\w|[.!?]\s+\w)/g, (c) => c.toUpperCase());
}

function detectLang(text) {
  return /[ก-๙]/.test(text) ? "th" : "en";
}

/* ---------------------------------------------------------
   3. TRANSLATE MODE
   --------------------------------------------------------- */
function resolveEnglishWordGeneric(word, lang) {
  const lower = word.toLowerCase();
  if (Object.prototype.hasOwnProperty.call(lang.reverseDict, lower)) {
    return { meaning: lang.reverseDict[lower] };
  }
  if (Object.prototype.hasOwnProperty.call(EN_CASUAL, lower)) {
    const normalized = EN_CASUAL[lower].toLowerCase();
    if (normalized === "") return { meaning: "" };
    if (Object.prototype.hasOwnProperty.call(lang.reverseDict, normalized)) {
      return { meaning: lang.reverseDict[normalized] };
    }
    const parts = normalized.split(/\s+/)
      .map((w) => (Object.prototype.hasOwnProperty.call(lang.reverseDict, w) ? lang.reverseDict[w] : w))
      .filter((w) => w !== "");
    return { meaning: parts.join(" ") };
  }
  return null;
}

function collectEnWindow(tokens, startIdx, wordCount) {
  let idx = startIdx;
  const words = [];
  let consumed = 0;
  for (let w = 0; w < wordCount; w++) {
    if (idx >= tokens.length || tokens[idx].kind !== "en") return null;
    words.push(tokens[idx].text.toLowerCase());
    consumed += 1;
    idx += 1;
    if (w < wordCount - 1) {
      if (idx < tokens.length && tokens[idx].kind === "space") {
        consumed += 1;
        idx += 1;
      } else {
        return null;
      }
    }
  }
  return { phrase: words.join(" "), consumedTokenCount: consumed };
}

function classifyUnknownWord(word, kind) {
  if (kind === "en") {
    if (/^[A-Z0-9]{1,5}$/.test(word)) return "ตัวย่อ/รหัสที่ไม่มีในพจนานุกรม — คงคำเดิมไว้";
    if (/^[A-Z][a-zA-Z]+$/.test(word)) return "สันนิษฐานว่าเป็นชื่อเฉพาะ — คงคำเดิมไว้";
  }
  return "ยังไม่มีคำนี้ในพจนานุกรม";
}

// otherLangCode: 'th' | 'ja' | 'zh'.  toEnglish: true = otherLang→English,
// false = English→otherLang.
function translateText(text, otherLangCode, toEnglish) {
  const lang = LANGUAGES[otherLangCode];
  const tokens = tokenizeForEngine(text, otherLangCode);
  return toEnglish ? translateOtherToEnglish(tokens, lang) : translateEnglishToOther(tokens, lang);
}

function translateOtherToEnglish(tokens, lang) {
  const outParts = [];
  const breakdown = [];
  for (const t of tokens) {
    if (t.kind === "space") continue;
    if (t.kind === "punct") {
      outParts.push({ text: t.text, glue: true, noSpaceAfter: /^[-/_]+$/.test(t.text) });
      continue;
    }
    if (t.kind === "num") { outParts.push({ text: t.text, glue: false }); continue; }

    const srcWord = t.text;
    if (t.kind !== lang.scriptKind) {
      outParts.push({ text: srcWord, glue: false });
      breakdown.push({ word: srcWord, meaning: "เป็นภาษาอังกฤษอยู่แล้ว — ไม่ต้องแปล", status: "already" });
      continue;
    }

    const meaning = Object.prototype.hasOwnProperty.call(lang.dict, srcWord) ? lang.dict[srcWord] : null;
    if (meaning === null) {
      outParts.push({ text: srcWord, glue: false });
      breakdown.push({ word: srcWord, meaning: classifyUnknownWord(srcWord, t.kind), status: "unknown" });
    } else if (meaning === "") {
      breakdown.push({ word: srcWord, meaning: "คำลงท้าย/คำเสริม หรือคำไวยากรณ์ — ไม่มีคำแปลตรง", status: "particle" });
    } else {
      outParts.push({ text: meaning, glue: false });
      breakdown.push({ word: srcWord, meaning, status: "translated" });
    }
  }
  return { text: joinParts(outParts, true), breakdown };
}

function translateEnglishToOther(tokens, lang) {
  const outParts = [];
  const breakdown = [];
  let i = 0;
  while (i < tokens.length) {
    const t = tokens[i];
    if (t.kind === "space") { i++; continue; }
    if (t.kind === "punct") {
      outParts.push({ text: t.text, glue: true, noSpaceAfter: /^[-/_]+$/.test(t.text) });
      i++; continue;
    }
    if (t.kind === "num") { outParts.push({ text: t.text, glue: false }); i++; continue; }

    if (t.kind !== "en") {
      outParts.push({ text: t.text, glue: false });
      breakdown.push({ word: t.text, meaning: `เป็นภาษา${lang.name}อยู่แล้ว — ไม่ต้องแปล`, status: "already" });
      i++; continue;
    }

    let meaning = null;
    let matchedWordsText = t.text;
    let consumed = 1;
    for (let wordCount = 3; wordCount >= 1; wordCount--) {
      const window = collectEnWindow(tokens, i, wordCount);
      if (!window) continue;
      const resolved = resolveEnglishWordGeneric(window.phrase, lang);
      if (resolved) {
        meaning = resolved.meaning;
        matchedWordsText = window.phrase;
        consumed = window.consumedTokenCount;
        break;
      }
    }

    if (meaning === null) {
      outParts.push({ text: t.text, glue: false });
      breakdown.push({ word: t.text, meaning: classifyUnknownWord(t.text, "en"), status: "unknown" });
    } else if (meaning === "") {
      breakdown.push({ word: matchedWordsText, meaning: "คำลงท้าย/คำเสริม หรือคำไวยากรณ์ — ไม่มีคำแปลตรง", status: "particle" });
    } else {
      outParts.push({ text: meaning, glue: false });
      breakdown.push({ word: matchedWordsText, meaning, status: "translated" });
    }
    i += consumed;
  }
  return { text: joinParts(outParts, false), breakdown };
}

function joinParts(outParts, toEnglish) {
  let result = "";
  let prevNoSpaceAfter = false;
  for (const p of outParts) {
    const skipSpace = result.length === 0 || p.glue || prevNoSpaceAfter;
    result += skipSpace ? p.text : " " + p.text;
    prevNoSpaceAfter = !!p.noSpaceAfter;
  }
  result = result.replace(/\s+/g, " ").trim();
  if (toEnglish) result = capitalizeSentences(result);
  return result;
}

/* ---------------------------------------------------------
   4. TONE-ONLY MODE (Thai/English only — same language,
      casual -> formal; not offered for Japanese/Chinese since
      a reliable rule-based formality map for those would need
      far deeper grammar handling than this dictionary approach)
   --------------------------------------------------------- */
function toneUpgrade(text, lang) {
  // lang: 'th' | 'en'. Always tokenize via the Thai registry entry:
  // Thai runs get properly segmented, English runs are already
  // space-delimited so nothing is mis-segmented either way.
  const tokens = tokenizeForEngine(text, "th");
  const map = lang === "th" ? TH_CASUAL : EN_CASUAL;
  const breakdown = [];
  let result = "";
  for (const t of tokens) {
    if (t.kind === "space" || t.kind === "punct" || t.kind === "num") {
      result += t.text;
      continue;
    }
    const key = lang === "en" ? t.text.toLowerCase() : t.text;
    if (Object.prototype.hasOwnProperty.call(map, key)) {
      const formal = map[key];
      breakdown.push({ original: t.text, formal, dropped: formal === "" });
      result += formal;
    } else {
      result += t.text;
    }
  }
  result = result.replace(/[ \t]+/g, " ").replace(/ +([,.!?])/g, "$1").trim();
  if (lang === "en") result = capitalizeSentences(result);
  return { text: result, breakdown };
}

/* ---------------------------------------------------------
   5. EMAIL TEMPLATES
   --------------------------------------------------------- */
const GREETINGS = {
  th: (r) => `เรียน ${r || "[ชื่อผู้รับ]"},`,
  en: (r) => `Dear ${r || "[Recipient Name]"},`,
  ja: (r) => `${r || "[お名前]"} 様`,
  zh: (r) => `尊敬的${r || "[收件人姓名]"}：`,
};
const SIGN_PLACEHOLDER = { th: "[ชื่อผู้ส่ง]", en: "[Your Name]", ja: "[お名前]", zh: "[您的姓名]" };

const PURPOSES = [
  { id: "general", label: { th: "ทั่วไป", en: "General" },
    subject: { th: "เรื่องทั่วไป", en: "General Inquiry", ja: "ご連絡", zh: "一般事项通知" },
    closing: {
      th: "ขอแสดงความนับถือ", en: "Best regards,",
      ja: "よろしくお願いいたします。", zh: "此致\n敬礼",
    } },
  { id: "request", label: { th: "ขอความช่วยเหลือ", en: "Request" },
    subject: { th: "ขอความช่วยเหลือ", en: "Request for Assistance", ja: "ご協力のお願い", zh: "请求协助" },
    closing: {
      th: "ขอความกรุณาพิจารณาและแจ้งให้ทราบด้วย จะเป็นพระคุณอย่างยิ่ง\n\nขอแสดงความนับถือ",
      en: "I would appreciate your kind assistance with this matter.\n\nBest regards,",
      ja: "お忙しい中恐れ入りますが、ご対応いただけますと幸いです。\n\nよろしくお願いいたします。",
      zh: "感谢您的协助与配合。\n\n此致\n敬礼",
    } },
  { id: "followup", label: { th: "ติดตามความคืบหน้า", en: "Follow-up" },
    subject: { th: "ติดตามความคืบหน้า", en: "Follow-up", ja: "進捗確認のご連絡", zh: "进度跟进" },
    closing: {
      th: "ขอบคุณที่ติดตามเรื่องนี้ และขออภัยในความไม่สะดวก\n\nขอแสดงความนับถือ",
      en: "Thank you for your attention to this matter.\n\nBest regards,",
      ja: "お忙しいところ恐れ入りますが、ご確認のほどよろしくお願いいたします。",
      zh: "感谢您对此事的关注，如有不便之处敬请谅解。\n\n此致\n敬礼",
    } },
  { id: "thanks", label: { th: "ขอบคุณ", en: "Thank you" },
    subject: { th: "ขอบคุณ", en: "Thank You", ja: "御礼", zh: "致谢" },
    closing: {
      th: "ขอบคุณอีกครั้งสำหรับความช่วยเหลือ\n\nด้วยความขอบคุณ",
      en: "Thank you again for your help.\n\nKind regards,",
      ja: "重ねてお礼申し上げます。\n\n今後ともよろしくお願いいたします。",
      zh: "再次感谢您的帮助。\n\n谨此致谢",
    } },
  { id: "apology", label: { th: "ขอโทษ / แจ้งปัญหา", en: "Apology / Issue" },
    subject: { th: "ขออภัยในความไม่สะดวก", en: "Apology / Issue Report", ja: "お詫び", zh: "致歉信" },
    closing: {
      th: "ขออภัยในความไม่สะดวกที่เกิดขึ้น และจะดำเนินการแก้ไขโดยเร็วที่สุด\n\nขอแสดงความนับถือ",
      en: "I apologize for any inconvenience this may have caused.\n\nSincerely,",
      ja: "ご迷惑をおかけしましたことをお詫び申し上げます。\n\nよろしくお願いいたします。",
      zh: "对由此造成的不便，深表歉意，我们将尽快处理。\n\n此致\n敬礼",
    } },
];

function buildEmail({ targetLang, recipient, sender, subject, purpose, bodyText }) {
  const greeting = GREETINGS[targetLang](recipient);
  const closing = purpose.closing[targetLang];
  const sign = sender || SIGN_PLACEHOLDER[targetLang];
  const subj = subject && subject.trim() ? subject.trim() : purpose.subject[targetLang];
  const body = [greeting, "", bodyText, "", closing, sign].join("\n");
  return { subject: subj, body };
}

/* ---------------------------------------------------------
   6. DOM WIRING
   --------------------------------------------------------- */
const state = { mode: "translate", otherLang: "th", flip: false, purposeId: "general" };
let lastBreakdown = { mode: "translate", data: [] };

const els = {
  modeGroup: document.getElementById("modeGroup"),
  langGroup: document.getElementById("langGroup"),
  directionGroup: document.getElementById("directionGroup"),
  purposeGroup: document.getElementById("purposeGroup"),
  recipient: document.getElementById("recipientInput"),
  sender: document.getElementById("senderInput"),
  subject: document.getElementById("subjectInput"),
  rawInput: document.getElementById("rawInput"),
  modeHint: document.getElementById("modeHint"),
  sealBtn: document.getElementById("sealBtn"),
  resultSection: document.getElementById("resultSection"),
  outSubject: document.getElementById("outSubject"),
  outBody: document.getElementById("outBody"),
  copyBtn: document.getElementById("copyBtn"),
  openBreakdownBtn: document.getElementById("openBreakdownBtn"),
  breakdownModal: document.getElementById("breakdownModal"),
  breakdownContent: document.getElementById("breakdownContent"),
};

function renderPurposeChips() {
  els.purposeGroup.innerHTML = "";
  PURPOSES.forEach((p) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "stamp-chip" + (p.id === state.purposeId ? " active" : "");
    btn.textContent = `${p.label.th} · ${p.label.en}`;
    btn.dataset.purpose = p.id;
    btn.addEventListener("click", () => {
      state.purposeId = p.id;
      [...els.purposeGroup.children].forEach((c) => c.classList.toggle("active", c === btn));
    });
    els.purposeGroup.appendChild(btn);
  });
}

function updateDirectionLabels() {
  const lang = LANGUAGES[state.otherLang];
  const [btnA, btnB] = els.directionGroup.querySelectorAll(".pill");
  btnA.textContent = `${lang.name} → อังกฤษ`;
  btnB.textContent = `อังกฤษ → ${lang.name}`;
}

function updateModeHint() {
  if (state.mode === "translate") {
    const lang = LANGUAGES[state.otherLang];
    const note = lang.scriptKind === "cjk"
      ? ` คำเตือน: คำศัพท์และการตัดคำภาษา${lang.name}ยังครอบคลุมน้อยกว่าภาษาไทย โดยเฉพาะรูปแบบไวยากรณ์/การผันคำที่ซับซ้อน`
      : "";
    els.modeHint.textContent =
      `โหมดนี้แปลข้อความข้ามภาษาแบบคำต่อคำจากพจนานุกรมในตัว แล้วจัดเป็นอีเมลทางการ — ไวยากรณ์อาจไม่สมบูรณ์เท่าการแปลโดยคนหรือ AI จริง${note}`;
  } else {
    els.modeHint.textContent =
      "โหมดนี้ไม่แปลภาษา แต่จะปรับคำที่ไม่เป็นทางการให้เหมาะกับอีเมลธุรกิจ รองรับเฉพาะภาษาไทยและภาษาอังกฤษ (ตรวจจากตัวอักษรในข้อความอัตโนมัติ)";
  }
}

els.modeGroup.querySelectorAll(".pill").forEach((btn) => {
  btn.addEventListener("click", () => {
    state.mode = btn.dataset.mode;
    els.modeGroup.querySelectorAll(".pill").forEach((b) => b.classList.toggle("active", b === btn));
    const showLangControls = state.mode === "translate";
    els.langGroup.classList.toggle("hidden", !showLangControls);
    els.directionGroup.classList.toggle("hidden", !showLangControls);
    updateModeHint();
  });
});

els.langGroup.querySelectorAll(".pill").forEach((btn) => {
  btn.addEventListener("click", () => {
    state.otherLang = btn.dataset.lang;
    els.langGroup.querySelectorAll(".pill").forEach((b) => b.classList.toggle("active", b === btn));
    updateDirectionLabels();
    updateModeHint();
  });
});

els.directionGroup.querySelectorAll(".pill").forEach((btn, idx) => {
  btn.addEventListener("click", () => {
    state.flip = idx === 1; // first pill = otherLang→en, second = en→otherLang
    els.directionGroup.querySelectorAll(".pill").forEach((b) => b.classList.toggle("active", b === btn));
  });
});

function currentPurpose() {
  return PURPOSES.find((p) => p.id === state.purposeId) || PURPOSES[0];
}

function runConversion() {
  const raw = els.rawInput.value.trim();
  if (!raw) {
    els.modeHint.textContent = "กรุณาพิมพ์ข้อความในฉบับร่างก่อนปิดผนึก";
    els.rawInput.focus();
    return;
  }

  let bodyText, targetLang, breakdownMode, breakdownData;

  if (state.mode === "translate") {
    const toEnglish = !state.flip;
    const r = translateText(raw, state.otherLang, toEnglish);
    bodyText = r.text;
    breakdownData = r.breakdown;
    breakdownMode = "translate";
    targetLang = toEnglish ? "en" : state.otherLang;
  } else {
    const lang = detectLang(raw);
    const r = toneUpgrade(raw, lang);
    bodyText = r.text;
    breakdownData = r.breakdown;
    breakdownMode = "tone";
    targetLang = lang;
  }

  const email = buildEmail({
    targetLang,
    recipient: els.recipient.value.trim(),
    sender: els.sender.value.trim(),
    subject: els.subject.value,
    purpose: currentPurpose(),
    bodyText,
  });

  els.outSubject.textContent = email.subject;
  els.outBody.textContent = email.body;
  els.resultSection.classList.remove("hidden");
  lastBreakdown = { mode: breakdownMode, data: breakdownData };

  setTimeout(() => {
    if (els.resultSection.scrollIntoView) {
      els.resultSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, 0);
}

els.sealBtn.addEventListener("click", () => {
  els.sealBtn.classList.add("stamping");
  setTimeout(() => els.sealBtn.classList.remove("stamping"), 460);
  setTimeout(runConversion, 160);
});

els.copyBtn.addEventListener("click", async () => {
  const full = `Subject: ${els.outSubject.textContent}\n\n${els.outBody.textContent}`;
  try {
    await navigator.clipboard.writeText(full);
    els.copyBtn.textContent = "✓ คัดลอกแล้ว";
    els.copyBtn.classList.add("copied");
    setTimeout(() => {
      els.copyBtn.textContent = "📋 คัดลอกอีเมล";
      els.copyBtn.classList.remove("copied");
    }, 1800);
  } catch (e) {
    els.copyBtn.textContent = "คัดลอกไม่สำเร็จ — กรุณาเลือกข้อความเอง";
    setTimeout(() => { els.copyBtn.textContent = "📋 คัดลอกอีเมล"; }, 2200);
  }
});

/* ---------- breakdown modal ---------- */
function renderBreakdownContent() {
  const c = els.breakdownContent;
  c.innerHTML = "";

  if (lastBreakdown.mode === "translate") {
    const note = document.createElement("p");
    note.className = "modal__note";
    note.textContent = "ความหมายของแต่ละคำที่พบในพจนานุกรมภายในระบบ เรียงตามลำดับคำในประโยคต้นฉบับ";
    c.appendChild(note);

    if (lastBreakdown.data.length === 0) {
      const empty = document.createElement("p");
      empty.className = "empty-state";
      empty.textContent = "ไม่พบคำในประโยคนี้";
      c.appendChild(empty);
      return;
    }

    const line = document.createElement("div");
    line.className = "gloss-line";
    lastBreakdown.data.forEach((item) => {
      const w = document.createElement("div");
      w.className = "gloss-word " + (item.status === "particle" ? "particle" : item.status === "unknown" ? "unknown" : item.status === "already" ? "already" : "");
      const orig = document.createElement("div");
      orig.className = "orig";
      orig.textContent = item.word;
      const meaning = document.createElement("div");
      meaning.className = "meaning";
      meaning.textContent = item.meaning;
      w.appendChild(orig);
      w.appendChild(meaning);
      line.appendChild(w);
    });
    c.appendChild(line);
  } else {
    const changed = lastBreakdown.data;
    const summary = document.createElement("p");
    summary.className = "summary-line";
    summary.textContent = `ปรับคำให้เป็นทางการทั้งหมด ${changed.length} คำ`;
    c.appendChild(summary);

    if (changed.length === 0) {
      const empty = document.createElement("p");
      empty.className = "empty-state";
      empty.textContent = "ไม่พบคำไม่เป็นทางการในประโยคนี้ — ข้อความนี้ค่อนข้างเป็นทางการอยู่แล้ว";
      c.appendChild(empty);
      return;
    }

    const list = document.createElement("div");
    list.className = "diff-list";
    changed.forEach((item) => {
      const row = document.createElement("div");
      row.className = "diff-row";
      const oldSpan = document.createElement("span");
      oldSpan.className = "old";
      oldSpan.textContent = item.original;
      const arrow = document.createElement("span");
      arrow.className = "arrow";
      arrow.textContent = "→";
      const newSpan = document.createElement("span");
      newSpan.className = "new" + (item.dropped ? " dropped" : "");
      newSpan.textContent = item.dropped ? "(ตัดออก)" : item.formal;
      row.appendChild(oldSpan);
      row.appendChild(arrow);
      row.appendChild(newSpan);
      list.appendChild(row);
    });
    c.appendChild(list);
  }
}

function openModal() {
  renderBreakdownContent();
  els.breakdownModal.classList.remove("hidden");
  els.breakdownModal.setAttribute("aria-hidden", "false");
}
function closeModal() {
  els.breakdownModal.classList.add("hidden");
  els.breakdownModal.setAttribute("aria-hidden", "true");
}

els.openBreakdownBtn.addEventListener("click", openModal);
els.breakdownModal.querySelectorAll("[data-close]").forEach((el) => el.addEventListener("click", closeModal));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !els.breakdownModal.classList.contains("hidden")) closeModal();
});

/* ---------- init ---------- */
renderPurposeChips();
updateDirectionLabels();
updateModeHint();
