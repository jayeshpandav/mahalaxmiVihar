import { useEffect, useState, useContext } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
  Button,
  Modal,
} from "react-bootstrap";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import UploadNotice from "../components/UploadNotice";
import Header from "../components/Header";

export default function Notices() {
  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState(false);

  const fetchNotices = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/notices");
      setNotices(res.data);
    } catch (err) {
      setError("Failed to fetch notices.");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  return (
    <>
      <Header title="Notices & Announcements" description="Stay informed about important updates" />
      {user && user.role === "admin" && (
        <div className="text-center my-3">
          <Button variant="primary" onClick={() => setShowModal(true)}>
            Upload Notice
          </Button>
        </div>
      )}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Upload New Notice</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UploadNotice onSuccess={fetchNotices} onClose={() => setShowModal(false)} />
        </Modal.Body>
      </Modal>
      <Container className="py-5">
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        ) : error ? (
          <Alert variant="danger" className="text-center">
            {error}
          </Alert>
        ) : (
          <Row className="justify-content-center">
            {notices.map((notice, index) => {
              const isPdf = notice.fileUrl?.endsWith(".pdf");

              const previewText =
                notice.content.length > 100 && !expanded
                  ? `${notice.content.slice(0, 100)}...`
                  : notice.content;

              const toggleText = () => setExpanded((prev) => !prev);

              return (
                <Col key={index} md={6} className="mb-4 h-100">
                  <Card
                    className="shadow-sm h-100 d-flex flex-column"
                    style={{ minHeight: "450px" }}
                  >
                    <div
                      style={{
                        height: "250px",
                        overflow: "hidden",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#f9f9f9",
                      }}
                    >
                      {!isPdf && notice.fileUrl ? (
                        <img
                          src={notice.fileUrl}
                          alt={notice.title}
                          style={{
                            maxHeight: "100%",
                            width: "100%",
                            objectFit: "contain",
                            padding: "10px",
                          }}
                        />
                      ) : (
                        <img
                          src="/pdf-svgrepo-com.svg"
                          alt="PDF Preview"
                          style={{
                            width: "80px",
                            height: "80px",
                            opacity: 0.6,
                          }}
                        />
                      )}
                    </div>

                    <Card.Body className="d-flex flex-column">
                      <Card.Title>{notice.title}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        {notice.date}
                      </Card.Subtitle>
                      <Card.Text className="flex-grow-1">
                        {previewText}
                        {notice.content.length > 100 && (
                          <Button
                            variant="link"
                            size="sm"
                            className="ps-1"
                            onClick={toggleText}
                            style={{
                              textDecoration: "underline",
                              fontSize: "0.9rem",
                            }}
                          >
                            {expanded ? "Read less" : "Read more"}
                          </Button>
                        )}
                      </Card.Text>

                      {notice.fileUrl && (
                        <Button
                          variant="outline-primary"
                          href={notice.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          download={isPdf ? undefined : true}
                        >
                          {isPdf ? "View / Download PDF" : "Open Image"}
                        </Button>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        )}
      </Container>
    </>
  );
}
