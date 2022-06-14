console.log("register.js loaded");
document.getElementById("signUp").onclick = function() {
    // Get the values from the form
    let email = document.getElementById("userEmail").value;
    let password = document.getElementById("UserPassword").value;
    let name = document.getElementById("fullName").value;
    console.log(email, password, name);
    //create a new user
    firebase.auth().createUserWithEmailAndPassword(email, password).then((userCred) => {
        const userId = userCred.user.uid;
        console.log(userCred);
        console.log(userId);

        //creating users in the firestore
        firebase.firestore().collection("users").doc(userId).set({
            name: name,
            email: email,
            password: password,
            ProfImage: "https://firebasestorage.googleapis.com/v0/b/whatsapp02-762f7.appspot.com/o/profile%2Fprofile.jpg?alt=media&token=208a7fac-5076-4222-baf5-0cd0556ac3dc",
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