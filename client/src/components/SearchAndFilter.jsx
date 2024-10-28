import React from 'react';

const SearchAndFilter = ({ filters, updateFilters}) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        updateFilters({ [name]: value });
    };

    return (
        <div className="search-filter-container">
            <div className="filter-row">
                <div className="filter-group">
                    <label htmlFor="location">Location</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={filters.location}
                        onChange={handleInputChange}
                        placeholder="Enter location"
                    />
                </div>

                <div className="filter-group price-range">
                    <label>Price Range</label>
                    <div className="price-inputs">
                        <input
                            type="number"
                            placeholder="Min Price"
                            name="minPrice"
                            value={filters.minPrice}
                            onChange={handleInputChange}
                        />
                        <input
                            type="number"
                            placeholder="Max Price"
                            name="maxPrice"
                            value={filters.maxPrice}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="filter-group">
                    <label htmlFor="propertyType">Property Type</label>
                    <select id="propertyType" name="propertyType" value={filters.propertyType} onChange={(e) => updateFilters({ propertyType: e.target.value })}>
                        <option value="">Select type</option>
                        <option value="apartment">Apartment</option>
                        <option value="bedsitter">Bedsitter</option>
                        <option value="bungalow">Bungalow</option>
                        <option value="house">House</option>
                        <option value="mansion">Mansion</option>
                        <option value="penthouse">Penthouse</option>
                        <option value="studioapartment">Studio Apartment</option>
                        <option value="villa">Villa</option>
                    </select>
                </div>
            </div>

            <button className="reset-button" onClick={() => updateFilters({ location: '', minPrice: '', maxPrice: '', propertyType: '' })}>
                Reset all
            </button>

            <style jsx>{`
                .search-filter-container {
                    background-color: #ffffff;
                    padding: 20px 0;
                    margin-bottom: 20px;
                }

                .filter-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 60px;
                    margin-bottom: 15px;
                }

                .filter-group {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    min-width: 150px;
                }

                label {
                    font-size: 14px;
                    margin-bottom: 5px;
                    color: #333;
                    font-weight: 500;
                }

                select, input {
                    width: 100%;
                    padding: 10px 12px;
                    border: 1px solid #e0e0e0;
                    border-radius: 4px;
                    font-size: 14px;
                    background-color: #f9f9f9;
                }

                .price-range {
                    flex: 1;
                }

                .price-inputs {
                    display: flex;
                    gap: 10px;
                }

                .price-inputs input {
                    flex: 1;
                }

                .reset-button {
                    background-color: #8e44ad;
                    color: white;
                    border: none;
                    padding: 4px 8px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 14px;
                    transition: background-color 0.3s;
                    margin-top: 10px;
                    width: auto;
                    align-self: flex-start;
                }

                .reset-button:hover {
                    background-color: #732d91;
                }
            `}</style>
        </div>
    );
};

export default SearchAndFilter;
