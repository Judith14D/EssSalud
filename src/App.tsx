import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/index";
import Layout from "./components/layout/Layout";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <AppRouter />
      </Layout>
    </BrowserRouter>
  );
}
