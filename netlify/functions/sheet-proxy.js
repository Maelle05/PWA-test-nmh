export async function handler(event) {
  try {
    if (event.httpMethod !== "POST" || event.httpMethod !== "GET") {
      return {
        statusCode: 405,
        body: "Method Not Allowed",
      };
    }

    if (event.httpMethod == "POST") {
      const response = await fetch(process.env.GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: event.body,
      });

      const text = await response.text();

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        data = { success: false, message: "Réponse non JSON : " + text };
      }

      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
    } else if (event.httpMethod == "GET") {
      return {
        statusCode: 200,
        headers: {},
        body: JSON.stringify({
          message: "GET method not implemented yet.",
          event: event.body,
        }),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message,
      }),
    };
  }
}
