import React from 'react'
import styled from 'styled-components'

const FormWrapper = styled.form`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: ${({theme}) => theme.spacers.large};
color: ${props => props.theme.colors.white};

@media ${({theme}) => theme.mediaQueries.below768}{
    flex-direction: column;
}

`

const Input = styled.input`
padding:  ${props => props.theme.spacers.medium};
background-color: transparent;
box-shadow: none;
border-radius: ${({theme}) => theme.spacers.medium};
color: ${props => props.theme.colors.white};
font-size: ${({theme}) => theme.fontSizes.small};
margin: ${props => props.theme.spacers.medium};
border: 2px rgba(255,255,255,0.5) solid;
&::placeholder{
    color: white;
    opacity: 0.5;
}

&:active{
    background: transparent;
}

&::selection{
    background: transparent;
}

&:focus{
    box-shadow: none;
    background: transparent;
}`

const Button = styled.button`
padding: ${props => props.theme.spacers.medium};
border-radius: ${({theme}) => theme.spacers.medium};
font-size: ${({theme}) => theme.fontSizes.small};
margin: ${props => props.theme.spacers.medium};
background-color:transparent; 
border-color: rgba(255,255,255,0.5);
color: #fff;

&:hover{
    background-color: rgba(0,255,20, 0.5);
}
`

const Form = (props) =>{
    return(
        <>
            <FormWrapper onSubmit={props.loadweather}>
                <Input type='text' placeholder="Enter city" name="city" autoComplete="false"/>
                <Input type='text' placeholder="Enter Country" name="country" autoComplete="false"/>
                <Button>Get Weather Report</Button>
            </FormWrapper>
        </>
    )
}

export default Form;