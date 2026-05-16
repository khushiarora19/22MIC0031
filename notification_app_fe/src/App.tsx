import { useEffect } from "react";
import Log from "./middleware/logger";

function App() {
  useEffect(() => {
    Log(
      "frontend",
      "info",
      "component",
      "App component loaded successfully"
    );
  }, []);

  return (
    <div>
      <h1>Logging Middleware Working ✅</h1>
    </div>
  );
}

export default App;