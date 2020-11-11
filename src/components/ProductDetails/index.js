import React, {useState,useEffect} from 'react'
import {withRouter, RouteComponentProps, Redirect} from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import Main from '../common/main'
import ProductImage from '../common/mainImage'
import {loadCart} from '../../actions/auth'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const ProductDetails = (props) => {
    const {isAuthenticated,loadCart} = props;
    const {match:{params}} = props;
    const {location:{search}} = props;
    const [redirect, setredirect] = useState(false)
    console.log(location)
    const [product, setproduct] = useState();
    const [colors, setColors] = useState();
    
    const first_url = ()=>{
        let arr = []
        for(let [key,value] of Object.entries(product.colors)){
            if(value){
                console.log(key);
                arr.push(key);
            }
        }
        setformData({...formData , title: product.title,color: arr[0],id: product._id,product_type: product.cloth_type,price:product.price})
        setColors(arr);
    }
    const [formData, setformData] = useState({
        title: null,
        color: null,
        quantity: 1,
        size: null,
        id: null,
        product_type: null,
        price: null
    })

    const onSubmit = async (e)=>{
        e.preventDefault();
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }
    
            
        if(!isAuthenticated){
            setredirect(true);
        }else{
            console.log("Entered");
            if(formData.size==null){
               return console.log("error");
            }
            let prev = JSON.parse(localStorage.getItem("LocalCard"));
            
            prev?localStorage.setItem("LocalCard",JSON.stringify([...prev,formData])):localStorage.setItem("LocalCard",JSON.stringify([formData]));
            
            prev = localStorage.getItem("LocalCard");

            loadCart();

            axios.post('/api/auth/adduserCart',prev,config);
            
        }
    }
    const onClick = (e,value,type)=>{
        if(type == "color"){
            console.log(value);
            setformData({...formData , title: product.title,color: value,id: product._id})
        }else if(type=="quantity"){
            setformData({...formData , title: product.title,quantity: e.target.value,id: product._id})
        }else{
            setformData({...formData , title: product.title,size: value,id: product._id})
        }
    }
    useEffect(() => {
        async function fetchData(){
            try {
                const res = await axios.get(`/api/getProduct?id=${params.id}`)
                setproduct(res.data);

                
            } catch (error) {
                if(error){
                    console.log(error)
                }
            }
        }
        
        fetchData()
    }, [])

    useEffect(()=>{
        product&&!formData.color?first_url():null;
    },[product])
    return (
        <Modified>
            <Wrapper>
                <ImageWrapper>
                    {product&&formData.color?product[formData.color + "_image"].map(ProductImage):null}
                </ImageWrapper>
                <InfoWrapper onSubmit = {(e)=>{onSubmit(e)}}>
                    <h2>{product?product.title:null}</h2>
                    <Type>{product?product.cloth_type:null}</Type>
                    <Line></Line>
                    <Price>Rs. {product? product.price:null}</Price>
                    <Chart>Select Size <span>Check Size Chart</span></Chart>
                    <SizeChart>
                        <Size selected={formData.size=="XS"} onClick = {(e)=>{onClick(e,"XS","size")}}>XS</Size>
                        <Size selected={formData.size=="S"} onClick = {(e)=>{onClick(e,"S","size")}}>S</Size>
                        <Size selected={formData.size=="M"} onClick = {(e)=>{onClick(e,"M","size")}}>M</Size>
                        <Size selected={formData.size=="L"}  onClick = {(e)=>{onClick(e,"L","size")}}>L</Size>
                    </SizeChart>
                    <Chart>Select Color</Chart>
                    <BoxWrapper>{colors?colors.map((item,index)=>(<ColCheckbox key={index} selected={formData.color==item} color={item} onClick={(e)=>{onClick(e,item,"color")}}></ColCheckbox>)):null}</BoxWrapper>
                    <BoxWrapper>
                        <Chart>Quantity : </Chart>
                    <Select name="quantity" value={formData.quantity} onChange={(e)=>onClick(e,"Val","quantity")}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </Select>
                    </BoxWrapper>
                    {isAuthenticated?null:<Chart>Login First to add items to cart.</Chart>}
                    {redirect?<Redirect to={{pathname: '/login',state:{previous: location.pathname}}} />:null}
                    <Submit type={"submit"}>Add To Cart</Submit>
                </InfoWrapper>
            </Wrapper>
        </Modified>
    )
}

ProductDetails.propTypes = {
    loadCart: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  }
  
  const mapStateToProp = state => ({
  
    isAuthenticated: state.auth.isAuthenticated
  
  })
  

export default connect(mapStateToProp,{loadCart})(ProductDetails)
const Select = styled.select`

    height: 1.2rem;
    margin-left: 1rem;

`
const Wrapper = styled.div`

    display: grid;
    grid-template-columns : 2fr 1fr;
    width: 100%;
    height: 80vh;

`
const Modified = styled(Main)`

    justify-content: end;

`

const ImageWrapper = styled.div`

    display: grid;
    grid-template-columns : 1fr 1fr;
    grid-gap: 1rem;
    overflow-y: scroll;
    

`
const InfoWrapper = styled.form`

    display: flex;
    padding: 1rem 2rem;
    flex-direction: column;
`

const Type = styled.h6`

    text-align: start;
    padding: 0;
    padding-top: 0.5rem;
    font-size: 1rem;
    padding-bottom: 2rem;
`
const Line = styled.div`

    width: 100%;
    height: 1px;
    background: #ccc;
    margin-bottom: 2rem;
`

const Price = styled.h2`

    font-size: 1.5rem;

`
const Chart = styled.p`

    text-align: left;
    font-size: 0.9rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    &>span{
    color: #37bdae;
    cursor: pointer;
    }
`
const SizeChart = styled.div`

    display: flex;

`

const Size = styled.div`

    display: flex;
    width: 2rem;
    height: 2rem;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: 2px solid ${({selected})=>selected?"#37bdae":"grey"};
    margin-right: 1rem;
    cursor: pointer;

`

const ColCheckbox = styled.div`

    width: 2rem;
    height: 2rem;
    background-color: ${({color})=>color?color:"white"};
    border: 2px solid ${({selected})=>selected?"black":"grey"};
    margin-bottom: 1rem;
    margin-right: 1rem;
    cursor: pointer;

`
const BoxWrapper = styled.div`

    display: flex;
    align-items: center;
    font-size: 0.9rem;
`

const Submit = styled.button`

    background-color: #ec3d25;
    width: max-content;
    padding: 1rem 3rem;
    border: 0;
    color: white;
    font-weight: bold;  
    &:hover{
        background-color: #b42410;
    }

`
