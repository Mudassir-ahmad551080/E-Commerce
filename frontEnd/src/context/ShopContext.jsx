import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios'
export const ShopContext = createContext();
import { useNavigate } from "react-router-dom";



const ShopContextProvider = ({ children }) => {
    const currency = "$";
    const delivery_fee = 10;
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [products,setProducts] = useState([]);
    const [token,setToken] = useState('');
    const navigate = useNavigate();


   



    // Load initial cart from localStorage or empty object
    const [cartItem, setCartItem] = useState(() => {
        try {
            const savedCart = localStorage.getItem('cartItems');
            return savedCart ? JSON.parse(savedCart) : {};
        } catch (error) {
            console.error("Failed to load cart from localStorage:", error);
            return {};
        }
    });

    // Save cartItem to localStorage whenever it changes
    useEffect(() => {
        try {
            localStorage.setItem('cartItems', JSON.stringify(cartItem));
        } catch (error) {
            console.error("Failed to save cart to localStorage:", error);
        }
    }, [cartItem]);

    const addtoCart = async (itemId, size) => {
        if (!size) {
            toast.error("Please select size");
            return;
        }
        let cartData = structuredClone(cartItem);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        setCartItem(cartData);
        
        if(token){
            try {
                await axios.post(backendURL+'/api/cart/add',{itemId,size},{headers:{token}});
            } catch (error) {
                 console.log(error);
                 toast.error(error.message)   
            }
        }

    };

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItem) {
            for (const item in cartItem[items]) {
                try {
                    if (cartItem[items][item] > 0) {
                        totalCount += cartItem[items][item];
                    }
                } catch (error) {
                    console.error("Error accessing cart item:", error);
                }
            }
        }
        return totalCount;
    };

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItem);
        cartData[itemId][size] = quantity;
        setCartItem(cartData);

        if(token){
            try {
                await axios.post(backendURL+'/api/cart/update',{itemId,size,quantity},{headers:{token}})
            } catch (error) {
                console.log(error);
                toast.error(error.message)
            }
        }
    }

    const getCartamount = () => {
    let totalamount = 0;

  for (const items in cartItem) {
    let itemInfo = products.find((product) => product._id === items);

    if (!itemInfo) continue;  // ✅ skip if product not found yet

    for (const item in cartItem[items]) {
      if (cartItem[items][item] > 0) {
        totalamount += itemInfo.price * cartItem[items][item];
      }
    }
  }

  return totalamount;
};

  
    const getProductsData = async ()=>{
        try {
           const response = await axios.get(backendURL + '/api/product/list');
            if(response.data.success){
                setProducts(response.data.products)
            }
            else{
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getuserCart = async (token)=>{
    try {
      const response =  await axios.post(backendURL+'/api/cart/get',{},{headers:{token}});
      if(response.data.success){
        setCartItem(response.data.cartData)
      }
    } catch (error) {
        console.log(error);
        toast.error(error.message)
    }
   }


    useEffect(()=>{
        getProductsData();
    },[])
    
    useEffect(()=>{
        if(!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'));
            getuserCart(localStorage.getItem('token'))
        }
    },[]);

   
    const value = {
        products,
        navigate,
        currency,
        delivery_fee,
        search,
        setCartItem,
        setSearch,
        showSearch,
        setShowSearch,
        cartItem,
        addtoCart,
        getCartCount,
        updateQuantity,
        getCartamount,
        backendURL,
        token,
        setToken
    };


    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
