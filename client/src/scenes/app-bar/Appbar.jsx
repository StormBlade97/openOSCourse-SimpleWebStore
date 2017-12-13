import React from 'react'
import styled from 'styled-components'
import logo from './popcorn.svg'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'
import { observer } from 'mobx-react'
import { UserStore } from 'core'

const Container = styled.nav`
    width: 100vw;
    height: 5rem;
    display: flex;
    justify-content: space-between;
    padding-left: 1rem;
    padding-right: 3rem;
    background-color: transparent;
    align-items: center;
    box-sizing: border-box;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
`
const LogoContainer = styled.div`
    display: flex;
    align-items: flex-end;
    padding: 0.5rem;
    border: 1px #ffeb3b dashed;
    background-image: url('https://media.giphy.com/media/g1nOYYV0AHY3K/giphy.gif');
    background-size: cover;
    background-position: center center;
    filter: brightness(60%);
`
const Logo = styled.img`
    width: 2.5rem;
`
const LogoText = styled.span`
    font-size: 1.7rem;
    margin-left: 8px;
    color: #ffeb3b;
    font-family: 'Fredoka One', cursive;
`

const UserSection = styled.div`
    display: flex;
    align-items: center;
`
const AvatarSection = styled.div`
    display: flex;
    align-items: center;
    margin-right: 2rem;
    color: white;
`
const UserName = styled.span`
    margin-left: 1rem;
    font-weight: 500;
    text-transform: uppercase;
    font-family: 'Montserrat', sans-serif;
    font-size: 0.8rem;
    letter-spacing: 1px;
`
@observer
class Appbar extends React.Component {
    render() {
        return (
            <Container>
                <LogoContainer>
                    <Logo src={logo} />
                    <LogoText>POPCORN</LogoText>
                </LogoContainer>
                <UserSection>
                    <AvatarSection>
                        <Avatar
                            style={{ width: '2.5rem', height: '2.5rem' }}
                            imgProps={{ style: { objectFit: 'cover' } }}
                            src="https://media.giphy.com/media/9vVCPK87Aw6v6/giphy.gif"
                        />
                        <UserName>Thanh</UserName>
                    </AvatarSection>
                    <IconButton style={{ color: 'white' }}>
                        <i className="material-icons">shopping_basket</i>
                    </IconButton>
                </UserSection>
            </Container>
        )
    }
}

export default Appbar
