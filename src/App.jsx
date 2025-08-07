import React from "react";
import { AuthProvider } from "./context/AuthContext";
import { CookiesProvider } from "react-cookie";
import Main from "./navigation/Main";

function App() {
  return (
    <CookiesProvider>
      <AuthProvider>
        <Main />
      </AuthProvider>
    </CookiesProvider>
  );
}

export default App;
