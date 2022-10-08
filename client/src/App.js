import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/App.css";
import SideBar from "./components/layout/SideBar";
import Content from "./components/layout/Content";
import { BrowserRouter as Router } from 'react-router-dom';

import {ViewportProvider }from './utils/useViewport'

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import { LOGOUT } from './actions/constants'

import { Helmet } from 'react-helmet'
const TITLE = "Alam's Clinic"

class App extends React.Component {
    constructor(props) {
        super(props);

        // Moblie first
        this.state = {
            isOpen: false,
            isMobile: true
        };

        this.previousWidth = -1;
    }

    updateWidth() {
        const width = window.innerWidth;
        const widthLimit = 576;
        const isMobile = width <= widthLimit;
        const wasMobile = this.previousWidth <= widthLimit;

        if (isMobile !== wasMobile) {
            this.setState({
                isOpen: !isMobile
            });
        }

        this.previousWidth = width;
    }

    /**
     * Add event listener
     */
    componentDidMount() {
        this.updateWidth();
        window.addEventListener("resize", this.updateWidth.bind(this));

        // check for token in LS
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }
        store.dispatch(loadUser());
        
        // log out if logged out in another tab
        window.addEventListener('storage', () => {
            if (!localStorage.token) store.dispatch({ type: LOGOUT });
          });
    }

    /**
     * Remove event listener
     */
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWidth.bind(this));
    }

    toggle = () => {
        this.setState({ isOpen: !this.state.isOpen });
    };

    toggleLink = () => {
        const width = window.innerWidth;
        const widthLimit = 576;
        const isMobile = width <= widthLimit;

        if (isMobile) {
            this.setState({ isOpen: !this.state.isOpen });
        }
    };

    render() {
        return (
            <Provider store={store}>
                <ViewportProvider>
                    <Helmet>
                        <title>{ TITLE }</title>
                    </Helmet>
                    <Router>
                        <div className="App wrapper">
                            <SideBar toggle={this.toggle} toggleLink={this.toggleLink} isOpen={this.state.isOpen} />
                            <Content toggle={this.toggle} isOpen={this.state.isOpen} />
                        </div>
                    </Router>
                </ViewportProvider>
            </Provider>
        );
    }
}

export default App;
