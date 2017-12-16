import React, { Component } from 'react'
import './App.css'
import styled from 'styled-components'
import Table, {
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from 'material-ui/Table'
import Paper from 'material-ui/Paper'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import { Basket, Store } from './core'
import IconButton from 'material-ui/IconButton'
import Button from 'material-ui/Button'
import ShoppingCart from 'material-ui-icons/ShoppingCart'
import Add from 'material-ui-icons/Add'
import Remove from 'material-ui-icons/Remove'
import Badge from 'material-ui/Badge'
import CartModal from './Dialog'
import Login from './Login'
import ItemPopUp from './ItemPopup'

const CartSection = styled.div`
    position: absolute;
    right: 3rem;
    bottom: 1rem;
`
const Section = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`
class AppUI {
    @observable drawerOpen = false
    @observable itemMenu = false
}
@observer
class App extends Component {
    ui = new AppUI()
    @observable store = new Store()

    componentWillMount() {}
    addToCart = item => {
        this.store.user.cart.add(item)
        item.stock--
    }
    openItemMenu = item => {
        this.ui.itemMenu = item
    }
    logout = () => {
        this.store.logout()
        window.localStorage.clear()
    }
    render() {
        if (!this.store.user)
            return (
                <Login
                    user={this.store.user}
                    login={user => (this.store.user = user)}
                />
            )
        const { privilege } = this.store.user
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Movie web store</h1>
                    <Section>
                        {privilege === 'customer' && (
                            <h4>
                                Your balance:{' '}
                                {this.store.user.cart.originalMoney}
                            </h4>
                        )}
                        <Button
                            onClick={() => this.logout()}
                            style={{
                                position: 'absolute',
                                bottom: '1rem',
                                backgroundColor: '#42A5F5'
                            }}
                        >
                            Log out
                        </Button>
                        <CartSection>
                            {privilege === 'customer' ? (
                                <IconButton
                                    onClick={() => (this.ui.drawerOpen = true)}
                                >
                                    <Badge
                                        badgeContent={
                                            this.store.user.cart.itemsCount
                                        }
                                        color="primary"
                                    >
                                        <ShoppingCart />
                                    </Badge>
                                </IconButton>
                            ) : (
                                privilege === 'admin' && (
                                    <Button
                                        style={{ backgroundColor: '#4CAF50' }}
                                        onClick={() => this.openItemMenu({})}
                                    >
                                        <Add />
                                        Add item
                                    </Button>
                                )
                            )}
                        </CartSection>
                    </Section>
                </header>
                {this.store.items.length > 0 ? (
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Id</TableCell>
                                    <TableCell>Title</TableCell>
                                    <TableCell numeric>Price</TableCell>
                                    <TableCell numeric>Stock</TableCell>
                                    <TableCell>Poster</TableCell>
                                    <TableCell />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.store.items.map(n => {
                                    return (
                                        <TableRow key={n.id}>
                                            <TableCell>{n.id}</TableCell>
                                            <TableCell>{n.title}</TableCell>
                                            <TableCell numeric>
                                                {n.price}
                                            </TableCell>
                                            <TableCell numeric>
                                                {n.stock}
                                            </TableCell>
                                            <TableCell>
                                                <img
                                                    height="40"
                                                    src={n.poster}
                                                    alt={n.title}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                {privilege === 'admin' ||
                                                privilege === 'staff' ? (
                                                    <div>
                                                        <Button
                                                            onClick={() =>
                                                                this.openItemMenu(
                                                                    n
                                                                )
                                                            }
                                                        >
                                                            Edit
                                                        </Button>
                                                        {privilege !==
                                                            'staff' && (
                                                            <Button
                                                                onClick={() =>
                                                                    this.store.deleteMovie(
                                                                        n
                                                                    )
                                                                }
                                                                style={{
                                                                    color:
                                                                        '#f44336'
                                                                }}
                                                            >
                                                                Remove
                                                            </Button>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <Button
                                                        disabled={
                                                            this.store.user.cart
                                                                .balance <
                                                                n.price ||
                                                            n.stock < 0
                                                        }
                                                        raised
                                                        onClick={() =>
                                                            this.addToCart(n)
                                                        }
                                                    >
                                                        Add to cart
                                                    </Button>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </Paper>
                ) : (
                    <h1>There's nothing here</h1>
                )}
                <CartModal
                    open={this.ui.drawerOpen}
                    cart={this.store.user.cart}
                    onClose={() => (this.ui.drawerOpen = false)}
                />
                <ItemPopUp
                    open={this.ui.itemMenu}
                    item={this.ui.itemMenu}
                    addItem={newItem => this.store.addMovie(newItem)}
                    onClose={() => (this.ui.itemMenu = false)}
                    privilege={privilege}
                />
            </div>
        )
    }
}

export default App
