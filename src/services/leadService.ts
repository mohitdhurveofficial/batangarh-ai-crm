import {
  businessCategories,
  cities,
  leadTemperatures,
  states,
} from "../data";

export interface Lead {
  id: number;
  businessName: string;
  category: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  aiScore: number;
  temperature: string;
  status: string;
  notes: string;
}

export function generateLeads(
  count = 200
): Lead[] {
  const names = [
    "Prime",
    "Modern",
    "Royal",
    "Smart",
    "Future",
    "Elite",
    "Urban",
    "National",
    "Dynamic",
    "Vision",
  ];

  const suffixes = [
    "Mart",
    "Builders",
    "Solutions",
    "Traders",
    "Hub",
    "Group",
    "Enterprises",
    "Studio",
    "Agency",
  ];

  return Array.from(
    { length: count },
    (_, i) => {
      const category =
        businessCategories[
          Math.floor(
            Math.random() *
              businessCategories.length
          )
        ];

      const city =
        cities[
          Math.floor(
            Math.random() *
              cities.length
          )
        ];

      const state =
        states[
          Math.floor(
            Math.random() *
              states.length
          )
        ];

      const businessName = `${
        names[
          Math.floor(
            Math.random() *
              names.length
          )
        ]
      } ${
        suffixes[
          Math.floor(
            Math.random() *
              suffixes.length
          )
        ]
      }`;

      return {
        id: i + 1,

        businessName,

        category,

        city,

        state,

        phone: `9${Math.floor(
          100000000 +
            Math.random() *
              900000000
        )}`,

        email:
          businessName
            .replace(/\s/g, "")
            .toLowerCase() +
          "@gmail.com",

        aiScore:
          Math.floor(
            Math.random() * 40
          ) + 60,

        temperature:
          leadTemperatures[
            Math.floor(
              Math.random() *
                leadTemperatures.length
            )
          ],

        status: "New",

        notes: "",
      };
    }
  );
}