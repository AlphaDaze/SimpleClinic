import React from 'react';
import PropTypes from 'prop-types';
import { Card, Container, Row, Col } from 'react-bootstrap';
import convertToDate from '../../helpers/convertToDate'

const PatientVisit = ({
    visit: {
        patientIssue,
        examination,
        diagnosis,
        vitals,
        followup,
        date
    }
}) => {
    const visitDate = convertToDate(date);
    const follow = convertToDate(followup);

    return (
        <Card>
            <Card.Body>
                <Card.Title className="card-description row-text-space">{visitDate}</Card.Title>
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
    visit: PropTypes.object.isRequired
};

export default PatientVisit;
