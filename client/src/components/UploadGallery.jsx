import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Form, Button, Alert } from "react-bootstrap";

const UploadGallery = ({ onSuccess, onClose }) => {
  const { token } = useContext(AuthContext);
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const formData = new FormData();
    formData.append('caption', caption);
    if (image) formData.append('image', image);
    try {
      await axios.post(`${API_BASE_URL}/api/gallery/upload`, formData, {
        withCredentials: true,
        headers: {
          // 'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess('Image uploaded successfully!');
      setCaption('');
      setImage(null);
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
        <Form.Label>Caption</Form.Label>
        <Form.Control
          type="text"
          name="caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="mb-4">
        <Form.Label>Upload Image</Form.Label>
        <Form.Control
          type="file"
          name="image"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
      </Form.Group>
      <div className="d-flex justify-content-end gap-2">
        <Button variant="secondary" onClick={onClose} type="button">Cancel</Button>
        <Button type="submit" variant="success">Upload Image</Button>
      </div>
    </Form>
  );
};

export default UploadGallery;
