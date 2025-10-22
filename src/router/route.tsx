import { createBrowserRouter } from "react-router";
import AdminLayout from "../AdminDashBoard/layout/AdminLayout";
import Dashboard from "../Components/Dashboard";
import Register from "../Page/Register";
import Login from "../Page/Login";
import CreateAdmin from "../Page/CreateAdmin";
import MessageList from "../Page/Message";
import CarBrandComponent from "../Page/Brand";
import CarBrandDetail from "../Page/Details";
import CreateCarBrand from "../Page/createCar";

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
        path: "admin/profile",
        element: <Dashboard/>,
      },
       {
        path: "admin/createAdmin",
        element: <CreateAdmin/>,
      },
       {
        path: "admin/message",
        element: <MessageList/>,
      },
       {
        path: "admin/brand",
        element: <CarBrandComponent/>,
      },
       {
        path: "admin/details/:id",
        element: <CarBrandDetail/>,
      },
       {
        path: "signUp",
        element: <Register/>,
      },
       {
        path: "login",
        element: <Login/>,
      },
       {
        path: "create",
        element: <CreateCarBrand/>,
      },
      
    ],
  },

]);

export default Routes;