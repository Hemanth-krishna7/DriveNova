

export default function CarSilhouette({ vehicle, className = "w-full h-full opacity-35 group-hover:opacity-50 transition-opacity duration-500" }) {
  if (!vehicle || !vehicle.silhouettePath) return null;

  return (
    <svg 
      className={className} 
      viewBox="0 0 200 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d={vehicle.silhouettePath} 
        stroke={vehicle.accentColor || '#ef4444'} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <circle 
        cx={vehicle.wheel1 || 45} 
        cy="78" 
        r="10" 
        stroke={vehicle.accentColor || '#ef4444'} 
        strokeWidth="1.5" 
      />
      <circle 
        cx={vehicle.wheel2 || 155} 
        cy="78" 
        r="10" 
        stroke={vehicle.accentColor || '#ef4444'} 
        strokeWidth="1.5" 
      />
      <line 
        x1="60" 
        y1="45" 
        x2="160" 
        y2="55" 
        stroke={`${vehicle.accentColor || '#ef4444'}4d`} 
        strokeWidth="1" 
      />
    </svg>
  );
}
