import React from 'react';
import {render} from 'react-dom';

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

