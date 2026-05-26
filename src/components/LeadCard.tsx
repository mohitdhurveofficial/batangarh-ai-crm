import type { Lead } from "../App";

interface Props {
  lead: Lead;

  updateStatus: (
    id: number,
    status: any
  ) => void;

  updateNotes: (
    id: number,
    notes: string
  ) => void;

  deleteLead: (
    id: number
  ) => void;
}

export default function LeadCard({
  lead,
  updateStatus,
  updateNotes,
  deleteLead,
}: Props) {
  function getStatusColor() {
    switch (lead.status) {
      case "Interested":
        return "#16a34a";

      case "Closed":
        return "#2563eb";

      default:
        return "#f59e0b";
    }
  }

  function getTemperatureColor() {
    switch (
      lead.temperature
    ) {
      case "Hot":
        return "#ef4444";

      case "Warm":
        return "#f59e0b";

      default:
        return "#38bdf8";
    }
  }

  const whatsappMessage =
    `Hi ${lead.businessName}, we help local businesses grow visibility through Batangarh News promotions and social media branding. Would love to connect once if you're open to it.`;

  const whatsappLink =
    `https://wa.me/?text=${encodeURIComponent(
      whatsappMessage
    )}`;

  return (
    <div className="lead-card">
      <div className="lead-header">
        <div>
          <h2>
            {
              lead.businessName
            }
          </h2>

          <p className="lead-category">
            {lead.category}
          </p>
        </div>

        <div
          className="temperature-badge"
          style={{
            background:
              getTemperatureColor(),
          }}
        >
          {lead.temperature}
        </div>
      </div>

      <div className="lead-details">
        <p>
          📍 {lead.city}
        </p>

        <p>
          ⭐ AI Score:{" "}
          {lead.aiScore}
        </p>
      </div>

      <div className="pipeline-section">
        <label>
          Pipeline Stage
        </label>

        <select
          value={lead.status}
          onChange={(e) =>
            updateStatus(
              lead.id,
              e.target.value
            )
          }
          style={{
            border: `2px solid ${getStatusColor()}`,
          }}
        >
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

      <textarea
        placeholder="Add notes, follow-ups, conversation updates..."
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
          href={
            whatsappLink
          }
          target="_blank"
        >
          WhatsApp
        </a>

        <button>
          Email
        </button>

        <button>
          Follow Up
        </button>

        <button
          onClick={() =>
            deleteLead(
              lead.id
            )
          }
          style={{
            background:
              "#dc2626",
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}