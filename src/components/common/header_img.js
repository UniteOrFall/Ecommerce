import React from 'react'
import styled from 'styled-components'

const HeadImage = ({url}) => {
    
    return (
        <Wrapper>
            <Image src={url} />
        </Wrapper>
        
    )
}

export default HeadImage

const Wrapper = styled.div`

    width: 100%;
    background-color: darkblue;
    margin-bottom: 1rem;
    @media screen and (min-width: 760px){
        margin-bottom: 0;
    }


`

const Image = styled.img`

    width: 100%;


`
