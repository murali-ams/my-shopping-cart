import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import cartReducer from './components/reducers/cartReducer';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import './index.css'

const store = createStore(cartReducer, applyMiddleware(thunk));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

