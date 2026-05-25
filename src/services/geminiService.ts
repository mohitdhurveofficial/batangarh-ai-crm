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
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" +
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
              parts: [
                {
                  text: `
Write a short professional WhatsApp outreach message.

Business Name: ${businessName}
Category: ${category}
Location: ${city}, ${state}

Promote:
- Batangarh News
- digital marketing
- branding
- social media growth

Keep message short, human and conversational.
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

    console.log(data);

    if (data.error) {
      return `Error: ${data.error.message}`;
    }

    return (
      data?.candidates?.[0]
        ?.content?.parts?.[0]
        ?.text ||
      "No AI response received."
    );
  } catch (error) {
    console.error(error);

    return "AI request failed.";
  }
}