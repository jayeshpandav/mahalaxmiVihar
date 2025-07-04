import { Container, Row, Col, Card } from "react-bootstrap";
import Header from "../components/Header";

export default function About() {
  return (
    <>
    <Header title="About Mahalaxmi Vihar" description="Built on community values, comfort, and security" />

      <Container fluid className="py-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <p>
              Mahalaxmi Vihar is a well-established residential society located
              in Pune. Our community hosts over 200 families and is known for
              its green surroundings, cooperative residents, and proactive
              management committee.
            </p>
            <p>
              Our vision is to foster a secure, eco-conscious, and inclusive
              environment that ensures a high quality of life for all residents.
              With amenities like a children's play area, regular cleaning
              services, and event spaces, we aim to blend convenience with
              comfort.
            </p>
          </Col>
        </Row>

        <Row className="mt-5 text-center">
          <Col md={4} sm={6} className="mb-4">
            <Card className="shadow-sm p-3">
              <Card.Body>
                🏘️<Card.Text>200+ Residences</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} sm={6} className="mb-4">
            <Card className="shadow-sm p-3">
              <Card.Body>
                🌿<Card.Text>Green & Peaceful Environment</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} sm={6} className="mb-4">
            <Card className="shadow-sm p-3">
              <Card.Body>
                🤝<Card.Text>Active Resident Committee</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
