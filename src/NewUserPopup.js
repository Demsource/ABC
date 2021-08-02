import React from "react";
import face from "./app-content/icons/face.svg";
import email from "./app-content/icons/email.svg";
import keyBlack from "./app-content/icons/key-black.svg";

function NewUserPopup({
  newUserPopupDisplay,
  setNewUserPopupDisplay,
  newFirstName,
  handleNewFirstName,
  newLastName,
  handleNewLastName,
  newEmail,
  handleNewEmail,
  toggleNewRoleDisplay,
  role,
  newRoleDisplay,
  setRole,
  allFilled,
  createUserHandler,
}) {
  return (
    <div className="popup-wrapper" style={{ display: newUserPopupDisplay }}>
      <div className="popup">
        <div
          className="close-popup"
          onClick={() =>
            setNewUserPopupDisplay((display) => (display ? "" : "none"))
          }
        >
          X
        </div>
        <div className="ppp-wrapper">
          <div className="ppp-header">Invite New User</div>
          <div className="form-fields">
            <div className="inputs">
              <div className="field-icon">
                <img src={face} alt="face user sign" />
              </div>
              <input
                id="new-first-name"
                placeholder="* First Name"
                value={newFirstName}
                onChange={(e) => handleNewFirstName(e.target.value)}
              ></input>
              <input
                id="new-last-name"
                placeholder="* Last Name"
                value={newLastName}
                onChange={(e) => handleNewLastName(e.target.value)}
              ></input>
            </div>
            <div className="email-input-wrapper">
              <div className="field-icon">
                <img src={email} alt="at - email sign" />
              </div>
              <input
                type="email"
                id="new-email"
                placeholder="* Email"
                value={newEmail}
                onChange={(e) => handleNewEmail(e.target.value)}
              ></input>
            </div>
            <div
              className="role"
              id="new-p-role"
              onClick={() => {
                toggleNewRoleDisplay();
              }}
            >
              <div className="field-icon">
                <img src={keyBlack} alt="key role sign" />
              </div>
              <span className="user-role">{role}</span>
              <div className="arrow arrow-down"></div>
            </div>
            <div
              className={
                role === "Admin" || role === " User" ? "roles black" : "roles"
              }
              style={{ display: newRoleDisplay }}
            >
              <div
                onClick={() => {
                  setRole("Admin");
                  toggleNewRoleDisplay();
                }}
              >
                Admin
              </div>
              <div
                onClick={() => {
                  setRole("User");
                  toggleNewRoleDisplay();
                }}
              >
                User
              </div>
            </div>
            <div className="popup-action">
              <div
                className="send-delete"
                onClick={() =>
                  allFilled &&
                  createUserHandler(newFirstName, newLastName, newEmail, role)
                }
              >
                <div className="btn-text">Send Invitation</div>
              </div>
              <div className={`message-text ${allFilled ? "green" : "red"} `}>
                {allFilled ? "Good to go" : "Fill in all the fields"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewUserPopup;
