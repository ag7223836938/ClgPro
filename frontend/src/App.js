import React,{Component} from 'react'
import {Navbar,NavbarBrand} from 'reactstrap';
import Home from './components/HomeComponent';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import {Provider} from 'react-redux';
import {ConfigureStore} from './redux/configureStore';

const store= ConfigureStore();

class App extends Component {
  constructor(props) {
    super(props);

    // this.state={
    //   info:INFO
    // }
  }
  render(){
  return (
    <Provider store={store}>
    <BrowserRouter>
    <div className="App">
      <Home/>
    </div>
    </BrowserRouter>
    </Provider>
  );
}
}

export default App;
