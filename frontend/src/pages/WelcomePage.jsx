import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/api';
// Import Bootstrap components
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';

const WelcomePage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = await login({ email, password });
      if (data.token) {
        if (data.role === 'client') {
          navigate('/dashboard');
        } else if (data.role === 'manufacturer') {
          navigate('/manufacturer-dashboard');
        }
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('Invalid email or password.');
    }
  };

  return (
    /* Main container centers content vertically and horizontally */
    <Container fluid className="min-vh-100 d-flex flex-column align-items-center justify-content-center bg-info px-3">
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{ maxWidth: '1000px' }}>
          
          {/* Branding Section */}
          <div className="text-center mb-5">
            <h1 className="display-5 fw-bold text-dark mb-3">
              Wind Turbine Dashboard
            </h1>
            <p className="text-muted lead">
              Your one-stop solution for monitoring and managing wind turbines with real-time analytics.
            </p>
          </div>

          {/* Login Card Section */}
          <Card className="shadow-lg border-0 rounded-4 overflow-hidden bg-black">
            <Card.Body className="p-4 p-md-5">
              <h2 className="h4 fw-bold text-center text-white mb-4">Login</h2>

              {error && (
                <Alert variant="danger" className="text-center py-2 small">
                  {error}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold text-secondary">Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="py-2"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="small fw-bold text-secondary">Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="py-2"
                    required
                  />
                </Form.Group>

                <Button 
                  variant="primary" 
                  type="submit" 
                  className="w-100 py-2 fw-bold shadow-sm mb-3"
                >
                  Sign In
                </Button>

                {/* Divider */}
                <div className="d-flex align-items-center my-4">
                  <hr className="flex-grow-1 text-muted" />
                  <span className="mx-3 text-muted small">New here?</span>
                  <hr className="flex-grow-1 text-muted" />
                </div>

                {/* Registration Link Styled as a Button */}
                <Link to="/register" className="text-decoration-none">
                  <Button variant="outline-success" className="w-100 py-2 fw-bold">
                    Create Account
                  </Button>
                </Link>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default WelcomePage;