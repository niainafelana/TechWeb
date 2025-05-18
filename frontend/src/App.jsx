import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import routes from "./routes/routes";
import "./App.css"

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          {routes.map(({ path, element }, index) => (
            <Route key={index} path={path} element={element} />
          ))}
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
