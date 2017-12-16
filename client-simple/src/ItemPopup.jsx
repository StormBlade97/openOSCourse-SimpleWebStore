
import React, { Component } from "react";
import styled from 'styled-components';
import { observer } from 'mobx-react'
import { observable } from 'mobx'

import Dialog, { DialogTitle, DialogContent, DialogActions } from 'material-ui/Dialog';
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'


const Layout = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    img {
        background-color: #ebebeb
    }
`
const Verticalize = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 3rem;
`

@observer class ItemPopUp extends React.Component {
    @observable title
    @observable price
    @observable stock
    @observable poster
        
    render() {
        return (<Dialog open={this.props.open} >
             <DialogTitle>Change item</DialogTitle>
             <DialogContent >
                <Layout>
                    <Verticalize>
                        <TextField disabled={this.props.privilege === 'staff'} label="Title" defaultValue={this.props.item.title} value={this.title} onChange={e => this.title = e.target.value}/>
                        <TextField disabled={this.props.privilege === 'staff'} label="Price" defaultValue={this.props.item.price} value={this.price} onChange={e => this.price = e.target.value}/>
                        <TextField label="Stock" defaultValue={this.props.item.stock} value={this.stock} onChange={e => this.stock = e.target.value < 0 ? 0 : e.target.value}/>
                        <TextField disabled={this.props.privilege === 'staff'} label="Poster" defaultValue={this.props.item.poster} value={this.poster} onChange={e => this.poster = e.target.value}/>
                    </Verticalize>
                    <img width={200} src={this.poster|| this.props.item.poster} alt=""/>
                </Layout>
             </DialogContent>
             <DialogActions>
                    <Button onClick={() => {
                        this.props.addItem({
                            title: this.title,
                            price: this.price,
                            stock: this.stock,
                            poster: this.poster,
                            id: this.props.item.id
                        });
                        this.props.onClose();
                    }}>OK</Button>
                    <Button onClick={this.props.onClose}>Cancel</Button>
             </DialogActions>
        </Dialog>)
    }
}

export default ItemPopUp