import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCartPlus} from '@fortawesome/free-solid-svg-icons'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../../../actions/auth';

const Cart = (props) => {
    const {cart,logout} = props
    const [cartNum, setcartNum] = useState(0)
    useEffect(() => {
        cart?setcartNum(cart.length):null;
    }, [cart])
    const onClick = ()=>{
        console.log("logout")
        logout();
    }
    return (
        <Wrapper>
            <button onClick = {()=>{onClick()}}>Logout</button>
            <Link href={"/cart"}>
                <FontAwesomeIcon icon={faCartPlus} />
                {cartNum?<div>{cartNum}</div>:null}  
            </Link>  
        </Wrapper>
    )
}
Cart.propTypes = {
    cart: PropTypes.array,
    logout: PropTypes.func
  }
  
  const mapStateToProp = state => ({
  
    cart: state.auth.cart,
  
  })
  

export default connect(mapStateToProp,{logout})(Cart)

const Wrapper = styled.div`

    position: relative;
    height: 100%;
    display:flex;
    align-items: center;
    justify-content: center;
    &>a>svg{
        width: 2rem;
        cursor: pointer;
    }
    &>a>svg:hover{
        color: red;
    }
    &>a>div{
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        font-size: 0.5rem;
        background-color: red;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        right: -13px;
    }
`
const Link = styled.a`

    text-decoration: none;
    color: inherit;

`

