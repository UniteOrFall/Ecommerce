import React,{useState} from 'react'
import styled from 'styled-components'
const image = ({product}) => {
    const [state, setstate] = useState(initialState)
    const first_url = ()=>{
        let arr = []
        for(let [key,value] of Object.entries(product.colors)){
            if(value){
                console.log(key);
                arr.push(key);
            }
        }
        return arr[0];
    }
    console.log(product)
    return (
        <ImageWrapper>

        </ImageWrapper>
    )
}

export default image

const ImageWrapper = styled.div`

    display: grid;
    grid-template-columns : 1fr 1fr;
    grid-gap: 1rem;


`