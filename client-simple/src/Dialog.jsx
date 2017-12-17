import React, { Component } from "react";
import styled from 'styled-components';
import { observer } from 'mobx-react'
import Dialog, { DialogTitle, DialogContent, DialogActions } from 'material-ui/Dialog';
import Table, {
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from 'material-ui/Table'
import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'


@observer class CartDialog extends React.Component {
    render() {
        return (<Dialog open={ this.props.open && this.props.cart.itemsCount > 0 } onRequestClose={this.props.onClose}>
             <DialogTitle>Check out your cart</DialogTitle>
             <DialogContent>
                 <h4>Total cost: {this.props.cart.totalCost}</h4>
             </DialogContent>
             <DialogContent>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Title</TableCell>
                                    <TableCell numeric>Price</TableCell>
                                    <TableCell numeric>Quantity</TableCell>
                                    <TableCell>Poster</TableCell>
                                    <TableCell></TableCell>
                                    
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.cart.items.map(n => {
                                    return (
                                        <TableRow key={n.id}>
                                            <TableCell>{n.title}</TableCell>
                                            <TableCell numeric>{n.price}</TableCell>
                                            <TableCell numeric>{n.quantity}</TableCell>
                                            <TableCell>
                                                <img
                                                    height="40"
                                                    src={n.poster}
                                                    alt={n.title}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Button raised style={{ backgroundColor: "#f44336"}} onClick={() => this.props.cart.remove(n)}>Remove</Button>
                                            </TableCell>
                                            
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
             </DialogContent>
             <DialogActions>
                    <Button onClick={() => {
                        this.props.cart.checkout();
                        this.props.onClose();
                    }}>Check out</Button>
                    <Button onClick={this.props.onClose}>Cancel</Button>
             </DialogActions>
        </Dialog>)
    }
}

export default CartDialog