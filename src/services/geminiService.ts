const API_KEY = "AIzaSyAnpGnk8V6MDeara3TSJ7Vzwhss3Xpv7Xw";

export async function generateAIPitch(
  businessName: string,
  category: string,
  city: string,
  state: string
) {
  const prompt = `
Generate a professional outreach message for this business.

Business Name: ${businessName}
Category: ${category}
City: ${city}
State: ${state}

The message should:
- sound human
- be professional
- promote Batangarh News
- mention digital marketing
- mention local branding
- be concise and high converting
`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
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

    const data = await response.json();

    return (
      data?.candidates?.[0]?.content
        ?.parts?.[0]?.text ||
      "Unable to generate AI pitch."
    );
  } catch (error) {
    console.error(error);

    return "AI generation failed.";
  }
}