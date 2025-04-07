import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import HomePage from './pages/HomePage';
import Header from './components/Header';
import ChatScreen from './pages/ChatScreen';

let router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/pilot/:id",
    Component: ChatScreen,
  },
]);

export default function App() {
  return (
    <div style={{ height: "100vh" }}>
      <Header />
      <div className="w-100 p-5" style={{ height: `calc(100% - 48px)` }}>
        <RouterProvider router={router} />
      </div>
    </div>
  )
}
