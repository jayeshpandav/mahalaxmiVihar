import { Container } from "react-bootstrap";

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <Container className="text-center">
        <p className="mb-1">
          &copy; {new Date().getFullYear()} Mahalaxmi Vihar Housing Society
        </p>
        <p className="mb-0">
          Email: info@mahalaxmivihar.com | Phone: +91-9876543210
        </p>
      </Container>
    </footer>
  );
}
