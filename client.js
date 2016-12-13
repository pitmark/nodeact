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

class Form1 extends React.Component{
    onChangeText(e){
     //  this.setState({data:e.target.value}); 
    var err =  findDOMNode(this.refs.userid).value;
    console.log(test);
    }

    _getuserid(){
        return this.state;
    }

    render (){
        return(
            <FormGroup>
                <FormControl type="text" name="userid" onChange={this.onChangeText.bind(this)} ref="userid" />
                <p>{this.err}</p>
            </FormGroup>
        );
    }
}

class Form2 extends React.Component{
    onChangeText(e){
       this.setState({data:e.target.value});
    }

    _getpassword(){
        return this.state;
    }

    render (){
        return(
            <FormGroup>
                <FormControl type="password" name="password" onChange={this.onChangeText.bind(this)} ref="password" />
                <p></p>
            </FormGroup>
        );
    }
}


class ModalArea extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state = {
            data:{
                userid:null,
                password:null
            },
            message:{
                userid:null,
                password:null
            },
            showModal: false
        }

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    }

    open() {
        this.setState({showModal: true});
    }

    close() {
        this.setState({showModal: false});
    }

    validate(str,type){
        switch(type){
            case "userid" :
                if(str==null || str==""){
                    this.state.message.userid = "文字を入力して下さい";
                    err
                }else if (str.match(/[^A-Za-z0-9]+/)){
                    this.state.message.userid = "半角英数のみ入力して下さい";
                }else{
                    this.state.message.userid = "";
                }
                break;

　　　　　　case "password" :
                if(str==null || str==""){
                    this.state.message.password = "文字を入力して下さい";
                }else if (str.match(/[^A-Za-z0-9]+/)){
                    this.state.message.password = "半角英数のみ入力して下さい";
                }else{
                    this.state.message.password = "";
                }
                break;
        }
    };


    formSubmit(e){
        e.preventDefault();
       var userid = findDOMNode(this.refs.userid).value;
       var password = findDOMNode(this.refs.password).value;
 
       this.validate(userid,"userid");
       this.validate(password,"password");

       this.state = {
                    data:{userid:userid,password:password},
                 message:{userid:this.state.message.userid,password:this.state.message.password}
                    }

       let p_userid = findDOMNode(this.refs.userid_err);
       p_userid.textContent = this.state.message.userid; 
       p_userid.setAttribute('style','color:red;');
 
       let p_password = findDOMNode(this.refs.password_err);
       p_password.textContent = this.state.message.password;
       p_password.setAttribute('style','color:red;');


       //送信
      // this.dataPost(this.state.data);
    }


    dataPost(data){
        $.ajax({
          url: "/login",
          type: 'POST',
          dataType: 'json',
          data: JSON.stringify(data),
          success: function(data) {
              var str = JSON.stringify(data);
              this.state = data;
              console.log(this.state);
          }.bind(this),
          error: function(xhr, status, err) {
              console.error(this.props.url, status, err.toString());
              console.error("サーバー接続エラー");
          }.bind(this)
        });
    }

    render(){
        return(

        <Modal className="modal-container"
          show={this.state.showModal}
          onHide={this.close}
          animation={true}
          bsSize="small">
          <Modal.Header closeButton>
            <Modal.Title>ログインフォーム</Modal.Title>
          </Modal.Header>

          <Modal.Body>


            <div>
              <FormGroup>
                  <FormControl type="text" name="userid" ref="userid" required />
                  <p ref="userid_err"></p>
              </FormGroup>
              <FormGroup>
                  <FormControl type="password" name="password" ref="password" required />
                  <p ref="password_err"></p>
              </FormGroup>
              <FormGroup>
                  <Button bsStyle="primary" bsSize="large" type="submit" onClick={this.formSubmit.bind(this)} block >送信</Button>
              </FormGroup>
            </div>


          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>

        );
    }
}


class Header extends React.Component {

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
              <MenuItem eventKey={1.2}><div onClick={()=>this.refs.child.open()}>ログイン</div></MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar>
          <ModalArea ref="child" />
        </div>
      );
    }
}

render(<Header />, document.getElementById('header'));
