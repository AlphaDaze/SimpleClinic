import React from "react";
import classNames from "classnames";
import { Container } from "react-bootstrap";
import NavBar from "./Navbar";
import { Route, Switch } from 'react-router-dom';


import Home from './Home';
import NewPatient from '../patient-forms/NewPatient'
import Patients from '../patients/Patients'
import Patient from '../patient/Patient'

import NewPrescription from '../patient-forms/NewPrescription'
import NewVisit from '../patient-forms/NewVisit'

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
                        component={NewPatient}
                    />
                    <Route
                        exact
                        path='/patients'
                        component={Patients}
                    />
                    <Route
                        exact
                        path='/patients/:id'
                        component={Patient}
                    />
                    <Route
                        exact
                        path='/patients/:id/add-prescription'
                        component={NewPrescription}
                    />
                    <Route
                        exact
                        path='/patients/:id/add-visit'
                        component={NewVisit}
                    />
                </Switch>
            </Container>
        );
    }
}

export default Content;
