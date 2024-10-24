import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Home from '../componets/pages/Home';
import Administration from "../componets/pages/Administration";
import Sidebar from "../componets/ui/SidebarHome/Sidebar";


export const AppRouter = () => {
  return (
    <div className="grid_container">
      <BrowserRouter>
        <nav>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/admin'>Administración</Link></li>
          </ul>
        </nav>

        <Sidebar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Administration />} />
        </Routes>

      </BrowserRouter>
    </div>
  );
};
