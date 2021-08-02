import "./UserRow.css";
import userIcon from "./icons/user-icon.svg";
import keyIcon from "./icons/key.svg";
import keyIconFade from "./icons/key-fade.svg";
import statusOn from "./icons/status-on.svg";
import statusOff from "./icons/status-off.svg";
import userSetup from "./icons/user-setup.png";
import userDelete from "./icons/user-delete.svg";
import { useHistory } from "react-router-dom";

function UserRow({
  user,
  getCurrentUser,
  statusChangeHandler,
  deleteUserButtonHandler,
}) {
  const history = useHistory();

  return (
    <>
      {user && (
        <div className="user-row-wrapper">
          <div className="user-row">
            <div className="user-icon" id={!user.isActive ? "disabled" : ""}>
              <img src={userIcon} alt="User Avatar" />
            </div>
            <div className="user-info" id={!user.isActive ? "disabled" : ""}>
              <div className="user-name">
                {user.firstName} {user.lastName}
              </div>
              <div className="user-email">{user.email}</div>
            </div>
            <div className="user-role" id={!user.isActive ? "disabled" : ""}>
              {(() => {
                if (user.role === "Admin") {
                  return (
                    <>
                      {user.isActive ? (
                        <div className="key-icon">
                          <img src={keyIcon} alt="Admin Sign Key Icon" />
                        </div>
                      ) : (
                        <div className="key-icon-fade">
                          <img src={keyIconFade} alt="Admin Sign Key Icon" />
                        </div>
                      )}
                    </>
                  );
                }
              })()}
              <div className="user-role-name">{user.role}</div>
            </div>
            <div
              className="user-status"
              onClick={() => statusChangeHandler(user.id)}
            >
              <img
                src={user.isActive ? statusOn : statusOff}
                alt="status icon"
              />
            </div>
            <div className="user-actions">
              {user.isActive && (
                <div
                  className="user-setup"
                  onClick={() => {
                    getCurrentUser(user.id);
                    history.push("/user-setup");
                  }}
                >
                  <img src={userSetup} alt="User Setup Icon" />
                </div>
              )}
              <div
                className="user-delete"
                onClick={() => deleteUserButtonHandler(user)}
              >
                <img src={userDelete} alt="User Delete Icon" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UserRow;
