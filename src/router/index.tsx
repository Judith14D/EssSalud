import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Services from "../pages/Services/Services";
import Preguntas from "../pages/Preguntas/Preguntas";
import NewsListPage from "../pages/Noticias/NewsListPage";
import NewsDetailPage from "../pages/Noticias/NewsDetailPage";
import DoctorsPage from "../pages/About/DoctorsPage";
import Login from "../pages/Auth/login";
import AdminHome from "../pages/Admin/AdminHome";
import ConfigChatbot from "../pages/Admin/ConfigChatbot";
import Reportes from "../pages/Admin/Reportes";
import Perfil from "../pages/Admin/Perfil";
import AdminRoute from "../router/AdminRoute";
import ScrollToTop from "../components/ScrollToTop";

export default function AppRouter() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nosotros" element={<About />} />
        <Route path="/preguntas" element={<Preguntas />} />
        <Route path="/services" element={<Services />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/news" element={<NewsListPage />} />
        <Route path="/news/:id" element={<NewsDetailPage />} />
        <Route path="/doctors" element={<DoctorsPage />} />

        <Route path="/admin" element={<AdminRoute />}>
          <Route path="home" element={<AdminHome />} />
          <Route path="chatbot" element={<ConfigChatbot />} />
          <Route path="reportes" element={<Reportes />} />
          <Route path="perfil" element={<Perfil />} />
        </Route>
      </Routes>
    </>
  );
}
