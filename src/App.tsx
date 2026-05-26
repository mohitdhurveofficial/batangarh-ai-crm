import {
  useEffect,
  useState,
} from "react";

import LeadCard from "./components/LeadCard";

import { supabase } from "./supabase";

import "./index.css";

export type LeadStatus =
  | "New"
  | "Interested"
  | "Closed";

export interface Lead {
  id: number;

  businessName: string;

  category: string;

  city: string;

  state: string;

  phone: string;

  email: string;

  status: LeadStatus;

  notes: string;

  aiScore: number;

  temperature:
    | "Hot"
    | "Warm"
    | "Cold";
}

function App() {
  const [leads, setLeads] =
    useState<Lead[]>([]);

  const [newBusiness, setNewBusiness] =
    useState("");

  const [newCategory, setNewCategory] =
    useState("");

  const [newCity, setNewCity] =
    useState("");

  const [newState, setNewState] =
    useState("");

  const [bulkLeads, setBulkLeads] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [filterStatus, setFilterStatus] =
    useState("All");

  useEffect(() => {
    fetchLeads();
  }, []);

  async function fetchLeads() {
    const { data } =
      await supabase
        .from("leads")
        .select("*")
        .order("id", {
          ascending: false,
        });

    if (data) {
      setLeads(data);
    }
  }

  const filteredLeads =
    leads.filter((lead) => {
      const matchesSearch =
        lead.businessName
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesStatus =
        filterStatus === "All"
          ? true
          : lead.status ===
            filterStatus;

      return (
        matchesSearch &&
        matchesStatus
      );
    });

  const totalLeads =
    leads.length;

  const interestedLeads =
    leads.filter(
      (lead) =>
        lead.status ===
        "Interested"
    ).length;

  const closedLeads =
    leads.filter(
      (lead) =>
        lead.status ===
        "Closed"
    ).length;

  const hotLeads =
    leads.filter(
      (lead) =>
        lead.temperature ===
        "Hot"
    ).length;

  async function updateStatus(
    id: number,
    status: LeadStatus
  ) {
    await supabase
      .from("leads")
      .update({ status })
      .eq("id", id);

    fetchLeads();
  }

  async function updateNotes(
    id: number,
    notes: string
  ) {
    await supabase
      .from("leads")
      .update({ notes })
      .eq("id", id);

    fetchLeads();
  }

  async function deleteLead(
    id: number
  ) {
    const confirmDelete =
      confirm(
        "Delete this lead?"
      );

    if (!confirmDelete)
      return;

    await supabase
      .from("leads")
      .delete()
      .eq("id", id);

    fetchLeads();
  }

  async function addLead() {
    if (!newBusiness)
      return;

    const scores = [
      "Hot",
      "Warm",
      "Cold",
    ] as const;

    await supabase
      .from("leads")
      .insert([
        {
          businessName:
            newBusiness,

          category:
            newCategory,

          city: newCity,

          state: newState,

          phone: "9999999999",

          email:
            "business@email.com",

          status: "New",

          notes: "",

          aiScore: Math.floor(
            Math.random() * 100
          ),

          temperature:
            scores[
              Math.floor(
                Math.random() *
                  scores.length
              )
            ],
        },
      ]);

    fetchLeads();

    setNewBusiness("");
    setNewCategory("");
    setNewCity("");
    setNewState("");
  }

  async function generateAILeads() {
    const businesses = [
      "Royal Builders",
      "Elite Salon",
      "Modern Jewellers",
      "Urban Clinic",
      "Smart Automobiles",
      "Prime Cafe",
      "Vision Hospital",
      "Luxury Interiors",
      "Growth Academy",
      "Dynamic Fitness",
      "Fresh Mart",
      "Classic Furniture",
      "Skyline Architects",
      "Bright Dental",
      "Digital Hub",
      "Dream Properties",
      "Blue Bakery",
      "NextGen Marketing",
      "Golden Spa",
      "Rapid Logistics",
    ];

    const categories = [
      "Construction",
      "Salon",
      "Jewellery",
      "Healthcare",
      "Automobile",
      "Restaurant",
      "Fitness",
      "Education",
      "Marketing",
      "Retail",
    ];

    const cities = [
      "Indore",
      "Bhopal",
      "Jaipur",
      "Delhi",
      "Mumbai",
      "Pune",
      "Ahmedabad",
      "Nagpur",
      "Hyderabad",
      "Bangalore",
    ];

    const states = [
      "MP",
      "Rajasthan",
      "Maharashtra",
      "Delhi",
      "Gujarat",
      "Karnataka",
      "Telangana",
    ];

    const scores = [
      "Hot",
      "Warm",
      "Cold",
    ] as const;

    const generated =
      businesses.map(
        (business) => ({
          businessName:
            business,

          category:
            categories[
              Math.floor(
                Math.random() *
                  categories.length
              )
            ],

          city:
            cities[
              Math.floor(
                Math.random() *
                  cities.length
              )
            ],

          state:
            states[
              Math.floor(
                Math.random() *
                  states.length
              )
            ],

          phone:
            "9999999999",

          email:
            `${business
              .replaceAll(
                " ",
                ""
              )
              .toLowerCase()}@gmail.com`,

          status: "New",

          notes:
            "Auto-generated AI lead",

          aiScore:
            Math.floor(
              Math.random() *
                100
            ),

          temperature:
            scores[
              Math.floor(
                Math.random() *
                  scores.length
              )
            ],
        })
      );

    await supabase
      .from("leads")
      .insert(generated);

    fetchLeads();

    alert(
      "AI leads generated"
    );
  }

  async function deleteDemoLeads() {
    const confirmDelete =
      confirm(
        "Delete all demo leads?"
      );

    if (!confirmDelete)
      return;

    await supabase
      .from("leads")
      .delete()
      .eq(
        "notes",
        "Auto-generated AI lead"
      );

    fetchLeads();

    alert(
      "Demo leads deleted"
    );
  }

  async function importBulkLeads() {
    if (!bulkLeads) return;

    const lines =
      bulkLeads.split("\n");

    const scores = [
      "Hot",
      "Warm",
      "Cold",
    ] as const;

    const formatted =
      lines.map((line) => {
        const [
          businessName,
          category,
          city,
          state,
        ] = line.split(",");

        return {
          businessName:
            businessName?.trim() ||
            "Unknown",

          category:
            category?.trim() ||
            "Business",

          city:
            city?.trim() ||
            "Unknown",

          state:
            state?.trim() ||
            "Unknown",

          phone:
            "9999999999",

          email:
            "business@email.com",

          status: "New",

          notes: "",

          aiScore: Math.floor(
            Math.random() * 100
          ),

          temperature:
            scores[
              Math.floor(
                Math.random() *
                  scores.length
              )
            ],
        };
      });

    await supabase
      .from("leads")
      .insert(formatted);

    fetchLeads();

    setBulkLeads("");

    alert(
      "Bulk leads imported"
    );
  }

  async function handleCSVUpload(
    event: any
  ) {
    const file =
      event.target.files[0];

    if (!file) return;

    const reader =
      new FileReader();

    reader.onload = async (
      e: any
    ) => {
      const text =
        e.target.result;

      const rows =
        text.split("\n");

      const headers =
        rows[0].split(",");

      const nameIndex =
        headers.findIndex(
          (h: string) =>
            h.includes("qBF1Pd")
        );

      const categoryIndex =
        headers.findIndex(
          (h: string) =>
            h === "W4Efsd"
        );

      const addressIndex =
        headers.findIndex(
          (h: string) =>
            h === "W4Efsd 4"
        );

      const linkIndex =
        headers.findIndex(
          (h: string) =>
            h.includes(
              "hfpxzc href"
            )
        );

      const scores = [
        "Hot",
        "Warm",
        "Cold",
      ] as const;

      const formatted =
        rows
          .slice(1)
          .filter(
            (row: string) =>
              row.trim()
          )
          .map((row: string) => {
            const cols =
              row.split(",");

            const businessName =
              cols[
                nameIndex
              ]?.trim();

            const category =
              cols[
                categoryIndex
              ]?.trim();

            const address =
              cols[
                addressIndex
              ]?.trim();

            const mapsLink =
              cols[
                linkIndex
              ]?.trim();

            return {
              businessName:
                businessName ||
                "Unknown",

              category:
                category ||
                "Business",

              city:
                address ||
                "Unknown",

              state:
                "India",

              phone:
                "Not Available",

              email:
                "Not Available",

              status: "New",

              notes:
                mapsLink ||
                "",

              aiScore:
                Math.floor(
                  Math.random() *
                    100
                ),

              temperature:
                scores[
                  Math.floor(
                    Math.random() *
                      scores.length
                  )
                ],
            };
          });

      await supabase
        .from("leads")
        .insert(formatted);

      fetchLeads();

      alert(
        "Real Google Maps leads imported"
      );
    };

    reader.readAsText(file);
  }

  return (
    <div className="app">
      <h1>
        Batangarh AI CRM
      </h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Leads</h3>
          <p>{totalLeads}</p>
        </div>

        <div className="stat-card">
          <h3>Interested</h3>
          <p>
            {interestedLeads}
          </p>
        </div>

        <div className="stat-card">
          <h3>Closed Deals</h3>
          <p>{closedLeads}</p>
        </div>

        <div className="stat-card">
          <h3>Hot Leads</h3>
          <p>{hotLeads}</p>
        </div>
      </div>

      <div
        style={{
          marginBottom:
            "20px",
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={
            generateAILeads
          }
          style={{
            background:
              "#9333ea",
            color: "white",
            border: "none",
            padding:
              "14px 20px",
            borderRadius:
              "12px",
            cursor: "pointer",
            fontWeight:
              "bold",
          }}
        >
          Generate AI Leads
        </button>

        <button
          onClick={
            deleteDemoLeads
          }
          style={{
            background:
              "#dc2626",
            color: "white",
            border: "none",
            padding:
              "14px 20px",
            borderRadius:
              "12px",
            cursor: "pointer",
            fontWeight:
              "bold",
          }}
        >
          Delete Demo Leads
        </button>
      </div>

      <div className="add-lead">
        <input
          placeholder="Business Name"
          value={newBusiness}
          onChange={(e) =>
            setNewBusiness(
              e.target.value
            )
          }
        />

        <input
          placeholder="Category"
          value={newCategory}
          onChange={(e) =>
            setNewCategory(
              e.target.value
            )
          }
        />

        <input
          placeholder="City"
          value={newCity}
          onChange={(e) =>
            setNewCity(
              e.target.value
            )
          }
        />

        <input
          placeholder="State"
          value={newState}
          onChange={(e) =>
            setNewState(
              e.target.value
            )
          }
        />

        <button
          onClick={addLead}
        >
          Add Lead
        </button>
      </div>

      <div className="bulk-import">
        <textarea
          placeholder="Business Name, Category, City, State"
          value={bulkLeads}
          onChange={(e) =>
            setBulkLeads(
              e.target.value
            )
          }
        />

        <button
          onClick={
            importBulkLeads
          }
        >
          Import Bulk Leads
        </button>

        <div
          style={{
            marginTop:
              "20px",
          }}
        >
          <input
            type="file"
            accept=".csv"
            onChange={
              handleCSVUpload
            }
          />
        </div>
      </div>

      <div className="filters">
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
          value={filterStatus}
          onChange={(e) =>
            setFilterStatus(
              e.target.value
            )
          }
        >
          <option value="All">
            All Leads
          </option>

          <option value="New">
            New
          </option>

          <option value="Interested">
            Interested
          </option>

          <option value="Closed">
            Closed
          </option>
        </select>
      </div>

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
              deleteLead={
                deleteLead
              }
            />
          )
        )}
      </div>
    </div>
  );
}

export default App;