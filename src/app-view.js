import React,{ Fragment, useEffect, useState} from 'react';
import { BrowserRouter as Router,Routes, Switch, Route} from 'react-router-dom';
import Navbar from './components/Layout/navBar';
import Landing from './components/Landing/Landing';
import Index from './components/indexPage';
import Product from './components/Product';
import Login from './components/auth/login';
import store from './store'
import {Provider} from 'react-redux';
import {loadUser} from './actions/auth';
import Cart from './components/userCart';
import Address from './components/bookAdress';
import PrivateRoute from './components/utils/PrivateRoute';
import Signup from './components/auth/signup';

import setAuthToken from './utils/setAuthToken';
if(localStorage.token) {
  setAuthToken(localStorage.token);
}

import './App.css';
import ProductDetails from './components/ProductDetails';
const AppView = ()=> {

  useEffect(()=>{
    store.dispatch(loadUser())
  },[]);
  

  const [role,changerole] = useState("Admin")
  const [list_item,changelist_item] = useState([

            {
              title: "Men's",
              items: [
                {
                  title: "T-shirts",
                  path: "/men/tshirts"
                },
                {
                  title: "Couples",
                  path: "/product/couple"
                },
                {
                  title: "T-shirts",
                  path: "/men/tshirts"
                },
                {
                  title: "T-shirts",
                  path: "/men/tshirts"
                },
                {
                  title: "T-shirts",
                  path: "/men/tshirts"
                }
              ]
            },
            
            {
              title: "Women's",
              items: [
                {
                  title: "T-shirts",
                  path: "/women/tshirts"
                }
              ]
            }

          ])
  return(
    <>
      <Provider store={store}>
        <Navbar role={role} list_item={list_item}/>
        <Router>
          <PrivateRoute exact path="/admin" component = {Landing} />
          <Route exact path="/" component = {Index} />
          <Route exact path="/product/:type" component = {Product} />
          <Route exact path="/product/:type/:id" component = {ProductDetails} />
          <Route exact path="/login" component= {Login} />
          <Route exact path="/register" component= {Signup} />
          <Route exact path="/cart" component= {Cart} />
          <Route exact path='/book_adress' component={Address} />
        </Router>
      </Provider>
    </>
  );
};

export default AppView;
