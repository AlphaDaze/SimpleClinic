import React, { Fragment } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <Fragment>
            <Container>
                <Row>
                    <Col>
                        <Link className="btnLink " to="/add-patient">
                            <Card body className="btn">
                                Add Patient
                            </Card>
                        </Link>
                    </Col>
                    <Col>
                        <Link className="btnLink " to="/patients">
                            <Card body className="btn">
                                Find Patient
                            </Card>
                        </Link>
                    </Col>
                </Row>
            </Container>
            
        </Fragment>
    );
}

export default Home;
