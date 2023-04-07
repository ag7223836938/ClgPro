import React,{Component} from 'react';
import { Navbar, NavbarToggler, Collapse, Nav, NavItem, NavbarBrand, Button, Modal, ModalBody, ModalHeader, Form, FormGroup, Label, Input } from 'reactstrap';
import {NavLink} from 'react-router-dom';
import { Tabs, Tab, TabContainer } from 'react-bootstrap';

class SimpleNavbar extends Component{
    constructor(props) {
        super(props);

        this.state = {
            isNavOpen: false
        }
        this.toggleNav = this.toggleNav.bind(this);
        
    }
    toggleNav() {
        this.setState({ isNavOpen: !this.state.isNavOpen });
    }
    
    render(){
    return(
        <React.Fragment>
<Navbar dark expand="md" className="bg-dark fixed-top">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className="mr-auto" href="/">
                            PrepGS
                        </NavbarBrand>

                        <Collapse navbar isOpen={this.state.isNavOpen}>
                            <Nav navbar className="ml-auto">
                                <NavItem>
                                    <NavLink className="nav-link" to="/home">
                                        <span className="fa fa-home fa-lg"></span> Home
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/aboutus">
                                        <span className="fa fa-info fa-lg"></span> AboutUs
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/menu">
                                        <span className="fa fa-list fa-lg"></span> Menu
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/contactus">
                                        <span className="fa fa-address-card fa-lg"></span> ContactUs
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <Nav navbar className="ml-auto">
                                <NavItem>
                                    <Button className="btn-outline-light" onClick={this.toggleModal}>
                                        <span className="fa fa-sign-in fa-lg"></span> Logout
                                    </Button>
                                </NavItem>
                            </Nav>
                        </Collapse>

                    </div>
                </Navbar>
                
            </React.Fragment>
    );
}
}

export default SimpleNavbar;