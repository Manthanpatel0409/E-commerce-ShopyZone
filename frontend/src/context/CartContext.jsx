// import React, { createContext, useState, useEffect } from 'react';

// // 1. Create the Context
// export const CartContext = createContext();

// // 2. Create the Provider Component
// export const CartProvider = ({ children }) => {
//   // 3. State
//   // We initialize the cart from localStorage, if it exists
//   const [cartItems, setCartItems] = useState(() => {
//     try {
//       const localData = localStorage.getItem('cart');
//       return localData ? JSON.parse(localData) : [];
//     } catch (error) {
//       console.error("Could not parse cart data:", error);
//       return [];
//     }
//   });

//   // 4. Save to localStorage whenever cartItems changes
//   useEffect(() => {
//     localStorage.setItem('cart', JSON.stringify(cartItems));
//   }, [cartItems]);

//   // 5. Helper Functions
  
//   // Add item to cart (or update quantity)
//   const addToCart = (product, qty) => {
//     setCartItems(prevItems => {
//       // Check if the item is already in the cart
//       const exist = prevItems.find(item => item._id === product._id);
      
//       if (exist) {
//         // If it exists, update the quantity
//         return prevItems.map(item =>
//           item._id === product._id ? { ...item, qty: item.qty + qty } : item
//         );
//       } else {
//         // If it's a new item, add it to the cart
//         return [...prevItems, { ...product, qty }];
//       }
//     });
//   };

//   // Remove item from cart
//   const removeFromCart = (id) => {
//     setCartItems(prevItems => {
//       return prevItems.filter(item => item._id !== id);
//     });
//   };
  
//   // Update item quantity
//   const updateQty = (id, qty) => {
//     setCartItems(prevItems => {
//       return prevItems.map(item =>
//         item._id === id ? { ...item, qty: qty } : item
//       );
//     });
//   };

//   // 6. Provide the state and functions to children
//   return (
//     <CartContext.Provider 
//       value={{ 
//         cartItems, 
//         addToCart, 
//         removeFromCart,
//         updateQty,
//         // We can also add derived state
//         itemCount: cartItems.reduce((acc, item) => acc + item.qty, 0),
//         totalPrice: cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };




import React, { createContext, useState, useEffect } from 'react';

// 1. Create the Context
export const CartContext = createContext();

// 2. Create the Provider Component
export const CartProvider = ({ children }) => {
  // 3. State
  // We initialize the cart from localStorage, if it exists
  const [cartItems, setCartItems] = useState(() => {
    try {
      const localData = localStorage.getItem('cart');
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error("Could not parse cart data:", error);
      return [];
    }
  });

    // 1. Add state for shipping address
  const [shippingAddress, setShippingAddress] = useState(() => {
    const localData = localStorage.getItem('shippingAddress');
    return localData ? JSON.parse(localData) : {};
  });

  // 4. Save to localStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // 2. Save shipping address to localStorage
  useEffect(() => {
    localStorage.setItem('shippingAddress', JSON.stringify(shippingAddress));
  }, [shippingAddress]);

  // 3. Add a function to clear the cart
  const clearCart = () => {
    setCartItems([]);
  };

  // 5. Helper Functions
  
  // Add item to cart (or update quantity)
  const addToCart = (product, qty) => {
    setCartItems(prevItems => {
      // Check if the item is already in the cart
      const exist = prevItems.find(item => item._id === product._id);
      
      if (exist) {
        // If it exists, update the quantity
        return prevItems.map(item =>
          item._id === product._id ? { ...item, qty: item.qty + qty } : item
        );
      } else {
        // If it's a new item, add it to the cart
        return [...prevItems, { ...product, qty }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCartItems(prevItems => {
      return prevItems.filter(item => item._id !== id);
    });
  };
  
  // Update item quantity
  const updateQty = (id, qty) => {
    setCartItems(prevItems => {
      return prevItems.map(item =>
        item._id === id ? { ...item, qty: qty } : item
      );
    });
  };

  // 6. Provide the state and functions to children
  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        shippingAddress,
        setShippingAddress, // Expose the setter function
        addToCart, 
        removeFromCart,
        updateQty,
        clearCart, // Expose the clearCart function
        // We can also add derived state
        itemCount: cartItems.reduce((acc, item) => acc + item.qty, 0),
        totalPrice: cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)
      }}
    >
      {children}
    </CartContext.Provider>
  );
};