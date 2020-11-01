import React, { Fragment, useEffect } from 'react';
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
            <Card>
                <Card.Body>
                    <Card.Title>Patients</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Select a patient</Card.Subtitle>
                    <div className="paitents">
                        {patients.length > 0 ? ((
                            patients.map(patient => (
                                <Card body style={{ margin: "12px" }} key={patient._id}>
                                    <PatientItem  patient={patient} />
                                </Card>
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
