import { useEffect, useMemo, useState } from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import LeadCard from "./components/LeadCard";
import StatsCard from "./components/StatsCard";

import {
  states,
  businessCategories,
} from "./data";

import {
  generateLeads,
  type Lead,
} from "./services/leadService";

import { generatePitch } from "./utils/generatePitch";

import AnalyticsChart from "./charts/AnalyticsChart";

type LeadStatus = "New" | "Interested" | "Closed";

export default function App() {
  const [activeTab, setActiveTab] =
    useState("Dashboard");

  const [search, setSearch] =
    useState("");

  const [selectedState, setSelectedState] =
    useState("All");

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [leads, setLeads] = useState<
    Lead[]
  >([]);

  useEffect(() => {
    const saved =
      localStorage.getItem(
        "batangarh-leads"
      );

    if (saved) {
      setLeads(JSON.parse(saved));
    } else {
      setLeads(generateLeads());
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
          .includes(
            search.toLowerCase()
          );

      const matchesState =
        selectedState === "All" ||
        lead.state === selectedState;

      const matchesCategory =
        selectedCategory === "All" ||
        lead.category ===
          selectedCategory;

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

    const blob = new Blob(
      [csvContent],
      {
        type: "text/csv;charset=utf-8;",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      "batangarh-leads.csv";

    link.click();
  };

  const stats = {
    total: leads.length,

    interested: leads.filter(
      (lead) =>
        lead.status ===
        "Interested"
    ).length,

    closed: leads.filter(
      (lead) =>
        lead.status === "Closed"
    ).length,

    hot: leads.filter(
      (lead) =>
        lead.temperature === "Hot"
    ).length,

    average:
      leads.length > 0
        ? Math.floor(
            leads.reduce(
              (acc, lead) =>
                acc +
                lead.aiScore,
              0
            ) / leads.length
          )
        : 0,
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="title">
          Batangarh News AI CRM
        </h1>

        <p className="subtitle">
          Mohit Durve •
          mohit.durve@batangarh.com
          • 9424666064
        </p>

        <Navbar
          activeTab={activeTab}
          setActiveTab={
            setActiveTab
          }
        />

        <div className="toolbar">
          <input
            placeholder="Search business..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
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
            <option>
              All States
            </option>

            {states.map(
              (state) => (
                <option
                  key={state}
                >
                  {state}
                </option>
              )
            )}
          </select>

          <select
            value={
              selectedCategory
            }
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
                <option
                  key={category}
                >
                  {category}
                </option>
              )
            )}
          </select>

          <button
            onClick={
              exportCSV
            }
          >
            Export CSV
          </button>

          <button
            onClick={() =>
              setLeads(
                generateLeads()
              )
            }
          >
            Regenerate AI Leads
          </button>
        </div>

        {activeTab ===
          "Dashboard" && (
          <div className="dashboard-grid">
            <StatsCard
              title="Total Leads"
              value={stats.total}
            />

            <StatsCard
              title="Interested Leads"
              value={
                stats.interested
              }
            />

            <StatsCard
              title="Closed Deals"
              value={
                stats.closed
              }
            />

            <StatsCard
              title="Hot Leads"
              value={stats.hot}
            />

            <StatsCard
              title="Average AI Score"
              value={`${stats.average}%`}
            />
          </div>
        )}

        {(activeTab ===
          "Finder" ||
          activeTab ===
            "CRM") && (
          <div className="lead-grid">
            {filteredLeads.map(
              (lead) => (
                <LeadCard
                  key={lead.id}
                  lead={lead}
                  updateStatus={
                    updateStatus
                  }
                  updateNotes={
                    updateNotes
                  }
                  generatePitch={
                    generatePitch
                  }
                />
              )
            )}
          </div>
        )}

        {activeTab ===
          "Analytics" && (
          <div className="dashboard-grid">
            <StatsCard
              title="Hot Leads"
              value={stats.hot}
            />

            <StatsCard
              title="Interested"
              value={
                stats.interested
              }
            />

            <StatsCard
              title="Closed"
              value={
                stats.closed
              }
            />

            <div className="card">
              <h2>
                AI Analytics
              </h2>

              <AnalyticsChart
                value={
                  stats.average
                }
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}