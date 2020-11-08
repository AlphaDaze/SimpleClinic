import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PatientItem from './PatientItem'
import { getAllPatients } from '../../actions/patient'
import { Card } from 'react-bootstrap';


const Patients = ({ getAllPatients, patient: { patients, loading} }) => {
    useEffect(() => {
        getAllPatients();
    }, [getAllPatients]);

    return (
        <Fragment>
            <Card className="elevationSmall ">
                <Card.Body>
                    <Card.Title>Patients</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Select a patient</Card.Subtitle>
                    <div className="paitents">
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
