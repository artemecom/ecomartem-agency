export const runtime = "nodejs";

/**
 * Same-origin proxy for lead submissions -> ecom-engine webhook.
 * Browsers post to /api/lead (port 443, never blocked by mobile carriers);
 * the nonstandard :10000 hop happens server-side where it always works.
 */
const ENGINE = "https://shared-brain.tail048cfd.ts.net:10000/lead";

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const r = await fetch(ENGINE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      signal: AbortSignal.timeout(12000),
    });
    return new Response(await r.text(), {
      status: r.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return new Response(JSON.stringify({ ok: false, err: "upstream" }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }
}
