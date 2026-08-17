const { getOutbox } = require("../lib/store");

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "GET") return res.status(405).json({ error: "GET only" });
  const since = parseFloat(req.query.since || "0") || 0;
  const box = getOutbox();
  if (!box.ts || box.ts <= since) return res.status(200).json({});
  return res.status(200).json({ ts: box.ts, text: box.text });
};
