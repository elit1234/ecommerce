const PageDots = ({ active, total }: { active: number; total: number }) => {
  return (
    <div className="pageDots">
      {total && (
        <>
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              className={`pageDot ${i === active - 1 ? "pageDotActive" : ""}`}
            ></div>
          ))}
        </>
      )}
      {/* <div className="pageDot pageDotActive"></div>
      <div className="pageDot"></div>
      <div className="pageDot"></div> */}
    </div>
  );
};

export default PageDots;
