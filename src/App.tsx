import "@/designs/index.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/designs/page/dashboard.scss";
import { RouterProvider } from "react-router-dom";
import routeElements from "./routers/useRouterModules";
function App() {
	return (
		<div id="app">
			<RouterProvider router={routeElements} />
		</div>
	);
}

export default App;
