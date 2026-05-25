interface Props {
    value: number;
  }
  
  export default function AnalyticsChart({
    value,
  }: Props) {
    return (
      <div
        style={{
          marginTop: "20px",
        }}
      >
        <div
          style={{
            height: "20px",
            width: "100%",
            background: "#1e293b",
            borderRadius: "999px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${value}%`,
              background:
                "linear-gradient(to right,#facc15,#eab308)",
              height: "100%",
            }}
          />
        </div>
  
        <p
          style={{
            marginTop: "10px",
            color: "#cbd5e1",
          }}
        >
          AI Lead Quality: {value}%
        </p>
      </div>
    );
  }