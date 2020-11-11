import React, {useEffect,useState} from 'react';
import {Redirect} from 'react-router-dom';
import styled from 'styled-components'

import axios from 'axios';


const Landing = (props) => {
    const [role,changerole] = useState("Admin")
    const redirectDone = () => {
        if(role!=="Admin"){
            return <Redirect to={"/"} />
        }
    }

    const [formData, setformData] = useState({
        title: '',
        price: '',
        cloth_type: '',
        image:[],
        colors:{
            red:false,
            white: false,
            blue: false,
            black: false,
            yellow: false
        },
        red_image:[],
        blue_image: [],
        white_image:[],
        yellow_image: [],
        black_image:[]
    })

    const addProduct = async (e)=>{
        e.preventDefault();
        console.log(formData);
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }
        let body = JSON.stringify(formData);
        let response = await axios.post('/api/addProduct',body,config)
        console.log(response);

    }

    const baseConverter = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
})
    
        const toBase64 = async file => new Promise(async (resolve, reject) => {
            let arr = [];
            for(let i=0;i<file.length;i++){
                let a = await baseConverter(file[i])
                arr.push(a);
                if(i==file.length-1){
                    resolve(arr)
                }
            }
        });

        const toggleSelected = async (e,color)=>{
            console.log("Entered")
            setformData({...formData, colors: {...formData.colors,[color]:!formData.colors[color]}});
        }

    const onChange = async (e)=>{

        if(e.target.type!="file")
            setformData({...formData,[e.target.name]: e.target.value});
        
        else{
            let len = e.target.files.length
            
                let baseimage = await toBase64(e.target.files)
                setformData({...formData,image:[...formData.image,  ...baseimage]})
            
        }

    }
    const onChangeColor = async (event,id)=>{
            
                let baseimage = await toBase64(event.target.files)
                setformData({...formData,[id]:[...baseimage]})

    }
    const createInput = (colors)=>{
        let arr = [];
        for(const [key,value] of Object.entries(colors)){
            
            if(value==true){
                arr.push(<input id={`${key}_image`} key={key} type="file" name= {`${key}_image`} multiple onChange = {(event)=>onChangeColor(event,`${key}_image`)}/>)
            }
        }
        return arr;
    }
    const {title, price, cloth_type,colors} = formData

    return (
        <>
        {redirectDone()}
        <div className="form-binder">
            <form className="product-form" onSubmit={(e)=>{
                addProduct(e);
            }}>
                <input className='creator-form' type="text" name="title" placeholder="title" value={title} onChange={(e)=>onChange(e)} />
                
                <input className='creator-form' type="text" name="price" value={price} placeholder="Enter Price in Rupees. " onChange={(e)=>onChange(e)} />

                <select className="creator-form" name="cloth_type" value ={cloth_type} onChange={(e)=>onChange(e)}>
                    <option value = "">--Select an Option</option>
                    <option value="Tshirt">Tshirt</option>
                    <option value="Polo">Polo</option>
                    <option value="couple">Couple T-Shirt</option>
                    <option value="mug">Mug</option>
                </select>

                <input type="file" name= "image" multiple onChange = {(e)=>onChange(e)}/>

                <BoxWrapper>
                    <ColCheckbox color={"red"} selected={colors.red} onClick = {(e)=>{toggleSelected(e,"red")}}></ColCheckbox>
                    
                    <ColCheckbox color={"blue"} selected={colors.blue} onClick = {(e)=>{toggleSelected(e,"blue")}}></ColCheckbox>
                    
                    <ColCheckbox color={"white"} selected={colors.white} onClick = {(e)=>{toggleSelected(e,"white")}}></ColCheckbox>

                    <ColCheckbox color={"yellow"} selected={colors.yellow} onClick = {(e)=>{toggleSelected(e,"yellow")}}></ColCheckbox>
                    <ColCheckbox color={"black"} selected={colors.black} onClick = {(e)=>{toggleSelected(e,"black")}}></ColCheckbox>
                </BoxWrapper>

                {createInput(colors)}
                
                
                <button type="submit" >Submit</button>
            </form>
        </div>
        </>
    )
}

export default Landing

const BoxWrapper = styled.div`

    display: flex;

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
