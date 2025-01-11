import DefaultLayout from "@/layouts/defaultLayout";
import Dashboard from "@/views/dashboard";
import Create from "@/views/dashboard/create";
import { createBrowserRouter } from "react-router-dom";
const routeElements = createBrowserRouter([
	{
		path: "/",
		element: <DefaultLayout />,
		children: [
			{
				path: "/",
				element: <Dashboard />
			},
			{
				path: "/create",
				element: <Create />
			},
			{
				path: "/edit/:id",
				element: <Create />
			}
		]
	}
]);
export default routeElements;
