const g = globalThis;
if (!g.__grokvoice) {
  g.__grokvoice = { inbox: "", outbox: { ts: 0, text: "" } };
}

function getInbox() {
  return g.__grokvoice.inbox || "";
}

function setInbox(text) {
  g.__grokvoice.inbox = String(text || "");
  return g.__grokvoice.inbox;
}

function getOutbox() {
  return g.__grokvoice.outbox || { ts: 0, text: "" };
}

function setOutbox(text) {
  g.__grokvoice.outbox = { ts: Date.now() / 1000, text: String(text || "") };
  return g.__grokvoice.outbox;
}

module.exports = { getInbox, setInbox, getOutbox, setOutbox };
