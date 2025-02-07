import { useDispatch, useSelector } from "react-redux";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt,FaUser, FaUserCheck } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { clearCredentials } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/images/dumbbell-health-logo.png";
import FaveList from "../assets/icons/favorites-list.png";

const Header = () => {
  // Get logged-in user information from Redux store
  const { userInfo } = useSelector((state) => state.auth);

  // Redux setup
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logout] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logout().unwrap();
      dispatch(clearCredentials());
      navigate("/"); // Where do I want to send the user after logging out?
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top" collapseOnSelect>
        <Container>
          <LinkContainer to="/dashboard">
            <Navbar.Brand>
            <img src={Logo} alt="logo" 
              style={{width: "48px", height: "48px", margin: "0 20px"}}/>
              My Exercise Planner Fitness App
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              { userInfo? (
                <>
                  <NavDropdown title={userInfo.name} id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>
                        <FaUserCheck /> Profile 
                      </NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      <FaSignOutAlt /> Logout
                    </NavDropdown.Item>
                  </NavDropdown> 
                  <span className="mx-auto">
                  <LinkContainer to="/favoriteexercisesdashboard">
                    <Nav.Link>
                      <Navbar.Text>
                        Favorite Exercises <img src={FaveList} alt="favorite exercises list" 
              style={{width: "22px", height: "22px", margin: "0 5px"}}/>
                      </Navbar.Text>
                    </Nav.Link>
                  </LinkContainer>
                  </span>
                </>
              ) : (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <FaSignInAlt /> Login
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Nav.Link>
                      <FaUser /> Register
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;