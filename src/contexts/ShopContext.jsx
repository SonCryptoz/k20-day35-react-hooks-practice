import { useReducer, createContext } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext(null);

const initialState = {
    items: [],
    filter: {
        category: "Tất cả",
        keyword: "",
    }
};

const cartReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_CART": {
            const existingItem = state.items.find(
                (item) => item.product.id === action.payload.id,
            );

            if (existingItem) {
                return {
                    ...state,
                    items: state.items.map((item) =>
                        item.product.id === action.payload.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item,
                    ),
                };
            }

            return {
                ...state,
                items: [
                    ...state.items,
                    { product: action.payload, quantity: 1 },
                ],
            };
        }
        case "REMOVE_FROM_CART":
            return {
                ...state,
                items: state.items.filter((item) => {
                    return item.product.id !== action.payload.id;
                }),
            };
        case "UPDATE_QUANTITY": {
            const { id, amount } = action.payload;

            return {
                ...state,
                items: state.items
                    .map((item) => {
                        return item.product.id === id
                            ? { ...item, quantity: item.quantity + amount }
                            : item;
                    })
                    .filter((item) => item.quantity > 0), // tự động xóa khỏi giỏ nếu số lượng nhỏ hơn 1
            };
        }
        case "SET_FILTER":
            return {
                ...state,
                filter: {
                    ...state.filter,
                    ...action.payload,
                }
            };
        default:
            return state;
    }
};

const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
