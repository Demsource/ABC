import "./Header.css";
import searchIcon from "./icons/search.svg";
import mechanicWheel from "./icons/wheel.png";

function Header({ updateSearch, addUserButtonHandler }) {
  const inputChangeHandler = (e) => {
    updateSearch(e.target.value);
  };

  return (
    <div className="header">
      <div className="header-content">
        <div
          className="circle-button"
          style={
            updateSearch
              ? { backgroundColor: "#305eca", cursor: "pointer" }
              : { backgroundColor: "#c6c6c6" }
          }
          onClick={() => addUserButtonHandler()}
        >
          {updateSearch ? (
            <span>+</span>
          ) : (
            <img src={mechanicWheel} alt="Search Icon" />
          )}
        </div>
        <h1>{updateSearch ? "Project Access" : "User Setup"}</h1>
        {updateSearch && (
          <div className="searchbox">
            <input
              type="search"
              name="search-input"
              id="search-input"
              placeholder="Type to filter the table"
              onChange={inputChangeHandler}
            />
            <div id="search-icon">
              <img src={searchIcon} alt="search icon" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
