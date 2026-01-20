export async function handler(event) {
  try {
    // Préflight CORS (important pour POST)
    if (event.httpMethod === "OPTIONS") {
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
        },
        body: "",
      };
    }

    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: "Method Not Allowed",
      };
    }

    if (!process.env.GOOGLE_SCRIPT_URL) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "GOOGLE_SCRIPT_URL is undefined" }),
      };
    }

    const response = await fetch(process.env.GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: event.body,
    });

    const text = await response.text();

    return {
      statusCode: response.status,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: text,
    };
  } catch (err) {
    console.error("Function crash:", err);

    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        error: "Netlify function crashed",
        message: err.message,
      }),
    };
  }
}
