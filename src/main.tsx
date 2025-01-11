import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "@/designs/index.scss";
import "@/designs/index.css";
const app = document.getElementById("root");
createRoot(app!).render(
	<StrictMode>
		<App></App>
	</StrictMode>
);
