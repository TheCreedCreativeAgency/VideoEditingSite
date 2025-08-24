import React from "react";
import ReactDOM from "react-dom/client";

import AboutPage from "./pages/About";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import IntroWrapper from "./hooks/IntroWrapper";
const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <IntroWrapper />,
    },
    {
      path: "/about",
      element: <AboutPage />,
    },
  ]);

  return <RouterProvider router={router} />;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);
