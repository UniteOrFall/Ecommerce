import React from 'react'
import styled from 'styled-components'
import Dropdown from './dropdown'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCaretDown} from '@fortawesome/free-solid-svg-icons'

const NavList = (item,index) => {
    const{title,itemType,items} = item;
    return (
        <Items key={index}>
            {title}
            {itemType?null:
            <>
                <FontAwesomeIcon icon={faCaretDown} />
                <DropList items={items}>
                    {items.map(Dropdown)}
                </DropList>
            </>
            }
            
        </Items>
    )
}

export default NavList

const Items = styled.li`

    padding: 1rem;
    position: relative;
    cursor: pointer;
    display: flex;
    font-weight: bold;
    
    border-bottom: 2px solid #222;
    &:hover{
        border-bottom: 2px solid red;
    }
    &:hover>ul{
        display: flex;
        
    }
    &>svg{
        margin-left: 0.5rem;
        
    }

`
const DropList = styled.ul`

    position: absolute;
    background-color: white;
    top: 3.15rem;
    max-height: 12rem;
    left: 0;
    flex-wrap: wrap;
    min-width: ${({items})=>Math.ceil(items.length/4)>=2? `${Math.ceil(items.length/4)*6}rem` : "auto"};
    display: none;
    flex-direction: column;
    font-weight: 300;
    box-shadow: 0 2px 3px rgba(0,0,0,.2);

`
