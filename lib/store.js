const IN = "https://ntfy.sh/st-gv-in-8f3c2a91d4e7";
const OUT = "https://ntfy.sh/st-gv-out-8f3c2a91d4e7";

async function lastMessage(url) {
  const r = await fetch(url + "/json?poll=1", { headers: { Accept: "application/x-ndjson" } });
  if (!r.ok) return null;
  const raw = await r.text();
  let best = null;
  for (const line of raw.trim().split("\n").filter(Boolean)) {
    try {
      const ev = JSON.parse(line);
      if (ev.event === "message" && ev.message != null) {
        if (!best || Number(ev.time) > Number(best.time)) best = ev;
      }
    } catch (_) {}
  }
  return best;
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
