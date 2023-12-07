const firebaseConfig = {
    apiKey: "AIzaSyDaLygx7n6gRh5c4PrGP9pvAiRo5lVficY",
    authDomain: "login-24480.firebaseapp.com",
    projectId: "login-24480",
    databaseURL: "https://login-24480-default-rtdb.firebaseio.com/",
    storageBucket: "login-24480.appspot.com",
    messagingSenderId: "636104741158",
    appId: "1:636104741158:web:16937ce4c69cc00a80f1e7"
};


const app = firebase.initializeApp(firebaseConfig);
const dbRef = firebase.database().ref();

const detailsRef = dbRef.child('userdetails');
detailsRef.on("child_added", function(snapshot, prevChildKey) {
    var newPost = snapshot.val();
});

function send() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    detailsRef.push().set({
        username: username,
        password: password,
    });

}

const objPeople = [
    {
        username: "natalie",
        password: "passwordle"
    },
    {
        username: "yena",
        password: "passwordcheong"
    },
    {
        username: "ngoc",
        password: "passwordnguyen"
    },
    {
        username: "thi",
        password: "passwordtran"
    },
    {
        username: "courtney",
        password: "passwordluu"
    }
]

function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    //loop is username and password are correct
    
    for(i = 0; i < objPeople.length; i++) {
        if(username==objPeople[i].username && password==objPeople[i].password) {
            alert(username + " is logged in!")
            window.location.href = "index.html"
            return
        }
    }

    //error if username and password are incorrect
    alert("Incorrect username and password")
}
// Function to register new accounts
function registerUser() {
    var registerUser = document.getElementById("newUser").value;
    var registerPassword = document.getElementById("newPassword").value;
    var newUser = {
        username: registerUser,
        password: registerPassword
    }

    //For loop when username is already taken and password isunder 8 characters.
    for(i = 0; i < objPeople.length; i++) {
        if(registerUser == objPeople[i].username) {
            alert("That username is already in use, please choose another.")
            return
        } else if (registerPassword.length < 8) {
            alert("That password is too short, include 8 or more characters.")
            return
        }
    }
    objPeople.push(newUser)
    console.log(objPeople)
    alert("Your account has been created!")
    document.getElementById('box-close').click();
}