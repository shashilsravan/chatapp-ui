import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import HomePage from "./pages/HomePage";
import ChatScreen from "./pages/ChatScreen";
import DetailsPage from "./pages/DetailsPage";
import Dashboard from "./pages/Dashboard";

let router = createBrowserRouter([
    {
        path: "/",
        Component: Dashboard,
    },
    {
        path: "/pilot/:id",
        Component: ChatScreen,
    },
    {
        path: "/details",
        Component: DetailsPage,
    },
    {
        path: "/dashboard",
        Component: Dashboard,
    },
]);

// <div style={{ height: "100vh" }}>
//   <Header />
//   <div className="w-100 p-5" style={{ height: `calc(100% - 48px)` }}>
//     <RouterProvider router={router} />
//   </div>
// </div>
export default function App() {
    return (
      <div className="vw-100 vh-100">
        <RouterProvider router={router} />
      </div>
    );
}
