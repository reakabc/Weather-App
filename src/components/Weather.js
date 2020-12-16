import React from 'react'
import styled from 'styled-components'

const MainWrapper = styled.div`
padding: 10px;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
color: ${({theme}) => theme.colors.white};
`
const Heading = styled.h1`
padding: ${({theme}) => theme.spacers.large};
`

const Span = styled.span`
padding: ${props => props.theme.spacers.medium} ${props => props.theme.spacers.large};
display: flex;
flex-direction: row;
`

const MaxMin = styled.h3`
padding: 0px 30px;
`

const Weather = (props) => {
    return(
        <>
        {props.error ?
            <MainWrapper>
            <Heading>{props.city}, {props.country}</Heading>
            <h1><i className={"wi "+props.icon+" display-1"}/></h1>
            <Heading>{props.celsius}&deg;</Heading>
            <Span>
                <MaxMin>{props.temp_max}&deg;</MaxMin>
                <MaxMin>{props.temp_min}&deg;</MaxMin>
            </Span>
            <h3>{props.desc}</h3>
            {/* <img src={process.env.PUBLIC_URL+"./assets/fog.jpg"} als="image" width="300"/> */}
            </MainWrapper> 
            : null}
        </>
    );
}

export default Weather;