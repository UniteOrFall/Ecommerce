import React, { Component } from 'react'
import styled from 'styled-components'
import Nav_List from './NavList'
import Cart from './working'
const Navbar = (props) => {
    const {role,list_item} = props
        return (
            
            <nav className="nav-bar">
                {role=="User"?<h2>RaviColors <span>Admin</span></h2> : <h2>RaaviColors</h2>}
                <List>
                    {list_item.map(Nav_List)}
                </List>
                <Cart />
            </nav>

        )
}

export default Navbar;

const List = styled.ul`

    display: flex;
    flex-direction: row;
    @media screen and (max-width: 768px){
        display: none;
    }
    

`
