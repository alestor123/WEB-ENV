var axios = require('axios')
axios.put('http://localhost:3000/api/v1', {
key:'PORT',
value:3000
}).then((response) => {
    console.log(response.data);
})
// // add web 
// add confirm 
// add logger 
// imporove code
// add auth 
// convert env 
// add cli
// add docs 
// clean Store json
// publish 