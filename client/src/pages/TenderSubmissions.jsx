import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useParams } from 'react-router-dom';
import { Card, Table, Alert, Spinner, Container } from 'react-bootstrap';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const TenderSubmissions = () => {
  const { token, user } = useContext(AuthContext);
  const { tenderId } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user || user.role !== 'admin') return;
    const fetchSubmissions = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/tender-submissions/${tenderId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSubmissions(res.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to fetch submissions');
      } finally {
        setLoading(false);
      }
    };
    fetchSubmissions();
  }, [tenderId, token, user]);

  if (!user || user.role !== 'admin') {
    return <Alert variant="danger" className="mt-4 text-center">Access denied</Alert>;
  }

  return (
    <Container className="py-5">
      <Card className="shadow-sm mx-auto" style={{ maxWidth: 900 }}>
        <Card.Body>
          <h2 className="mb-4 text-center">Tender Submissions</h2>
          {loading ? (
            <div className="text-center"><Spinner animation="border" /></div>
          ) : error ? (
            <Alert variant="danger" className="text-center">{error}</Alert>
          ) : submissions.length === 0 ? (
            <Alert variant="info" className="text-center">No submissions yet for this tender.</Alert>
          ) : (
            <Table striped bordered hover responsive>
              <thead className="table-dark">
                <tr>
                  <th>User</th>
                  <th>File</th>
                  <th>Submitted At</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map(sub => (
                  <tr key={sub._id}>
                    <td>{sub.user?.username || 'Unknown'}</td>
                    <td><a href={sub.fileUrl} target="_blank" rel="noopener noreferrer">Download</a></td>
                    <td>{new Date(sub.submittedAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default TenderSubmissions; 