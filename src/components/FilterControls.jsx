

function FilterControls({ 
  currentFilter, 
  onFilterChange, 
  sortBy, 
  sortOrder, 
  onSortChange 
}) {
  const filters = [
    { value: 'all', label: 'All Tasks' },
    { value: 'pending', label: 'Pending' },
    { value: 'done', label: 'Done' }
  ];

  const sortOptions = [
    { value: 'dueDate', label: 'Due Date' },
    { value: 'title', label: 'Title' },
    { value: 'status', label: 'Status' },
    { value: 'priority', label: 'Priority' }
  ];

  return (
    <div className="filter-controls">
      <div className="filter-group">
        <span className="filter-label">Filter:</span>
        {filters.map(filter => (
          <button
            key={filter.value}
            className={`filter-btn ${currentFilter === filter.value ? 'active' : ''}`}
            onClick={() => onFilterChange(filter.value)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="sort-group">
        <span className="filter-label">Sort by:</span>
        {sortOptions.map(option => (
          <button
            key={option.value}
            className={`sort-btn ${sortBy === option.value ? 'active' : ''}`}
            onClick={() => onSortChange(option.value)}
          >
            {option.label}
            {sortBy === option.value && (
              <span className="sort-order">
                {sortOrder === 'asc' ? ' ↑' : ' ↓'}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FilterControls;