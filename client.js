import React from 'react';
import {render} from 'react-dom';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';

var nowdir = location.pathname;
var nowdirs = nowdir.split('/');
if(nowdirs[1] == ""){
   nowdirs[1] = "home";
}
class App extends React.Component {
  render () {
    return <p> Hello React!</p>;
  }
}
render(<App/>, document.getElementById('content_' + nowdirs[1] ));


class Header extends React.Component {

  handleSelect(eventKey){
    console.log(eventKey);
  }

render() {

    return (

      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">React-Bootstrap Sample</a>
          </Navbar.Brand>
        </Navbar.Header>

        <Nav pullRight>
          <NavDropdown id="my-dropdown" eventKey={1} title="Settings" >
            <MenuItem eventKey={1}>About</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={2}>Sign out</MenuItem>
          </NavDropdown>
        </Nav>
      </Navbar>

    );
}
}

render(<Header />, document.getElementById('header'));

