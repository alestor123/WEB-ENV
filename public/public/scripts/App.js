var addButton = document.getElementById('addButton'),
varAdd = document.getElementById('varAdd'),
keyIn = document.getElementById('addVarin'),
valIn = document.getElementById('addVarinn'),
tableCon = document.getElementById('tableCon');
refresh()
function refresh(){
axios.get('/api/v1')
.then((response) => {
values = Object.values(response.data)
keys = Object.keys(response.data)
tableCon.innerHTML = "";
keys.forEach((item,index)=>{tableCon.innerHTML += "<tr>" + "<td>" + index + "</td>" + "<td>" + item + "</td>" + '<td>' + values[index] + '</td> '+ "</tr>" });
})  .catch((error)=> {
    console.log(error);
    alert(error)
}) 
} 
function Validation(){
    if(keyIn.value==""){
        alert('please fill out input')
    return false
    }
    else if(valIn.value=="") {
        alert('please fill out value')
        return false
    }
    else{
        return true
    }
    
}

// api 

function Create(){
    if(Validation()){
    axios.post('/api/v1', {
        key:keyIn.value,
        value: valIn.value
        }).then((response) => {
            alert(response.data);
            refresh()
        }).catch((error)=> {
            console.log(error);
            alert(error)
        })  
}}


function Delete(){
if(keyIn.value==""){
        alert('please fill out input')
} 
else if (!keys.includes(keyIn.value) || values.includes(valIn.value)){
    alert('Not Found')
}
else if (confirm('Are You Sure')){
    axios.delete(`/api/${keyIn.value}`, {
    }).then((response) => {
        alert(response.data);
        refresh()
    }).catch((error)=> {
        console.log(error);
        alert(error)
    })
}
}

function Update(){
    if(keyIn.value==""){
        alert('please fill out input')
} 
else if (!keys.includes(keyIn.value) || values.includes(valIn.value)){
    alert('Not Found')
}
else if (confirm('Are You Sure')){
    axios.put('/api/v1', {
        key:keyIn.value,
        value: valIn.value
        }).then((response) => {
            refresh()
            alert(response.data);
        }).catch((error)=> {
            console.log(error);
            alert(error)
        })  
}
}
