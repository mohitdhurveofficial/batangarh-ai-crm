export async function generateAIPitch(
  businessName: string,
  category: string,
  city: string,
  state: string
) {
  const templates = [
    `Hi ${businessName},

We help ${category.toLowerCase()} businesses in ${city} grow through social media marketing, branding and local promotions with Batangarh News.

Would love to discuss how we can help increase your customer reach.`,

    `Hello ${businessName},

Batangarh News helps local businesses across ${state} with digital marketing, branding, social media growth and local audience reach.

Interested in a quick discussion for your business growth?`,

    `Hi ${businessName},

We noticed your ${category.toLowerCase()} business in ${city} and believe it has strong online growth potential.

Batangarh News can help with promotions, branding and social media growth.

Would you like to connect once?`,
  ];

  const randomIndex = Math.floor(
    Math.random() * templates.length
  );

  return templates[randomIndex];
}