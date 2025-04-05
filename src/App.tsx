import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeContextProvider } from './theme/ThemeContextProvider';
import MainLayout from './layouts/MainLayout/MainLayout';
import ProductsPage from './pages/Products/ProductsPage';
import OrdersPage from './pages/Orders/OrdersPage';

function App() {
  return (
    <ThemeContextProvider>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<div>Dashboard Content</div>} />
            <Route path="/categories" element={<div>Categories Content</div>} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/users" element={<div>Users Content</div>} />
            <Route path="/reports/sales" element={<div>Sales Report Content</div>} />
            <Route path="/reports/analytics" element={<div>Analytics Content</div>} />
            <Route path="/settings" element={<div>Settings Content</div>} />
          </Routes>
        </MainLayout>
      </Router>
    </ThemeContextProvider>
  );
}

export default App;
