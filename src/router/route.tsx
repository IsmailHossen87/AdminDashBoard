import { createBrowserRouter } from "react-router";
import AdminLayout from "../AdminDashBoard/layout/AdminLayout";
import Dashboard from "../Components/Dashboard";
import Register from "../Page/Register";
import Login from "../Page/Login";

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
       {
        path: "signUp",
        element: <Register/>,
      },
       {
        path: "login",
        element: <Login/>,
      },
      
    ],
  },

]);

export default Routes;