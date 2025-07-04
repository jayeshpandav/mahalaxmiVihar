import { Container, Row, Col, Card } from "react-bootstrap";
import Header from "../components/Header";

const committeeMembers = [
  {
    name: "Rajesh Patil",
    role: "Chairman",
    image: "/committee/photo.jpeg",
    email: "rajesh.patil@example.com",
  },
  {
    name: "Sneha Joshi",
    role: "Secretary",
    image: "/committee/photo.jpeg",
    email: "sneha.joshi@example.com",
  },
  {
    name: "Amit Deshmukh",
    role: "Treasurer",
    image: "/committee/photo.jpeg",
    email: "amit.deshmukh@example.com",
  },
  {
    name: "Priya Nair",
    role: "Member",
    image: "/committee/photo.jpeg",
    email: "priya.nair@example.com",
  },
];

export default function Committee() {
  return (
    <>
      <Header title="Society Committee Members" description="Your elected representatives" />

      <Container fluid className="py-5">
        <Row className="justify-content-center">
          {committeeMembers.map((member, index) => (
            <Col key={index} md={3} sm={6} className="mb-4">
              <Card className="text-center shadow-sm h-100">
                <Card.Img
                  variant="top"
                  src={member.image}
                  alt={member.name}
                  style={{
                    width: "140px",
                    height: "180px",
                    objectFit: "cover",
                    borderRadius: "6px",
                    margin: "16px auto 0", // center horizontally with some top spacing
                  }}
                />

                <Card.Body>
                  <Card.Title>{member.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {member.role}
                  </Card.Subtitle>
                  <Card.Text style={{ fontSize: "0.9rem" }}>
                    {member.email}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
