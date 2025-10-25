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
import WorkShopDetails from "../Page/workShop/workShopDetails";
import Cars from "../Page/CAR/GetAllCar";
import CarDetails from "../Page/CAR/CarDetails";
import UpdateWorkShop from "../Page/workShop/UpdateWorkShop";
import Profile from "../Page/Profile";
import Settings from "../Page/Setting/getSetting";

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
        element: <Profile/>,
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
        path: "admin/car",
        element: <Cars/>,
      },
       {
        path: "createAdmin",
        element: <CreateAdmin/>,
      },
      // SETTING
       {
        path: "admin/setting",
        element: <Settings/>,
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
       {
        path: "UpdateWorkShop/:workshopId",
        element: <UpdateWorkShop/>,
      },
       {
        path: "workShopDetails/:workShopId",
        element: <WorkShopDetails/>,
      },
       {
        path: "carDetails/:carId",
        element: <CarDetails/>,
      },
      
    ],
  },

]);

export default Routes;