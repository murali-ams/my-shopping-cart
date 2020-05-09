import React, { Component } from 'react'
import { connect } from 'react-redux';

import { Container, Button, Card } from 'react-bootstrap';
//import { addShipping } from './actions/cartActions'
class Recipe extends Component {
    constructor(props) {
        super(props);
        this.state = {shipping:false};
    }

    componentWillUnmount() {
        if (this.refs.shipping.checked)
            this.props.substractShipping()
    }

    handleChecked = (e) => {
        if (e.target.checked) {
            this.setState({shipping:true});
        }
        else {
            this.setState({shipping:false});
        }
    }

    render() {
        let ids = this.props.addedItems.map((item) => (item.id)),total=this.state.shipping?6:0;
        let addedList = this.props.items.filter(item => { return (ids.includes(item.id)) });
        addedList.map(item=>{
            let selectedItem=this.props.addedItems.find(_item=>(item.id===_item.id));
            total+=selectedItem.count*item.price;
        })
        return (
            <div style={{display:"flex",flexDirection:"column"}}>
               
                <div style={{display:"flex",flexDirection:"column",alignContent:"center",alignItems:"center"}}>
                <div className="collection" style={{paddingBottom:"15px"}}>
                    <li className="collection-item">
                        <label>
                            <input type="checkbox" ref="shipping" checked={this.state.shipping} onChange={this.handleChecked} />
                            <span>Shipping(+6 AED)</span>
                        </label>
                    </li>
                    
                </div>
                <div className="collection-item" style={{paddingBottom:"15px"}}><b>Total: {total} AED</b></div>
                    <Button className="waves-effect waves-light btn">Checkout</Button>
                </div>
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
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Recipe)
