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

  const [search, setSearch] =
    useState("");

  const [filterStatus, setFilterStatus] =
    useState("All");

  useEffect(() => {
    fetchLeads();
  }, []);

  async function fetchLeads() {
    const { data, error } =
      await supabase
        .from("leads")
        .select("*")
        .order("id", {
          ascending: false,
        });

    console.log(
      "FETCH:",
      data,
      error
    );

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
    const { error } =
      await supabase
        .from("leads")
        .update({ status })
        .eq("id", id);

    console.log(error);

    fetchLeads();
  }

  async function updateNotes(
    id: number,
    notes: string
  ) {
    const { error } =
      await supabase
        .from("leads")
        .update({ notes })
        .eq("id", id);

    console.log(error);

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

    const { error } =
      await supabase
        .from("leads")
        .delete()
        .eq("id", id);

    if (error) {
      alert(error.message);

      return;
    }

    fetchLeads();
  }

  async function addLead() {
    if (!newBusiness) {
      alert(
        "Business name required"
      );

      return;
    }

    const scores = [
      "Hot",
      "Warm",
      "Cold",
    ] as const;

    const { data, error } =
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
        ])
        .select();

    console.log(
      "INSERT:",
      data,
      error
    );

    if (error) {
      alert(error.message);

      return;
    }

    alert("Lead Added");

    fetchLeads();

    setNewBusiness("");
    setNewCategory("");
    setNewCity("");
    setNewState("");
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