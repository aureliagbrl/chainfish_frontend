const container = document.getElementById("content");
const front = document.getElementById("front");
console.log(container);

// Buttons
const button_login = document.getElementById("login-button");
const button_register = document.getElementById("register-button");
const button_back = document.getElementById("back-button");
const button_signup = document.getElementById("signup-button");

// Inputs
const email_input = document.getElementById("email-input");

const password_input = document.getElementById("password-input");
const password_check_input = document.getElementById("password-check-input");

// Container
const register_container = document.getElementById("password-check-input-container");
const register_button_container = document.getElementById("register-button-container");
const signup_button_container = document.getElementById("signup-button-container");
const login_button_container = document.getElementById("login-button-container");
const back_button_container = document.getElementById("back-button-container");
const buttons_container = document.getElementById("buttons-container");

back_button_container.style.display = "none";
register_container.style.display = "none";
signup_button_container.style.display = "none";
front.className

button_register.onclick = function(){register();};
button_login.onclick = function(){login();};
button_back.onclick = function(){back();};
button_signup.onclick = function(){signup();};


function register(){
    container.className = "login-form register-kuy";
    buttons_container.className = "columns is-multiline is-mobile fade-in"
    back_button_container.style.display = "";
    login_button_container.style.display = "none";
    register_container.style.display = "";
    register_container.className = "field fade-in";
    register_button_container.style.display = "none";
    signup_button_container.style.display = "";
}

function back(){
    buttons_container.className = "columns is-multiline is-mobile"
    container.className = "login-form register-nanti";

    back_button_container.style.display = "none";
    login_button_container.style.display = "";
    register_container.style.display = "none";
    register_button_container.style.display = "";
    signup_button_container.style.display = "none";

    password_input.className = "input";
    password_check_input.className = "input";
    email_input.className = "input";
}

function login(){
    if(checkInputStates()){
        document.getElementsByClassName("backdrop-animation")[0].style.display="none";
        document.getElementsByTagName('body')[0].innerHTML = '<object type="text/html" data="game.html"></object>';
    }
}

function checkInputStates(){
    var condition = true;
    if(email_input.value == null || email_input.value == ""){
        email_input.className = "input is-danger more-danger";
        condition = false;
    } else {
        email_input.className = "input is-success more-success";
    }

    if(password_input.value == null || password_input.value == ""){
        password_input.className = "input is-danger more-danger";
        condition = false;
    } else {
        password_input.className = "input";
    }

    if(register_container.style.display == ""){
        if(password_check_input.value == null || password_check_input.value == ""){
            password_check_input.className = "input is-danger more-danger";
            condition = false;
        } else {
            if(password_check_input.value != password_input.value){
                password_check_input.className = "input is-danger more-danger";
                contiion = false;
            } else {
                password_check_input.className = "input is-success more-success";
                password_input.className = "input is-success more-success";
            }
        }
    }
    return condition;
}

function signup(){
    checkInputStates()
}