console.log("login.js loaded");
const login = document.getElementById("login");
login.onclick = function() {
    // get the values
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    document.getElementById("waiting").style.display = "block";
    document.getElementById("login").style.display = "none";

    //run a firebase funcion to sign up the user
    firebase.auth().signInWithEmailAndPassword(email, password).then((userCred) => {
        swal("Login successful");
        window.location.href = "home.html";
    }).catch((error) => {
        const error1 = error.mesage;

        console.log(error1);
        const toastLiveExample = document.getElementById('liveToast')
        const toast = new bootstrap.Toast(toastLiveExample)

        document.getElementById("toast-body").innerText = error1
        time = new Date().toDateString();
        document.getElementById("Dte").innerText = time;
        toast.show()
    })
}