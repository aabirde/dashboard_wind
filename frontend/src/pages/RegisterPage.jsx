import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// Import React-Bootstrap components
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';

const PasswordValidator = ({ password }) => {
  const rules = [
    { regex: /.{8,}/ },
    { regex: /[A-Z]/ },
    { regex: /[a-z]/ },
    { regex: /\d/ },
    { regex: /[@$!%*?&]/ },
  ];

  const isAllMet = rules.every(rule => rule.regex.test(password));

  return (
    /* Using Bootstrap utility classes for borders, padding, and subtle backgrounds */
    <div className={`mt-3 p-3 rounded border ${isAllMet ? 'bg-success-subtle border-success' : 'bg-light border-secondary-subtle'}`}>
      <p className={`mb-0 small fw-bold text-uppercase tracking-wider ${isAllMet ? 'text-success' : 'text-muted'}`} style={{ fontSize: '10px' }}>
        {isAllMet ? '✓ Security Requirements Met' : 'Requires 8+ chars, Uppercase, Lowercase, Number & Special Character'}
      </p>
    </div>
  );
};

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3002/api/auth/register', {
        username,
        email,
        password,
        confirmPassword,
      });
      setSuccessMessage(response.data.message);
    } catch (err) {
      console.error('Registration failed:', err);
      let errorMsg = 'Registration failed. Please try again.';
      if (err.response) {
        const { data } = err.response;
        if (data?.errors?.[0]?.msg) {
          errorMsg = data.errors[0].msg;
        } else if (typeof data === 'string') {
          errorMsg = data;
        }
      } else if (err.request) {
        errorMsg = 'Cannot connect to the server. Please check your network connection.';
      }
      setError(errorMsg);
    }
  };

  return (
    /* Full page background yellow with Bootstrap alignment utilities */
    <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center bg-warning">
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={10} md={8} lg={12}>
          <Card className="bg-warning shadow border-0 p-4 w-100">
            <Card.Body>
              {successMessage ? (
                <div className="text-center py-4">
                  <h2 className="h4 fw-bold mb-3 text-dark">Registration Successful</h2>
                  <p className="mb-0 text-dark">{successMessage}</p>
                </div>
              ) : (
                <>
                  <h2 className="h3 fw-bold mb-4 text-center text-dark">Register</h2>
                  
                  {error && (
                    <Alert variant="danger" className="py-2 small">
                      {error}
                    </Alert>
                  )}

                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold text-dark small">Username</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="border-0 shadow-sm"
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold text-dark small">Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border-0 shadow-sm"
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold text-dark small">Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border-0 shadow-sm"
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label className="fw-bold text-dark small">Confirm Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="border-0 shadow-sm"
                        required
                      />
                      <PasswordValidator password={password} />
                    </Form.Group>

                    {/* Dark button for better contrast on a yellow background */}
                    <Button type="submit" variant="dark" className="w-100 py-3 fw-bold rounded-pill shadow-sm">
                      Register Account
                    </Button>
                  </Form>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;