import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Form, Button, Alert } from "react-bootstrap";

const UploadNotice = ({ onSuccess, onClose }) => {
  const { token } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const formData = new FormData();
    formData.append('title', title);
    formData.append('date', date);
    formData.append('content', content);
    if (file) formData.append('file', file);
    try {
      await axios.post(`${API_BASE_URL}/api/notices/upload`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess('Notice uploaded successfully!');
      setTitle('');
      setDate('');
      setContent('');
      setFile(null);
      if (onSuccess) onSuccess();
      if (onClose) onClose();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Upload failed');
    }
  };

  return (
    <Form onSubmit={handleSubmit} encType="multipart/form-data">
      {success && <Alert variant="success">{success}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <Form.Group className="mb-3">
        <Form.Label>Notice Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Date</Form.Label>
        <Form.Control
          type="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Notice Content</Form.Label>
        <Form.Control
          as="textarea"
          name="content"
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="mb-4">
        <Form.Label>Upload File (image/pdf)</Form.Label>
        <Form.Control
          type="file"
          name="file"
          accept="image/*,.pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </Form.Group>
      <div className="d-flex justify-content-end gap-2">
        <Button variant="secondary" onClick={onClose} type="button">Cancel</Button>
        <Button type="submit" variant="primary">Upload Notice</Button>
      </div>
    </Form>
  );
};

export default UploadNotice;
