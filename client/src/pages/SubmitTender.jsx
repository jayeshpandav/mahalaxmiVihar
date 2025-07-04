import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Form, Button, Alert, Spinner, Container } from 'react-bootstrap';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const SubmitTender = () => {
  const { token, user } = useContext(AuthContext);
  const { tenderId } = useParams();
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (!user || user.role !== 'user') {
    return <Alert variant="danger" className="mt-4 text-center">Access denied</Alert>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    if (!file) {
      setError('Please select a file to upload.');
      setLoading(false);
      return;
    }
    const formData = new FormData();
    formData.append('tenderId', tenderId);
    formData.append('file', file);
    try {
      await axios.post(`${API_BASE_URL}/api/tender-submissions`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess('Tender submitted successfully!');
      setTimeout(() => navigate('/tenders'), 1200);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to submit tender');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <Card className="shadow-sm mx-auto" style={{ maxWidth: 500 }}>
        <Card.Body>
          <h2 className="mb-4 text-center">Submit Tender</h2>
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            {success && <Alert variant="success">{success}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group className="mb-4">
              <Form.Label>Upload File (PDF/Image)</Form.Label>
              <Form.Control
                type="file"
                onChange={e => setFile(e.target.files[0])}
                required
                accept="application/pdf,image/*"
              />
            </Form.Group>
            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={() => navigate('/tenders')} type="button">
                Cancel
              </Button>
              <Button type="submit" variant="primary" disabled={loading}>
                {loading ? <Spinner size="sm" animation="border" /> : 'Submit'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SubmitTender; 