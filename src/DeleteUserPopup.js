import React from "react";
import face from "./app-content/icons/face.svg";

function DeleteUserPopup({
  user,
  deletePopupDisplay,
  setDeletePopupDisplay,
  deleteUserHandler,
}) {
  return user ? (
    <div className="popup-wrapper" style={{ display: deletePopupDisplay }}>
      <div className="popup">
        <div
          className="close-popup"
          onClick={() =>
            setDeletePopupDisplay((display) => (display ? "" : "none"))
          }
        >
          X
        </div>
        <div className="ppp-wrapper">
          <div className="ppp-header">Delete User</div>
          <div className="delete-content">
            <div className="delete-user">
              <div className="field-icon">
                <img src={face} alt="face user sign" />
              </div>
              <div className="user-name">{`${user.firstName} ${user.lastName}`}</div>
              <div className="user-status">{`${
                user.isActive ? "Active User" : "Non Active User"
              }`}</div>
            </div>
            <div className="popup-action">
              <div
                className="send-delete"
                id="delete-user-button"
                onClick={() => deleteUserHandler(user.id)}
              >
                <div className="btn-text">Delete User</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default DeleteUserPopup;
