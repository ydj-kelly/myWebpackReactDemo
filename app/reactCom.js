/**
 * Created by Yuan on 2017/3/30.
 */
  import React from 'react';

var names = ['Alice','Emily','kate'];
var NameComponent = React.createClass({
    render:function() {
        var names1= names.map(item =>item+"ni");

        return (
            <div>
                {
                    names1.map(function(item,index){
                        return <h1>Hello,{item}</h1>
                    })
                }
            </div>
        )
    }
});
export default NameComponent;