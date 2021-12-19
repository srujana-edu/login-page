let main = document.getElementById("root");

//creating content element to main page
let content= document.createElement("div");

//adding header to main page
let header = document.createElement("h1");
header.id= "topid";
header.innerText = "Login Page";
header.className = "myHeader";

//adding footer to main page
let footer = document.createElement("footer");
let footerText= document.createElement("p");
footerText.innerText = "copyrights";
footer.append(footerText);

main.append(header, content, footer);

// seeding user list
let userList = [
    {
      "username": "janne",
      "password": "test",
    },
    {
        "username": "srujana",
        "password": "vissu"
    }
];

let packedList1=JSON.stringify(userList);

localStorage.setItem("userLocation", packedList1);


//calling main function

homePage();

//main function defination
function homePage(){
content.innerHTML="";

    let header1 = document.getElementById("topid");
    header1.innerText = "Login Page!";
    header1.className = "myHeader";
if(localStorage.getItem("loggedInuser")== 'null'|| localStorage.getItem("loggedInuser")== null)
{
    //adding user input
    let usernameInput = document.createElement("input");
    usernameInput.placeholder = "Username";
    usernameInput.type = "usernameInput";
    usernameInput.id = "usernameInput";

    //adding label to the user input
    let userLabel=document.createElement("label");
    userLabel.innerText="User Name";
    usernameInput.prepend(userLabel);

    // Adding password-input
    let passwordInput = document.createElement("input");
    passwordInput.placeholder = "password";
    passwordInput.type = "password";
    passwordInput.id = "passwordInput";

    //adding label to the password input
    let pwdLabel=document.createElement("label");

    pwdLabel.innerText="Password";
    passwordInput.prepend(pwdLabel);

    // Adding button for logging button
    let logInbtn = document.createElement("button");
    logInbtn.innerText = "log in!";

    // adding elements to main
    content.append(userLabel,usernameInput,pwdLabel,passwordInput,logInbtn);

    //calling login function to login button
    logInbtn.addEventListener("click", login);

    //adding signup button
    let signUpbtn = document.createElement("button");
    signUpbtn.innerText = "Sign up";
    content.append(signUpbtn);

    //calling signupform function to sign up button
    signUpbtn.addEventListener("click", signUpForm);


}else{
    welcomeScreen(localStorage.getItem("loggedInuser"));
}
 }


// function for login user
function login() {

    let usernameInput = document.getElementById("usernameInput").value;
    let passwordInput = document.getElementById("passwordInput").value;

    //calling function for check user details
    validate(usernameInput,passwordInput);
}

//*checking if usernameinput and passwordinput
//*are correct as in local storage

function validate(receiveduser, receivedpassord){

    //retrieving users from userLocation

    let retrievedList= localStorage.getItem("userLocation");


    let List = JSON.parse(retrievedList);

    //matching user with password

    let isPasswordMatched= false;
    let i;

    for (i = 0; i < List.length; i++) {
        let userObj = List[i];
  let userm = userObj.username;
        let passd = userObj.password;
        if((receiveduser===userm)&&(receivedpassord===passd)){
           isPasswordMatched= true;
        }

    }
    if(isPasswordMatched === true)
    {
        localStorage.setItem("loggedInuser",receiveduser);
        content.innerHTML="";
        welcomeScreen(receiveduser);
    }else{

        errorScreen();

    }
}

    // function for welcome page for user
    function welcomeScreen(username){

        let header2 = document.getElementById("topid");
        header2.innerText = "welcome";
        header2.className = "myHeader";

        let welcomePage = document.createElement("h1");
        welcomePage.innerText = "Hello... " + username;
        content.append(welcomePage);
     let logoutBtn = document.createElement("button");
        logoutBtn.innerText = "Log out!";
        content.append(logoutBtn);
        logoutBtn.addEventListener("click", logout);

    }

    // function for user logout
    function logout() {
 localStorage.removeItem("loggedInuser");
let header3 = document.getElementById("topid");
        header3.innerText = "Login Page";
        header3.className = "myHeader";
      content.innerHTML="";
        homePage();
        }
    // function for error screen if user enter wrong details
    function errorScreen(){

        let loginFail = document.createElement("h1");
        loginFail.innerText = "Please try again!";
        let loginFail1 = document.createElement("h1");
        loginFail1.innerText = "or signup!";
        content.append(loginFail,loginFail1);

    }

    //function for signup for new users

    function signUpForm(){

    content.innerHTML="";


    let header4 = document.getElementById("topid");
    header4.innerText = "Sign Up!";
    header4.className = "myHeader";

    //adding new user input

    let newUserInput = document.createElement("input");
    newUserInput.placeholder = "Username";
    newUserInput.type = "newUserInput";
    newUserInput.id = "newUserInput";


    let userLabel1=document.createElement("label");
    userLabel1.innerText="User Name";
    newUserInput.prepend(userLabel1);

    //adding new password input
    let newPasswordInput = document.createElement("input");
    newPasswordInput.placeholder = "password";
    newPasswordInput.type = "password";
    newPasswordInput.id = "newPasswordInput";

    let pwdLabel1=document.createElement("label");
    pwdLabel1.innerText="password";
    newPasswordInput.prepend(pwdLabel1);


    //adding save button to save new user details
    let savebtn = document.createElement("button");
    savebtn.innerText = "save";
    savebtn.addEventListener("click", saveRegistration);
    content.append(userLabel1,newUserInput,pwdLabel1,newPasswordInput,savebtn);

    }

// adding function to save new user and password details
function saveRegistration(){

    let newUserInput = document.getElementById("newUserInput").value;
    let newPasswordInput = document.getElementById("newPasswordInput").value;

    let packedList=localStorage.getItem("userLocation");

    let unPackedList = JSON.parse(packedList);

    let newObj = {
        "username": newUserInput,
        "password": newPasswordInput,

      };
     // pushing new user to list
    unPackedList.push(newObj);

    let newUpdatedList=JSON.stringify(unPackedList);

    localStorage.setItem("userLocation", newUpdatedList);
    thanksforregistration();

}
//function to signup resgitration
function thanksforregistration(){
content.innerHTML="";

    let thanksInput=document.createElement("label");
    thanksInput.innerText="Thanks for Resgistering with us";
    content.append(thanksInput);
 let returnToHomescreen = document.createElement("button");
    returnToHomescreen.innerText = "Return to homescreen";
    content.append(returnToHomescreen);

    returnToHomescreen.addEventListener("click", homePage);
}
