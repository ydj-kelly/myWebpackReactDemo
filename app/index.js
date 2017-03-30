/**
 * Created by Yuan on 2017/3/29.
 */
import React from "react";
import ReactDOM from 'react-dom';
import NameComponent from './reactCom';
require("./common");
//require("./style");
import './style';
var component = require("./component");
//import './common.css';
//var $ = require('jquery');
document.body.appendChild(component());
$("#h1").append(component());
var a = [];
for(let i = 0; i < 3; i++){
    a[i] = function(){
        console.log(i)
    }
}
a[2]();

ReactDOM.render(
    <NameComponent/>,document.getElementById("react")
)
