import React, {useState,useEffect} from 'react'
import {withRouter, RouteComponentProps} from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import Product_Card from '../common/product'

const Product = (props) => {
    const {match:{params}} = props;
    const {location:{search}} = props;
    const [products, setproducts] = useState([])
    useEffect(() => {
        async function fetchData(){
            try {
                const res = await axios.get(`/api/getProduct/${params.type}${search}`)
                setproducts(res.data);
            } catch (error) {
                if(error){
                    console.log(error)
                }
            }

        }
        fetchData();
    }, [])
    
    return (
        <Wrapper>
            {products.map(Product_Card)}
        </Wrapper>
    )
}

export default Product

const Wrapper = styled.div`

padding: 2rem 4rem;
padding-top: 7rem;
width: 100%;
min-height: 100vh;
display: grid;
grid-template-columns: 1fr;
grid-gap: 1rem;
box-sizing: border-box;
@media only screen and (min-width: 768px){
    grid-template-columns: 1fr 1fr 1fr;
}
@media only screen and (min-width: 1024px){
    grid-template-columns: 1fr 1fr 1fr 1fr
}
@media only screen and (min-width: 1224px){
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr
}

`
