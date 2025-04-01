import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { UserProvider } from "./contexts/UserContext/index.jsx";

createRoot(document.getElementById("root")).render(
  <UserProvider>
    <App />
  </UserProvider>
);
