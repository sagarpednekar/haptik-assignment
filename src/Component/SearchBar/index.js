import PropTypes from "prop-types";
import { Input, Select, Label } from "semantic-ui-react";

const SearchBar = ({
  setSearchQuery,
  handleUserSearch,
  handleEnterClick,
  searchQuery,
  handleSort,
}) => {
  const options = [
    { key: "byFavorites", text: "Sort by Favorites", value: "byFavorites" },
    { key: "byName", text: "Sort By Name", value: "byName" },
  ];

  return (
    <>
      <Input
        fluid
        type="text"
        placeholder="Enter your friends Name"
        onChange={(e) => {
          setSearchQuery((e?.target?.value).replace(/^[ ]+$/g, ""));
          handleUserSearch(e?.target?.value.replace(/^[ ]+$/g, ""));
        }}
        onKeyDown={(e) => handleEnterClick(e)}
        value={searchQuery}
      >
        <input />
        <Select
          compact
          options={options}
          defaultValue="byFavorites"
          onChange={(e, v) => handleSort(e, v)}
        />
      </Input>

      {searchQuery && (
        <Label pointing>Press enter to add {searchQuery} as new Friend</Label>
      )}
    </>
  );
};

SearchBar.propTypes = {
  setSearchQuery: PropTypes.func.isRequired,
  handleUserSearch: PropTypes.func.isRequired,
  handleEnterClick: PropTypes.func.isRequired,
  handleSort: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
};

export default SearchBar;
