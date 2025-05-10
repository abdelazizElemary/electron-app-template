import ReactDOM from "react-dom/client";
import { Routes, Route, HashRouter } from "react-router-dom";
import AppIndex from "./components/pages/app-index";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<AppIndex />} />
      </Routes>
    </HashRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
