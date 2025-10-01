import React from "react";
import { AuthProvider } from "./context/AuthContext";
import { CookiesProvider } from "react-cookie";
import Main from "./navigation/Main";
import { FoodDonationProvider } from "./context/FoodDonationContext";
import { NgoProvider } from "./context/NgoContext";

function App() {
  return (
    <CookiesProvider>
      <AuthProvider>
        <FoodDonationProvider>
          <NgoProvider>
            <Main />
          </NgoProvider>
        </FoodDonationProvider>
      </AuthProvider>
    </CookiesProvider>
  );
}

export default App;
