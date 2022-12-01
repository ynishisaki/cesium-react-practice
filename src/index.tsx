import ReactDOM from "react-dom/client";
import App from "./App";

const input = document.getElementById("root");

if (input != null) {
    const root = ReactDOM.createRoot(input);
    root.render(<App />);
}
