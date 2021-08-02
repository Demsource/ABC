import "./App.css";
import Header from "./app-content/Header";
import ProjectAccess from "./app-content/ProjectAccess";
import UserSetup from "./app-content/UserSetup";
import { useState, useEffect } from "react";
import usersData from "./app-content/users";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import NewUserPopup from "./NewUserPopup";
import DeleteUserPopup from "./DeleteUserPopup";

function App() {
  const [usersList, setUsersList] = useState();
  const [searchTextState, setSearchTextState] = useState("");
  const [currentUserPage, setCurrentUserPage] = useState();
  // NEW USER POPUP
  const [newUserPopupDisplay, setNewUserPopupDisplay] = useState("none");
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [role, setRole] = useState("* Role");
  const [newRoleDisplay, setNewRoleDisplay] = useState("none");

  const allFilled =
    newFirstName &&
    newLastName &&
    newEmail &&
    (role === "Admin" || role === "User");

  const toggleNewRoleDisplay = () => {
    newRoleDisplay === "none"
      ? setNewRoleDisplay("flex")
      : setNewRoleDisplay("none");
  };
  const handleNewFirstName = (name) => {
    setNewFirstName(name);
  };
  const handleNewLastName = (name) => {
    setNewLastName(name);
  };
  const handleNewEmail = (mail) => {
    setNewEmail(mail);
  };
  const createUserHandler = (fName, lName, email, role) => {
    const randomID = Math.ceil(Math.random() * 1456 + 2000);
    let newUser;
    if (role === "Admin") {
      newUser = {
        id: randomID,
        firstName: fName,
        lastName: lName,
        email: email,
        isActive: true,
        role,
        permissions: {
          isSuperAdmin: false,
          groupOne: {
            gPermissonAll: false,
            permissionList: [
              "permission11",
              "permission12",
              "permission14",
              "permission15",
            ],
          },
          groupTwo: {
            gPermissonAll: false,
          },
          groupThree: {
            gPermissonAll: false,
          },
        },
      };
    } else {
      newUser = {
        id: randomID,
        firstName: fName,
        lastName: lName,
        email: email,
        isActive: true,
        role,
        permissions: {
          isSuperAdmin: false,
          groupOne: {
            gPermissonAll: false,
            permissionList: ["permission11", "permission12"],
          },
          groupTwo: {
            gPermissonAll: false,
          },
          groupThree: {
            gPermissonAll: false,
          },
        },
      };
    }
    const updatedUsers = [...usersList, newUser];
    setUsersList(updatedUsers);
    setNewUserPopupDisplay("none");
    setNewFirstName("")
    setNewLastName("")
    setNewEmail("")
    setRole("* Role")
  };

  const addUserButtonHandler = () => {
    setNewUserPopupDisplay("");
  };
  // NEW USER POPUP

  // DELETE USER POPUP
  const [deletePopupDisplay, setDeletePopupDisplay] = useState("none");
  const [deleteThisUser, setDeleteThisUser] = useState();

  const deleteUserHandler = (userId) => {
    const newUsersList = usersList.filter(user => user.id !== userId)
    setUsersList(newUsersList);
    setDeletePopupDisplay("none");
  };

  const deleteUserButtonHandler = (user) => {
    setDeletePopupDisplay("");
    setDeleteThisUser(user);
  };
  // DELETE USER POPUP

  useEffect(() => {
    setUsersList(usersData);
  }, []);

  const updateSearch = (searchText) => {
    setSearchTextState(searchText);
  };

  const getCurrentUser = (userId) => {
    const userToSet = usersList.find((user) => user.id === userId);
    setCurrentUserPage(userToSet);
  };

  const statusChangeHandler = (userId) => {
    const updatedUsers = usersList.map((user) => {
      if (user.id === userId) {
        return { ...user, isActive: !user.isActive };
      } else {
        return user;
      }
    });
    setUsersList(updatedUsers);
  };

  const userUpdateHandler = (userId, firstName, lastName, role, isActive) => {
    const updatedUsers = usersList.map((user) => {
      if (user.id === userId) {
        return { ...user, firstName, lastName, role, isActive };
      } else {
        return user;
      }
    });
    setUsersList(updatedUsers);
  };

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Header
              updateSearch={updateSearch}
              addUserButtonHandler={addUserButtonHandler}
            />
            <ProjectAccess
              searchBy={searchTextState}
              users={usersList}
              getCurrentUser={getCurrentUser}
              statusChangeHandler={statusChangeHandler}
              deleteUserButtonHandler={deleteUserButtonHandler}
            />
          </Route>
          <Route path="/user-setup">
            <Header />
            <UserSetup
              user={currentUserPage}
              userUpdateHandler={userUpdateHandler}
              getCurrentUser={getCurrentUser}
            />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </div>
      <NewUserPopup
        newUserPopupDisplay={newUserPopupDisplay}
        setNewUserPopupDisplay={setNewUserPopupDisplay}
        newFirstName={newFirstName}
        handleNewFirstName={handleNewFirstName}
        newLastName={newLastName}
        handleNewLastName={handleNewLastName}
        newEmail={newEmail}
        handleNewEmail={handleNewEmail}
        toggleNewRoleDisplay={toggleNewRoleDisplay}
        role={role}
        newRoleDisplay={newRoleDisplay}
        setRole={setRole}
        allFilled={allFilled}
        createUserHandler={createUserHandler}
      />
      <DeleteUserPopup
        user={deleteThisUser}
        deletePopupDisplay={deletePopupDisplay}
        setDeletePopupDisplay={setDeletePopupDisplay}
        deleteUserHandler={deleteUserHandler}
      />
    </Router>
  );
}

export default App;
