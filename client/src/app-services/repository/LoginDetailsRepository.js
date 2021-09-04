//import axios from "axios";
export default {
 validateUserRole(appName, instanceKey, tokenKey) 
  {
    console.log('Calling server to validate the App with paramters >>', appName, instanceKey, tokenKey);
   // return axios.get(`/ecc/role/appname/${appName}?instancekey=${instanceKey}&token=${tokenKey}`);
   return  new Promise(function(resolve) {
    setTimeout(function(){
      resolve(true)
    }, 2000);
  });
  },
};
