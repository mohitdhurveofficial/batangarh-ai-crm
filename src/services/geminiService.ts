export async function generateAIPitch(
  businessName: string,
  category: string,
  city: string,
  state: string
) {
  const templates = [
    `Hi ${businessName},

Hope you're doing well. Came across your ${category.toLowerCase()} business and genuinely felt you can grow much more online locally in ${city}.

We help businesses with branding, promotions and social media growth through Batangarh News.

Would love to connect once if you're open to it.`,

    `Hey ${businessName},

Just saw your business profile and thought of reaching out.

We work with local ${category.toLowerCase()} businesses across ${state} to improve visibility and attract more customers through social media promotions and branding.

Let me know if you'd like to discuss sometime.`,

    `Hi,

I was checking businesses in ${city} and found ${businessName}. Honestly felt your ${category.toLowerCase()} business has strong online growth potential.

At Batangarh News we help businesses with local promotions, branding and digital reach.

Would you be interested in a quick conversation sometime this week?`,
  ];

  const randomIndex = Math.floor(
    Math.random() * templates.length
  );

  return templates[randomIndex];
}