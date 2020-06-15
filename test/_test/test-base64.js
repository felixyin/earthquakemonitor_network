/**
 * Created by fy on 2017/3/2.
 */

// const base64 = require('base64-js');
const base64 = require('js-base64').Base64;

let headers = {
  'Authorization': 'Basic aZ3Vlc3RAdXNlci5jb206Z3Vlc3Q=='
}

function makeBaseAuth(user, pass) {
  var tok = user + ':' + pass;
  var hash = base64.encode(tok);
  return 'Basic ' + hash;
}

let user = 'guest@user.com'
let pass = 'guest'

// console.log(makeBaseAuth(user, pass))
console.log(base64.decode('MTAwMDAxOmI2NzZjY2NjNTEzNDY5ZjQ3NzAzNzY3OGNhNGI2ZWQ3YWY1YmY4M2I='))
console.log(base64.encode('100001:2bff1dd7cfbc78d7eb751e9f55bad0221ec5969c'))
console.log(base64.encode('100001:2bff1dd7cfbc78d7eb751e9f55bad0221ec5969c'))
