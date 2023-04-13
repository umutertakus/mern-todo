import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Auth from "./components/Auth";
import Home from "./components/Home";
import { useGlobal } from "./context/GlobalContext";

const App = () => {
  const { userId } = useGlobal();
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={userId ? <Home /> : <Navigate to="/auth" replace />}
        />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Router>
  );
};

export default App;
