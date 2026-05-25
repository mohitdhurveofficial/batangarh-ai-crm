const API_KEY =
  import.meta.env.VITE_GEMINI_API_KEY;

export async function generateAIPitch(
  businessName: string,
  category: string,
  city: string,
  state: string
) {
  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" +
        API_KEY,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          contents: [
            {
              role: "user",

              parts: [
                {
                  text: `
Write a short professional WhatsApp outreach message.

Business Name: ${businessName}
Category: ${category}
Location: ${city}, ${state}

Promote:
- Batangarh News
- social media marketing
- branding
- digital growth

Keep it:
- short
- conversational
- human
- professional
`,
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

    if (data.error) {
      return `Error: ${data.error.message}`;
    }

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