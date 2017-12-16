
import React, { Component } from "react";
import styled from 'styled-components';
import { observer } from 'mobx-react'
import { observable } from 'mobx'

import Dialog, { DialogTitle, DialogContent, DialogActions } from 'material-ui/Dialog';
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import {  UserStore } from './core'


@observer class Login extends React.Component {
    @observable username;
    @observable password;
    render() {
        return (<Dialog open >
             <DialogTitle>LOG IN</DialogTitle>
             <DialogContent >
                    <div style={{
                        width: "30rem"
                    }}>
                        <TextField fullWidth label="User name" value={this.username} onChange={e=> this.username = e.target.value}/>
                        <br/>
                        <TextField type="password" fullWidth label="Password" value={this.password} onChange={e=> this.password = e.target.value}/>
                    </div>
             </DialogContent>
             <DialogActions>
                    <Button onClick={() => {
                        const user = new UserStore(this.username, this.password)
                        console.log(user)
                       this.props.login(user)
                       window.localStorage.setItem("user", JSON.stringify(user))
                    }}>SIGN IN</Button>
             </DialogActions>
        </Dialog>)
    }
}

export default Login