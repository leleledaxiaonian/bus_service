var token=require("./accTok_updater.js");

token.run();
function print_token(){
console.log(token.get_token());
}
setTimeout(print_token, 1000);
