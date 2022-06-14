console.log("login.js loaded");
const login = document.getElementById("login");
login.onclick = function() {
    // get the values
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    //run a firebase funcion to sign up the user
    firebase.auth().signInWithEmailAndPassword(email, password).then((userCred) => {
        alert("Login Successful");
        window.location.href = "home.html";
    }).catch((error) => {
        const error1 = error.mesage;
        alert(error1);
    })
}