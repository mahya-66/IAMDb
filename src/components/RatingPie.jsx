const RatingPie = ({ score }) => {
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <svg width="90" height="90">
      <circle
        cx="45"
        cy="45"
        r={radius}
        stroke="#1f2933"
        strokeWidth="8"
        fill="none"
      />
      <circle
        cx="45"
        cy="45"
        r={radius}
        stroke="#a855f7"
        strokeWidth="8"
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
      />
      <text
        x="45"
        y="52"
        textAnchor="middle"
        fill="white"
        fontSize="16"
        fontWeight="600"
      >
        {score}
      </text>
    </svg>
  );
};

export default RatingPie;
