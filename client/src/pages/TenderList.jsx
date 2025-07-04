import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button, Modal, Table, Container, Alert } from 'react-bootstrap';
import UploadTender from '../components/UploadTender';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const TenderList = () => {
  const { user, token } = useContext(AuthContext);
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [deletingId, setDeletingId] = useState(null);

  const fetchTenders = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/tenders`);
      setTenders(res.data);
    } catch (err) {
      setError('Failed to fetch tenders.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTenders();
  }, []);

  const now = new Date();

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this tender?')) return;
    setDeletingId(id);
    try {
      await axios.delete(`${API_BASE_URL}/api/tenders/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchTenders();
    } catch (err) {
      alert('Failed to delete tender.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <Container className="py-5">
      <h2 className="mb-4 text-center">Tenders</h2>
      {user && user.role === 'admin' && (
        <div className="text-center mb-4">
          <Button variant="primary" onClick={() => setShowModal(true)}>
            Create New Tender
          </Button>
        </div>
      )}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create New Tender</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UploadTender onSuccess={fetchTenders} onClose={() => setShowModal(false)} />
        </Modal.Body>
      </Modal>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <Alert variant="danger" className="text-center">{error}</Alert>
      ) : (
        <Table striped bordered hover responsive className="mt-3">
          <thead className="table-dark">
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>File</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tenders.map(tender => {
              const isOpen = now >= new Date(tender.startDate) && now <= new Date(tender.endDate);
              return (
                <tr key={tender._id}>
                  <td>{tender.title}</td>
                  <td>{tender.description}</td>
                  <td>{new Date(tender.startDate).toLocaleString()}</td>
                  <td>{new Date(tender.endDate).toLocaleString()}</td>
                  <td>
                    {tender.fileUrl && (
                      <Button
                        as="a"
                        href={tender.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        size="sm"
                        variant="secondary"
                      >
                        View File
                      </Button>
                    )}
                  </td>
                  <td className="d-flex flex-column gap-2">
                    {user && user.role === 'user' && isOpen && (
                      <Button size="sm" variant="success" onClick={() => navigate(`/submitTender/${tender._id}`)}>
                        Submit
                      </Button>
                    )}
                    {user && user.role === 'admin' && (
                      <>
                        <Button size="sm" variant="info" onClick={() => navigate(`/tenderSubmissions/${tender._id}`)}>
                          View Submissions
                        </Button>
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => handleDelete(tender._id)}
                          disabled={deletingId === tender._id}
                        >
                          {deletingId === tender._id ? 'Deleting...' : 'Delete'}
                        </Button>
                      </>
                    )}
                    {!isOpen && <span className="text-danger">Closed</span>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default TenderList; 