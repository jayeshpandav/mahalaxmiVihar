import { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Card, Spinner, Alert, Modal, Button } from "react-bootstrap";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import UploadGallery from "../components/UploadGallery";
import Header from "../components/Header";

export default function Gallery() {
  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const fetchGallery = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/gallery`);
      setImages(res.data);
    } catch (err) {
      setError("Failed to load gallery.");
      console.error("Gallery fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  return (
    <>
      <Header title="Society Gallery" description="Memories and Moments from Mahalaxmi Vihar" />
      {user && user.role === "admin" && (
        <div className="text-center my-3">
          <Button variant="success" onClick={() => setShowModal(true)}>
            Upload Gallery Image
          </Button>
        </div>
      )}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Upload Gallery Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UploadGallery onSuccess={fetchGallery} onClose={() => setShowModal(false)} />
        </Modal.Body>
      </Modal>
      <Container fluid className="py-5">
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        ) : error ? (
          <Alert variant="danger" className="text-center">
            {error}
          </Alert>
        ) : (
          <Row>
            {images.map((img, index) => (
              <Col key={index} xs={12} sm={6} md={4} className="mb-4">
                <Card
                  className="shadow-sm h-100 d-flex flex-column justify-content-between"
                  style={{ minHeight: "350px" }}
                >
                  <div
                    style={{
                      height: "220px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#f8f9fa",
                      overflow: "hidden",
                    }}
                  >
                    <Card.Img
                      variant="top"
                      src={img.fileUrl}
                      alt={img.caption}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </div>

                  <Card.Body className="text-center">
                    <Card.Text className="mt-auto">{img.caption}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
}
