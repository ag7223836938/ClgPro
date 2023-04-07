import React, { Component } from 'react';
import { Navbar, NavbarToggler, Collapse, Nav, NavItem, NavbarBrand, Button, Modal, ModalBody, ModalHeader, Form, FormGroup, Label, Input } from 'reactstrap';
import { Tabs, Tab, TabContainer } from 'react-bootstrap';
import Gate from './GateComponent';
import Upsc from './UpscComponent';
import Placement from './PlacementComponent';
import Cat from './CatComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import {withRouter} from 'react-router-dom';

class AfterLogin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isNavOpen: false,
            isModalOpen: false,
            
        }
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        // this.handleLogin = this.handleLogin.bind(this);
        // this.handleSignup = this.handleSignup.bind(this);
        
    }
    toggleNav() {
        this.setState({ isNavOpen: !this.state.isNavOpen });
    }
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    // handleLogin(event) {
    //     this.toggleModal();
    //     this.props.loginUser({username: this.username.value, password: this.password.value},this.props.history);
    //     event.preventDefault();

    // }
    // handleSignup(event) {
    //     // this.toggleModal();
    //     console.log("username: " + this.name.value + "enroll: " + this.enrollment.value + "password: " + this.pass.value + "alumni: " + this.alumni.value);
    //     alert("username: " + this.name.value + "enroll: " + this.enrollment.value + "password: " + this.pass.value + "alumni: " + this.alumni.value);
    //     event.preventDefault();

    // }
    
    render() {
        
        return (
            <React.Fragment>
                <Header auth={this.props.auth} 
          loginUser={this.props.loginUser} 
          logoutUser={this.props.logoutUser}/>
                
                {/* Main Content */}
                <TabContainer className="mb-10">
                <Tabs fill justify  id="subject-tab" defaultActiveKey="placements">
                    <Tab eventKey="gate" title="GATE" tabClassName='tab-link'>
                        <Gate alums={this.props.gate} alumsLoading={this.props.alumsLoading} alumsErrmess={this.props.alumsErrmess}/>
                    </Tab>
                    <Tab eventKey="cat" title="CAT" tabClassName='tab-link'>
                        <Cat alums={this.props.cat} alumsLoading={this.props.alumsLoading} alumsErrmess={this.props.alumsErrmess}/>
                    </Tab>
                    <Tab eventKey="placements" title="Placements" tabClassName='tab-link'>
                        <Placement alums={this.props.placement} alumsLoading={this.props.alumsLoading} alumsErrmess={this.props.alumsErrmess}/>
                    </Tab>
                    <Tab eventKey="upsc" title="UPSC" tabClassName='tab-link'>
                        <Upsc alums={this.props.upsc} alumsLoading={this.props.alumsLoading} alumsErrmess={this.props.alumsErrmess}/>
                    </Tab>
                </Tabs>
                </TabContainer>
                <Footer />
                
            </React.Fragment>
        );
    }
}

export default AfterLogin;