import React, { Component } from 'react';
import { Navbar, NavbarBrand, NavbarToggler, Nav, NavItem, Collapse, Modal, ModalHeader, ModalBody, Button, Form, FormGroup, Label, Input, Row, Col} from 'reactstrap';
import { Carousel, Tabs, Tab } from 'react-bootstrap';
import { NavLink, withRouter,Switch, Route, Redirect } from 'react-router-dom';
import QueryComponent from './QueryComponent';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isNavOpen: false,
            isModalOpen: false
        };
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
        this.onValueChange = this.onValueChange.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    toggleNav() {
        this.setState({ isNavOpen: !this.state.isNavOpen });
    }
    toggleModal() {
        this.setState({ isModalOpen: !this.state.isModalOpen });
    }
    handleLogin(event) {

        // alert("Username: " + this.username.value + " password: " + this.password.value);
        // event.preventDefault();
        // this.toggleModal();
        // this.props.history.push('/alumni');

        this.toggleModal();
        this.props.loginUser({ username: this.username.value, password: this.password.value }, this.props.history);
        event.preventDefault();
    }
    handleSignup(event) {

        console.log("username: " + this.name.value + " enroll: " + this.enrollment.value + " password: " + this.pass.value + " alumni: " + this.alumni.checked + " specialization: " + this.state.selectedOption+ " description: "+ this.description.value);
        alert("username: " + this.name.value + "enroll: " + this.enrollment.value + " password: " + this.pass.value + " alumni: " + this.alumni.checked + " specialization: " + this.state.selectedOption+" description: "+ this.description.value);

        event.preventDefault();
        this.props.signupUser(this.name.value, this.enrollment.value, this.pass.value, this.alumni.checked, this.state.selectedOption,this.description.value, this.props.history);
        this.toggleModal();
    }
    onValueChange(event) {
        this.setState({
            selectedOption: event.target.value
        });
    }
    handleLogout() {
        this.props.logoutUser();
    }

    render() {

        return (

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
                                    <NavLink className="nav-link" to="/">
                                        <span className="fa fa-info fa-lg"></span> AboutUs
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/">
                                        <span className="fa fa-list fa-lg"></span> Alums
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/">
                                        <span className="fa fa-address-card fa-lg"></span> ContactUs
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/query">
                                        <span className="fa fa-address-card fa-lg"></span> Query
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <Nav navbar className="ml-auto">
                                <NavItem>
                                    {!this.props.auth.isAuthenticated ?
                                        <Button outline onClick={this.toggleModal}>
                                            <span className="fa fa-sign-in fa-lg"></span> Login
                                            {this.props.auth.isFetching ?
                                                <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                                : null
                                            }
                                        </Button>
                                        :
                                        <div>
                                            <div className="navbar-text mr-3">{this.props.auth.user.username}</div>
                                            <Button outline onClick={this.handleLogout}>
                                                <span className="fa fa-sign-out fa-lg"></span> Logout
                                                {this.props.auth.isFetching ?
                                                    <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                                    : null
                                                }
                                            </Button>
                                        </div>
                                    }
                                </NavItem>
                            </Nav>
                        </Collapse>

                    </div>
                </Navbar>
                {/*Carousel */}
                <Carousel>
                    <Carousel.Item>
                        <img
                            className="d-block w-100 carouselImg-size opac"
                            src="assets/carousel2.jpg"
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100 carouselImg-size"
                            src="assets/carousel1.jpg"
                            alt="Second slide"
                        />

                        <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100 carouselImg-size opac"
                            src="assets/carousel3.jpg"
                            alt="Third slide"
                        />

                        <Carousel.Caption>
                            <h3>Third slide label</h3>
                            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>
                        <Tabs defaultActiveKey="login" id="login-tab" className="mb-3">
                            <Tab eventKey="login" title="Login">
                                <Form onSubmit={this.handleLogin}>
                                    <FormGroup>
                                        <Label htmlFor="username">Username :</Label>
                                        <Input type="text" id="username" name="username" placeholder="Enter Username" innerRef={(input) => this.username = input}></Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="password">Password :</Label>
                                        <Input type="password" id="password" name="password" placeholder="Enter Password" innerRef={(input) => this.password = input}></Input>
                                    </FormGroup>

                                    <Button type="submit" color="primary">Login</Button>

                                </Form>
                            </Tab>
                            <Tab eventKey="signup" title="SignUp">
                                <Form onSubmit={this.handleSignup}>
                                    <FormGroup>
                                        <Label htmlFor="name">Name :</Label>
                                        <Input type="text" id="name" name="name" placeholder="Enter Name" innerRef={(input) => this.name = input} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="enrollment">Enrollment No. :</Label>
                                        <Input type="text" id="enrollment" name="enrollment" placeholder="Enter Enrollment Number" innerRef={(input) => this.enrollment = input}></Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="pass">Password :</Label>
                                        <Input type="password" id="pass" name="pass" placeholder="Password (college website)" innerRef={(input) => this.pass = input}></Input>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="checkbox" name="alumni" id="alumni" innerRef={(input) => this.alumni = input}></Input> Alumni
                                        </Label>
                                    </FormGroup>
                                    <Row>
                                        <Col>
                                            If alumni:
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            Specialization:
                                        </Col>
                                    </Row>

                                    <div className="container">
                                        <Row>
                                            <FormGroup className="col-12 col-md-3" check>
                                                <Label check>
                                                    <Input
                                                        type="radio"
                                                        value="GATE"
                                                        name="specialization" id="GATE"
                                                        checked={this.state.selectedOption === "GATE"}
                                                        onChange={this.onValueChange}
                                                    />
                                                    GATE
                                                </Label>
                                            </FormGroup>
                                            <FormGroup className="col-12 col-md-3" check>

                                                <Label check>
                                                    <Input
                                                        type="radio"
                                                        value="CAT"
                                                        name="specialization" id="CAT"
                                                        checked={this.state.selectedOption === "CAT"}
                                                        onChange={this.onValueChange}
                                                    />
                                                    CAT
                                                </Label>
                                            </FormGroup>
                                            <FormGroup className="col-12 col-md-3" check>

                                                <Label check>
                                                    <Input
                                                        type="radio"
                                                        value="UPSC"
                                                        name="specialization" id="UPSC"
                                                        checked={this.state.selectedOption === "UPSC"}
                                                        onChange={this.onValueChange}
                                                    />
                                                    UPSC
                                                </Label>
                                            </FormGroup>
                                            <FormGroup className="col-12 col-md-3" check>

                                                <Label check>
                                                    <Input
                                                        type="radio"
                                                        value="Placement"
                                                        name="specialization" id="Placement"
                                                        checked={this.state.selectedOption === "Placement"}
                                                        onChange={this.onValueChange}
                                                    />
                                                    Placement
                                                </Label>
                                            </FormGroup>
                                        </Row>
                                        
                                    </div>
                                    <FormGroup>
                                            <Label htmlFor="description">Description:</Label>
                                            <Input
                                                type="textarea" name="description" id="description" placeholder="Your Description" innerRef={(input) => this.description = input}
                                            />
                                        </FormGroup>
                                    <Button type="submit" value="submit" color="primary">SignUp</Button>

                                </Form>
                            </Tab>
                        </Tabs>
                    </ModalHeader>
                </Modal>
                <Switch>
                    <Route path="/query" component={QueryComponent}></Route>
                </Switch>
            </React.Fragment>
        );

    }
}

export default withRouter(Header);