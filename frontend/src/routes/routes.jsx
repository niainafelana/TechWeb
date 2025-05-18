// routes/routes.js
import MainContent from "../pages/Home";
import ProductPage from "../pages/ProductPage";
import BagPage from "../pages/BagPage";

const routes = [
  {
    path: "/",
    element: <MainContent/>,
    name: "Accueil",
  },
  {
    path: "/product/:id",
    element: <ProductPage />,
    name: "Produits",
  },
  {
    path: "/panier",
    element: <BagPage />,
    name: "Panier",
  },
];

export default routes;
