import { useEffect, useMemo, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import {
  states,
  cities,
  businessCategories,
  leadTemperatures,
} from "./data";

type LeadStatus = "New" | "Interested" | "Closed";

interface Lead {
  id: number;
  businessName: string;
  category: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  aiScore: number;
  temperature: string;
  status: LeadStatus;
  notes: string;
}

function generateRandomLead(id: number): Lead {
  const category =
    businessCategories[
      Math.floor(Math.random() * businessCategories.length)
    ];

  const city =
    cities[Math.floor(Math.random() * cities.length)];

  const state =
    states[Math.floor(Math.random() * states.length)];

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

  const suffix = [
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

  const businessName = `${
    names[Math.floor(Math.random() * names.length)]
  } ${
    suffix[Math.floor(Math.random() * suffix.length)]
  }`;

  return {
    id,

    businessName,

    category,

    city,

    state,

    phone: `9${Math.floor(
      100000000 + Math.random() * 900000000
    )}`,

    email:
      businessName
        .replace(/\s/g, "")
        .toLowerCase() + "@gmail.com",

    aiScore:
      Math.floor(Math.random() * 40) + 60,

    temperature:
      leadTemperatures[
        Math.floor(
          Math.random() * leadTemperatures.length
        )
      ],

    status: "New",

    notes: "",
  };
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

  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    const saved =
      localStorage.getItem("batangarh-leads");

    if (saved) {
      setLeads(JSON.parse(saved));
    } else {
      const generated = Array.from(
        { length: 200 },
        (_, i) => generateRandomLead(i + 1)
      );

      setLeads(generated);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "batangarh-leads",
      JSON.stringify(leads)
    );
  }, [leads]);

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch =
        lead.businessName
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

  const interestedLeads = leads.filter(
    (lead) => lead.status === "Interested"
  ).length;

  const closedDeals = leads.filter(
    (lead) => lead.status === "Closed"
  ).length;

  const averageAiScore =
    leads.length > 0
      ? Math.floor(
          leads.reduce(
            (acc, lead) => acc + lead.aiScore,
            0
          ) / leads.length
        )
      : 0;

  const updateStatus = (
    id: number,
    status: LeadStatus
  ) => {
    setLeads((prev) =>
      prev.map((lead) =>
        lead.id === id
          ? { ...lead, status }
          : lead
      )
    );
  };

  const updateNotes = (
    id: number,
    notes: string
  ) => {
    setLeads((prev) =>
      prev.map((lead) =>
        lead.id === id
          ? { ...lead, notes }
          : lead
      )
    );
  };

  const generatePitch = (lead: Lead) => {
    return `Hello ${lead.businessName},

Batangarh News can help grow your ${lead.category} business in ${lead.city}, ${lead.state} through digital branding, local promotion and media coverage.

Let's connect.

Mohit Durve
Batangarh News
9424666064`;
  };

  const exportCSV = () => {
    const rows = [
      [
        "Business",
        "Category",
        "City",
        "State",
        "Phone",
        "Email",
        "AI Score",
        "Status",
      ],

      ...leads.map((lead) => [
        lead.businessName,
        lead.category,
        lead.city,
        lead.state,
        lead.phone,
        lead.email,
        lead.aiScore,
        lead.status,
      ]),
    ];

    const csvContent = rows
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download = "batangarh-leads.csv";

    link.click();
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="title">
          Batangarh News AI CRM
        </h1>

        <p className="subtitle">
          Mohit Durve •
          mohit.durve@batangarh.com •
          9424666064
        </p>

        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <div className="toolbar">
          <button onClick={exportCSV}>
            Export CSV
          </button>

          <button
            onClick={() => {
              const generated =
                Array.from(
                  { length: 200 },
                  (_, i) =>
                    generateRandomLead(i + 1)
                );

              setLeads(generated);
            }}
          >
            Regenerate AI Leads
          </button>
        </div>

        {activeTab === "Dashboard" && (
          <div className="dashboard-grid">
            <div className="card">
              <h2>Total Leads</h2>
              <p>{leads.length}</p>
            </div>

            <div className="card">
              <h2>Interested Leads</h2>
              <p>{interestedLeads}</p>
            </div>

            <div className="card">
              <h2>Closed Deals</h2>
              <p>{closedDeals}</p>
            </div>

            <div className="card">
              <h2>Average AI Score</h2>
              <p>{averageAiScore}</p>
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
              />

              <select
                value={selectedState}
                onChange={(e) =>
                  setSelectedState(
                    e.target.value
                  )
                }
              >
                <option>All States</option>

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
              >
                <option>
                  All Categories
                </option>

                {businessCategories.map(
                  (category) => (
                    <option key={category}>
                      {category}
                    </option>
                  )
                )}
              </select>
            </div>

            <div className="lead-grid">
              {filteredLeads.map((lead) => (
                <div
                  className="lead-card"
                  key={lead.id}
                >
                  <div className="lead-top">
                    <div>
                      <h2>
                        {lead.businessName}
                      </h2>

                      <p>
                        {lead.city},{" "}
                        {lead.state}
                      </p>

                      <p>
                        {lead.category}
                      </p>

                      <p className="score">
                        AI Score:{" "}
                        {lead.aiScore}
                      </p>

                      <p>
                        {lead.phone}
                      </p>

                      <p>
                        {lead.email}
                      </p>

                      <p
                        style={{
                          color:
                            lead.temperature ===
                            "Hot"
                              ? "#22c55e"
                              : lead.temperature ===
                                "Warm"
                              ? "#facc15"
                              : "#ef4444",
                        }}
                      >
                        {lead.temperature} Lead
                      </p>
                    </div>

                    <select
                      value={lead.status}
                      onChange={(e) =>
                        updateStatus(
                          lead.id,
                          e.target
                            .value as LeadStatus
                        )
                      }
                    >
                      <option>New</option>

                      <option>
                        Interested
                      </option>

                      <option>
                        Closed
                      </option>
                    </select>
                  </div>

                  <textarea
                    placeholder="Lead Notes..."
                    value={lead.notes}
                    onChange={(e) =>
                      updateNotes(
                        lead.id,
                        e.target.value
                      )
                    }
                  />

                  <div className="actions">
                    <a
                      href={`https://wa.me/91${lead.phone}`}
                      target="_blank"
                    >
                      WhatsApp
                    </a>

                    <a
                      href={`mailto:${lead.email}`}
                    >
                      Email
                    </a>

                    <a
                      href={`tel:${lead.phone}`}
                    >
                      Call
                    </a>

                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(
                          generatePitch(lead)
                        );

                        alert(
                          "AI Pitch Copied"
                        );
                      }}
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
          <div className="dashboard-grid">
            <div className="card">
              <h2>Hot Leads</h2>

              <p>
                {
                  leads.filter(
                    (lead) =>
                      lead.temperature ===
                      "Hot"
                  ).length
                }
              </p>
            </div>

            <div className="card">
              <h2>Warm Leads</h2>

              <p>
                {
                  leads.filter(
                    (lead) =>
                      lead.temperature ===
                      "Warm"
                  ).length
                }
              </p>
            </div>

            <div className="card">
              <h2>Cold Leads</h2>

              <p>
                {
                  leads.filter(
                    (lead) =>
                      lead.temperature ===
                      "Cold"
                  ).length
                }
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}