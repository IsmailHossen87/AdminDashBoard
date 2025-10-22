import { createBrowserRouter } from "react-router";
import AdminLayout from "../AdminDashBoard/layout/AdminLayout";
import Dashboard from "../Components/Dashboard";

const Routes = createBrowserRouter([
  {
    path: "/",
    element:<AdminLayout/> ,
    // errorElement: <Error />,
    children: [
       {
        path: "admin/dashboard",
        element: <Dashboard/>,
      },
      
    ],
  },

]);

export default Routes;