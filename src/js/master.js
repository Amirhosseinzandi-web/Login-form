let person = document.getElementsByClassName("person")[0];
let form = document.getElementsByClassName("form")[0];
let btn = document.getElementById("logIn");
let userVal = document.getElementById("username");
let passVal = document.getElementById("password");
let rememberCheck = document.getElementById("rememberCheck");
let redirect = document.getElementsByClassName("redirect")[0];
let otherUsers = document.querySelector(".otherUsers")
let loading = document.querySelector(".loading")

person.parentElement.classList.add("visible")
person.addEventListener("click" , function(){
    this.parentElement.classList.replace("visible" , "hide")
    this.parentElement.style.transition = ".5s"
    setTimeout(()=>{
        form.classList.replace("hide" , "visible")
        form.classList.add("enter")
        otherUsers.classList.replace("hide" , "visible")
    },1000)
})


form.classList.add("hide")
form.children[0].addEventListener("click" , function(){
    setTimeout(()=>{
        this.parentElement.classList.replace("visible" , "hide")
        otherUsers.classList.replace("visible" , "hide")
    },500)
    this.parentElement.classList.remove("enter")
   setTimeout(()=>{
    person.parentElement.classList.replace("hide" , "visible")
   },700)
})


let url = "src/data/login.json";
let flag = 0

async function getData(){
   temp = await fetch(url)
   if(!temp.ok){
    loading.innerHTML = "<img src='https://mir-s3-cdn-cf.behance.net/project_modules/disp/35771931234507.564a1d2403b3a.gif'>"
  }
  else{
    loading.innerHTML = "<img class='hide' src='https://mir-s3-cdn-cf.behance.net/project_modules/disp/35771931234507.564a1d2403b3a.gif'>"
  }
  _data = await temp.json()
   return _data
}

getData()
.then(response=>{
btn.addEventListener("click" , ()=>{
    if((userVal.value != "") && (passVal.value != "")){
   
        for(i=0; i<response.results.length; i++){
            if(userVal.value == response.results[i].login.username && passVal.value == response.results[i].login.password){
                flag = i
            }
        }
        newuserval = response.results[flag].login.username
        newpassval = response.results[flag].login.password
        if((userVal.value == newuserval) && (passVal.value == newpassval)){
            logIn(response)
            redirect.style.transition = ".5s"
            redirect.classList.replace("hide" , "visible")
            setTimeout(()=>{
                redirect.classList.replace("visible" , "hide")
            },700)
        }
        else{
            alert("not found")
        }
    
    if(rememberCheck.checked==true){
        localStorage.setItem("content" , userVal.value)
        localStorage.setItem("text" , passVal.value)
    }
    else{
        localStorage.removeItem("content")
        localStorage.removeItem("text")
    }
    }
    else{
        alert("please fill the form")
    }
})
})
userVal.value = localStorage.getItem("content")
passVal.value = localStorage.getItem("text")






 function logIn(response){
   setTimeout( ()=>{

    _state =  window.open("" , "_target")
    _state.document.write(`

   <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="src/css/master.css">
</head>
<body>
    <main>
    <section class="login_page">
    <div class="profile_card">
        <div class="profile_img">
            <figure>
                <img src="${response.results[flag].picture.large}" alt="">
            </figure>
        </div>
        <div class="biography">
            <h2>First name: <small>${response.results[flag].name.first}</small> </h2>
            <h2>Last name: <small>${response.results[flag].name.last}</small> </h2>
            <h2>Gender: <small>${response.results[flag].gender}</small> </h2>
            <h2>E-mail: <small>${response.results[flag].email}</small> </h2>
            <h2>Age: <small>${response.results[flag].registered.age}</small> </h2>
            <h2>Phone: <small>${response.results[flag].phone}</small> </h2>
            <h2>Address: <small>${response.results[flag].location.street.name}</small> </h2>
            <h2>city: <small>${response.results[flag].location.city}</small> </h2>
            <h2>Country: <small>${response.results[flag].location.country}</small> </h2>
        </div>
    </div>
</section> 
    </main>
</body>
</html>

   `)

   },1000)
}

