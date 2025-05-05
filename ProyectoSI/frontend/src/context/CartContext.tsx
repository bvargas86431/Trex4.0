import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define your Producto type here
interface Producto {
  id: number;
  main_picture_url: string;
  brand_name: string;
  name: string;
  price_cop: number;
  gender: string[];
  details: string;
  quantity: number; // Add quantity property for the cart
}

interface CartContextType {
  cartItems: Producto[];
  addToCart: (product: Producto) => void;
  removeFromCart: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
}

// Define the CartProvider props to accept children
interface CartProviderProps {
  children: ReactNode;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<Producto[]>([]);

  // Add a product to the cart
  const addToCart = (producto: Producto) => {
    // Verifica si el producto ya existe en el carrito por ID
    const existingProduct = cartItems.find(item => item.id === producto.id);
  
    if (existingProduct) {
      // Si el producto ya existe, solo incrementamos la cantidad
      const updatedCartItems = cartItems.map(item => 
        item.id === producto.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCartItems(updatedCartItems);
    } else {
      // Si el producto no existe, lo agregamos al carrito con cantidad 1
      setCartItems(prevItems => [...prevItems, { ...producto, quantity: 1 }]);
    }
  };
  
  
  

  const removeFromCart = (id: number) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  const increaseQuantity = (id: number) => {
    const updatedCartItems = cartItems.map(item => 
      item.id === id ? {...item, quantity: item.quantity + 1} : item
    );
    setCartItems(updatedCartItems);
  };

  const decreaseQuantity = (id: number) => {
    const updatedCartItems = cartItems.map(item => 
      item.id === id && item.quantity > 1 ? {...item, quantity: item.quantity - 1} : item
    );
    setCartItems(updatedCartItems);
  };
  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, increaseQuantity, decreaseQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
