import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"

import NavBar from "./Components/NavBar.jsx";
import Home from "./Pages/Home.jsx";
import Feed from "./Pages/Feed.jsx";
import Admin from "./Pages/Admin.jsx";


export default function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Feed" element={<Feed />} />
          <Route path="/Admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
