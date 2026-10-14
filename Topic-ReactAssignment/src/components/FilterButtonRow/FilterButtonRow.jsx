import "./FilterButtonRow.css";

function FilterButtonRow({ activeFilter = "All", onFilterChange }) {
  // filter tabs
  const filters = ["All", "Done", "Todo"];

  return (
    <div className="filter-buttons">
      {filters.map((filter) => (
        <button
          key={filter}
          type="button"
          className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
          onClick={() => onFilterChange && onFilterChange(filter)}>
          {filter}
        </button>
      ))}
    </div>
  );
}

export default FilterButtonRow;