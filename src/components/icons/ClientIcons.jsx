function base(props) {
  return {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    ...props,
  };
}

export function GovBuildingIcon(props) {
  return (
    <svg {...base(props)}>
      <path d="M3 21h18" />
      <path d="M4 21V10l8-5 8 5v11" />
      <path d="M9 21v-6h6v6" />
      <path d="M7 10v4M12 10v4M17 10v4" />
    </svg>
  );
}

export function SkylineIcon(props) {
  return (
    <svg {...base(props)}>
      <path d="M3 21h18" />
      <path d="M5 21V9l3-2 3 2v12" />
      <path d="M13 21V6l3-2 3 2v15" />
      <path d="M8 21v-3M16 21v-3" />
    </svg>
  );
}

export function HighwayIcon(props) {
  return (
    <svg {...base(props)}>
      <path d="M8 3 3 21" />
      <path d="M16 3l5 18" />
      <path d="M12 3v2M12 9v2.5M12 15v2.5" />
    </svg>
  );
}

export function BridgeIcon(props) {
  return (
    <svg {...base(props)}>
      <path d="M2 17h20" />
      <path d="M5 17V9M19 17V9" />
      <path d="M12 4v13" />
      <path d="M5 9c3-3 11-3 14 0" />
      <path d="M2 21h20" />
    </svg>
  );
}

export function TrainIcon(props) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="7" width="7" height="9" rx="1" />
      <rect x="12" y="7" width="7" height="9" rx="1" />
      <path d="M2 20h20" />
      <path d="M6 16v2M15 16v2" />
      <path d="M10 10h2" />
    </svg>
  );
}

export function CraneIcon(props) {
  return (
    <svg {...base(props)}>
      <path d="M4 21V9l4-2 4 2v12" />
      <path d="M12 21V5l3-2 5 3-5 2v2" />
      <path d="M4 21h16" />
      <path d="M6 21v-3M10 21v-3" />
    </svg>
  );
}

export function InfraIcon(props) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="8" r="3" />
      <path d="M12 11v3" />
      <path d="M4 21c2-4 6-6 8-6s6 2 8 6" />
    </svg>
  );
}

export function ShieldIcon(props) {
  return (
    <svg {...base(props)}>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

export function PathIcon(props) {
  return (
    <svg {...base(props)}>
      <path d="M4 20c4-8 12-8 16-16" />
      <circle cx="5" cy="19" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="19" cy="5" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FactoryIcon(props) {
  return (
    <svg {...base(props)}>
      <path d="M3 21V11l5 3v-3l5 3v-3l5 3v7z" />
      <path d="M3 21h17" />
      <path d="M8 21v-4M13 21v-4" />
    </svg>
  );
}

export function TowerIcon(props) {
  return (
    <svg {...base(props)}>
      <path d="M9 21V7l3-4 3 4v14" />
      <path d="M6 21v-7l3-2M18 21v-7l-3-2" />
      <path d="M4 21h16" />
    </svg>
  );
}

export function BuildconIcon(props) {
  return (
    <svg {...base(props)}>
      <rect x="7" y="8" width="10" height="13" rx="1" />
      <path d="M10 21v-4h4v4" />
      <path d="M10 12h.01M14 12h.01M10 15h.01M14 15h.01" />
      <path d="M2 21h20" />
    </svg>
  );
}
