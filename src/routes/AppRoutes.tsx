import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ProductDetails from '../pages/ProductDetails';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/*" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;