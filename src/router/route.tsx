import { createBrowserRouter } from "react-router";
import AdminLayout from "../AdminDashBoard/layout/AdminLayout";
import Dashboard from "../Components/Dashboard";
import Register from "../Page/Register";
import Login from "../Page/Login";
import CreateAdmin from "../Page/CreateAdmin";
import MessageList from "../Page/Message";
import CarBrandComponent from "../Page/CARBRAND/Brand";
import CreateCarBrand from "../Page/CARBRAND/createCar";
import CarModelTable from "../Page/CARMODEL/carModelTable";
import CreateCarModel from "../Page/CARMODEL/CreateCarModel";
import CarBrandDetail from "../Page/CARBRAND/Details";
import WorkShop from "../Page/workShop/workShop";

const Routes = createBrowserRouter([
  {
    path: "/",
    element:<AdminLayout/> ,
    // errorElement: <Error />,
    children: [
       {
        index:true,
        element: <Dashboard/>,
      },
       {
        path: "admin/profile",
        element: <Dashboard/>,
      },
       {
        path: "admin/dashboard",
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
        path: "admin/carmodel",
        element: <CarModelTable/>,
      },
       {
        path: "admin/details/:id",
        element: <CarBrandDetail/>,
      },
       {
        path: "admin/workShop",
        element: <WorkShop/>,
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
       {
        path: "model",
        element: <CreateCarModel/>,
      },
      
    ],
  },

]);

export default Routes;