const API_KEY =
  import.meta.env.VITE_GEMINI_API_KEY;

console.log("Gemini Key:", API_KEY);

export async function generateAIPitch(
  businessName: string,
  category: string,
  city: string,
  state: string
) {
  if (!API_KEY) {
    return "Gemini API key missing.";
  }

  const prompt = `
Generate a short professional outreach message.

Business: ${businessName}
Category: ${category}
Location: ${city}, ${state}
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
      "Gemini Full Response:",
      data
    );

    if (
      data.candidates &&
      data.candidates.length > 0
    ) {
      return data.candidates[0]
        .content.parts[0].text;
    }

    return JSON.stringify(data);
  } catch (error) {
    console.error(error);

    return "Gemini request failed.";
  }
}