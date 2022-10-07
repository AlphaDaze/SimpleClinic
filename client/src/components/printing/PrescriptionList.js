import {React, useState} from 'react';
import PropTypes from 'prop-types';
import { Card, Container, Row, Col} from 'react-bootstrap';
import convertToDate from '../../utils/convertToDate'


const PrescriptionList
= ({
    prescription: {
        drug,
        units,
        startDate,
        endDate,
    },
    index,
}) => {
    const start = convertToDate(startDate);
    const end = convertToDate(endDate);
        
    return (
        <Card className="elevationSmall" style={{ marginBottom: "0.5rem" }}>
            <Card.Body>
                <Card.Title >
                    <Row>
                        <Col className="card-description row-text-space" style={{paddingRight: "0px"}}>
                            Prescription {index+1}
                        </Col>
                    </Row>
                </Card.Title>
                <Container>
                    <Row className="row-text-space">
                        <Col className="font-weight-bold">Drug</Col>
                        <Col >{drug}</Col>
                    </Row>
                    <Row className="row-text-space">
                        <Col className="font-weight-bold">Unit</Col>
                        <Col >{units}</Col>
                    </Row>
                    <Row className="row-text-space">
                        <Col className="font-weight-bold">Start Date</Col>
                        <Col >{start}</Col>
                    </Row><Row className="row-text-space">
                        <Col className="font-weight-bold">End Date</Col>
                        <Col >{end}</Col>
                    </Row>
                </Container>
            </Card.Body>
        </Card>
    )
}

PrescriptionList.propTypes = {
    prescription: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired
};
  
  
export default (PrescriptionList)
