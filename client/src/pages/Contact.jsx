import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import Header from "../components/Header";

export default function Contact() {
  return (
    <>
      <Header title="Contact Us" description="Get in touch with Mahalaxmi Vihar Society" />

      <Container fluid className="py-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <Card className="p-4 shadow-sm">
              <h5 className="mb-4">Send a Message</h5>
              <Form>
                <Form.Group controlId="name" className="mb-3">
                  <Form.Label>Your Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter your name" />
                </Form.Group>

                <Form.Group controlId="email" className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter your email" />
                </Form.Group>

                <Form.Group controlId="message" className="mb-3">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Type your message here"
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Card>
          </Col>

          <Col md={4} className="mt-5 mt-md-0">
            <Card className="p-4 shadow-sm h-100">
              <h5>Society Office</h5>
              <p>
                Mahalaxmi Vihar Housing Society,
                <br />
                Near XYZ Chowk, Kharadi, Pune - 411014
              </p>
              <p>Email: info@mahalaxmivihar.com</p>
              <p>Phone: +91-9876543210</p>
              <p>Office Hours: 10 AM - 6 PM (Mon–Sat)</p>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
