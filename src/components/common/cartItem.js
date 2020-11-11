import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {loadCart} from '../../actions/auth'
import axios from 'axios'

const cartItem = (props) => {
    const {item,index,loadCart} = props;
    const [Quant, setQuant] = useState(item.quantity)
    const onClick = async (e,index,type)=>{
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }
        let cart = JSON.parse(localStorage.getItem('LocalCard'));
        if(type=="remove"){
            cart.splice(index,1);
            localStorage.setItem('LocalCard',JSON.stringify(cart));
            loadCart();
        }
        else{
            setQuant(e.target.value);
            cart[index].quantity = e.target.value;
            console.log(cart);
            localStorage.setItem('LocalCard',JSON.stringify(cart));
            loadCart();
        }
        let prev = JSON.parse(localStorage.getItem("LocalCard"));

        await axios.post('/api/auth/adduserCart',prev,config);

        loadCart();

    }
    console.log(item);
    return (
            <CardWrapper key={index}>
                <Link href={'/product/'+ item.product_type + "/" + item.id}>
                <CardImage src={`http://localhost:5000/upload/${item.product_type}/${item.title.replace(/ /g,"")}/${item.color}_0.png`} >
                </CardImage>
        </Link>
        <Text>
        <h4>{item.title} <span>Rs. {item.price}</span></h4>
        <h6>{item.cloth_type}</h6>
        
        <Price>Size: {item.size}</Price>
        <QuantWrapper>
            <Price>Quantity: </Price>
            <Select name="quantity" value={Quant} onChange = {(e)=>{onClick(e,index)}}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
            </Select>
        </QuantWrapper>
        </Text>
            <button onClick = {(e)=>{onClick(e,index,"remove")}}>Remove</button>
            </CardWrapper>
    )
}

cartItem.propTypes = {
    loadCart: PropTypes.func
  }
  
  const mapStateToProp = state => ({
  
  
  })

export default connect(mapStateToProp,{loadCart})(cartItem);

const Select = styled.select`

    height: 1.2rem;
    margin-left: 1rem;
    border: 0;
    

`
const CardWrapper = styled.div`

    display: grid;
    grid-template-columns: max-content 1fr;
    width: 100%;
    border: 1px solid #ccc;
    margin-bottom: 1rem;
    padding: 1rem;
    box-sizing: inherit;
`
const QuantWrapper = styled.div`

    display: flex;
    padding-top: 1rem;
    align-items: center;
    &>h4{
        padding-bottom: 0;
    }

`

const Price = styled.h4`

    border-bottom: 0;
    padding-top: 0;

`

const Text = styled.div`

padding: 1rem;
&>h4,&>h6{
    text-align: left;
    display: flex;
    justify-content: space-between;
}


`
const CardImage = styled.div`

display: flex;
width: 14rem;
height: 18rem;
/* object-fit: cover; */
background-size: cover;
background-position-x: center;
background-image: url(${({src})=>src});

@media screen and (max-width: 1024px){
    width: 9rem;
    height: 13rem;
    
}
@media screen and (max-width: 450px){
    width: 5rem;
    height: 8rem;
}
`
const Link = styled.a`

    text-decoration: none;
    color: inherit;

`