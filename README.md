# Grok Voice

Public phone page: hold-to-talk, Web Speech API on the device.
Overview Master is the brain. This repo is mouth/ears only.

- `POST /api/heard` `{ "text": "..." }` — last thing Ruben said
- `GET /api/inbox` — read that text
- `POST /api/say` `{ "text": "..." }` — queue a spoken reply
- `GET /api/poll?since=<unix>` — phone picks up new replies
