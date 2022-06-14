document.getElementById("signup").onclick = function() {
    // Get the values from the form
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const name = document.getElementById("name").value;

    //create a new user
    firebase.auth().createUserWithEmailAndPassword(email, password).then((userCred) => {
        const userId = userCred.user.uid;
        console.log(userCred);
        console.log(userId);

        //creating users in the firestore
        firebase.firestore().collection("users").doc(userId).set({
            name: name,
            email: email,
            id: userId
        }).then(() => {
            console.log("User created");
            window.location.href = "login.html";
        })

    }).catch((error) => {
        const err = error.message;
        console.log(err);
    })
}