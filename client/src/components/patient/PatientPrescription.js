import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import convertToDate from '../../utils/convertToDate'
import { deletePrescription } from '../../actions/prescription';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMinus,
    faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";

const PatientPrescription = ({
    prescription: {
        _id,
        patientID,
        drug,
        units,
        directions,
        notes,
        startDate,
        endDate,
    },
    index,
    deletePrescription
}) => {
    const start = convertToDate(startDate);
    const end = convertToDate(endDate);

    const editPrescriptionLink = "/edit-prescription/" + _id;
    
    return (
        <Card className="elevationSmall" style={{ marginBottom: "0.5rem" }}>
            <Card.Body>
                <Card.Title >
                    <Row>
                        <Col className="card-description row-text-space" style={{paddingRight: "0px"}}>
                            Prescription {index+1}
                        </Col>
                        <Col style={{marginRight: "5rem", paddingLeft: "0px"}}>
                            <Link to={editPrescriptionLink}>
                                    <Button className="btn btnTextRight" style={{marginLeft: "0.5rem"}}>
                                        <FontAwesomeIcon icon={faPencilAlt} size="xs" style={{paddingBottom: "0.1rem"}} />
                                    </Button>
                            </Link>
                        </Col>
                        <Col>
                            <Button className="btnHeaderRight btnRemove" onClick={() => deletePrescription(_id, patientID)}>
                                <FontAwesomeIcon icon={faMinus}  style={{paddingBottom: "0.1rem"}} size="xs" />
                            </Button>
                        </Col>
                    </Row>
                </Card.Title>
                <Container>
                    <Row className="row-text-space">
                        <Col className="font-weight-bold">Drug</Col>
                        <Col sm={8}>{drug}</Col>
                    </Row>
                    <Row className="row-text-space">
                        <Col className="font-weight-bold">Units</Col>
                        <Col sm={8}>{units}</Col>
                    </Row>
                    <Row className="row-text-space">
                        <Col className="font-weight-bold">Directions</Col>
                        <Col sm={8}>{directions}</Col>
                    </Row>
                    <Row className="row-text-space">
                        <Col className="font-weight-bold">Notes</Col>
                        <Col sm={8}>{notes}</Col>
                    </Row>
                    <Row className="row-text-space">
                        <Col className="font-weight-bold">Start Date</Col>
                        <Col sm={8}>{start}</Col>
                    </Row>
                    <Row className="row-text-space">
                        <Col className="font-weight-bold">End Date</Col>
                        <Col sm={8}>{end}</Col>
                    </Row>
                </Container>
            </Card.Body>
        </Card>
    )
}

PatientPrescription.propTypes = {
    prescription: PropTypes.object.isRequired,
    deletePrescription: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired
};
  
  
export default connect(null, { deletePrescription })(PatientPrescription)
