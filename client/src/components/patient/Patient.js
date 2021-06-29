import React, { Fragment, useEffect, useRef, useState} from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPatientById } from '../../actions/patient';
import { Card, Container, Row, Col, Button, Modal } from 'react-bootstrap';
import { deletePatient } from '../../actions/patient';
import PatientInfo from './PatientInfo'
import PatientPrescription from './PatientPrescription'
import PatientVisit from './PatientVisit'
import ComponentToPrint from '../printing/ComponentToPrint'
import ReactToPrint from "react-to-print";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlus,
    faPencilAlt,
    faPrint,
} from "@fortawesome/free-solid-svg-icons";

import { Helmet } from 'react-helmet'

const Patient = ({ getPatientById, deletePatient, patient: {patient, loading}, match, history }) => {
    useEffect(() => {
        getPatientById(match.params.id);
    }, [getPatientById, match.params.id]);
    
    const componentRef = useRef();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    if (!loading && !patient.prescriptions) {
        return (
            <Fragment>
                <Card body>404... Patient Not Found</Card>
            </Fragment>
        );
    }
    

    const addPrescriptionLink = "/patients/" + match.params.id + "/add-prescription";
    const addVisitLink = "/patients/" + match.params.id + "/add-visit";
    const editPatientLink = "/edit-patient/" + match.params.id;

    // Delete Dialogue
    

    return (
        <Fragment>
            
            {loading ? <Card body>Loading...</Card> : 
                <Fragment>
                    <Helmet>
                            <title>{ "Patient " + patient.patient.firstName + " " + patient.patient.lastName }</title>
                    </Helmet>
                    <Container>
                        <Row>
                            <Col sm={6}>
                                <Card  className="elevationSmall"  style={{ marginBottom: "2rem" }}>
                                    <Card.Header className="cardHeader">
                                        <Row>
                                            <Col>
                                                Personal Info
                                                    <Link className="btnLink "  to={editPatientLink}>
                                                        <Button className="btn btnHeaderLeft" style={{marginLeft: "0.5rem"}}>
                                                            <FontAwesomeIcon icon={faPencilAlt} size="xs" />
                                                        </Button>
                                                    </Link>
                                            </Col>
                                            <Col>
                                                <ReactToPrint
                                                    trigger={() => <Button className="btn btnHeaderRight">
                                                                        <FontAwesomeIcon icon={faPrint} size="xs" style={{paddingBottom: "0.1rem"}} />
                                                                    </Button>}
                                                    content={() => componentRef.current}
                                                />
                                            </Col>
                                        </Row>
                                    </Card.Header>
                                    <Card.Body>
                                        <PatientInfo patient={patient.patient} />
                                    </Card.Body>
                                </Card>
                            </Col>

                            <Col sm={6}>
                                <Card className="elevationSmall">
                                    <Card.Header className="cardHeader">
                                        <Row>
                                            <Col>
                                                Prescription
                                            </Col>
                                            <Col>
                                                <Link className="btnLink"  to={addPrescriptionLink}>
                                                    <Button className="btn btnHeaderRight" >
                                                        <FontAwesomeIcon icon={faPlus} size="xs" style={{paddingBottom: "0.1rem"}} />
                                                    </Button>
                                                </Link> 
                                            </Col>
                                        </Row>
                                    </Card.Header>
                                    <Card.Body>
                                        {patient.prescriptions.length > 0 ? ((
                                        patient.prescriptions.map((prescription, index) => (
                                            <PatientPrescription prescription={prescription} index={index} key={prescription._id}/>
                                        )))
                                        ) : <Card.Text>No prescriptions added, Add one here!‏‏‎</Card.Text>}
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <Row className="row-space">
                            <Col>
                                <Card className="elevationSmall">
                                    <Card.Header className="cardHeader">
                                        <Row>
                                            <Col>
                                                Visit
                                            </Col>
                                            <Col>
                                                <Link className="btnLink"  to={addVisitLink}>
                                                    <Button className="btn btnHeaderRight" >
                                                        <FontAwesomeIcon icon={faPlus} size="xs" style={{paddingBottom: "0.1rem"}} />
                                                    </Button>
                                                </Link> 
                                            </Col>
                                        </Row>
                                    </Card.Header>
                                    <Card.Body>
                                        {patient.visits.length > 0 ? ((
                                        patient.visits.slice(0).reverse().map((visit, index) => (
                                            <PatientVisit visit={visit} index={index} key={visit._id}/>
                                        )))
                                        ) : <Card.Text>No visits added, Add one here!</Card.Text>}
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>

                        <Button className="btnRemove btnDeletePatient"  onClick={handleShow}>
                            Delete Patient
                        </Button>
                        <Modal show={show} onHide={handleClose} animation={false}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Delete Prescription</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>Are you sure you want to delete the prescription!</Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        No
                                    </Button>
                                    <Button className="btnRemove" variant="primary" onClick={() => { deletePatient(patient.patient._id, history); handleClose();  }}>
                                        Yes
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                    </Container>
                    <div style={{ display: "none" }}><ComponentToPrint patient={patient.patient} 
                        visits={patient.visits} prescriptions={patient.prescriptions} ref={componentRef} /></div>
                    
                </Fragment> }
        </Fragment>
    )
}

Patient.propTypes = {
    getPatientById: PropTypes.func.isRequired,
    patient: PropTypes.object.isRequired,
    deletePatient: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    patient: state.patient,
})

export default connect(mapStateToProps, { getPatientById, deletePatient })(Patient)
