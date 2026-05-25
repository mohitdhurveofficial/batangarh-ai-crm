const API_KEY =
  "AIzaSyAnpGnk8V6MDeara3TSJ7Vzwhss3Xpv7Xw";

export async function generateAIPitch(
  businessName: string,
  category: string,
  city: string,
  state: string
) {
  const prompt = `
Generate a short professional WhatsApp outreach message.

Business Name: ${businessName}
Category: ${category}
City: ${city}
State: ${state}

Promote:
- Batangarh News
- digital marketing
- branding
- social media growth

Keep message:
- short
- human
- conversational
- high converting
`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      }
    );

    const data =
      await response.json();

    console.log(data);

    return (
      data?.candidates?.[0]
        ?.content?.parts?.[0]
        ?.text ||
      "Unable to generate AI pitch."
    );
  } catch (error) {
    console.error(error);

    return "AI request failed.";
  }
}