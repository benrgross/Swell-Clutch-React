import { Nav, Navbar, Container } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { GiBigWave } from "react-icons/gi";

function Navigation() {
  const { loginWithRedirect, logout, user } = useAuth0();

  return (
    <Navbar style={{ backgroundColor: "rgb(4 148 250 / 2%)" }} expand="lg">
      <Container>
        <Navbar.Brand
          style={{ color: "#0070f3", marginRight: "3rem" }}
          href="/"
        >
          <GiBigWave size={45} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Dashboard</Nav.Link>
            <Nav.Link href="/search">Search</Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            {user ? (
              <div
                className="nav-link login-nav pointer"
                onClick={() => logout()}
              >
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
