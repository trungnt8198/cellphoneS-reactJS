import { BrowserRouter } from "react-router-dom";
import "./App.css";
import ScrollTop from "./hooks/ScrollTop";
import AppRoutes from "./components/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <ScrollTop />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
