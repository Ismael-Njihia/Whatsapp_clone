firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        //logged in user Id
        let CUserId = user.uid;
        //logged in user email
        let CUserEmail = user.email;

        document.getElementById("welcome").innerText = "Signed in as" + " " + CUserEmail;
        document.getElementById("welcome").style.color = "green";

        //timestamp
        const timestamp = new Date().toTimeString(10);
        const date = new Date().toDateString();
        console.log(timestamp);
        //profile owner display

        //let's get all the users
        firebase.firestore().collection("users").get().then((snapshot) => {

                let content = '';
                snapshot.docs.forEach((doc) => {
                    let name = doc.data().name;
                    let email = doc.data().email;
                    let id = doc.data().id;
                    let ProfImage = doc.data().ProfImage;

                    let theLink = "home.html" + "?" + id;
                    if (id == CUserId) {
                        document.getElementById("welcome").innerText = "Welcome" + " " + name;

                    } else {

                    }

                    content += '<a href="' + theLink + '" class="user">';
                    content += '<div class="user-img">';
                    content += '<img src="' + ProfImage + '" alt="">';
                    content += '</div>';
                    content += '<div class="mini-content">';
                    content += '<h1>' + name + '</h1>';
                    content += '<p>' + email + '</p>'
                    content += '</div>';

                    content += '</a>';


                })
                $("#contacts").append(content);

            })
            //receiving the ID from the URI
        let receivedID = window.decodeURIComponent(window.location.search);
        let theUserId = receivedID.substring(1);
        //firebase
        firebase.firestore().collection("users").doc(theUserId).get().then((doc) => {
                let name = doc.data().name;
                let email = doc.data().email;
                let id = doc.data().id;
                let ProfImage = doc.data().ProfImage;

                document.getElementById("recUserName").innerText = name;
                document.getElementById("recUserEmail").innerText = email;
                document.getElementById("recUserImage").src = ProfImage;
            })
            //sending chats to the db
        document.getElementById("sendChat").onclick = function() {
            let chat = document.getElementById("chat").value;
            let chatTime = timestamp;

            let sendChat = firebase.firestore().collection("chats").doc();
            sendChat.set({
                message: chat,
                time: chatTime,
                messageFrom: CUserId,
                messageTo: theUserId,
                messageRead: false,
                docId: sendChat.id,
                date: date
            }).then(() => {
                swal('message sent')
                window.location.reload();

            })
        }

        // pulling the chats from the db
        firebase.firestore().collection("chats").get().then((querySnapshot) => {

            let contentChat = '';
            querySnapshot.forEach((doc) => {
                let message = doc.data().message;
                let time = doc.data().time;
                let messageFrom = doc.data().messageFrom;
                let messageTo = doc.data().messageTo;
                let docId = doc.data().docId;
                let date = doc.data().date;

                if (messageFrom == CUserId && messageTo == theUserId) {
                    contentChat += '<div class="theChatTo">';
                    contentChat += '<p>' + message + '</p>';
                    contentChat += '<span>' + time + '</span>';
                    contentChat += '</div>';
                } else if (messageTo == CUserId && messageFrom == theUserId) {
                    contentChat += '<div class="theChatFrom">';
                    contentChat += '<p>' + message + '</p>';
                    contentChat += '<span>' + time + '</span>';
                    contentChat += '</div>';
                }
            })
            $("#allChats").append(contentChat);
        })





    } else {
        window.location.href = "index.html";
    }
})