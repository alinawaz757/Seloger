import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { default as api } from "../store/apiSlice";
import { useSnackbar } from "notistack";
import useLocalStorage from "../utils/useLocalStorage";

const NavBar = ({ isSignedIn }) => {
  const [id, setId] = useLocalStorage("id");
  const [addUser] = api.useAddUserMutation();

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const login = () => {
    window.gapi.auth2
      .getAuthInstance()
      .signIn()
      .then((res) => {
        let user = res.getBasicProfile();
        const userObject = { name: user.getName(), email: user.getEmail() };
        addUser(userObject).then(({ data }) => {
          if (data.message) {
            console.log(data.message);
            setId(data._id);
            console.log("id", id);
            navigate(`/users/${data._id}`);
            enqueueSnackbar("Logged In Successfully");

            return;
          }
          console.log("user created", data);
          setId(data._id);
          navigate(`/users/${data._id}`);
        });
      });
  };

  const logout = () => {
    window.gapi.auth2.getAuthInstance().signOut();
    localStorage.clear("name");
    enqueueSnackbar("Logged Out Successfully");
    navigate("/");
  };
  const getItems = () => {
    navigate(`/users/${id}`);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        padding: "16px",
        backgroundColor: "RGB(250,250,250)",
        borderBottom: "2px solid RGB(1,90,232)",
        boxShadow: "2px 2px 20px gray",
        position: "fixed",
        width: "100%",
        top: "0",
      }}
    >
      {isSignedIn === undefined ? (
        ""
      ) : isSignedIn ? (
        <>
          <Link to="/">
            <button
              style={{ width: "100px", fontSize: "20px", padding: "8px" }}
            >
              Home
            </button>
          </Link>
          <span>
            <button
              style={{ width: "100px", fontSize: "20px", padding: "8px" }}
              onClick={() => logout()}
            >
              Logout
            </button>
            <button
              style={{
                width: "100px",
                fontSize: "20px",
                padding: "8px",
                marginLeft: "12px",
              }}
              onClick={() => getItems()}
            >
              Items
            </button>
          </span>
        </>
      ) : (
        <>
          <Link to="/">
            <button
              style={{ width: "100px", fontSize: "20px", padding: "8px" }}
            >
              Home
            </button>
          </Link>
          <button
            style={{ width: "100px", fontSize: "20px", padding: "8px" }}
            onClick={() => login()}
          >
            Login
          </button>
        </>
      )}
    </div>
  );
};

export default NavBar;
