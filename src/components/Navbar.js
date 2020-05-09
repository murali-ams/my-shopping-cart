import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons'
class NavbarComponent extends Component {
    render() {
        let addedItems = this.props.addedItems;
        return (<Navbar style={{ backgroundColor: "rgb(51, 75, 134)", position: "sticky", top: 0 }} >
            <Navbar.Brand href="/" style={{ textDecoration: "none", color: "white" }}>Grocery Shop X</Navbar.Brand>
            <Container><Nav className="mr-auto">
            </Nav>
                <Nav>
                    <Nav.Link href="/cart" style={{ textDecoration: "none", color: "white" }}>
                        <div style={{ display: "flex", flexDirection: "row", alignContent: "center", alignItems: "center" }}>
                            <FontAwesomeIcon style={{ marginLeft: 8, marginTop: 5 }} icon={faCartArrowDown} size={'3x'} />
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "0 20px" }}>
                                <div style={{ textTransform: "capitalize" }}>My Basket</div>
                                <div>{addedItems.length} items</div>
                            </div>
                        </div>
                    </Nav.Link>

                </Nav></Container>
        </Navbar>);
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

export default connect(mapStateToProps, mapDispatchToProps)(NavbarComponent)