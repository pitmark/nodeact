import React from 'react';
import {render, findDOMNode} from 'react-dom';
import { Router,Route,Link,browserHistory } from 'react-router'
import {Navbar, Nav, NavItem, NavDropdown, MenuItem ,Modal ,Button ,ButtonToolbara ,FormGroup, FormControl, ControlLabel, FieldGroup, Input } from 'react-bootstrap';
import $ from 'jquery';

var nowdir = location.pathname;
var nowdirs = nowdir.split('/');



if(nowdirs[1] == ""){
   nowdirs[1] = "home";
}

var dir_arr = ["home","item","logout"];
if(dir_arr.indexOf(nowdirs[1]) == -1){
  nowdirs[1] = "notfound";
}


class Home extends React.Component {
  constructor(props){
  super(props);
  console.log(window.sessionStorage.getItem(['session']));
  }

  render () {
    return (
        <div>
        testtest
        </div>
    );
  }
}

class Item extends React.Component {
  constructor(props){
  super(props);
  console.log(window.sessionStorage.getItem(['session']));
  }

  componentDidMount(){
var data = window.document.getElementById("data").innerHTML;
var json_data = JSON.parse(data);
console.log(json_data);
json_data = json_data.data;
var txt = "";
for(var i in json_data){
    txt += json_data[i].maisuu + "枚" + json_data[i].price + "円";
}
console.log(txt);

  }

  render () {
    return (
        <div>
        item
        </div>
    );
  }
}


class Logout extends React.Component {
  constructor(props){
  super(props);
  window.sessionStorage.clear();
  }

  render () {
    return (
        <div>
        logoutしました。
        </div>
    );
  }
}

class Notfound extends React.Component {
  constructor(props){
  super(props);
  console.log(window.sessionStorage.getItem(['session']));
  }

  render () {
    return (
        <div>
        404
        </div>
    );
  }
}


class App extends React.Component {
  render () {

    switch(nowdirs[1]){
        case "home":
           return(<Home />);
           break;

        case "item":
           return(<Item />);
           break;
        case "logout":
           return(<Logout />);
           break;
        default :
           return(<Notfound />);
    }
  }
}

render(<App/>, document.getElementById('content_' + nowdirs[1] ));

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
            err:false,
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


       if(this.state.message.userid == "" && this.state.message.password == "" ){
          // 送信
           this.dataPost(this.state.data);
       }else{
           var p_send = findDOMNode(this.refs.send_err);
           p_send.textContent = " ";
           p_send.setAttribute('style','color:red;');
       } 

console.log(this.state);
       var p_userid = findDOMNode(this.refs.userid_err);
       p_userid.textContent = this.state.message.userid; 
       p_userid.setAttribute('style','color:red;');
 
       var p_password = findDOMNode(this.refs.password_err);
       p_password.textContent = this.state.message.password;
       p_password.setAttribute('style','color:red;');

    }


    dataPost(data){
        $.ajax({
          url: "/login",
          type: 'POST',
          //ataType: 'json',
          data: JSON.stringify(data),
          success: function(data) {
              var str = data;
              //this.state = data;
              console.log(data);
              if(data != 0){
                  window.sessionStorage.setItem(['session'],[data]);
                 // location.href = "/";
              }else{
                 this.state.message.send = "err";
                 this.state.showModal = true;
                 this.setState(this.state);
                 var p_send = findDOMNode(this.refs.send_err);
                 p_send.textContent = "ID・PASSに間違いがあります";
                 p_send.setAttribute('style','color:red;');
              }
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
                  <FormControl type="text" name="userid" ref="userid" />
                  <p ref="userid_err"></p>
              </FormGroup>
              <FormGroup>
                  <FormControl type="password" name="password" ref="password" />
                  <p ref="password_err"></p>
              </FormGroup>
              <FormGroup>
                  <Button bsStyle="primary" bsSize="large" type="submit" onClick={this.formSubmit.bind(this)} block >送信</Button>
                  <p ref="send_err"></p>
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
