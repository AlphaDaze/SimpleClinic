import React from "react";
import classNames from "classnames";
import { Container } from "react-bootstrap";
import NavBar from "./Navbar";
import { Route, Switch } from 'react-router-dom';


import Home from './Home';
import AddPatient from '../patient/AddPatient'

class Content extends React.Component {
    render() {
        return (
            <Container fluid className={classNames("content", { "is-open": this.props.isOpen })}>
                <NavBar toggle={this.props.toggle} />
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route
                        exact
                        path='/add-patient'
                        component={AddPatient}
                    />
                </Switch>
            </Container>
        );
    }
}

export default Content;
