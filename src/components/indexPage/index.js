import React from 'react'
import Main from '../common/main'
import HeadImage from '../common/header_img'
import styled from 'styled-components'
import Heading from '../common/heading'
import colors from '../common/colors'

const index = () => {
    const arr = ["http://localhost:5000/upload/landing/Banner/BANNER1.jpg","http://localhost:5000/upload/landing/Banner/BANNER1.jpg","http://localhost:5000/upload/landing/Banner/BANNER1.jpg","http://localhost:5000/upload/landing/Banner/BANNER1.jpg"];
    return (
        <>
            <Main>
            
                <HeroWrapper>
                {
                    arr.map((elem,index)=><HeadImage url = {elem} key={index}/>)
                }
                </HeroWrapper>
                <HeadingWrapper>
                <Heading>
                    Products
                </Heading>
                </HeadingWrapper>
                <Product>
                    <ImgWrapper>
                        <Img src="https://cdn4.vectorstock.com/i/1000x1000/50/43/denim-clothing-web-banner-vector-22775043.jpg" />
                    </ImgWrapper>
                    <ImgWrapper>
                        <Img src="https://cdn4.vectorstock.com/i/1000x1000/50/43/denim-clothing-web-banner-vector-22775043.jpg" />
                    </ImgWrapper>
                    <ImgWrapper colstart={3} rowstart={1} rowend= {3}>
                        <Img src="https://cdn4.vectorstock.com/i/1000x1000/50/43/denim-clothing-web-banner-vector-22775043.jpg" />
                    </ImgWrapper>
                    <ImgWrapper colstart={1} colend={3}>
                        <Img src="https://cdn4.vectorstock.com/i/1000x1000/50/43/denim-clothing-web-banner-vector-22775043.jpg" />
                    </ImgWrapper>
                    <ImgWrapper>
                        <Img src="https://cdn4.vectorstock.com/i/1000x1000/50/43/denim-clothing-web-banner-vector-22775043.jpg" />
                    </ImgWrapper>
                    <ImgWrapper>
                        <Img src="https://cdn4.vectorstock.com/i/1000x1000/50/43/denim-clothing-web-banner-vector-22775043.jpg" />
                    </ImgWrapper>
                    <ImgWrapper>
                        <Img src="https://cdn4.vectorstock.com/i/1000x1000/50/43/denim-clothing-web-banner-vector-22775043.jpg" />
                    </ImgWrapper>
            </Product>
            </Main>
        </>
    )
}

export default index

const HeroWrapper = styled.div`

    width: 100%;
    display: flex;
    flex-direction: column;
    
    @media screen and (min-width: 760px){
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 1rem;
    }

`

const Product = styled.div`

    display: grid;
    grid-template-rows: 10rem;
    @media screen and (min-width: 450px){
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 20rem 20rem 20rem;}
    grid-gap: 1rem;

`

const ImgWrapper = styled.div`

        width: 100%;
        height: 100%;
        @media screen and (min-width: 450px){
            grid-row-start: ${({rowstart})=>rowstart?rowstart:null};
        
            grid-row-end: ${({rowend})=>rowend?rowend:null};
        
            grid-column-start: ${({colstart})=>colstart?colstart:null};
    
            grid-column-end: ${({colend})=>colend?colend:null};}

`

const Img = styled.img`

    width: 100%;
    height: 100%;
    object-fit: cover;


`
const HeadingWrapper = styled.div`

background-color: white;
width: 100%;
display: flex;
justify-content: center;
align-items: center;
position: relative;
margin: 1rem;
margin-bottom: 2rem;
    &:before{
        content: "";
        width: 100%;
        position: absolute;
        top: 50%;
        border: 1.2px dashed ${colors["light_grey"]};
        
    }

`


