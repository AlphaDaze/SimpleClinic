import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import convertToDate from '../../helpers/convertToDate'
import { deleteVisit } from '../../actions/visit';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMinus
} from "@fortawesome/free-solid-svg-icons";

const PatientVisit = ({
    visit: {
        _id,
        patientID,
        patientIssue,
        examination,
        diagnosis,
        vitals,
        followup,
        date
    },
    deleteVisit
}) => {
    const visitDate = convertToDate(date);
    const follow = convertToDate(followup);

    return (
        <Card>
            <Card.Body>
                <Card.Title >
                    <Row>
                        <Col className="card-description row-text-space">
                            {visitDate}
                        </Col>
                        <Col>
                            <Button className="btnHeader btnRemove" onClick={() => deleteVisit(_id, patientID)}>
                                <FontAwesomeIcon icon={faMinus}  style={{paddingBottom: "0.1rem"}} size="xs" />
                            </Button>
                        </Col>
                    </Row>
                </Card.Title>
                <Container>
                    <Row className="row-text-space">
                        <Col className="font-weight-bold">Patient's Complaint</Col>
                        <Col sm={8} >{patientIssue}</Col>
                    </Row>
                    <Row className="row-text-space">
                        <Col className="font-weight-bold">Examination</Col>
                        <Col sm={8}>{examination}</Col>
                    </Row>
                    <Row className="row-text-space">
                        <Col className="font-weight-bold">Diagnosis</Col>
                        <Col sm={8}>{diagnosis}</Col>
                    </Row>

                    <Row className="row-text-space">
                        <Col className="font-weight-bold">White Blood Cell</Col>
                        <Col sm={8}>{vitals.whiteBlood}</Col>
                    </Row>
                    <Row className="row-text-space">
                        <Col className="font-weight-bold">Haemoglobin</Col>
                        <Col sm={8}>{vitals.haemoglobin}</Col>
                    </Row>
                    <Row className="row-text-space">
                        <Col className="font-weight-bold">Creatinine</Col>
                        <Col sm={8}>{vitals.creatinine}</Col>
                    </Row>
                    <Row className="row-text-space">
                        <Col className="font-weight-bold">Urea</Col>
                        <Col sm={8}>{vitals.urea}</Col>
                    </Row>

                    <Row className="row-text-space">
                        <Col className="font-weight-bold">Followup Date</Col>
                        <Col sm={8}>{follow}</Col>
                    </Row>

                </Container>
            </Card.Body>
        </Card>
    )
}

PatientVisit.propTypes = {
    visit: PropTypes.object.isRequired,
    deleteVisit: PropTypes.func.isRequired,
};
  
  
export default connect(null, { deleteVisit })(PatientVisit)
