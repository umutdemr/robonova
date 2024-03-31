import React from "react";
import { useAuth } from "./use-auth-client";

function LoggedIn() {
  const { logout, principal } = useAuth(); // principal'ı al

  return (
    <div className="container">
      <h1>Internet Identity Client</h1>
      <h2>You are authenticated as: {principal ? principal.toText() : 'Unknown'}</h2> {/* Kullanıcının kimliğini göster */}
      <button id="logout" onClick={logout}>
        log out
      </button>
    </div>
  );
}

export default LoggedIn;
