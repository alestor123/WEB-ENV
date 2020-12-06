// for the love of god dont use it have to clean and imporove was made in a hurry will improve later
var addButton = document.getElementById('addButton'),
varAdd = document.getElementById('varAdd'),
keyIn = document.getElementById('addVarin'),
valIn = document.getElementById('addVarinn'),
tableCon = document.getElementById('tableCon');
axios.get('/api/v1')
.then((response) => {
values = Object.values(response.data)
keys = Object.keys(response.data)
keys.forEach(setTable);
  console.log(Object.keys(response.data));
  console.log(Object.values(response.data))

})  .catch((error)=> {
    console.log(error);
    alert(error)
})  

function Save(){
if(addVarin.value==""){
    alert('please fill out input')
}
else if(addVarinn.value=="") {
    alert('please fill out value')
}
else{
Create(keyIn.value,valIn.value)
}
}
function setTable(item,index) {
    console.log(item)
tableCon.innerHTML += "<tr>" + "<td>" + index + "</td>" + "<td>" + item + "</td>" + '<td>' + values[index] + '</td> '+ "</tr>" 
}
function Delete(key){
axios.delete(`http://localhost:3000/api/${key}`, {
}).then((response) => {
    alert(response.data);
}).catch((error)=> {
    console.log(error);
    alert(error)
})  
}
function Update(key,value){
    axios.put('http://localhost:3000/api/v1', {
        key:key,
        value: value
        }).then((response) => {
            alert(response.data);
        }).catch((error)=> {
            console.log(error);
            alert(error)
        })  
}
function Create(key,value){
    axios.post('http://localhost:3000/api/v1', {
        key:key,
        value: value
        }).then((response) => {
            alert(response.data);
        }).catch((error)=> {
            console.log(error);
            alert(error)
        })  
}