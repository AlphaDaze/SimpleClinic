import React from 'react';
import PropTypes from 'prop-types';
import { Card, Container, Row, Col } from 'react-bootstrap';
import convertToDate from '../../helpers/convertToDate'

const PatientInfo = ({
    patient: {
        firstName,
        lastName,
        phoneNumber,
        cnic,
        gender,
        birthdate,
        address
    }
}) => {
    const dob = convertToDate(birthdate);
    return (
        <Card>
            <Card.Header>Personal Info</Card.Header>
            <Card.Body>
                <Container>
                    <Row className="row-text-space">
                        <Col className="font-weight-bold">First & Middle Name</Col>
                        <Col>{firstName}</Col>
                    </Row>
                    <Row className="row-text-space">
                        <Col className="font-weight-bold">Last Name</Col>
                        <Col>{lastName}</Col>
                    </Row>
                    <Row className="row-text-space">
                        <Col className="font-weight-bold">Phone Number</Col>
                        <Col>{phoneNumber}</Col>
                    </Row>
                    <Row className="row-text-space">
                        <Col className="font-weight-bold">Gender</Col>
                        <Col>{gender}</Col>
                    </Row>
                    <Row className="row-text-space">
                        <Col className="font-weight-bold">DOB</Col>
                        <Col>{dob}</Col>
                    </Row>
                    <Row className="row-text-space">
                        <Col className="font-weight-bold">CNIC</Col>
                        <Col>{cnic}</Col>
                    </Row>
                    <Card.Subtitle className="subtitle card-description">Address</Card.Subtitle>
                    <Row className="row-text-space">
                        <Col className="font-weight-bold">First Line</Col>
                        <Col>{address.firstLine}</Col>
                    </Row>
                    <Row className="row-text-space">
                        <Col className="font-weight-bold">Second Line</Col>
                        <Col>{address.secondLine}</Col>
                    </Row>
                    <Row className="row-text-space">
                        <Col className="font-weight-bold">Third Line</Col>
                        <Col>{address.thirdLine}</Col>
                    </Row>
                    <Row className="row-text-space">
                        <Col className="font-weight-bold">City</Col>
                        <Col>{address.city}</Col>
                    </Row>
                    <Row className="row-text-space">
                        <Col className="font-weight-bold">Province</Col>
                        <Col>{address.province}</Col>
                    </Row>
                </Container>
            </Card.Body>
        </Card>
    )
}

PatientInfo.propTypes = {
    patient: PropTypes.object.isRequired
};

export default PatientInfo;
