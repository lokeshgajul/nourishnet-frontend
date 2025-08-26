import React from "react";
import { AuthProvider } from "./context/AuthContext";
import { CookiesProvider } from "react-cookie";
import Main from "./navigation/Main";
import { FoodDonationProvider } from "./context/FoodDonationContext";

function App() {
  return (
    <CookiesProvider>
      <AuthProvider>
        <FoodDonationProvider>
          <Main />
        </FoodDonationProvider>
      </AuthProvider>
    </CookiesProvider>
  );
}

export default App;
