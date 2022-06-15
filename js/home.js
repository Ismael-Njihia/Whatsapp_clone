firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        //logged in user Id
        let CUserId = user.uid;
        //logged in user email
        let CUserEmail = user.email;

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

        })


        //receiving the reel image
        document.getElementById("upload").onclick = function() {
            let reel = document.getElementById("PostImage").files[0];
            //on the storage
            let storageRef = firebase.storage().ref();
            //Creating a file to store the image
            let uploaded = storageRef.child("reels/").child(Math.random() + reel.name).put(reel);
            uploaded.on('state_changed', (snapshot) => {

            }, (error) => {
                erro1 = error.message;
                alert(erro1);
            }, () => {
                //getting the url of the image
                uploaded.snapshot.ref.getDownloadURL().then((url) => {
                    //saving the url to the database
                    firebase.firestore().collection("reels").add({
                        ReelUrl: url,
                        timestampUrl: timestamp,
                        userId: CUserId,
                        userEmail: CUserEmail,
                    }).then(() => {
                        window.location.reload();
                    })
                })
            })
        }

    } else {
        window.location.href = "index.html";
    }
})