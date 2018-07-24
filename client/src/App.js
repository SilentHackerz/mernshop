import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import ItemModal from './components/ItemModal';
import { Container } from 'reactstrap';

import { Provider } from 'react-redux'
import store from './store'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  render() {
    return (
        <Provider store={store}>
            <div className="App">
            <AppNavbar />
            <Container>
                <ItemModal />
                <ShoppingList />
                <h1>Hi Paul</h1>
            </Container>
            </div>
       </Provider>
    );
  }
}

export default App;

/* Provider -
https://www.sohamkamani.com/blog/2017/03/31/react-redux-connect-explained/

If we want to link our React application with the redux store, we first have to let our app know that this store exists. This is where we come to the first major part of the react-redux library, which is the Provider.

Provider is a React component given to us by the “react-redux” library. It serves just one purpose : to “provide” the store to its child components.
*/