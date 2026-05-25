interface Props {
    title: string;
    value: number | string;
  }
  
  export default function StatsCard({
    title,
    value,
  }: Props) {
    return (
      <div className="card">
        <h2>{title}</h2>
  
        <p>{value}</p>
      </div>
    );
  }