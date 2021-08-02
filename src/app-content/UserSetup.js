import "./UserSetup.css";
import userIcon from "./icons/user-icon.svg";
import keyIcon from "./icons/key.svg";
import statusOn from "./icons/status-on.svg";
import statusOff from "./icons/status-off.svg";
import arrowDown from "./icons/arrow-down.svg";
import { useState } from "react";
import { useHistory } from "react-router-dom";

function UserSetup({ user, getCurrentUser, userUpdateHandler }) {
  const [newFirstName, setNewFirstName] = useState(user?.firstName);
  const [newLastName, setNewLastName] = useState(user?.lastName);
  const [statusIsActive, setStatusIsActive] = useState(user?.isActive);
  const [role, setRole] = useState(user?.role);

  const history = useHistory();

  const [roleDisplay, setRoleDisplay] = useState("none");
  const toggleRoleDisplay = () => {
    roleDisplay === "none" ? setRoleDisplay("flex") : setRoleDisplay("none");
  };

  const handleNewFirstName = (name) => {
    setNewFirstName(name);
  };
  const handleNewLastName = (name) => {
    setNewLastName(name);
  };

  const saveChangesHandler = () => {
    userUpdateHandler(user.id, newFirstName, newLastName, role, statusIsActive);
    history.push("/");
  };

  return user ? (
    <div className="user-setup">
      <div className="us-content">
        <div className={`user-side ${statusIsActive ? "" : "disabled"}`}>
          <div className="user-img">
            <img src={userIcon} alt="User Avatar"></img>
            <div className={`bottom-text ${statusIsActive ? "" : "disappear"}`}>
              UPLOAD A PHOTO
            </div>
            {role === "Admin" && (
              <div className="admin-badge">
                <img src={keyIcon} alt="Admin Sign Key Icon" />
              </div>
            )}
          </div>
          <div className="name-email">
            <div className="name">{newFirstName}</div>
            <div className="name">{newLastName}</div>
            <div className="email">{user.email}</div>
          </div>
          <div
            className={`invite-btn-wrapper ${
              statusIsActive ? "" : "disappear"
            }`}
          >
            <div className="us-btn invite-btn">Resend the invite</div>
          </div>
        </div>
        <div className="user-details">
          <div className="u-header details-header">Details</div>
          <div className="status">
            <div
              className="user-status"
              onClick={() => {
                setStatusIsActive(!statusIsActive);
              }}
            >
              <img
                src={statusIsActive ? statusOn : statusOff}
                alt="status icon"
              />
            </div>
            <div className="status-text">
              The user is <span>{statusIsActive ? "Active" : "Inactive"}</span>
            </div>
          </div>
          <div className={`form-fields ${statusIsActive ? "" : "disabled"}`}>
            <label htmlFor="first-name">* First Name</label>
            <input
              id="first-name"
              value={newFirstName}
              onChange={(e) => handleNewFirstName(e.target.value)}
            ></input>
            <label htmlFor="last-name">* Last Name</label>
            <input
              id="last-name"
              value={newLastName}
              onChange={(e) => handleNewLastName(e.target.value)}
            ></input>
            <label htmlFor="p-role">* Role</label>
            <div
              className="role"
              id="p-role"
              onClick={() => {
                toggleRoleDisplay();
              }}
            >
              <span className="user-role">{role}</span>
              <div className="arrow arrow-down"></div>
              <div className="roles" style={{ display: roleDisplay }}>
                <div
                  onClick={() => {
                    setRole("Admin");
                  }}
                >
                  Admin
                </div>
                <div
                  onClick={() => {
                    setRole("User");
                  }}
                >
                  User
                </div>
              </div>
            </div>
            <div
              className={`us-btn save-btn ${statusIsActive ? "" : "disappear"}`}
              onClick={() => saveChangesHandler()}
            >
              Save Changes
            </div>
          </div>
        </div>
        <div className="user-permissions">
          <div className="permissions-header">
            <div className="u-header">Permissions</div>
            <div>{role}</div>
          </div>
          <div className={statusIsActive ? "" : "disabled"}>
            <div className="super-admin perm-align perm-group">
              <div className="sa-text">Super Admin</div>
              <div className={`permission-icon ${statusIsActive ? "" : "disappear"}`}>
                <img
                  src={user.permissions.isSuperAdmin ? statusOn : statusOff}
                  alt="status icon"
                />
              </div>
            </div>
            <div className="permission-group-1 perm-group">
              <div className="group-head-wrapper  perm-align">
                <div className="pg-arrow">
                  <img src={arrowDown} alt="arrow for group collapse" />
                </div>
                <div className="gp-text">Permission group 1</div>
                <div className={`permission-icon ${statusIsActive ? "" : "disappear"}`}>
                  <img
                    src={
                      user.permissions.groupOne.gPermissonAll
                        ? statusOn
                        : statusOff
                    }
                    alt="status icon"
                  />
                </div>
              </div>
              <div className="perm-group-list">
                <div className="g1-perm11 perm-align">
                  <div className="g1-p-text">
                    <div
                      className={`perm-circle ${
                        user.permissions.groupOne.permissionList.includes(
                          "permission11"
                        )
                          ? "pc-blue"
                          : "pc-red"
                      }`}
                    ></div>
                    Permission 11
                  </div>
                  <div className={`permission-icon ${statusIsActive ? "" : "disappear"}`}>
                    <img
                      src={
                        user.permissions.groupOne.permissionList.includes(
                          "permission11"
                        )
                          ? statusOn
                          : statusOff
                      }
                      alt="status icon"
                    />
                  </div>
                </div>
                <div className="g1-perm12 perm-align">
                  <div className="g1-p-text">
                    <div
                      className={`perm-circle ${
                        user.permissions.groupOne.permissionList.includes(
                          "permission12"
                        )
                          ? "pc-blue"
                          : "pc-red"
                      }`}
                    ></div>
                    Permission 12
                  </div>
                  <div className={`permission-icon ${statusIsActive ? "" : "disappear"}`}>
                    <img
                      src={
                        user.permissions.groupOne.permissionList.includes(
                          "permission12"
                        )
                          ? statusOn
                          : statusOff
                      }
                      alt="status icon"
                    />
                  </div>
                </div>
                <div className="g1-perm13 perm-align">
                  <div className="g1-p-text">
                    <div
                      className={`perm-circle ${
                        user.permissions.groupOne.permissionList.includes(
                          "permission13"
                        )
                          ? "pc-blue"
                          : "pc-red"
                      }`}
                    ></div>
                    Permission 13
                  </div>
                  <div className={`permission-icon ${statusIsActive ? "" : "disappear"}`}>
                    <img
                      src={
                        user.permissions.groupOne.permissionList.includes(
                          "permission13"
                        )
                          ? statusOn
                          : statusOff
                      }
                      alt="status icon"
                    />
                  </div>
                </div>
                <div className="g1-perm14 perm-align">
                  <div className="g1-p-text">
                    <div
                      className={`perm-circle ${
                        user.permissions.groupOne.permissionList.includes(
                          "permission14"
                        )
                          ? "pc-blue"
                          : "pc-red"
                      }`}
                    ></div>
                    Permission 14
                  </div>
                  <div className={`permission-icon ${statusIsActive ? "" : "disappear"}`}>
                    <img
                      src={
                        user.permissions.groupOne.permissionList.includes(
                          "permission14"
                        )
                          ? statusOn
                          : statusOff
                      }
                      alt="status icon"
                    />
                  </div>
                </div>
                <div className="g1-perm15 perm-align">
                  <div className="g1-p-text">
                    <div
                      className={`perm-circle ${
                        user.permissions.groupOne.permissionList.includes(
                          "permission15"
                        )
                          ? "pc-blue"
                          : "pc-red"
                      }`}
                    ></div>
                    Permission 15
                  </div>
                  <div className={`permission-icon ${statusIsActive ? "" : "disappear"}`}>
                    <img
                      src={
                        user.permissions.groupOne.permissionList.includes(
                          "permission15"
                        )
                          ? statusOn
                          : statusOff
                      }
                      alt="status icon"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="permission-group-2 perm-group">
              <div className="group-head-wrapper  perm-align">
                <div className="pg-arrow">
                  <img src={arrowDown} alt="arrow for group collapse" />
                </div>
                <div className="gp-text">Permission group 2</div>
                <div className={`permission-icon ${statusIsActive ? "" : "disappear"}`}>
                  <img
                    src={
                      user.permissions.groupTwo.gPermissonAll
                        ? statusOn
                        : statusOff
                    }
                    alt="status icon"
                  />
                </div>
              </div>
            </div>
            <div className="permission-group-3 perm-group">
              <div className="group-head-wrapper  perm-align">
                <div className="pg-arrow">
                  <img src={arrowDown} alt="arrow for group collapse" />
                </div>
                <div className="gp-text">Permission group 3</div>
                <div className={`permission-icon ${statusIsActive ? "" : "disappear"}`}>
                  <img
                    src={
                      user.permissions.groupThree.gPermissonAll
                        ? statusOn
                        : statusOff
                    }
                    alt="status icon"
                  />
                </div>
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

export default UserSetup;
