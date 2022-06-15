firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        //logged in user Id
        let CUserId = user.uid;
        //logged in user email
        let CUserEmail = user.email;
        //currentUsername
        let CUserName = user.name;

        document.getElementById("welcome").innerText = "Signed in as" + " " + CUserEmail;
        document.getElementById("welcome").style.color = "green";

        //timestamp
        const timestamp = new Date();
        //profile owner display

        //let's get all the users
        firebase.firestore().collection("users").get().then((snapshot) => {

            let content = '';
            snapshot.docs.forEach((doc) => {
                let name = doc.data().name;
                let email = doc.data().email;
                let id = doc.data().id;
                let ProfImage = doc.data().ProfImage;
                if (id == CUserId) {
                    document.getElementById("welcome").innerText = "Welcome" + " " + name;

                } else {

                }
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

            //profile owner display
            let contentProfile = '';
            contentProfile += '<div class="user-img">';
            contentProfile += '<img src="' + ProfImage + '" alt="">';
            contentProfile += '</div>';
            $("#welcome").append(contentProfile);



        })

    } else {
        window.location.href = "index.html";
    }
})