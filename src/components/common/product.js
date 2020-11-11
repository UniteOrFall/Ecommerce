import React from 'react'
import styled from 'styled-components'

const Product_Card = (item,index) => {
    const first_url = ()=>{
        for(let [key,value] of Object.entries(item.colors)){
            if(value){
                return key;
            }
        }
    }
   
    return (
        <CardWrapper key={index}>
            <Link href={'/product/'+ item.cloth_type + "/" + item._id}>
            <CardImage hoversrc={`http://localhost:5000/${item[first_url() + "_image"][0]}`} src={`http://localhost:5000/${item[first_url() + "_image"][1]}`} >
            </CardImage>
            
    <h4>{item.title}</h4>
    <h6>{item.cloth_type}</h6>
    <Price>Rs. {item.price}</Price>
    </Link>
        </CardWrapper>
    )
}

export default Product_Card;

const CardWrapper = styled.div`


`
const Price = styled.h4`

    border-bottom: 0;
    padding-top: 0;

`
const CardImage = styled.div`

display: flex;
width: 100%;
height: 18rem;
/* object-fit: cover; */
background-size: cover;
background-position-x: center;
background-image: url(${({src})=>src});
&:hover{
    background-image: url(${({hoversrc})=>hoversrc});
}

`
const Link = styled.a`

    text-decoration: none;
    color: inherit;

`
