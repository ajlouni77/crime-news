import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Make sure you import this
import "./index.css";
import "./i18n.js"
import App from "./App.jsx";
import { UserProvider } from "./Context/UserContext.jsx";
import { LanguageProvider } from "./context/LanguageContext.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
      <LanguageProvider> 
          <App />
        </LanguageProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
