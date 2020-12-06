var axios = require('axios')
axios.post('http://localhost:3000/api/v1', {
key:'PORT',
value:3001
}).then((response) => {
    console.log(response.data);
})