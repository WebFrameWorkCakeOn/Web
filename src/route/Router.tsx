import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../layout/RootLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import OrderPage from "../pages/OrderPage";
import StorePage from "../pages/StorePage";
import MyPage from "../pages/MyPage";
import OrderDetailPage from "../pages/OrderDetailPage";
import SearchResultPage from "../pages/SearchResultPage";
import OwnerPage1 from "../pages/OwnerPage";

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
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "order",
        element: <OrderPage />,
      },
      {
        path: "store-page",
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
        path: "/search-results",
        element: <SearchResultPage />,
      },
      {
        path: "owner-page1",
        element: <OwnerPage1 />,
      },
      // 나중에 "/about" 페이지를 추가하고 싶다면 여기에 추가하면 됨,, 상욱아
      // {
      //   path: "about", 이게 페이지 주소
      //   element: <AboutPage /> 이게 컴포넌트
      // }
    ],
  },
]);
