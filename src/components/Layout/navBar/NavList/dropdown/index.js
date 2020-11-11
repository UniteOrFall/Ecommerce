import React from 'react'
import styled from 'styled-components'

const Dropdown = (list,index) => {
    return (
        <List key={index}>
            <a href={list.path}>{list.title}</a>
        </List>
    )
}

export default Dropdown

const List = styled.li`

    padding: 1rem;
    color: black;
    cursor: pointer;
    &:hover{
        color: red;
    }

`


