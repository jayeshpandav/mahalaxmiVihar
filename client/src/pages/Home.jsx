import { Container, Row, Col, Card, Carousel } from "react-bootstrap";
import society1 from "../assets/society1.jpg";
import society2 from "../assets/society2.jpg";
import society3 from "../assets/society3.jpg";
import Header from "../components/Header";
export default function Home() {
  return (
    <>
      <Header title="Welcome to Mahalaxmi Vihar" description="DHANALAXMI SAHAKARI GRUHARACHNA SANSTHA MARYADIT" />

      <Container fluid className="px-0" style={{ backgroundColor: "#ddf9a2" }}>
        <Carousel fade interval={2000}>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={society1}
              alt="Main Gate"
              style={{ maxHeight: "500px", objectFit: "contain" }}
            />
            <Carousel.Caption>
              <h5>Main Entrance</h5>
              <p>Secure and beautifully designed gated entrance</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src={society2}
              alt="Garden Area"
              style={{ maxHeight: "500px", objectFit: "contain" }}
            />
            <Carousel.Caption>
              <h5>Community Garden</h5>
              <p>Lush green space for relaxation and family time</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src={society3}
              alt="Parking Lot"
              style={{ maxHeight: "500px", objectFit: "contain" }}
            />
            <Carousel.Caption>
              <h5>Ample Parking</h5>
              <p>Spacious parking facility for all residents</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Container>

      <Container fluid className="py-5">
        <Row className="text-center justify-content-center">
          <Col md={3} sm={6} xs={12} className="mb-3">
            <Card className="shadow-sm p-3">
              <Card.Body>
                🔐<Card.Text>Gated Security</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3} sm={6} xs={12} className="mb-3">
            <Card className="shadow-sm p-3">
              <Card.Body>
                💧<Card.Text>24x7 Water Supply</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3} sm={6} xs={12} className="mb-3">
            <Card className="shadow-sm p-3">
              <Card.Body>
                🏞️<Card.Text>Garden & Play Area</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3} sm={6} xs={12} className="mb-3">
            <Card className="shadow-sm p-3">
              <Card.Body>
                🧹<Card.Text>Regular Maintenance</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
