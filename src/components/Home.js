import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, Button, Card } from 'react-bootstrap';
import { addToCart, search, removeItem } from './actions/cartActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faSearch, faMinus } from '@fortawesome/free-solid-svg-icons'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "Dairy",
        }
    }

    handleClick = (id) => {
        this.props.addToCart(id);

    }

    render() {
        let itemList = this.props.items.map(item => {
            let selectedItem = this.props.addedItems.find(selected => (selected.id == item.id));
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
                                        if (selectedItem.count > 0)
                                            this.props.addToCart(item.id, selectedItem.count - 1);
                                    }} style={{ margin: "0 5px" }}><FontAwesomeIcon style={{}} icon={faMinus} /></Button>
                                </div>
                                    <Button variant="outline-dark" style={{ margin: "5px 0" }} onClick={() => { this.props.removeItem(item.id) }}>Remove</Button>
                                </>) : <Button variant="outline-dark" onClick={() => { this.props.addToCart(item.id, 1,item) }}>Add</Button>
                            }
                        </Card.Body>
                    </div>
                </div>
            );


        })

        return (
            <Container>
                <div style={{
                    alignItems: "center",
                    alignContent: "center",
                    display: "flex",
                    flexDirection: "column"
                }}>

                    <div style={{
                        margin: " 10% 0", width: "45%", display: "flex",
                        flexDirection: "row"
                    }}>
                        <input type={"text"} value={this.state.query} onKeyDown={(e) => {
                            if (e.keyCode == 13) {
                                this.props.search();
                                return false;
                            }
                        }} onChange={(event) => { this.setState({ query: event.target.value }) }} placeholder={"Search"} style={{ width: "100%" }} />
                        <Button variant="outline-dark" onClick={() => { this.props.search(this.state.query) }}><div style={{ display: "flex", flexDirection: "row", alignContent: "center", alignItems: "center" }}><div style={{ marginRight: "5px" }}>Search</div><FontAwesomeIcon style={{}} icon={faSearch} size={'1x'} /></div> </Button></div>
                </div>

                {
                    itemList.length ? <><h3 className="center">Results for "{this.state.query}"</h3>
                        <div className="box">
                            {itemList}
                        </div></> : null
                }
            </Container>
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
        addToCart: (id, count, item) => (dispatch(addToCart(id, count,item))),
        search: (query) => (dispatch(search(query))),
        removeItem: (id) => (dispatch(removeItem(id)))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)