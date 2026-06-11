import { createRoot } from "react-dom/client";
import { setAuthTokenGetter } from "@workspace/api-client-react";
import { getAuthToken } from "@/lib/auth";
import App from "./App";
import "./index.css";

// Wire the Bearer token getter so every API call includes Authorization header
setAuthTokenGetter(getAuthToken);

createRoot(document.getElementById("root")!).render(<App />);
