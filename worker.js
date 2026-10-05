export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    let path = url.pathname;

    // Default page login pe bhejo
    if (path === "/" || path === "/index") {
      path = "/index.html";
    }

    // Agar .html nahi hai to .html jod do
    if (!path.includes(".")) {
      path = path + ".html";
    }

    // GitHub RAW se file lao
    const githubUrl = `https://raw.githubusercontent.com/deepakmeenaancher-hub/balaji-ludo-v2/main${path}`;
    
    let response = await fetch(githubUrl);

    // Agar file nahi mili to index.html dikhao
    if (!response.ok) {
      response = await fetch(`https://raw.githubusercontent.com/deepakmeenaancher-hub/balaji-ludo-v2/main/index.html`);
    }

    let content = await response.text();
    
    // Content-Type sahi set karo
    let contentType = "text/html;charset=UTF-8";
    if (path.endsWith(".js")) contentType = "application/javascript";
    if (path.endsWith(".css")) contentType = "text/css";
    if (path.endsWith(".json")) contentType = "application/json";

    return new Response(content, {
      headers: {
        "Content-Type": contentType,
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-cache"
      }
    });
  }
}
