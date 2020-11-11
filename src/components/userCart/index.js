import React,{useEffect,useState} from 'react'
import {connect} from 'react-redux';
import {withRouter, RouteComponentProps, Redirect, Link} from 'react-router-dom'
import PropTypes from 'prop-types';
import Main from '../common/main';
import styled from 'styled-components';
import CartItem from '../common/cartItem';
const userCart = (props) => {
    const {cart,isAuthenticated} = props;
    const calcTotal = ()=>{
      let sum = 0;
      cart.forEach(elem=>{
        sum += parseInt(elem.quantity) * parseInt(elem.price);
      })
      return sum;
    }
    return (
      
        <MainWrapper>
          
          {!isAuthenticated?<Redirect to={{pathname: '/login',state:{previous: "/cart"}}} />:null}
          {cart&&cart.length?
          <>
          <Wrapper>
            { cart?cart.map((item,index)=><CartItem item={item} key={index} index={index} />):null}
          </Wrapper>
          <OrderDetails>
            
          <Link to={{pathname:'/book_adress',aboutProps:{previous: '/cart'}}} >
                <OrderButton>Place Order</OrderButton>
            </Link>
            <h4>Billing Details</h4>
            <Details>
              
                <Billing>Order Details <span>{calcTotal()}</span></Billing>
                <Billing>Shipping <span>Free </span></Billing>
                <Billing bold={true}>Total <span>{calcTotal()}</span></Billing>
            </Details>
            <Link to={{pathname:'/book_adress',aboutProps:{previous: '/cart'}}}>
              <OrderButton>Place Order</OrderButton>
            </Link>
          </OrderDetails>
          </>:<h2>No Product Added Yet</h2>}
        </MainWrapper>
    ) 
}
userCart.propTypes = {
    cart: PropTypes.array,
    isAuthenticated: PropTypes.bool
  }
  
  const mapStateToProp = state => ({
  
    cart: state.auth.cart,
    isAuthenticated: state.auth.isAuthenticated
  
  })
  

export default connect(mapStateToProp,{})(userCart)

const MainWrapper = styled(Main)`

  align-items: start;
  justify-content: start;
  align-content: start;
  display: block;
  @media screen and (min-width: 1024px){
    display: grid;
    grid-template-columns: 65% 1fr;
  }

`
const Details = styled.div`

  display: grid;
  width: 100%;
  margin: 1rem 0;


`

const Billing = styled.div`

  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  height:100%;
  padding: 1rem 1rem;
  border: 1px solid #cccc;
  font-weight:${({bold})=>bold?"bold":"350"};

`
const OrderButton = styled.button`

  width: 100%;
  padding: 1rem;
  background-color: #37bdae;
  color: white;
  font-weight: bold;
  border-radius: 2px;
  &:hover{
    background-color:#298e83
  }

`
const OrderDetails = styled.div`
  padding: 1rem;
`;

const Wrapper = styled.div`

  width: 100%;
  display: block;
  padding: 1rem;
  box-sizing: inherit;
  min-height: 20rem;

`