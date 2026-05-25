const API_KEY =
  import.meta.env.VITE_GEMINI_API_KEY;

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
- conversational
- human
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

    console.log(
      "Gemini Response:",
      data
    );

    if (
      data.candidates &&
      data.candidates.length > 0
    ) {
      return data.candidates[0]
        .content.parts[0].text;
    }

    return "Unable to generate AI pitch.";
  } catch (error) {
    console.error(error);

    return "AI request failed.";
  }
}