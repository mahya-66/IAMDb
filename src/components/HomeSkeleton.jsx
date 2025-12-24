import "../assets/styles/HomeSkeleton.css";

const HomeSkeleton = () => {
  return (
    <div className="home">
      <div className="skeleton logo-skel"></div>

      <div className="skeleton search-skel"></div>

      <div className="skeleton-cats">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="skeleton pill"></div>
        ))}
      </div>
    </div>
  );
};

export default HomeSkeleton;
