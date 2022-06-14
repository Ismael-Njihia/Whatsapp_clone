firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        //logged in user Id
        let CUserId = user.uid;
        //logged in user email
        let CUserEmail = user.email;
        //currentUsername
        let CUserName = user.name;

        //timestamp
        const timestamp = new Date();
        console.log(timestamp, CUserId, CUserEmail, CUserName);

        //let's get all the users
        firebase.firestore().collection("users").get().then((snapshot) => {
            let content = '';
            snapshot.docs.forEach((doc) => {
                let name = doc.data().name;
                let email = doc.data().email;
                let id = doc.data().id;
                let ProfImage = doc.data().ProfImage;
                document.getElementById("welcome").innerText = "Welcome" + " " + name;

                content += '<div class="user">';
                content += '<div class="user-img">';
                content += '<img src="' + ProfImage + '" alt="">';
                content += '</div>';
                content += '<div class="mini-content">';
                content += '<h1>' + name + '</h1>';
                content += '<p>' + email + '</p>'
                content += '</div>';

                content += '</div>';

            })
            $("#contacts").append(content);

        })

    } else {
        window.location.href = "index.html";
    }
})