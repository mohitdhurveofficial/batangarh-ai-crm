export async function generateAIPitch(
  businessName: string,
  category: string,
  city: string,
  state: string
) {
  const templates = [
    `Hi ${businessName},

Came across your profile while checking businesses in ${city}. Honestly felt your ${category.toLowerCase()} business has really good potential online.

We’re working with local businesses through Batangarh News to improve branding and visibility on social media.

Thought I’d connect once and see if we can help in any way.`,

    `Hey ${businessName},

Was just going through businesses from ${state} and your profile caught my attention.

We help businesses get better local reach through promotions, branding and social media visibility with Batangarh News.

No hard selling — just thought it’d be nice to connect once 🙂`,

    `Hi,

I recently came across ${businessName} and felt your business could genuinely attract more people online with the right visibility.

We usually help local ${category.toLowerCase()} businesses with promotions and branding through Batangarh News.

Would be happy to connect sometime if you're open to it.`,
  ];

  const randomIndex = Math.floor(
    Math.random() * templates.length
  );

  return templates[randomIndex];
}