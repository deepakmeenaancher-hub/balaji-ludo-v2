export default {
  async fetch(request) {
    const url = new URL(request.url);
    let path = url.pathname.toLowerCase();

    // Admin ka alag
    if (path.includes("admin")) {
      const r = await fetch("https://raw.githubusercontent.com/deepakmeenaancher-hub/balaji-ludo-v2/main/admin.html");
      const html = await r.text();
      return new Response(html, {
        headers: { "Content-Type": "text/html;charset=UTF-8" }
      });
    }

    // Baaki sab - wallet, withdraw, refer, support, profile, addcash, qr, pay, home
    // Sabko index.html hi dikhana hai - isse kabhi 404 nahi ayega
    const res = await fetch("https://raw.githubusercontent.com/deepakmeenaancher-hub/balaji-ludo-v2/main/index.html");
    
    if (!res.ok) {
      return new Response("GitHub pe index.html nahi mila. Pehle index.html push karo.", { status: 404 });
    }

    let html = await res.text();

    return new Response(html, {
      headers: {
        "Content-Type": "text/html;charset=UTF-8",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
}
