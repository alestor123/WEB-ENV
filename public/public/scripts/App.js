var addButton = document.getElementById('addButton'),
varAdd = document.getElementById('varAdd'),
addVarin = document.getElementById('addVarin');
function fetch(){
    axios.get('/api/v1')
  .then((response) => {
    console.log(response.data);
  })
  .catch((error)=> {
    console.log(error);
    alert(error)
  })
}
function Save(){
if(addVarin.value==""){
    alert('please fill out input')
}
else if(addVarinn.value=="") {
    alert('please fill out value')
}
}
fetch()