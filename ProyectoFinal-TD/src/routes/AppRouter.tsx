import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Home from '../componets/pages/Home';
import Administration from "../componets/pages/Administration";

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

        <aside>
          side bar
        </aside>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Administration />} />
        </Routes>

      </BrowserRouter>
    </div>
  );
};
