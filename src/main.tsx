import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import init from "./msw/index.ts";

init();

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
