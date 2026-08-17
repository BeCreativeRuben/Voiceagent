const { setOutbox } = require("../lib/store");

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });
  const text = String((req.body && req.body.text) || "").trim();
  if (!text) return res.status(400).json({ error: "empty" });
  const box = setOutbox(text);
  return res.status(200).json({ ok: true, ts: box.ts });
};
