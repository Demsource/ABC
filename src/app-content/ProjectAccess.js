import { useRef, useState, useEffect } from "react";
import "./ProjectAccess.css";
import UserRow from "./UserRow";

function ProjectAccess({
  searchBy,
  users,
  getCurrentUser,
  statusChangeHandler,
  deleteUserButtonHandler,
}) {
  const [allDisplayUsers, setAllDisplayUsers] = useState();
  const [activePahCol, setActivePahCol] = useState("col-user");
  const [pRDisplay, setPRDisplay] = useState("none");

  useEffect(() => {
    setAllDisplayUsers(
      users?.filter((user) =>
        `${user.firstName} ${user.lastName}`
          .toLowerCase()
          .includes(searchBy.toLowerCase())
      )
    );
    resetPagination();
  }, [users, searchBy]);

  const resetPagination = () => {
    setCurrentPage(1);
    setMinPageNumberLimit(0);
    setMaxPageNumberLimit(2);
  };

  const colUserArrow = useRef(null);
  const colRoleArrow = useRef(null);
  const colStatusArrow = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(5);

  const pages = [];
  if (allDisplayUsers?.length) {
    for (
      let i = 1;
      i <= Math.ceil(allDisplayUsers.length / usersPerPage);
      i++
    ) {
      pages.push(i);
    }
  }

  const [pageNumberLimit, setPageNumberLimit] = useState(2);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(2);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentDisplayUsers = allDisplayUsers?.slice(
    indexOfFirstUser,
    indexOfLastUser
  );

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((currentPage) => currentPage - 1);

      if ((currentPage - 1) % pageNumberLimit === 0) {
        setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
        setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
      }
    }
  };

  const handleNext = () => {
    if (currentPage < pages[pages.length - 1]) {
      setCurrentPage((currentPage) => currentPage + 1);

      if (currentPage + 1 > maxPageNumberLimit) {
        setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
        setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
      }
    }
  };

  const sortList = (dirrection, column) => {
    if (column === "firstName") {
      setAllDisplayUsers(
        (usersList) =>
          usersList &&
          [...usersList]?.sort((a, b) => {
            const dirIndex = dirrection === "asc" ? 1 : -1;
            return (
              a.isActive && dirIndex * a.firstName.localeCompare(b.firstName)
            );
          })
      );
    }

    if (column === "role") {
      setAllDisplayUsers(
        (usersList) =>
          usersList &&
          [...usersList]?.sort((a, b) => {
            const dirIndex = dirrection === "asc" ? 1 : -1;
            return a.isActive && dirIndex * b.role.localeCompare(a.role);
          })
      );
    }

    if (column === "isActive") {
      setAllDisplayUsers(
        (usersList) =>
          usersList &&
          [...usersList]?.sort((a, b) => {
            const dirIndex = dirrection === "asc" ? 1 : -1;
            return dirIndex * (a.isActive - b.isActive);
          })
      );
    }
  };

  const pahColClick = (activePahColClassName, arrowRef) => {
    setActivePahCol(activePahColClassName);
    toggleArrow(arrowRef, activePahColClassName);
  };
  const toggleArrow = (arrowDiv, columnId) => {
    arrowDiv.current.classList.toggle("arrow-down");
    arrowDiv.current.classList.toggle("arrow-up");

    let dir = arrowDiv.current.classList.contains("arrow-down")
      ? "desc"
      : "asc";

    let col =
      columnId === "col-user"
        ? "firstName"
        : columnId === "col-role"
        ? "role"
        : columnId === "col-status"
        ? "isActive"
        : "";
    sortList(dir, col);
  };

  const updateUsersPerPage = (updateNum) => {
    setUsersPerPage(Number(updateNum.target.innerText));
    togglePRDisplay();
    resetPagination();
  };
  const togglePRDisplay = () => {
    pRDisplay === "none" ? setPRDisplay("flex") : setPRDisplay("none");
  };

  return (
    <div className="project-access">
      <div className="pa-content">
        <div className="pa-header-wrapper">
          <div className="pa-header">
            <div
              className="col-user pah-col"
              id={`${activePahCol === "col-user" && "active-col"}`}
              onClick={() => pahColClick("col-user", colUserArrow)}
            >
              <span>USER</span>
              <div ref={colUserArrow} className="arrow arrow-down"></div>
            </div>
            <div
              className="col-role pah-col"
              id={`${activePahCol === "col-role" && "active-col"}`}
              onClick={() => pahColClick("col-role", colRoleArrow)}
            >
              <span>ROLE</span>
              <div ref={colRoleArrow} className="arrow arrow-down"></div>
            </div>
            <div
              className="col-status pah-col"
              id={`${activePahCol === "col-status" && "active-col"}`}
              onClick={() => pahColClick("col-status", colStatusArrow)}
            >
              <span>STATUS</span>
              <div ref={colStatusArrow} className="arrow arrow-down"></div>
            </div>
            <div className="col-actions">
              <span>ACTIONS</span>
              <div></div>
            </div>
          </div>
        </div>
        {currentDisplayUsers?.map((user) => (
          <UserRow
            user={user}
            key={user.id}
            getCurrentUser={getCurrentUser}
            statusChangeHandler={statusChangeHandler}
            deleteUserButtonHandler={deleteUserButtonHandler}
          />
        ))}
        {currentDisplayUsers?.length ? (
          <div className="pa-footer-wrapper">
            <div className="pa-footer">
              <div className="left-content">
                <div>Records on page</div>
                <div
                  className="page-record"
                  onClick={() => {
                    togglePRDisplay();
                  }}
                >
                  <span className="page-record-number">{usersPerPage}</span>
                  <div className="arrow arrow-down"></div>
                  <div className="page-records" style={{ display: pRDisplay }}>
                    {(() => {
                      let spans = [];
                      for (let i = 1; i <= 10; i++) {
                        spans.push(
                          <span onClick={(i) => updateUsersPerPage(i)} key={i}>
                            {i}
                          </span>
                        );
                      }
                      return spans;
                    })()}
                  </div>
                </div>
              </div>
              <div className="right-content">
                <div onClick={handlePrevious} className="prev-next">
                  Previous
                </div>
                <div className="page-numbers">
                  {pages.map((number) => {
                    if (
                      number > minPageNumberLimit &&
                      number <= maxPageNumberLimit
                    ) {
                      return (
                        <div
                          key={number}
                          id={number}
                          className={`page-number ${
                            currentPage === number ? "active-page-number" : ""
                          }`}
                          onClick={(e) => setCurrentPage(Number(e.target.id))}
                        >
                          {number}
                        </div>
                      );
                    } else {
                      return "";
                    }
                  })}
                </div>
                <div onClick={handleNext} className="prev-next">
                  Next
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default ProjectAccess;
