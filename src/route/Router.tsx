import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../layout/RootLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import StorePage from "../pages/StorePage";
import MyPage from "../pages/MyPage";

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
        path: "store-page",
        element: <StorePage />,
      },
      {
        path: "my-page",
        element: <MyPage />,
      },
      // 나중에 "/about" 페이지를 추가하고 싶다면 여기에 추가하면 됨,, 상욱아
      // {
      //   path: "about", 이게 페이지 주소
      //   element: <AboutPage /> 이게 컴포넌트
      // }
    ],
  },
]);
