import { Lead } from "../services/leadService";

export function generatePitch(
  lead: Lead
) {
  return `Hello ${lead.businessName},

I am Mohit Durve from Batangarh News.

We help ${lead.category} businesses in ${lead.city}, ${lead.state} grow using:

• Local Media Coverage
• Instagram Promotions
• Digital Branding
• Audience Reach Campaigns
• Business Visibility Growth

Your business looks highly suitable for local digital promotion.

Would love to connect with you.

Contact:
9424666064
mohit.durve@batangarh.com`;
}