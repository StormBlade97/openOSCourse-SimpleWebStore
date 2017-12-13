import React, { Component } from 'react'
import AppBar from './scenes/app-bar'
import MainFrame from './scenes/main-frame'
import { ThemeProvider } from 'styled-components'

class App extends Component {
    render() {
        return (
            <ThemeProvider
                theme={{
                    primary: 'rgb(253, 216, 53)'
                }}
            >
                <div className="App">
                    <AppBar />
                    <MainFrame />
                </div>
            </ThemeProvider>
        )
    }
}

export default App
