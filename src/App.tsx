import { useEffect, useMemo, useState } from "react";
import "./App.css";

const states = [
  "Madhya Pradesh",
  "Maharashtra",
  "Delhi",
  "Karnataka",
  "Gujarat",
  "Tamil Nadu",
  "Rajasthan",
  "Punjab",
  "Uttar Pradesh",
  "West Bengal",
  "Haryana",
  "Bihar",
];

const cities = [
  "Indore",
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Ahmedabad",
  "Chennai",
  "Jaipur",
  "Lucknow",
  "Bhopal",
  "Pune",
  "Noida",
  "Gurgaon",
  "Nagpur",
  "Kolkata",
  "Patna",
  "Jabalpur",
  "Raipur",
  "Sagar",
  "Chhindwara",
  "Surat",
];

const categories = [
  "Restaurants",
  "Hospitals",
  "Hotels",
  "Schools",
  "Real Estate",
  "Gyms",
  "Clinics",
  "Jewellers",
  "Electronics",
  "Fashion",
  "Automobiles",
  "Salons",
];

const prefixes = [
  "Royal",
  "Modern",
  "Prime",
  "Elite",
  "Golden",
  "Urban",
  "Future",
  "National",
  "Star",
  "Capital",
];

const suffixes = [
  "Group",
  "Solutions",
  "Builders",
  "Enterprises",
  "Hub",
  "World",
  "Mart",
  "Services",
  "Ventures",
  "Point",
];

function generateLeads() {
  return Array.from({ length: 300 }, (_, i) => {
    const state =
      states[Math.floor(Math.random() * states.length)];

    const city =
      cities[Math.floor(Math.random() * cities.length)];

    const category =
      categories[
        Math.floor(Math.random() * categories.length)
      ];

    const businessName =
      prefixes[
        Math.floor(Math.random() * prefixes.length)
      ] +
      " " +
      suffixes[
        Math.floor(Math.random() * suffixes.length)
      ];

    const score =
      Math.floor(Math.random() * 40) + 60;

    return {
      id: i + 1,

      businessName,

      ownerName:
        [
          "Rahul",
          "Amit",
          "Vikas",
          "Rohit",
          "Ankit",
          "Mohit",
          "Suresh",
        ][Math.floor(Math.random() * 7)],

      category,

      city,

      state,

      phone: `9${Math.floor(
        100000000 + Math.random() * 900000000
      )}`,

      whatsapp: `9${Math.floor(
        100000000 + Math.random() * 900000000
      )}`,

      email: `${businessName
        .replace(/\s/g, "")
        .toLowerCase()}@gmail.com`,

      instagram: `@${businessName
        .replace(/\s/g, "")
        .toLowerCase()}`,

      website: `www.${businessName
        .replace(/\s/g, "")
        .toLowerCase()}.com`,

      aiScore: score,

      monthlyAdBudget:
        ["₹5k", "₹10k", "₹25k", "₹50k"][
          Math.floor(Math.random() * 4)
        ],

      leadTemperature:
        ["Cold", "Warm", "Hot"][
          Math.floor(Math.random() * 3)
        ],

      lastContact:
        ["Never", "2 days ago", "1 week ago"][
          Math.floor(Math.random() * 3)
        ],

      followUpDate: "Tomorrow",

      aiSuggestion:
        "Pitch Instagram + local news package",

      status: "New",

      notes: "",
    };
  });
}

export default function App() {
  const [activeTab, setActiveTab] =
    useState("Dashboard");

  const [search, setSearch] =
    useState("");

  const [selectedState, setSelectedState] =
    useState("All");

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [leads, setLeads] = useState(() => {
    const saved = localStorage.getItem(
      "batangarh-ai-crm"
    );

    return saved
      ? JSON.parse(saved)
      : generateLeads();
  });

  useEffect(() => {
    localStorage.setItem(
      "batangarh-ai-crm",
      JSON.stringify(leads)
    );
  }, [leads]);

  const filteredLeads = useMemo(() => {
    return leads.filter((lead: any) => {
      const matchesSearch =
        lead.businessName
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        lead.city
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        lead.category
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesState =
        selectedState === "All" ||
        lead.state === selectedState;

      const matchesCategory =
        selectedCategory === "All" ||
        lead.category === selectedCategory;

      return (
        matchesSearch &&
        matchesState &&
        matchesCategory
      );
    });
  }, [
    leads,
    search,
    selectedState,
    selectedCategory,
  ]);

  const stats = {
    total: leads.length,

    interested: leads.filter(
      (l: any) => l.status === "Interested"
    ).length,

    closed: leads.filter(
      (l: any) => l.status === "Closed"
    ).length,

    hot: leads.filter(
      (l: any) => l.leadTemperature === "Hot"
    ).length,

    averageAI: Math.floor(
      leads.reduce(
        (a: number, b: any) => a + b.aiScore,
        0
      ) / leads.length
    ),
  };

  const copyPitch = (lead: any) => {
    const text = `Hello ${lead.businessName},

I am Mohit Durve from Batangarh News.

We help ${lead.category} businesses in ${lead.city} grow through:
• Instagram Promotions
• Local News Marketing
• Business Branding
• Social Media Reach

Would love to collaborate with your business.

Contact:
9424666064
mohit.durve@batangarh.com`;

    navigator.clipboard.writeText(text);

    alert("AI Pitch Copied");
  };

  const exportCSV = () => {
    const csv =
      "Business,Category,City,State,Phone,Email\n" +
      leads
        .map(
          (l: any) =>
            `${l.businessName},${l.category},${l.city},${l.state},${l.phone},${l.email}`
        )
        .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv",
    });

    const url =
      window.URL.createObjectURL(blob);

    const a =
      document.createElement("a");

    a.href = url;

    a.download = "batangarh-leads.csv";

    a.click();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "white",
        fontFamily: "Arial",
        padding: "20px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#facc15",
          fontSize: "42px",
          fontWeight: "bold",
        }}
      >
        Batangarh News AI CRM
      </h1>

      <p
        style={{
          textAlign: "center",
          color: "#94a3b8",
          marginBottom: "30px",
        }}
      >
        Mohit Durve •
        mohit.durve@batangarh.com •
        9424666064
      </p>

      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          flexWrap: "wrap",
          marginBottom: "20px",
        }}
      >
        {[
          "Dashboard",
          "Finder",
          "CRM",
          "Analytics",
        ].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="goldBtn"
            style={{
              background:
                activeTab === tab
                  ? "#facc15"
                  : "#0f172a",
              color:
                activeTab === tab
                  ? "black"
                  : "white",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          marginBottom: "25px",
          justifyContent: "center",
        }}
      >
        <button
          className="goldBtn"
          onClick={exportCSV}
        >
          Export CSV
        </button>

        <button
          className="goldBtn"
          onClick={() =>
            setLeads(generateLeads())
          }
        >
          Regenerate AI Leads
        </button>
      </div>

      {activeTab === "Dashboard" && (
        <div className="grid">
          <div className="card">
            <h2>Total Leads</h2>
            <h1>{stats.total}</h1>
          </div>

          <div className="card">
            <h2>Interested</h2>
            <h1>{stats.interested}</h1>
          </div>

          <div className="card">
            <h2>Closed Deals</h2>
            <h1>{stats.closed}</h1>
          </div>

          <div className="card">
            <h2>Hot Leads</h2>
            <h1>{stats.hot}</h1>
          </div>

          <div className="card">
            <h2>Average AI Score</h2>
            <h1>{stats.averageAI}%</h1>
          </div>
        </div>
      )}

      {(activeTab === "Finder" ||
        activeTab === "CRM") && (
        <>
          <div className="filters">
            <input
              placeholder="Search business..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="input"
            />

            <select
              value={selectedState}
              onChange={(e) =>
                setSelectedState(
                  e.target.value
                )
              }
              className="input"
            >
              <option>All</option>

              {states.map((state) => (
                <option key={state}>
                  {state}
                </option>
              ))}
            </select>

            <select
              value={selectedCategory}
              onChange={(e) =>
                setSelectedCategory(
                  e.target.value
                )
              }
              className="input"
            >
              <option>All</option>

              {categories.map((cat) => (
                <option key={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="leadGrid">
            {filteredLeads.map((lead: any) => (
              <div
                key={lead.id}
                className="leadCard"
              >
                <div className="topRow">
                  <div>
                    <h2>{lead.businessName}</h2>

                    <p>
                      {lead.city},{" "}
                      {lead.state}
                    </p>

                    <p>
                      {lead.category}
                    </p>

                    <p>
                      Owner:{" "}
                      {lead.ownerName}
                    </p>

                    <p>
                      Phone:{" "}
                      {lead.phone}
                    </p>

                    <p>
                      Email:{" "}
                      {lead.email}
                    </p>

                    <p>
                      Instagram:{" "}
                      {
                        lead.instagram
                      }
                    </p>

                    <p>
                      Website:{" "}
                      {lead.website}
                    </p>

                    <p
                      style={{
                        color: "#facc15",
                      }}
                    >
                      AI Score:{" "}
                      {lead.aiScore}
                    </p>

                    <p>
                      Budget:{" "}
                      {
                        lead.monthlyAdBudget
                      }
                    </p>

                    <p
                      style={{
                        color:
                          lead.leadTemperature ===
                          "Hot"
                            ? "#22c55e"
                            : lead.leadTemperature ===
                              "Warm"
                            ? "#facc15"
                            : "#ef4444",
                      }}
                    >
                      Lead Type:{" "}
                      {
                        lead.leadTemperature
                      }
                    </p>

                    <p>
                      Last Contact:{" "}
                      {
                        lead.lastContact
                      }
                    </p>

                    <p>
                      Follow Up:{" "}
                      {
                        lead.followUpDate
                      }
                    </p>

                    <p
                      style={{
                        color: "#facc15",
                      }}
                    >
                      AI Suggestion:{" "}
                      {
                        lead.aiSuggestion
                      }
                    </p>
                  </div>

                  <div>
                    <select
                      value={lead.status}
                      onChange={(e) => {
                        const updated =
                          leads.map(
                            (l: any) =>
                              l.id ===
                              lead.id
                                ? {
                                    ...l,
                                    status:
                                      e
                                        .target
                                        .value,
                                  }
                                : l
                          );

                        setLeads(updated);
                      }}
                      className="statusSelect"
                    >
                      <option>
                        New
                      </option>

                      <option>
                        Interested
                      </option>

                      <option>
                        Closed
                      </option>
                    </select>
                  </div>
                </div>

                <textarea
                  placeholder="Lead Notes..."
                  value={lead.notes}
                  onChange={(e) => {
                    const updated =
                      leads.map((l: any) =>
                        l.id ===
                        lead.id
                          ? {
                              ...l,
                              notes:
                                e.target
                                  .value,
                            }
                          : l
                      );

                    setLeads(updated);
                  }}
                  className="notes"
                />

                <div className="btnRow">
                  <a
                    href={`https://wa.me/91${lead.whatsapp}`}
                    target="_blank"
                  >
                    <button className="goldBtn">
                      WhatsApp
                    </button>
                  </a>

                  <a
                    href={`mailto:${lead.email}`}
                  >
                    <button className="goldBtn">
                      Email
                    </button>
                  </a>

                  <a
                    href={`tel:${lead.phone}`}
                  >
                    <button className="goldBtn">
                      Call
                    </button>
                  </a>

                  <button
                    className="goldBtn"
                    onClick={() =>
                      copyPitch(lead)
                    }
                  >
                    Copy AI Pitch
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === "Analytics" && (
        <div className="card">
          <h2>
            AI Sales Analytics
          </h2>

          <div className="progressBar">
            <div
              className="progress"
              style={{
                width: `${stats.averageAI}%`,
              }}
            />
          </div>

          <p>
            Average Lead Quality:
            {" "}
            {stats.averageAI}%
          </p>

          <p>
            Total Hot Leads:
            {" "}
            {stats.hot}
          </p>

          <p>
            Total Closed Deals:
            {" "}
            {stats.closed}
          </p>
        </div>
      )}
    </div>
  );
}