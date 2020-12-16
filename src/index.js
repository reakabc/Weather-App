import React from 'react'
import ReactDOM from 'react-dom'
import {ThemeProvider} from 'styled-components'


import App from './App'
import GlobalStyle from './theme/GlobalStyles'
import theme from './theme/theme'


const root = document.getElementById('root');

ReactDOM.render(
    <ThemeProvider theme={theme}>
    <GlobalStyle/>
    <App />
    </ThemeProvider>
    , root);
