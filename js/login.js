console.log("login.js loaded");
const login = document.getElementById("login");
login.onclick = function() {
    // get the values
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    //run a firebase funcion to sign up the user
    firebase.auth().SignInwithEmailAndPassword(email, password).then((userCred) => {
        console.log(userCred);
        window.location.href = "home.html";
    }).catch((error) => {
        const err = error.message;
        console.log(err);
    })
}