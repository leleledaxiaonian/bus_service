var db=require('mongodb');
var location=require("./baidu.js");

var mydb =db({'file':'somefile.db'});
var ret=mydb.add("new", "key");
var find=mydb.findAllWithKey("new");
console.log(find);
location.getLocation(39.2344,102.2323,function( location){

console.log("now is "+location);

});
