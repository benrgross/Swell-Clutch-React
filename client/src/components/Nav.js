import { Nav, Navbar, Container } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

function Navigation() {
  const { loginWithRedirect, logout, user } = useAuth0();

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand style={{ color: "#0070f3" }} href="/">
          Swell Clutch
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Dashboard</Nav.Link>
            <Nav.Link href="/search">Search</Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            {user ? (
              <div className="nav-link login-nav" onClick={() => logout()}>
                Log Out
              </div>
            ) : (
              <div
                className="nav-link login-nav"
                onClick={() => loginWithRedirect()}
              >
                Log In
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
