
import { ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART, LOAD_ITEMS_TO_PAGE } from './action-types/cart-actions'

//add cart action
export const addToCart = (id, count,data) => {
    return (dispatch) => {
        dispatch({
            type: ADD_ITEM_TO_CART,
            payload: { id, count,data }
        });
    }
}

export const search = (query) => {
    return (dispatch) => {

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        function randomInteger(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        fetch(`https://api.spoonacular.com/food/products/search?number=20&apiKey=14f1254829e04862817b2235226b1478&query=${query}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                dispatch({
                    type: LOAD_ITEMS_TO_PAGE,
                    payload: {
                        items: result.products.map((item) => { return { ...item, price: randomInteger(4, 8) } })
                    }
                });
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