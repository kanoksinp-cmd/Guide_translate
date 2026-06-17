/* =========================================================
   Smart Mail Desk
   Rule-based (no external AI) Thai <-> English email helper.
   Everything below runs entirely in the browser.
   ========================================================= */

/* ---------------------------------------------------------
   1. DICTIONARIES
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
const SEGMENT_DICT = Object.assign({}, TH_EN, TH_CASUAL);

/* ---------------------------------------------------------
   2. TOKENIZER + SEGMENTATION
   --------------------------------------------------------- */
function segmentThai(text, dict) {
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

function splitRuns(text) {
  const re = /([ก-๙]+)|([A-Za-z']+)|([0-9]+)|(\s+)|([^\sA-Za-z0-9ก-๙]+)/g;
  const runs = [];
  let m;
  while ((m = re.exec(text)) !== null) {
    if (m[1]) runs.push({ type: "th", text: m[1] });
    else if (m[2]) runs.push({ type: "en", text: m[2] });
    else if (m[3]) runs.push({ type: "num", text: m[3] });
    else if (m[4]) runs.push({ type: "space", text: m[4] });
    else runs.push({ type: "punct", text: m[5] });
  }
  return runs;
}

function tokenizeForEngine(text) {
  const runs = splitRuns(text);
  const tokens = [];
  for (const run of runs) {
    if (run.type === "th") {
      const segs = segmentThai(run.text, SEGMENT_DICT);
      for (const s of segs) tokens.push({ kind: "th", text: s.text, known: s.known });
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
function resolveEnglishWord(word) {
  const lower = word.toLowerCase();
  if (Object.prototype.hasOwnProperty.call(EN_TH, lower)) {
    return { meaning: EN_TH[lower] };
  }
  if (Object.prototype.hasOwnProperty.call(EN_CASUAL, lower)) {
    const normalized = EN_CASUAL[lower].toLowerCase();
    if (normalized === "") return { meaning: "" };
    if (Object.prototype.hasOwnProperty.call(EN_TH, normalized)) {
      return { meaning: EN_TH[normalized] };
    }
    const parts = normalized.split(/\s+/)
      .map((w) => (Object.prototype.hasOwnProperty.call(EN_TH, w) ? EN_TH[w] : w))
      .filter((w) => w !== "");
    return { meaning: parts.join(" ") };
  }
  return null;
}

function translateText(text, direction) {
  const tokens = tokenizeForEngine(text);
  const outParts = [];
  const breakdown = [];
  for (const t of tokens) {
    if (t.kind === "space") continue;
    if (t.kind === "punct") { outParts.push({ text: t.text, glue: true }); continue; }
    if (t.kind === "num") { outParts.push({ text: t.text, glue: false }); continue; }

    const srcWord = t.text;
    let meaning;
    if (direction === "th2en") {
      meaning = Object.prototype.hasOwnProperty.call(TH_EN, srcWord) ? TH_EN[srcWord] : null;
    } else {
      const resolved = resolveEnglishWord(srcWord);
      meaning = resolved ? resolved.meaning : null;
    }

    if (meaning === null) {
      outParts.push({ text: srcWord, glue: false });
      breakdown.push({ word: srcWord, meaning: "(ไม่พบในพจนานุกรม)", status: "unknown" });
    } else if (meaning === "") {
      breakdown.push({ word: srcWord, meaning: "คำลงท้าย/คำเสริมแสดงความสุภาพ — ไม่มีคำแปลตรง", status: "particle" });
    } else {
      outParts.push({ text: meaning, glue: false });
      breakdown.push({ word: srcWord, meaning, status: "translated" });
    }
  }

  let result = "";
  for (const p of outParts) {
    result = result.length === 0 ? p.text : result + (p.glue ? "" : " ") + p.text;
  }
  result = result.replace(/\s+/g, " ").trim();
  if (direction === "th2en") result = capitalizeSentences(result);
  return { text: result, breakdown };
}

/* ---------------------------------------------------------
   4. TONE-ONLY MODE (same language, casual -> formal)
   --------------------------------------------------------- */
function toneUpgrade(text, lang) {
  const tokens = tokenizeForEngine(text);
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
const PURPOSES = [
  { id: "general", th: "ทั่วไป", en: "General",
    subjectTh: "เรื่องทั่วไป", subjectEn: "General Inquiry",
    closingTh: "ขอแสดงความนับถือ", closingEn: "Best regards," },
  { id: "request", th: "ขอความช่วยเหลือ", en: "Request",
    subjectTh: "ขอความช่วยเหลือ", subjectEn: "Request for Assistance",
    closingTh: "ขอความกรุณาพิจารณาและแจ้งให้ทราบด้วย จะเป็นพระคุณอย่างยิ่ง\n\nขอแสดงความนับถือ",
    closingEn: "I would appreciate your kind assistance with this matter.\n\nBest regards," },
  { id: "followup", th: "ติดตามความคืบหน้า", en: "Follow-up",
    subjectTh: "ติดตามความคืบหน้า", subjectEn: "Follow-up",
    closingTh: "ขอบคุณที่ติดตามเรื่องนี้ และขออภัยในความไม่สะดวก\n\nขอแสดงความนับถือ",
    closingEn: "Thank you for your attention to this matter.\n\nBest regards," },
  { id: "thanks", th: "ขอบคุณ", en: "Thank you",
    subjectTh: "ขอบคุณ", subjectEn: "Thank You",
    closingTh: "ขอบคุณอีกครั้งสำหรับความช่วยเหลือ\n\nด้วยความขอบคุณ",
    closingEn: "Thank you again for your help.\n\nKind regards," },
  { id: "apology", th: "ขอโทษ / แจ้งปัญหา", en: "Apology / Issue",
    subjectTh: "ขออภัยในความไม่สะดวก", subjectEn: "Apology / Issue Report",
    closingTh: "ขออภัยในความไม่สะดวกที่เกิดขึ้น และจะดำเนินการแก้ไขโดยเร็วที่สุด\n\nขอแสดงความนับถือ",
    closingEn: "I apologize for any inconvenience this may have caused.\n\nSincerely," },
];

function buildEmail({ targetLang, recipient, sender, subject, purpose, bodyText }) {
  const isTh = targetLang === "th";
  const greeting = isTh ? `เรียน ${recipient || "[ชื่อผู้รับ]"},` : `Dear ${recipient || "[Recipient Name]"},`;
  const closing = isTh ? purpose.closingTh : purpose.closingEn;
  const sign = sender || (isTh ? "[ชื่อผู้ส่ง]" : "[Your Name]");
  const subj = subject && subject.trim() ? subject.trim() : (isTh ? purpose.subjectTh : purpose.subjectEn);
  const body = [greeting, "", bodyText, "", closing, sign].join("\n");
  return { subject: subj, body };
}

/* ---------------------------------------------------------
   6. DOM WIRING
   --------------------------------------------------------- */
const state = { mode: "translate", dir: "th2en", purposeId: "general" };
let lastBreakdown = { mode: "translate", data: [] };

const els = {
  modeGroup: document.getElementById("modeGroup"),
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
    btn.textContent = `${p.th} · ${p.en}`;
    btn.dataset.purpose = p.id;
    btn.addEventListener("click", () => {
      state.purposeId = p.id;
      [...els.purposeGroup.children].forEach((c) => c.classList.toggle("active", c === btn));
    });
    els.purposeGroup.appendChild(btn);
  });
}

function updateModeHint() {
  els.modeHint.textContent = state.mode === "translate"
    ? "โหมดนี้แปลข้อความข้ามภาษาแบบคำต่อคำจากพจนานุกรมในตัว แล้วจัดเป็นอีเมลทางการ — ไวยากรณ์อาจไม่สมบูรณ์เท่าการแปลโดยคนหรือ AI จริง"
    : "โหมดนี้ไม่แปลภาษา แต่จะปรับคำที่ไม่เป็นทางการให้เหมาะกับอีเมลธุรกิจ ในภาษาเดียวกับข้อความต้นฉบับ (ตรวจจากตัวอักษรในข้อความอัตโนมัติ)";
}

els.modeGroup.querySelectorAll(".pill").forEach((btn) => {
  btn.addEventListener("click", () => {
    state.mode = btn.dataset.mode;
    els.modeGroup.querySelectorAll(".pill").forEach((b) => b.classList.toggle("active", b === btn));
    els.directionGroup.classList.toggle("hidden", state.mode !== "translate");
    updateModeHint();
  });
});

els.directionGroup.querySelectorAll(".pill").forEach((btn) => {
  btn.addEventListener("click", () => {
    state.dir = btn.dataset.dir;
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
    const r = translateText(raw, state.dir);
    bodyText = r.text;
    breakdownData = r.breakdown;
    breakdownMode = "translate";
    targetLang = state.dir === "th2en" ? "en" : "th";
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
      w.className = "gloss-word " + (item.status === "particle" ? "particle" : item.status === "unknown" ? "unknown" : "");
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
updateModeHint();
