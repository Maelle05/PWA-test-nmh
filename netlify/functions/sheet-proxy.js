import fetch from "node-fetch";

export async function handler(event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const body = JSON.parse(event.body);

  const response = await fetch(
    "https://script.google.com/macros/s/AKfycbzhQaEurnr09b20ASqoWaGUUr18LNuFK6HziWuYNEOQBiVOMl8ldFE4iHdN8oi-kLk4tw/exec",
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    },
  );

  const data = await response.json();

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*", // Important pour Netlify
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
}
