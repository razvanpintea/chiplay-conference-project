/**
 * Navigation menu of the application
 * 
 * @author Razvan Cristian Pintea w20018875
 */

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {LinkContainer} from 'react-router-bootstrap';

 
function Menu() {
 return (
  <Navbar bg="light" expand="sm">
   <Container>
    <Navbar.Brand>CHI PLAY 2021</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
     <Nav className="me-auto">
      <LinkContainer to="/"><Nav.Link>Home</Nav.Link></LinkContainer>
      <LinkContainer to="/admin"><Nav.Link>Admin</Nav.Link></LinkContainer>
        <NavDropdown title="Conference Tracks" id="basic-nav-dropdown">
        <LinkContainer to="Interactivity"><NavDropdown.Item>Interactivity</NavDropdown.Item></LinkContainer>
        <LinkContainer to="doctoral"><NavDropdown.Item>Doctoral</NavDropdown.Item></LinkContainer>
        <LinkContainer to="fullpapers"><NavDropdown.Item>Fullpapers</NavDropdown.Item></LinkContainer>
        <LinkContainer to="wip"><NavDropdown.Item>Wip</NavDropdown.Item></LinkContainer>
        <LinkContainer to="competition"><NavDropdown.Item>Competition</NavDropdown.Item></LinkContainer>
        <LinkContainer to="rapid"><NavDropdown.Item>Rapid</NavDropdown.Item></LinkContainer>
      </NavDropdown>
     </Nav>
    </Navbar.Collapse>
   </Container>
  </Navbar>
  
  
 );
}
 
export default Menu;