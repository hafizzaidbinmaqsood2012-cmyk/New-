import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, BottleSize, CartItem, ShippingOption, CustomerDetails, Order, User } from '../types';
import { PERFUMES_DATA, SHIPPING_OPTIONS } from '../data/perfumes';

interface Toast {
  id: string;
  message: string;
  type: 'info' | 'success' | 'navy';
}

interface ShopContextType {
  // Routing
  currentRoute: string;
  routeParams: Record<string, string>;
  navigateTo: (route: string, params?: Record<string, string>) => void;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Cart
  cart: CartItem[];
  cartCount: number;
  subtotal: number;
  discountAmount: number;
  discountCode: string;
  shippingFee: number;
  tax: number;
  cartTotal: number;
  addToCart: (product: Product, selectedSize?: BottleSize, quantity?: number, openDrawer?: boolean) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQuantity: number) => void;
  clearCart: () => void;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  selectedShipping: ShippingOption;
  setShippingOption: (option: ShippingOption) => void;
  selectedSamples: string[];
  toggleSample: (sample: string) => void;
  giftNote: string;
  setGiftNote: (note: string) => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (open: boolean) => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Checkout & Order
  customerDetails: CustomerDetails;
  updateCustomerDetails: (details: Partial<CustomerDetails>) => void;
  currentOrder: Order | null;
  completeOrder: (paymentMethod: string, last4?: string) => Order;
  orderHistory: Order[];
  orders: Order[];

  // Auth
  currentUser: User | null;
  user: User | null;
  login: (email: string, passwordOrName?: string) => boolean;
  signup: (name: string, email: string, password?: string) => boolean;
  register: (name: string, email: string, password?: string) => boolean;
  logout: () => void;

  // Toasts
  toasts: Toast[];
  showToast: (message: string, type?: 'info' | 'success' | 'navy') => void;
  removeToast: (id: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CART: 'avendora_cart_v1',
  WISHLIST: 'avendora_wishlist_v1',
  USER: 'avendora_user_v1',
  ORDERS: 'avendora_orders_v1',
  CUSTOMER: 'avendora_customer_v1',
  PROMO: 'avendora_promo_v1',
};

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Parse initial route from URL Hash e.g. #/product/oud-imperial-noir or #/cart
  const getRouteFromHash = () => {
    const hash = window.location.hash.replace('#', '') || '/';
    const [path, queryString] = hash.split('?');
    const segments = path.split('/').filter(Boolean);
    const queryParams: Record<string, string> = {};

    if (queryString) {
      const sp = new URLSearchParams(queryString);
      sp.forEach((val, key) => {
        queryParams[key] = val;
      });
    }

    if (segments.length === 0) return { route: 'home', params: queryParams };
    
    if (segments[0] === 'shop' || segments[0] === 'perfumes') return { route: 'shop', params: queryParams };
    if (segments[0] === 'categories') return { route: 'categories', params: queryParams };
    if (segments[0] === 'category') {
      const cat = segments[1] || 'oud';
      return { route: `category-${cat}`, params: { category: cat, ...queryParams } };
    }
    if (segments[0] === 'product') {
      return { route: 'product', params: { id: segments[1] || PERFUMES_DATA[0].id, ...queryParams } };
    }
    if (segments[0] === 'cart') return { route: 'cart', params: queryParams };
    if (segments[0] === 'checkout') return { route: 'checkout', params: queryParams };
    if (segments[0] === 'payment') return { route: 'payment', params: queryParams };
    if (segments[0] === 'confirmation') {
      return { route: 'confirmation', params: { orderId: segments[1] || '', ...queryParams } };
    }
    if (segments[0] === 'about') return { route: 'about', params: queryParams };
    if (segments[0] === 'contact') return { route: 'contact', params: queryParams };
    if (segments[0] === 'search') return { route: 'search', params: queryParams };
    if (segments[0] === 'login') return { route: 'login', params: queryParams };
    if (segments[0] === 'signup') return { route: 'signup', params: queryParams };
    if (segments[0] === 'wishlist') return { route: 'wishlist', params: queryParams };
    if (segments[0] === 'account') return { route: 'account', params: queryParams };

    return { route: 'home', params: queryParams };
  };

  const initialParsed = getRouteFromHash();
  const [currentRoute, setCurrentRoute] = useState<string>(initialParsed.route);
  const [routeParams, setRouteParams] = useState<Record<string, string>>(initialParsed.params);

  // Sync with Hash Changes (Back / Forward navigation)
  useEffect(() => {
    const handleHashChange = () => {
      const parsed = getRouteFromHash();
      setCurrentRoute(parsed.route);
      setRouteParams(parsed.params);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (route: string, params?: Record<string, string>) => {
    let hashPath = '/';
    if (route === 'home') hashPath = '/';
    else if (route === 'shop') hashPath = '/shop';
    else if (route === 'categories') hashPath = '/categories';
    else if (route.startsWith('category-')) {
      const cat = route.replace('category-', '');
      hashPath = `/category/${cat}`;
    } else if (route === 'product') {
      hashPath = `/product/${params?.id || PERFUMES_DATA[0].id}`;
    } else if (route === 'cart') hashPath = '/cart';
    else if (route === 'checkout') hashPath = '/checkout';
    else if (route === 'payment') hashPath = '/payment';
    else if (route === 'confirmation') hashPath = `/confirmation/${params?.orderId || ''}`;
    else if (route === 'about') hashPath = '/about';
    else if (route === 'contact') hashPath = '/contact';
    else if (route === 'search') {
      hashPath = params?.query ? `/search?q=${encodeURIComponent(params.query)}` : '/search';
    } else if (route === 'login') hashPath = '/login';
    else if (route === 'signup') hashPath = '/signup';
    else if (route === 'wishlist') hashPath = '/wishlist';
    else if (route === 'account') hashPath = '/account';

    window.location.hash = hashPath;
    setCurrentRoute(route);
    setRouteParams(params || {});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart State with Session Persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch {
      // Ignore storage write errors
    }
  }, [cart]);

  // Wishlist State
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
    } catch {
      // Ignore
    }
  }, [wishlist]);

  // User State
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Orders History
  const [orderHistory, setOrderHistory] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  // Customer Details Form Cache
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CUSTOMER);
      return saved
        ? JSON.parse(saved)
        : {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            address: '',
            apartment: '',
            city: '',
            state: '',
            postalCode: '',
            country: 'Pakistan',
          };
    } catch {
      return {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        apartment: '',
        city: '',
        state: '',
        postalCode: '',
        country: 'Pakistan',
      };
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CUSTOMER, JSON.stringify(customerDetails));
    } catch {
      // Ignore
    }
  }, [customerDetails]);

  // UI Drawers
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Promo Code State
  const [discountCode, setDiscountCode] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.PROMO) || '';
    } catch {
      return '';
    }
  });

  // Complimentary Samples (Max 2 included)
  const [selectedSamples, setSelectedSamples] = useState<string[]>([
    'Royal Oud (2ml Extrait Vial)',
    'White Silk Musk (2ml Extrait Vial)',
  ]);
  const [giftNote, setGiftNote] = useState<string>('');

  // Shipping selection
  const [selectedShipping, setSelectedShipping] = useState<ShippingOption>(SHIPPING_OPTIONS[0]);

  // Toast Notifications
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: 'info' | 'success' | 'navy' = 'navy') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart calculations
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + item.selectedSize.price * item.quantity, 0);

  // Discount calculation
  let discountPercentage = 0;
  if (discountCode.toUpperCase() === 'AVENDORA15' || discountCode.toUpperCase() === 'CYRENE15') discountPercentage = 0.15;
  if (discountCode.toUpperCase() === 'PARISVIP' || discountCode.toUpperCase() === 'AVN20') discountPercentage = 0.20;
  if (discountCode.toUpperCase() === 'FIRSTNOSE' || discountCode.toUpperCase() === 'WELCOME10') discountPercentage = 0.10;

  const discountAmount = Math.round(subtotal * discountPercentage);

  // Shipping fee: Free standard if subtotal >= 5000 PKR
  const shippingFee = subtotal >= 5000 && selectedShipping.id === 'standard' ? 0 : selectedShipping.price;

  // Estimated Tax: 5% or 0%
  const tax = Math.round((subtotal - discountAmount) * 0.05);
  const cartTotal = Math.max(0, subtotal - discountAmount + shippingFee + tax);

  const addToCart = (product: Product, selectedSize?: BottleSize, quantity: number = 1, openDrawer: boolean = true) => {
    const size = selectedSize || product.sizes[1] || product.sizes[0];
    const cartItemId = `${product.id}-${size.size}`;

    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === cartItemId);
      if (existing) {
        return prevCart.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        return [...prevCart, { id: cartItemId, product, selectedSize: size, quantity }];
      }
    });

    showToast(`Added ${product.name} (${size.size}) to your bag.`, 'navy');
    if (openDrawer) {
      setIsCartDrawerOpen(true);
    }
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Item removed from selection', 'info');
  };

  const updateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    try {
      localStorage.removeItem(STORAGE_KEYS.CART);
    } catch {
      // Ignore
    }
  };

  const applyPromoCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'AVENDORA15' || clean === 'CYRENE15') {
      setDiscountCode('AVENDORA15');
      try {
        localStorage.setItem(STORAGE_KEYS.PROMO, 'AVENDORA15');
      } catch {
        // Ignore
      }
      showToast('Exclusive code AVENDORA15 applied (15% off).', 'navy');
      return { success: true, message: '15% discount applied successfully!' };
    }
    if (clean === 'PARISVIP' || clean === 'AVN20') {
      setDiscountCode('AVN20');
      try {
        localStorage.setItem(STORAGE_KEYS.PROMO, 'AVN20');
      } catch {
        // Ignore
      }
      showToast('VIP code applied (20% off).', 'navy');
      return { success: true, message: '20% VIP discount applied!' };
    }
    if (clean === 'FIRSTNOSE' || clean === 'WELCOME10') {
      setDiscountCode('WELCOME10');
      try {
        localStorage.setItem(STORAGE_KEYS.PROMO, 'WELCOME10');
      } catch {
        // Ignore
      }
      showToast('Welcome code applied (10% off).', 'navy');
      return { success: true, message: '10% Welcome gift applied!' };
    }
    return { success: false, message: 'Invalid or expired invitation code.' };
  };

  const removePromoCode = () => {
    setDiscountCode('');
    try {
      localStorage.removeItem(STORAGE_KEYS.PROMO);
    } catch {
      // Ignore
    }
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      const updated = exists ? prev.filter((id) => id !== productId) : [...prev, productId];
      showToast(
        exists ? 'Removed from your curated wishlist' : 'Saved to your fragrance wishlist',
        'navy'
      );
      return updated;
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const updateCustomerDetails = (details: Partial<CustomerDetails>) => {
    setCustomerDetails((prev) => ({ ...prev, ...details }));
  };

  const toggleSample = (sampleName: string) => {
    setSelectedSamples((prev) => {
      if (prev.includes(sampleName)) {
        return prev.filter((s) => s !== sampleName);
      }
      if (prev.length >= 2) {
        showToast('You may select up to 2 complimentary vials with your order.', 'info');
        return [prev[1], sampleName];
      }
      return [...prev, sampleName];
    });
  };

  const completeOrder = (paymentMethod: string, last4: string = '4242'): Order => {
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const trackingSuffix = Math.random().toString(36).substring(2, 8).toUpperCase();
    const orderNumber = `AVN-2026-${randomSuffix}`;

    const newOrder: Order = {
      id: orderNumber,
      orderNumber,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      items: [...cart],
      subtotal,
      discount: discountAmount,
      discountCode: discountCode || undefined,
      shippingOption: selectedShipping,
      shippingFee,
      tax,
      total: cartTotal,
      customer: { ...customerDetails },
      paymentMethod,
      paymentDetailsLast4: last4,
      status: 'Confirmed',
      estimatedDeliveryDate: 'In 2-3 Business Days via AVENDORA Express Delivery',
      trackingNumber: `AVN-PK-${trackingSuffix}`,
      complimentarySamples: [...selectedSamples],
      giftNote: giftNote || undefined,
    };

    setCurrentOrder(newOrder);
    const updatedHistory = [newOrder, ...orderHistory];
    setOrderHistory(updatedHistory);
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updatedHistory));
    } catch {
      // Ignore
    }

    clearCart();
    return newOrder;
  };

  const login = (email: string, passwordOrName?: string) => {
    const displayName = passwordOrName && !passwordOrName.includes('@') && passwordOrName.length < 30
      ? passwordOrName
      : email.split('@')[0].toUpperCase();
    const user: User = {
      id: 'usr_' + Math.random().toString(36).substring(2, 9),
      name: displayName,
      email,
      memberTier: 'Privilège',
      joinDate: 'February 2026',
      orders: orderHistory,
      wishlist,
    };
    setCurrentUser(user);
    try {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } catch {
      // Ignore
    }
    showToast(`Welcome back, ${user.name}.`, 'navy');
    return true;
  };

  const signup = (name: string, email: string, _password?: string) => {
    const user: User = {
      id: 'usr_' + Math.random().toString(36).substring(2, 9),
      name,
      email,
      memberTier: 'Grand Cru',
      joinDate: 'February 2026',
      orders: [],
      wishlist,
    };
    setCurrentUser(user);
    try {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } catch {
      // Ignore
    }
    showToast(`Welcome to AVENDORA, ${name}.`, 'navy');
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem(STORAGE_KEYS.USER);
    } catch {
      // Ignore
    }
    showToast('You have signed out of your account.', 'info');
  };

  return (
    <ShopContext.Provider
      value={{
        currentRoute,
        routeParams,
        navigateTo,
        searchQuery,
        setSearchQuery,
        cart,
        cartCount,
        subtotal,
        discountAmount,
        discountCode,
        shippingFee,
        tax,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyPromoCode,
        removePromoCode,
        selectedShipping,
        setShippingOption: setSelectedShipping,
        selectedSamples,
        toggleSample,
        giftNote,
        setGiftNote,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        isSearchModalOpen,
        setIsSearchModalOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        customerDetails,
        updateCustomerDetails,
        currentOrder,
        completeOrder,
        orderHistory,
        orders: orderHistory,
        currentUser,
        user: currentUser,
        login,
        signup,
        register: signup,
        logout,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
