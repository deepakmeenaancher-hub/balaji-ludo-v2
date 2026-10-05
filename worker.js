export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // CORS
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET",
      "Access-Control-Allow-Headers": "Content-Type"
    };

    if (request.method === "OPTIONS") return new Response(null, {headers});

    // 1. Send OTP - /api/send-otp
    if (url.pathname === "/api/send-otp" && request.method === "POST") {
      const { phone } = await request.json();
      const otp = Math.floor(100000 + Math.random()*900000);

      // Fast2SMS - Yahan apni API Key dalna
      const FAST2SMS_KEY = env.FAST2SMS_KEY || "YOUR_FAST2SMS_KEY";

      try {
        // Real SMS bhejega
        // await fetch("https://www.fast2sms.com/dev/bulkV2", {
        // method: "POST",
        // headers: { "authorization": FAST2SMS_KEY, "Content-Type": "application/json" },
        // body: JSON.stringify({ route: "otp", variables_values: otp, numbers: phone })
        // });

        // Abhi ke liye D1 me save kar rahe hai
        // await env.DB.prepare("INSERT INTO users (phone, otp) VALUES (?,?)").bind(phone, otp).run();

        return new Response(JSON.stringify({ success: true, otp: otp, message: "OTP sent from HOXTNT" }), { headers: {...headers, "Content-Type":"application/json"}});
      } catch(e) {
        return new Response(JSON.stringify({ success: false, error: e.message }), { headers });
      }
    }

    // 2. Verify OTP
    if (url.pathname === "/api/verify-otp" && request.method === "POST") {
      return new Response(JSON.stringify({ success: true, token: "verified" }), { headers: {"Content-Type":"application/json",...headers} });
    }

    return new Response("Balaji Ludo API Running - Use /api/send-otp", { headers });
  }
}
