import { useState, useContext } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function AppNavbar() {
  const [expanded, setExpanded] = useState(false);
  const { user, logout } = useContext(AuthContext);

  const handleNavClick = () => {
    setExpanded(false); // collapse the menu
  };

  const handleLogout = async () => {
    await logout();
    window.location.href = "/login";
  };

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      sticky="top"
      expanded={expanded}
      onToggle={(val) => setExpanded(val)}
    >
      <Container fluid className="px-3">
        <Navbar.Brand as={Link} to="/" onClick={handleNavClick}>
          <img
            src="/lakshmi.png"
            alt="Mahalaxmi Vihar Logo"
            width="30"
            height="30"
            className="d-inline-block align-top me-2"
          />
          Mahalaxmi Vihar
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="society-navbar" />

        <Navbar.Collapse id="society-navbar">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" onClick={handleNavClick}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about" onClick={handleNavClick}>
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/committee" onClick={handleNavClick}>
              Committee
            </Nav.Link>
            <Nav.Link as={Link} to="/notices" onClick={handleNavClick}>
              Notices
            </Nav.Link>
            <Nav.Link as={Link} to="/gallery" onClick={handleNavClick}>
              Gallery
            </Nav.Link>
            <Nav.Link as={Link} to="/tenders" onClick={handleNavClick}>
              Tenders
            </Nav.Link>
            {user ? (
              <>
                <Nav.Link disabled>Hi, {user.username}</Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" onClick={handleNavClick}>
                  Login
                </Nav.Link>
                {/* <Nav.Link as={Link} to="/register" onClick={handleNavClick}>
                  Register
                </Nav.Link> */}
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
