import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../layout/RootLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import OrderPage from "../pages/OrderPage";
import StorePage from "../pages/StorePage";
import MyPage from "../pages/MyPage";
import OrderDetailPage from "../pages/OrderDetailPage";
import SearchResultPage from "../pages/SearchResultPage";
import SignupPage from "../pages/SignupPage";
import OrderList from "../pages/OrderList";
import { AuthLayout } from "../layout/AuthLayout";
import MyStorePage from "../pages/MyStorePage";
import MyStoreListPage from "../pages/MyStoreListPage";
import OwnerPage3 from "../pages/ManageItemPage";
import AddMenuPage from "../pages/AddMenuPage";
import AddStorePage from "../pages/AddStorePage";
import StoreList from "../pages/StoreList";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },

      {
        path: "order/:id",
        element: <OrderPage />,
      },
      {
        path: "order-list",
        element: <OrderList />,
      },
      {
        path: "store-page/:id",
        element: <StorePage />,
      },
      {
        path: "my-page",
        element: <MyPage />,
      },
      {
        path: "order-detail",
        element: <OrderDetailPage />,
      },
      {
        path: "storelist-page",
        element: <StoreList />,
      },
      {
        path: "/search-results",
        element: <SearchResultPage />,
      },
      {
        path: "mystore-page",
        element: <MyStorePage />,
      },
      {
        path: "mystoreList-page",
        element: <MyStoreListPage />,
      },
      {
        path: "manage-items",
        element: <OwnerPage3 />,
      },
      {
        path: "add-menuitems",
        element: <AddMenuPage />,
      },
      {
        path: "add-store",
        element: <AddStorePage />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "sign-up",
        element: <SignupPage />,
      },
    ],
  },
]);
