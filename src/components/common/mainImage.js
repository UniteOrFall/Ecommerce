import React from 'react'
import styled from 'styled-components'

const mainImage = (props) => {
    console.log(props);
    return (
        <CardImage src={`http://localhost:5000/${props}`}>
        </CardImage>
    )
}

export default mainImage

const CardImage = styled.div`

display: flex;
width: 100%;
height: 22rem;
/* object-fit: cover; */
background-size: cover;
background-position-x: center;
background-image: url(${({src})=>src});

`
