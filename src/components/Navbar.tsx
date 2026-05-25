interface NavbarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
  }
  
  const tabs = [
    "Dashboard",
    "Finder",
    "CRM",
    "Analytics",
  ];
  
  export default function Navbar({
    activeTab,
    setActiveTab,
  }: NavbarProps) {
    return (
      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={
              activeTab === tab
                ? "tab active"
                : "tab"
            }
            onClick={() =>
              setActiveTab(tab)
            }
          >
            {tab}
          </button>
        ))}
      </div>
    );
  }