/*
Get your Twilio accountSid, authToken and phone number after logging in. More details
on https://www.twilio.com/docs
*/
const accountSid = "AC07faba98ea798a2ba8d19e2f30ae45fd";
const authToken = "79240cb04d1f9ce934760ea317b029fa";
const client = require("twilio")(accountSid, authToken);

module.exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const payload = JSON.parse(event.body);

  try {
    await client.messages.create({
      body: payload.message,
      from: "+19592142428", // your Twilio Phone number (https://www.twilio.com/docs/phone-numbers)
      to: payload.to,
    });
    return {
      statusCode: 200,
      body: "Message successfully sent.",
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};
