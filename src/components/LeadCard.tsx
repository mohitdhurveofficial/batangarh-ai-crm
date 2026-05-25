import { useState } from "react";

import type { Lead } from "../services/leadService";

import { generateAIPitch } from "../services/geminiService";

interface Props {
  lead: Lead;

  updateStatus: (
    id: number,
    status: string
  ) => void;

  updateNotes: (
    id: number,
    notes: string
  ) => void;
}

export default function LeadCard({
  lead,
  updateStatus,
  updateNotes,
}: Props) {
  const [loading, setLoading] =
    useState(false);

  const handleGeneratePitch =
    async () => {
      try {
        setLoading(true);

        const pitch =
          await generateAIPitch(
            lead.businessName,
            lead.category,
            lead.city,
            lead.state
          );

        navigator.clipboard.writeText(
          pitch
        );

        alert(
          "AI Pitch Generated & Copied"
        );
      } catch (error) {
        alert(
          "Failed to generate AI pitch"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="lead-card">
      <div className="lead-top">
        <div>
          <h2>{lead.businessName}</h2>

          <p>
            {lead.city}, {lead.state}
          </p>

          <p>{lead.category}</p>

          <p className="score">
            AI Score: {lead.aiScore}
          </p>

          <p>{lead.phone}</p>

          <p>{lead.email}</p>

          <p
            style={{
              color:
                lead.temperature === "Hot"
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
              e.target.value
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

        <a href={`mailto:${lead.email}`}>
          Email
        </a>

        <a href={`tel:${lead.phone}`}>
          Call
        </a>

        <button
          onClick={
            handleGeneratePitch
          }
        >
          {loading
            ? "Generating..."
            : "Generate AI Pitch"}
        </button>
      </div>
    </div>
  );
}