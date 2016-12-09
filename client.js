import React from 'react';
import {render, findDOMNode} from 'react-dom';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem ,Modal ,Button ,ButtonToolbara ,FormGroup, FormControl, ControlLabel, FieldGroup, Input } from 'react-bootstrap';
import $ from 'jquery';

var nowdir = location.pathname;
var nowdirs = nowdir.split('/');



if(nowdirs[1] == ""){
   nowdirs[1] = "home";
}

class Testtest extends React.Component {
  render () {
    return (
        <div>
        testtest
        </div>
    );
  }
}


class App extends React.Component {
  formSubmit2(){
   var input = this.refs.ref.value.trim();
   console.log(input)
  }
  render () {
    return(
    <Testtest />
    );
  }
}

render(<App/>, document.getElementById('content_' + nowdirs[1] ));


class FormArea extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }


    formSubmit(e){
    e.preventDefault();
   // var input = this.refs.ref.value.trim();
    //console.log(input);
   // if(e.keyCode == 13)
     //   return false;
    
this.dataPost(this.state);
    }

    dataPost(data){
console.log(data);
    $.ajax({
      url: "/login",
      dataType: 'json',
      type: 'POST',
      data: JSON.stringify(this.state),
      success: function(data) {
        //this.setState({status: login});
        console.log(data);
        alert(data);
      }.bind(this),
      error: function(xhr, status, err) {
        //console.error(this.props.url, status, err.toString());
        console.error("サーバー接続エラー");
      }.bind(this)
    });

    }

    formChange(e){
    var key = e.target.name;
    var h = hash(key, e.target.value);

    this.setState(h);

    function hash(key, value) { var h = {}; h[key] = value; return h;}

        return false;
    }



    render(){
        return(
	<div>
        <FormGroup>
            <FormControl type="text" name="userid" onBlur={this.formChange.bind(this)} />
        </FormGroup>

        <FormGroup>
            <FormControl type="password" name="password" onBlur={this.formChange.bind(this)} />
        </FormGroup>


        <FormGroup>
            <Button bsStyle="primary" bsSize="large" onClick={this.formSubmit.bind(this)} block >送信</Button>
        </FormGroup>
        </div>
        );
    }
}


class Header extends React.Component {

constructor(props, context) {
  super(props, context);

  this.state = {
    showModal: false
  };

  this.open = this.open.bind(this);
  this.close = this.close.bind(this);
}


open() {
  this.setState({showModal: true});
}

close() {
  this.setState({showModal: false});
}

render() {

    return (
      <div>
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">React-Bootstrap Sample</a>
          </Navbar.Brand>
        </Navbar.Header>

        <Nav pullRight>
          <NavDropdown id="my-dropdown" title="Settings" eventKey={1} onSelect={this.handleChange} >
            <MenuItem eventKey={1.1}>About</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={1.2}><div onClick={this.open}>ログイン</div></MenuItem>
          </NavDropdown>
        </Nav>
      </Navbar>
        <Modal className="modal-container" 
          show={this.state.showModal} 
          onHide={this.close}
          animation={true} 
          bsSize="small">
          <form id="myForm" className="">
          <Modal.Header closeButton>
            <Modal.Title>ログインフォーム</Modal.Title>
          </Modal.Header>

          <Modal.Body>
              <FormArea />
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
          </form>         
        </Modal> 
      </div>
    );
}
}

render(<Header />, document.getElementById('header'));
