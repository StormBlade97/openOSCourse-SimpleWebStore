import React from 'react'
import styled from 'styled-components'
import Button from 'material-ui/Button'
import ShopList from './ShopList'
import Slider from './Slider'

const RoundButton = styled(Button)`
    border-radius: 2rem !important;
    background-color: rgb(244, 67, 54) !important;
    color: white !important;
    letter-spacing: 2px;
    font-size: 0.8rem !important;
    font-weight: 700 !important;
`
const HeroBox = styled.div`
    &::before {
        content: "";
        background-image: url("${props => props.src}");
        background-position: left top;
        background-size: cover;
        background-repeat: no-repeat;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        background-color: rgb(33,33,33);
    }
    position: relative;
    width: 100vw;
    height: 70vh;
    background: linear-gradient(to left, rgba(0,0,0, 1) 10%, rgba(0,0,0, .1));
`
const MovieContent = styled.div`
    position: absolute;
    top: 30%;
    left: 50%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 2rem;
    box-sizing: border-box;
`
const MovieTitle = styled.span`
    font-size: 4rem;
    font-weight: 800;
    letter-spacing: 3px;
    color: rgb(253, 216, 53);
    text-transform: uppercase;
`
const MovieSypnosis = styled.p`
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.86);
`
const PriceTag = styled.div`
    display: flex;
    width: 90%;
    align-items: center;
    margin-bottom: 1rem;
    span {
        font-size: 1.5rem;
        color: rgb(100, 221, 23);
        letter-spacing: 3px;
        font-weight: 600;
        white-space: nowrap;
        margin-left: 0.5rem;
    }
    hr {
        width: 100%;
        height: 1px;
        background-color: rgba(100, 221, 23, 0.8);
        border-style: none;
    }
`
export default class MainFrame extends React.Component {
    render() {
        return (
            <div>
                <HeroBox
                    src={
                        'http://wallpaper.pickywallpapers.com/2560x1440/gravity-open-space-poster.jpg'
                    }
                >
                    <MovieContent>
                        <MovieTitle>Gravity</MovieTitle>
                        <MovieSypnosis>
                            Dr. Ryan Stone (Sandra Bullock) is a medical
                            engineer on her first shuttle mission. Her commander
                            is veteran astronaut Matt Kowalsky (George Clooney),
                            helming his last flight before retirement. Then,
                            during a routine space walk by the pair, disaster
                            strikes: The shuttle is destroyed, leaving Ryan and
                            Matt stranded in deep space with no link to Earth
                            and no hope of rescue. As fear turns to panic, they
                            realize that the only way home may be to venture
                            further into space.
                        </MovieSypnosis>
                        <PriceTag>
                            <hr />
                            <span>€ 1000</span>
                        </PriceTag>
                        <RoundButton raised>Buy now</RoundButton>
                    </MovieContent>
                </HeroBox>
                <ShopList />
                <Slider open barTitle="Gravity" />
            </div>
        )
    }
}
