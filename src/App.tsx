import React, { useEffect } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { ToastContainer } from './components/ToastContainer';

// Page Components
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { CategoryPage } from './pages/CategoryPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { PaymentPage } from './pages/PaymentPage';
import { ConfirmationPage } from './pages/ConfirmationPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { SearchResultsPage } from './pages/SearchResultsPage';
import { AuthPage } from './pages/AuthPage';

const AppContent: React.FC = () => {
  const { currentRoute, routeParams } = useShop();

  // Scroll to top upon page navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentRoute, routeParams]);

  // Page Switcher Router
  const renderCurrentPage = () => {
    switch (currentRoute) {
      case 'home':
        return <HomePage />;

      case 'shop':
        return <ShopPage />;

      case 'categories':
        return <CategoriesPage />;

      case 'category-oud':
        return <CategoryPage category="oud" />;

      case 'category-musk':
        return <CategoryPage category="musk" />;

      case 'category-floral':
        return <CategoryPage category="floral" />;

      case 'category-woody':
        return <CategoryPage category="woody" />;

      case 'product':
        return <ProductDetailPage key={routeParams?.id || 'default'} productId={routeParams?.id} />;

      case 'cart':
        return <CartPage />;

      case 'checkout':
        return <CheckoutPage />;

      case 'payment':
        return <PaymentPage />;

      case 'confirmation':
        return <ConfirmationPage orderId={routeParams?.orderId} />;

      case 'about':
        return <AboutPage />;

      case 'contact':
        return <ContactPage />;

      case 'search':
        return <SearchResultsPage initialQuery={routeParams?.query} />;

      case 'login':
        return <AuthPage initialMode="login" />;

      case 'signup':
        return <AuthPage initialMode="signup" />;

      case 'wishlist':
        return <AuthPage initialMode="login" />;

      case 'account':
        return <AuthPage initialMode="login" />;

      default:
        return <HomePage />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#111111] font-sans antialiased selection:bg-[#0F2C59] selection:text-white">
      {/* Global Luxury Navigation */}
      <Navbar />

      {/* Main Routed Page Body */}
      <main className="flex-grow">{renderCurrentPage()}</main>

      {/* Global Luxury Footer */}
      <Footer />

      {/* Global Slide-Over Cart Drawer */}
      <CartDrawer />

      {/* Global Interactive Search Modal */}
      <SearchModal />

      {/* Global Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
      }
