
import { ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART, LOAD_ITEMS_TO_PAGE } from '../actions/action-types/cart-actions'


const initState = {
    items: [],
    addedItems: [],
    total: 0

}
function getLocalStore(key) {
    if (localStorage.getItem(key)) {
        return JSON.parse(localStorage.getItem(key));
    }
    return initState;
}
function setLocalStore(key, data) {
    return localStorage.setItem(key, JSON.stringify(data));
}
const temp_init=getLocalStore('cart');

const cartReducer = (state = temp_init, action) => {
    let addedItems, temp, newItems;
    switch (action.type) {
        case ADD_ITEM_TO_CART:
            newItems = [...state.addedItems];
            temp = newItems.find(item => (item.id === action.payload.id))
            if (temp) {
                temp.count = action.payload.count;
            }
            else {
                newItems.push({ id: action.payload.id, count: action.payload.count,data: action.payload.data});
            }
            debugger;
            temp = {
                ...state,
                addedItems: newItems
            };
            setLocalStore('cart', temp);
            return temp;
        case REMOVE_ITEM_FROM_CART:
            newItems = [...state.addedItems];
            newItems = newItems.filter(item => {
                debugger;
                return (item.id !== action.id);
            });
            temp = {
                ...state,
                addedItems: newItems
            };
            setLocalStore('cart', temp);
            return temp;
        case LOAD_ITEMS_TO_PAGE:
            temp = {
                ...state,
                ...action.payload
            }
            setLocalStore('cart', temp);
            return temp;
        default:
            return state
    }
}

export default cartReducer
