import React from 'react'
import Weather from './components/Weather'
import 'weather-icons/css/weather-icons.css'
import styled from 'styled-components'
import Form from './components/Form'
import { AnimateGroup } from 'react-animation'

// const fadeIn = keyframes`
// 0% {
//     opacity: 0;
// }

// 100%{
//     opacity: 1;
// }`

const MainWrapper = styled.div`
height: 100vh;
width: 100%;
background: url(${props => props.image ? props.image : './assets/sunny.jpg'});
background-repeat: no-repeat;
background-size: cover;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
color: ${props => props.theme.colors.white};
//animation-name:;
//animation-duration: 2s;
//animation-timing-function: ease-in;
`

//http://api.openweathermap.org/data/2.5/weather?q={location}&appid={API_KEY}
const API_KEY = "open_weather_map_api_key";

class App extends React.Component{
    constructor(){
        super();
        this.state = {
            city: undefined,
            country: undefined,
            icon: undefined,
            main: undefined,
            celsius: undefined,
            temp_max: undefined,
            temp_min: undefined,
            desc: "",
            error: false,
            bg:undefined
        };

        //this.getWeather();

        this.weatherIcons = {
            Thunderstorm: "wi-thunderstorm",
            Snow: "wi-snow",
            Drizzle: "wi-sleet",
            Rain: "wi-storm-showers",
            Atmosphere: "wi-fog",
            Clear: "wi-day-sunny",
            Clouds: "wi-day-fog"
        };

        this.mainComponent = React.createRef();
    }

    calCelsius(temp){
        let cel = Math.floor(temp-273.15);
        return cel;
    }

    getWeatherIcon(weatherIcon, rangeId){
        switch(true){
            case rangeId >= 200 && rangeId <= 232:
                this.setState({icon: weatherIcon.Thunderstorm});
                this.setState({bg: './assets/thunder.jpg'});
                break;
            
            case rangeId >= 300 && rangeId <= 332:
                this.setState({icon: weatherIcon.Drizzle});
                this.setState({bg: './assets/drizzle.jpg'});
                break;

            case rangeId >= 500 && rangeId <= 532:
                this.setState({icon: weatherIcon.Rain});
                this.setState({bg: './assets/rain.jpg'});
                break;

            case rangeId >= 600 && rangeId <= 632:
                this.setState({icon: weatherIcon.Snow});
                this.setState({bg: './assets/snow.jpg'});
                break;

            case rangeId >= 700 && rangeId <= 782:
                this.setState({icon: weatherIcon.Atmosphere});
                this.setState({bg: './assets/fog.jpg'});
                break;

            case rangeId === 800:
                this.setState({icon: weatherIcon.Clear});
                this.setState({bg: './assets/sunny.jpg'});
                break;

            case rangeId <= 801 && rangeId <= 804:
                this.setState({icon: weatherIcon.Clouds});
                this.setState({bg: './assets/cloud.jpg'});
                break;

            default: 
                this.setState({icon: weatherIcon.Clouds});
                this.setState({bg: './assets/cloud.jpg'});

        }
    }

    getWeather = async(e) => {

        e.preventDefault(); 

        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;

        if(city && country){
                
            const location = city+","+country;

            const api_call = await fetch('http://api.openweathermap.org/data/2.5/weather?q='+location+'&appid='+API_KEY);

            const response = await api_call.json();

            //console.log(response);

            this.setState({
                city: response.name,
                country: response.sys.country,
                celsius: this.calCelsius(response.main.temp),
                temp_max: this.calCelsius(response.main.temp_max),
                temp_min: this.calCelsius(response.main.temp_min),
                desc: response.weather[0].description,
                icon: this.weatherIcons.Clouds
            })

            this.getWeatherIcon(this.weatherIcons, response.weather[0].id)

        }else{
            this.setState({
                error:true
            })
        }
    }

    render(){
        return(
            
            <AnimateGroup animation="bounce">
                <MainWrapper className="main_wrapper" image={this.state.bg} ref={this.mainComponent}>

                    <Form className="form" loadweather={this.getWeather}/>

                    <Weather className="weather"
                        city={this.state.city} 
                        country={this.state.country}
                        celsius={this.state.celsius}
                        temp_max={this.state.temp_max}
                        temp_min={this.state.temp_min}
                        desc={this.state.desc}
                        icon={this.state.icon}
                        error={this.state.icon}/>
                    
                </MainWrapper>
            </AnimateGroup>
        )
    }
}

export default App;

//animation docs
//https://nearform.github.io/react-animation/
