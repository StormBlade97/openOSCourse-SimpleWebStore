import React from 'react'
import Drawer from 'material-ui/Drawer'
import styled from 'styled-components'
import Button from 'material-ui/Button'
import { red, grey } from 'material-ui/colors'
import tinyColor from 'tinycolor2'
import List, { ListItem, ListItemText } from 'material-ui/List'

const Text = styled.span`
    font-size: 2rem;
    color: white;
    font-weight: 600;
    text-transform: capitalize;
`
const Wrapper = styled.div`
    min-width: 35rem;
    position: relative;
    height: 100vh;
    overflow: auto;
    background-color: ${grey[900]};
`
const SubmitSection = styled.div`
    padding: 0.5rem 0 0.5rem 0;
    position: fixed;
    bottom: 0;
    width: 100%;
    box-shadow: 
    display: flex;
`
const TextBox = styled.div`
    margin-bottom: 2rem;
    padding: 1.5rem;
    padding-top: 15rem;
    background-color: ${props => props.themeColor || props.theme.primary};
    background-image: url("${props => props.backgroundUrl}");
    background-size: cover;
`
const CloseIcon = styled.i`
    position: absolute !important;
    right: 0.5rem;
    top: 0.5rem;
    z-index: 10;
`
const ListText = styled(ListItemText)`
    h3 {
        color: rgba(255, 255, 255, 0.86);
    }
    p {
        margin-top: 4px;
        font-size: 1.5rem;
        color: ${props => props.theme.primary};
    }
`
class Slider extends React.Component {
    state = {
        title: 'New questionnaire',
        description: '',
        backgroundUrl: ''
    }
    componentWillMount = () => {
        window
            .fetch(
                `https://api.giphy.com/v1/gifs/search?q=stranger%things&api_key=wCmZ7xmZJdKnCdWR63N4zpIi0tLRwfho&limit=1&offset=${Math.floor(
                    Math.random() * 10
                )}`
            )
            .then(raw => raw.json())
            .then(rp =>
                this.setState({ backgroundUrl: rp.data[0].images.original.url })
            )
    }
    render() {
        const listItems = {
            title: 'Gravity'
        }
        return (
            <Drawer type="temporary" open={this.props.open} anchor="right">
                <Wrapper>
                    <CloseIcon
                        size={'1.5rem'}
                        iconClassName="fa fa-times-circle"
                        color="white"
                        onClick={this.props.onDismissClick}
                    />
                    <TextBox
                        themeColor={this.props.themeColor}
                        backgroundUrl={this.state.backgroundUrl}
                    >
                        <Text>{this.props.barTitle}</Text>
                    </TextBox>
                    <List style={{ margin: '0.5rem' }}>
                        <ListItem>
                            <ListText primary="Hello world" secondary="€12" />
                        </ListItem>
                        <ListItem>
                            <ListText primary="Hello world" secondary="€12" />
                        </ListItem>
                    </List>
                </Wrapper>
            </Drawer>
        )
    }
}

export default Slider
