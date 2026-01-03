import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Newbar from '../components/Navbar';

const AboutPage = () => {
  return (
    <div className="d-flex flex-column min-vh-100 bg-warning">
      <Newbar />
      <Container className="py-5 flex-grow-1">
        <Row className="justify-content-center">
          <Col lg={8}>
            <Card className="border-0 shadow-sm p-4">
              <Card.Body>
                <h1 className="fw-bold mb-4">About Wind Turbine Dashboard</h1>
                <p className="lead text-secondary">
                  Our system provides real-time analytics and performance monitoring for 
                  wind energy fleets across the globe.
                </p>
                <hr className="my-4" />
                <h3 className="h5 fw-bold">Mission</h3>
                <p>
                Our mission is to accelerate the global transition to sustainable energy by empowering wind farm operators and manufacturers with cutting-edge digital infrastructure. We strive to transform complex raw turbine data into actionable intelligence, allowing for precise performance optimization and proactive maintenance strategies through advanced real-time diagnostics. By providing a centralized, high-fidelity monitoring platform, we enable our partners to maximize energy yields, extend the operational lifespan of critical assets, and ensure the long-term reliability of the green power grid for a sustainable future.
                </p>
                <h3 className="h5 fw-bold mt-4">System Features</h3>
                <ul>
                  <li>Real-time Power Output Monitoring</li>
                  <li>Vibration and Temperature Diagnostics</li>
                  <li>Automated Maintenance Reporting</li>
                  <li>Fleet-wide Performance Trends</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AboutPage;