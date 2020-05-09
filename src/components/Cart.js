import React, { Component } from 'react';
import { Container, Button, Card } from 'react-bootstrap';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart, search, removeItem } from './actions/cartActions';
import Recipe from './Recipe'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faSearch, faMinus } from '@fortawesome/free-solid-svg-icons'
class Cart extends Component {
    render() {
        let itemList = this.props.addedItems.length ? this.props.addedItems.map(selectedItem => {
            let item=selectedItem.data;
            if (!selectedItem) {
                return null;
            }
            return (
                <div style={{ userSelect: "none", width: "100%", border: "1px solid #ccc", marginBottom: "5px" }} key={item.id}>
                    <div style={{ display: "flex" }}>
                        <Card.Img variant="top" style={{ height: "250px", width: "250px", padding: "25px" }} src={item.image} />
                        <Card.Body>
                            <Card.Text>
                                {item.title}
                            </Card.Text>
                            <Card.Title>{item.price} AED</Card.Title>
                            <Card.Text>
                                Quantity: {selectedItem ? selectedItem.count : 0}
                            </Card.Text>

                            <Card.Text style={{ fontSize: "13px" }}>
                                Standard Delivery: Today 12:00PM - 2:00PM
                            </Card.Text>
                            {
                                selectedItem && selectedItem.count ? (<><div style={{ display: "flex", flexDirection: "row", margin: "5px 0" }}>
                                    <Button variant="outline"
                                        onClick={() => {
                                            debugger;
                                            if (selectedItem.count < 6)
                                                this.props.addToCart(item.id, selectedItem.count + 1);
                                        }}
                                        style={{ margin: "0 5px", marginLeft: 0 }}><FontAwesomeIcon style={{}} icon={faPlus} /></Button>
                                    <input type="number" min="0" max="5" value={selectedItem.count} readOnly style={{
                                        width: "41px",
                                        textIndent: "12px"
                                    }} />
                                    <Button variant="outline" onClick={() => {
                                        debugger;
                                        if (selectedItem.count > 1){
                                            this.props.addToCart(item.id, selectedItem.count - 1);
                                        } else {
                                            this.props.removeItem(item.id); 
                                        }
                                           
                                    }} style={{ margin: "0 5px" }}><FontAwesomeIcon style={{}} icon={faMinus} /></Button>
                                </div>
                                    <Button variant="outline-dark" style={{ margin: "5px 0" }} onClick={() => { this.props.removeItem(item.id) }}>Remove</Button>
                                </>) : <Button variant="outline-dark" onClick={() => { this.props.addToCart(item.id, 1,item) }}>Add</Button>
                            }
                        </Card.Body>
                    </div>
                </div>
            )
        }) : (
                <p>Nothing.</p>
            );




        return (
            <div className="container">
                <div className="cart">
                    <h5>You have ordered:</h5>
                    <ul className="collection">
                        {itemList}
                    </ul>
                </div>
                <Recipe />
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        items: state.items,
        addedItems: state.addedItems
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        addToCart: (id, count) => (dispatch(addToCart(id, count))),
        search: (query) => (dispatch(search(query))),
        removeItem: (id) => (dispatch(removeItem(id)))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart)