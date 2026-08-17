const IN = "https://ntfy.sh/st-gv-in-8f3c2a91d4e7";
const OUT = "https://ntfy.sh/st-gv-out-8f3c2a91d4e7";

async function lastMessage(url) {
  const r = await fetch(url + "/json?poll=1", { headers: { Accept: "application/x-ndjson" } });
  if (!r.ok) return null;
  const raw = await r.text();
  const lines = raw.trim().split("\n").filter(Boolean);
  for (let i = lines.length - 1; i >= 0; i--) {
    try {
      const ev = JSON.parse(lines[i]);
      if (ev.event === "message" && ev.message != null) return ev;
    } catch (_) {}
  }
  return null;
}

async function getInbox() {
  const ev = await lastMessage(IN);
  return ev ? String(ev.message) : "";
}

async function setInbox(text) {
  const t = String(text || "");
  await fetch(IN, { method: "POST", body: t });
  return t;
}

async function getOutbox() {
  const ev = await lastMessage(OUT);
  if (!ev) return { ts: 0, text: "" };
  return { ts: Number(ev.time) || 0, text: String(ev.message || "") };
}

async function setOutbox(text) {
  const t = String(text || "");
  const r = await fetch(OUT, { method: "POST", body: t });
  let ts = Date.now() / 1000;
  try {
    const j = await r.json();
    if (j && j.time) ts = j.time;
  } catch (_) {}
  return { ts, text: t };
}

module.exports = { getInbox, setInbox, getOutbox, setOutbox };
