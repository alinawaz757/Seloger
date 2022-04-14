import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {default as api} from "../store/apiSlice";

const NavBar = () => {
  const [isSignedIn, setIsSignedIn] = useState(null);
  const [addUser] = api.useAddUserMutation()
  useEffect(() => {
    window.gapi.load(
      "client:auth2",
      () => {
        window.gapi.client.init({
            clientId:
              "1087669028902-afkns6qrjqrln9kocnvbtbp63c2vdjuj.apps.googleusercontent.com",
            scope: "email",
          }).then((err) => {
            if(err) return err;
            const authenticate = window.gapi.auth2.getAuthInstance();
            setIsSignedIn(authenticate.isSignedIn.get());
            authenticate.isSignedIn.listen(onAuthChange);
          });
      }
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isSignedIn]);
  const onAuthChange = () => {
    setIsSignedIn(!isSignedIn);
  };
  const login = () => {
    window.gapi.auth2
      .getAuthInstance()
      .signIn()
      .then((res) => {
        let user = res.getBasicProfile()
        const userObject = {name:user.getName(),email:user.getEmail()}
        addUser(userObject).then(({data})=>{
          if(data.message){
            console.log(data.message)
            localStorage.setItem("name",user.getName())
            console.log(localStorage.getItem("name"))
            return 
          }
          console.log("user created",data)
        })
      });
  };

  const logout = () => {
    window.gapi.auth2.getAuthInstance().signOut();
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
        width: "100vw",
        top: "0",
      }}
    >
      <Link to="/">
        <button style={{ width: "100px", fontSize: "20px", padding: "8px" }}>
          Home
        </button>
      </Link>
      {isSignedIn ? (
        <button
          style={{ width: "100px", fontSize: "20px", padding: "8px" }}
          onClick={() => logout()}
        >
          Logout
        </button>
      ) : (
        <button
          style={{ width: "100px", fontSize: "20px", padding: "8px" }}
          onClick={() => login()}
        >
          Login
        </button>
      )}
    </div>
  );
};

export default NavBar;
