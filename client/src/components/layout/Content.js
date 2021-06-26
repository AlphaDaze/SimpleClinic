import React from "react";
import classNames from "classnames";
import { Container } from "react-bootstrap";
import NavBar from "./Navbar";
import { Route, Switch } from 'react-router-dom';

import PrivateRoute from '../routes/PrivateRoute';

import Home from './Home';
import Login from '../auth/Login';
import NewPatient from '../patient-forms/NewPatient'
import EditPatient from '../patient-forms/EditPatient'
import Patients from '../patients/Patients'
import Patient from '../patient/Patient'

import NewPrescription from '../patient-forms/NewPrescription'
import EditPrescription from '../patient-forms/EditPrescription'
import NewVisit from '../patient-forms/NewVisit'

import Alert from '../layout/Alert';

class Content extends React.Component {
    render() {
        return (
            <Container fluid className={classNames("content", { "is-open": this.props.isOpen })}>
                <NavBar toggle={this.props.toggle} />
                <Alert />
                <Switch>
                    <Route exact path='/login' component={Login} />
                    <PrivateRoute exact path='/' component={Home} />
                    <PrivateRoute
                        exact
                        path='/add-patient'
                        component={NewPatient}
                    />
                    <PrivateRoute
                        exact
                        path='/edit-patient/:id'
                        component={EditPatient}
                    />
                    <PrivateRoute
                        exact
                        path='/patients'
                        component={Patients}
                    />
                    <PrivateRoute
                        exact
                        path='/patients/:id'
                        component={Patient}
                    />
                    <PrivateRoute
                        exact
                        path='/patients/:id/add-prescription'
                        component={NewPrescription}
                    />
                    <PrivateRoute
                        exact
                        path='/edit-prescription/:id/'
                        component={EditPrescription}
                    />
                    <PrivateRoute
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
