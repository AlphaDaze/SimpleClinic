import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import convertToDate from '../../helpers/convertToDate'
import { Container, Row, Col } from 'react-bootstrap';

const PatientItem = ({patient: { firstName, lastName, gender, birthdate, phoneNumber, address }}) => {
    const dob = convertToDate(birthdate);
    console.log("Gender: " + gender);
    return (
        <Row>
            <Col>{firstName} {lastName}</Col>
            <Col>{gender}</Col>
            <Col>{dob}</Col>
            <Col>{phoneNumber}</Col>
            <Col>{address.firstLine}</Col>
        </Row>
    )
}

PatientItem.propTypes = {
    patient: PropTypes.object.isRequired,
}

export default PatientItem
