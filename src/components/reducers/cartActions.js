
import { ADD_ITEM_TO_CART,REMOVE_ITEM_FROM_CART,LOAD_ITEMS_TO_PAGE} from './action-types/cart-actions'

//add cart action
export const addToCart = (id) => {
    debugger;
    return (dispatch) => {
        setTimeout(() => {
            console.log("triggering the add.")
            dispatch({
                type: ADD_ITEM_TO_CART,
                id
            });
        }, 5000);
    }
}

export const search = (query) => {
    return (dispatch) => {

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`https://api.spoonacular.com/food/products/search?number=20&apiKey=14f1254829e04862817b2235226b1478&query=${query}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                debugger;
                console.log(result);
            })
            .catch(error => console.log('error', error));
    }
}
//remove item action
export const removeItem = (id) => {
    return {
        type: REMOVE_ITEM_FROM_CART,
        id
    }
}