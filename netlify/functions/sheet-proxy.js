import fetch from "node-fetch";

export async function handler(event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const body = JSON.parse(event.body);

  const response = await fetch(
    "https://script.google.com/macros/s/AKfycbxVgDdTS0lKvACu_DUUI-2uES42Zyy3VRNx0monhSj_5-OPIaLTRd4COO2SxwjKqBUhyg/exec",
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
