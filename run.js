var axios = require('axios')
axios.put('http://localhost:3000/api/v1', {
key:'PORT',
value:3000
}).then((response) => {
    console.log(response.data);
})