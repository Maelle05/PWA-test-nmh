import fetch from "node-fetch";

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const response = await fetch(
    "https://script.google.com/macros/s/AKfycbzhQaEurnr09b20ASqoWaGUUr18LNuFK6HziWuYNEOQBiVOMl8ldFE4iHdN8oi-kLk4tw/exec",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: event.body,
    },
  );

  const data = await response.text();

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: data,
  };
}
