var axios = require('axios')
axios.post('http://localhost:3000/api/v1', {
key:'dddd',
value:'val'
}).then((response) => {
    console.log(response.data);
})