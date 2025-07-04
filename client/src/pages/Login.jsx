import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Card, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Login = () => {
  const { login, user, loading } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(username, password);
      window.location.href = '/';
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="d-flex justify-content-center align-items-center vh-100"><Spinner animation="border" /></div>;
  if (user) return <div className="d-flex justify-content-center align-items-center vh-100"><Alert variant="info">You are already logged in.</Alert></div>;

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Card style={{ minWidth: 350 }} className="shadow">
        <Card.Body>
          <h2 className="mb-4 text-center">Login</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="loginUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="loginPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            {error && <Alert variant="danger">{error}</Alert>}
            <Button variant="primary" type="submit" className="w-100" disabled={submitting}>
              {submitting ? <Spinner size="sm" animation="border" /> : 'Login'}
            </Button>
          </Form>
          <div className="mt-3 text-center">
            <span>Don't have an account? </span>
            <Link to="/register">Register</Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login; 