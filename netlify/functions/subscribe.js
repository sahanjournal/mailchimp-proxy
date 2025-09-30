import crypto from "crypto";
import fetch from "node-fetch";

export async function handler(event) {
  try {
    const { email, city } = JSON.parse(event.body);

    if (!email || !city) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Email and city are required" }),
      };
    }

    const dc = "us20";
    const apiKey = process.env.MAILCHIMP_API_KEY;
    const listId = process.env.MAILCHIMP_AUDIENCE_ID; // Sahan Journal main newsletter audience ID

    // Build subscriber hash
    const subscriberHash = crypto
      .createHash("md5")
      .update(email.toLowerCase())
      .digest("hex");

    // Tag based on city
    const tag =
      city === "st-paul"
        ? "Meet Your Mayor St. Paul"
        : "Meet Your Mayor Minneapolis";

    // Prepare subscriber data
    const payload = {
      email_address: email,
      status_if_new: "subscribed", // creates if not exists, updates if exists
      tags: [tag],
    };

    // Add or update subscriber
    const response = await fetch(
      `https://${dc}.api.mailchimp.com/3.0/lists/${listId}/members/${subscriberHash}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `apikey ${apiKey}`,
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();

    if (response.status >= 400) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: data }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Email subscribed and updated successfully on Mailchimp!",
        data,
      }),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}
