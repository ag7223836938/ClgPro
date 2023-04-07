import React, { Component } from 'react';
import { Media } from 'reactstrap';
import Header from './HeaderComponent';
import About from './AboutComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect ,withRouter} from 'react-router-dom';
import AfterLogin from './AfterLoginComponent';
import AlumniProfile from './AlumniProfileComponent';
import MyPost from './MyPostComponent';
import {connect} from 'react-redux';
import {postPost,fetchAlums,fetchPosts,loginUser, logoutUser,postUser} from '../redux/ActionCreators';
import QueryComponent from './QueryComponent';

const mapStateToProps = (state)=>{
    return {
        alums: state.alums,
        posts: state.posts,
        auth: state.auth,
        signup:state.signup
    };
}

const mapDispatchToProps = (dispatch)=>({
    postPost:(author,title,description)=> dispatch(postPost(author,title,description)),
    fetchAlums:()=>{ dispatch(fetchAlums())},
    fetchPosts:()=>{dispatch(fetchPosts())},
    loginUser:(creds,history)=>{dispatch(loginUser(creds,history))},
    logoutUser:()=>{dispatch(logoutUser())},
    postUser:(username,enrollment,password,alumni,specialization,description,history)=>{dispatch(postUser(username,enrollment,password,alumni,specialization,description,history))}
});

class Home extends Component {
    constructor(props) {
        super(props);

    }
    
    componentDidMount(){
        this.props.fetchAlums();
        this.props.fetchPosts();
        
    }
    render() {
        const HomePage = () => {
            return (
                <React.Fragment>
                    <Header auth={this.props.auth} 
          loginUser={this.props.loginUser} 
          logoutUser={this.props.logoutUser}
          signupUser={this.props.postUser}/>
                    <About alums={this.props.alums.alums.filter(alum=>alum.featured==true)} alumsLoading={this.props.alums.isLoading} alumsErrmess={this.props.alums.errMess} />
                    <Footer />
                </React.Fragment>
            );
        }
        
        const PrivateRoute = ({ component: Component, ...rest }) => (
            <Route {...rest} render={(props) => (
              this.props.auth.isAuthenticated
                ? <Component {...props} />
                : <Redirect to={{
                    pathname: '/home',
                    state: { from: props.location }
                  }} />
            )} />
          );
          
        return (
            <div>
                <Switch>
                    <Route path="/home" component={HomePage} />
                    <PrivateRoute exact path="/afterlogin" component={() => <AfterLogin gate={this.props.alums.alums.filter(alum => alum.specialization === 'GATE')} cat={this.props.alums.alums.filter(alum => alum.specialization === 'CAT')}
                        upsc={this.props.alums.alums.filter(alum => alum.specialization === 'UPSC')}
                        placement={this.props.alums.alums.filter(alum => alum.specialization === 'Placement')} 
                        alumsLoading={this.props.alums.isLoading} alumsErrmess={this.props.alums.errMess} auth={this.props.auth} loginUser={this.props.loginUser} logoutUser={this.props.logoutUser}/>} 
                        />
                    <PrivateRoute exact path="/alumni" component={() => <AlumniProfile posts={this.props.posts.posts} addPost={this.props.postPost} postsLoading={this.props.posts.isLoading} postsErrmess={this.props.posts.errMess} auth={this.props.auth} logoutUser={this.props.logoutUser}/>} 
                    />
                    <Route path="/query" component={QueryComponent}></Route>
                    <Route path="/mypost" component={QueryComponent}></Route>
                    <Redirect to="/home" />
                </Switch>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Home));