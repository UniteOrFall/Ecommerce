import React from 'react'
import styled from 'styled-components'
import {Redirect} from 'react-router-dom'
const BookAdress = (props) => {
    console.log(props);
    return (
        <div>
            {props.location.aboutProps?null:<Redirect to={'/cart'}></Redirect>}       
        </div>
    )
}

export default BookAdress
