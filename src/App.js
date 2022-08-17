import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PageHome } from "./pages/Home";
import { PagePostCreate } from "./pages/PostCreate";
import { PagePostDetails } from "./pages/PostDetails";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageHome />} />
        <Route path="/posts/new" element={<PagePostCreate />} />
        <Route path="/posts/:id" element={<PagePostDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export { App };
