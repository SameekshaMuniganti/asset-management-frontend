import { useState, useRef, useEffect } from "react";
import "./SearchableDropdown.css";

function SearchableDropdown({
    items,
    selectedValue,
    onSelect,
    placeholder,
    getLabel
}) {
    const [search, setSearch] = useState("");
    const [showList, setShowList] = useState(false);

    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setShowList(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const filteredItems =
        search.trim().length >= 2
            ? items.filter((item) =>
                  getLabel(item)
                      .toLowerCase()
                      .includes(search.toLowerCase())
              )
            : [];

    return (
        <div className="search-dropdown" ref={dropdownRef}>
            <div className="search-box">
                <span className="search-icon">🔍</span>

                <input
                    type="text"
                    placeholder={placeholder}
                    value={search}
                    onFocus={() => setShowList(true)}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setShowList(true);
                    }}
                />

                <span className="dropdown-icon">▼</span>
            </div>

            {showList && (
                <div className="dropdown-list">

                    {search.trim().length < 2 ? (

                        <div className="dropdown-item no-result">
                            Type at least 2 characters to search...
                        </div>

                    ) : filteredItems.length > 0 ? (

                        filteredItems.map((item) => (
                            <div
                                key={item.id}
                                className={
                                    selectedValue === item.id
                                        ? "dropdown-item selected"
                                        : "dropdown-item"
                                }
                                onClick={() => {
                                    setSearch(getLabel(item));
                                    onSelect(item.id);
                                    setShowList(false);
                                }}
                            >
                                {getLabel(item)}
                            </div>
                        ))

                    ) : (

                        <div className="dropdown-item no-result">
                            No matching results
                        </div>

                    )}

                </div>
            )}
        </div>
    );
}

export default SearchableDropdown;