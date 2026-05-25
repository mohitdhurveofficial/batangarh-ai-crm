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
    status: string;
    notes: string;
  }
  
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
  
    generatePitch: (
      lead: Lead
    ) => string;
  }
  
  export default function LeadCard({
    lead,
    updateStatus,
    updateNotes,
    generatePitch,
  }: Props) {
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
            onClick={() => {
              navigator.clipboard.writeText(
                generatePitch(lead)
              );
  
              alert("AI Pitch Copied");
            }}
          >
            Copy AI Pitch
          </button>
        </div>
      </div>
    );
  }