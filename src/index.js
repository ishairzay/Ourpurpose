// Our Purpose website: serves the static site and saves launch-list signups.
// Signups are stored in the Cloudflare D1 database "ourpurpose-signups" (table: subscribers).

const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/;

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
}

async function subscribe(request, env) {
  if (request.method !== "POST") return json({ ok: false, error: "Method not allowed" }, 405);

  // Only accept signups sent from this website.
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).hostname !== new URL(request.url).hostname) {
    return json({ ok: false, error: "Forbidden" }, 403);
  }

  let data;
  try {
    data = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid request" }, 400);
  }


  const email = String(data.email || "").trim().toLowerCase();
  if (email.length > 254 || !EMAIL_RE.test(email)) {
    return json({ ok: false, error: "Please enter a valid email address." }, 400);
  }
  // Hidden trap field: real people leave it empty, most spam bots fill it in.
  // Flagged signups are still saved (never lost), just marked so you can review them.
  let source = String(data.source || "website").slice(0, 40);
  if (data.hp) source += " (check: possible spam)";

  await env.DB.prepare("INSERT OR IGNORE INTO subscribers (email, source) VALUES (?, ?)")
    .bind(email, source)
    .run();

  return json({ ok: true });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/subscribe") return subscribe(request, env);
    return env.ASSETS.fetch(request);
  },
};
