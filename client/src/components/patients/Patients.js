import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PatientItem from './PatientItem'
import { getAllPatients } from '../../actions/patient'
import { Card, Col, Row} from 'react-bootstrap';
import { Helmet } from 'react-helmet'
const TITLE = "Find Patient"


const Patients = ({ getAllPatients, patient: { patients, loading} }) => {
    useEffect(() => {
        getAllPatients();
    }, [getAllPatients]);

    return (
        <Fragment>
            <Helmet>
                <title>{ TITLE }</title>
            </Helmet>
            <Card className="elevationSmall ">
                <Card.Body>
                    <Card.Title>Patients</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Select a patient</Card.Subtitle>
                    
                    <Card body className="elevationSmall titleCard" style={{ marginLeft: "12px", marginRigth: "12px" }}>
                        <Row>
                            <Col>Name</Col>
                            <Col>Gender</Col>
                            <Col>DOB</Col>
                            <Col>Phone No.</Col>
                            <Col>Address</Col>
                        </Row>
                    </Card>

                    <div className="paitents spacerAboveLarge">
                        {patients.length > 0 ? ((
                            patients.map(patient => (
                                <Link to={`/patients/${patient._id}`} key={patient._id}>
                                    <Card body className="btnPatient elevationSmall" style={{ margin: "12px" }}>
                                        <PatientItem  patient={patient} />
                                    </Card>
                                </Link>
                            )))
                        ) : <Card.Text>No patients found...</Card.Text>}
                    </div>
                </Card.Body>
            </Card>
        </Fragment>
    )
}

Patients.propTypes = {
    getAllPatients: PropTypes.func.isRequired,
    patient: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    patient: state.patient
})

export default connect(mapStateToProps, { getAllPatients })(Patients);
