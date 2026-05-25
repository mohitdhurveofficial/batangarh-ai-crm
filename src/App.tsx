import {
  useEffect,
  useState,
} from "react";

import LeadCard from "./components/LeadCard";

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
    useState<Lead[]>(() => {
      const savedLeads =
        localStorage.getItem(
          "batangarh-leads"
        );

      return savedLeads
        ? JSON.parse(savedLeads)
        : [
            {
              id: 1,

              businessName:
                "Royal Traders",

              category: "Fashion",

              city: "Ahmedabad",

              state: "Gujarat",

              phone: "9876543210",

              email:
                "royaltraders@gmail.com",

              status: "New",

              notes: "",

              aiScore: 91,

              temperature: "Hot",
            },

            {
              id: 2,

              businessName:
                "Modern Mart",

              category:
                "Automobile",

              city: "Delhi",

              state: "Delhi",

              phone: "9876543211",

              email:
                "modernmart@gmail.com",

              status:
                "Interested",

              notes: "",

              aiScore: 77,

              temperature: "Warm",
            },
          ];
    });

  const [newBusiness, setNewBusiness] =
    useState("");

  const [newCategory, setNewCategory] =
    useState("");

  const [newCity, setNewCity] =
    useState("");

  const [newState, setNewState] =
    useState("");

  useEffect(() => {
    localStorage.setItem(
      "batangarh-leads",
      JSON.stringify(leads)
    );
  }, [leads]);

  function updateStatus(
    id: number,
    status: LeadStatus
  ) {
    setLeads((prev) =>
      prev.map((lead) =>
        lead.id === id
          ? {
              ...lead,
              status,
            }
          : lead
      )
    );
  }

  function updateNotes(
    id: number,
    notes: string
  ) {
    setLeads((prev) =>
      prev.map((lead) =>
        lead.id === id
          ? {
              ...lead,
              notes,
            }
          : lead
      )
    );
  }

  function addLead() {
    if (!newBusiness) return;

    const newLead: Lead = {
      id: Date.now(),

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

      temperature: "Warm",
    };

    setLeads([
      newLead,
      ...leads,
    ]);

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

      <div className="lead-grid">
        {leads.map((lead) => (
          <LeadCard
            key={lead.id}
            lead={lead}
            updateStatus={
              updateStatus
            }
            updateNotes={
              updateNotes
            }
          />
        ))}
      </div>
    </div>
  );
}

export default App;