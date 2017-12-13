import React from 'react'
import styled from 'styled-components'
import { GridList, GridListTile } from 'material-ui/GridList'
import _ from 'lodash'

const Container = styled.section`
    margin-top: 4px;
`

export default class ShopList extends React.Component {
    state = { items: [] }

    componentDidMount = () => {
        window
            .fetch(
                `https://api.giphy.com/v1/gifs/search?q=funny&api_key=wCmZ7xmZJdKnCdWR63N4zpIi0tLRwfho`
            )
            .then(raw => raw.json())
            .then(rp =>
                rp.data.map(datum => ({
                    image: datum.images.downsized_medium.url,
                    title: 'angry bird' + Math.random() * 100 + 1,
                    cols: Math.floor(Math.random() * 3),
                    rows: Math.floor(Math.random() * 2)
                }))
            )
            .then(items => this.setState({ items }))
            .catch(error => console.log(error))
    }
    render() {
        console.log(this.state.items)
        return (
            <Container>
                <GridList cellHeight={240} cols={6} spacing={0}>
                    {this.state.items.map(tile => (
                        <GridListTile
                            key={tile.title}
                            cols={tile.cols || 1}
                            rows={tile.rows || 1}
                        >
                            <img src={tile.image} alt={tile.title} />
                        </GridListTile>
                    ))}
                </GridList>
            </Container>
        )
    }
}
