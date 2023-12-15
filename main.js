const btnLogout = document.getElementById('btn_logout');
const btnLogin = document.getElementById('btn_login');
const status = document.querySelector('.status');
const login_Success = document.querySelector('.login_Success');
const redMessage = document.querySelector('.redMessage');
const login_SuccessHome = document.querySelector('.login_SuccessHome');
const logoutPage = document.getElementById('logoutPage');
const loginPage = document.getElementById('loginPage');

// btn.addEventListener('click',getValue());


// ------------------------------Get Value Function--------------------------------
function getValue() {
    var x = document.getElementById('UserName').value;
    var y = document.getElementById('password').value;
    check(x.toLowerCase(), y.toLowerCase());
}


//------------------------------User account --------------------------------------//
var account = [{
    username: "eslam",
    password: "h123",
    namePerson: "Eslam Hamed Kamel",
    idPreson: "240898",
},
{
    username: "omar",
    password: "e123",
    namePerson: "Habiba Gamal Alaa",
    idPreson: "10925",
}]
var name_id = '';
var isFound = "";
// ------------------------------Check account Function--------------------------------//
function check(user, pass) {
    for (var i = 0; i < account.length; i++) {
        if ((user == account[i].username) && (pass == account[i].password)) {
            name_id = { name: account[i].namePerson, id: account[i].idPreson, cname: account[i].username };
            isFound = true;
        }
    }
    if (isFound == "") {
        isFound = false;
    }
    return action()
}

// ------- sub Function to take Action -------//
function loginDone() {
    return login_SuccessHome.innerHTML = 'Login Success';
}
function action() {
    if (isFound == true) {
        checkCookie();
        switchPage();
        // userLogin();
        // loginDone();
        time();
    }
    else {
        status.innerHTML = 'Wrong username or password';
        time();
    }
}

//----------------------------------Check cookies Function----------------------------------//
function checkCookie() {
    let username = getCookie(name_id.cname);
    if (username != "") {
        btnLogin.classList.replace("d-inline-block", "d-none");
        btnLogout.classList.replace("d-none", "d-inline-block");
    }//  else {
    //     btnLogout.classList.replace("d-inline-block", "d-none");
    //     setCookie(name_id.cname, "login");
    // }
}
// -----------------------------Creat Cookei Aftre press Attend--------------------------------------//
function creatCookie() {
    btnLogout.classList.replace("d-inline-block", "d-none");
    setCookie(name_id.cname, "login");
}

// --------------------- Get Location Function ---------------------//
var latitude = '';
var longitude = '';
function checkLocation(status) {
    function success(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        statusUser = status;
        loginDone();
        creatCookie();
        pushData(status);
        time();
    }
    function error() {
        redMessage.innerHTML = 'Unable to access your Location';
    }
    navigator.geolocation.getCurrentPosition(success, error);
}

// --------------------- Send Data to spreed Sheet Function ---------------------//
function pushData(status) {
    var user_location = latitude + ',' + longitude

    return google.script.run.login(name_id.name, name_id.id, user_location, status);
}
// ---------------------Automatic Hide & Clear Function---------------------//
function clear() {
    document.getElementById('UserName').value = "";
    document.getElementById('password').value = "";
}
function time() {
    setTimeout(() => {
        clear();
        isFound = ''
    }, 1000);
    setTimeout(() => {
        const box = document.querySelector('.status');
        box.innerHTML = '';
        login_Success.innerHTML = '';
        login_SuccessHome.innerHTML = '';

    }, 4000);
}
//-------------------- function to Switch login & logout page ----------------------//
function switchPage() {
    logoutPage.classList.replace("d-none", "d-block");
    loginPage.classList.replace("d-block", "d-none");
}
//----------------------------------Creat cookies Function ----------------------------------//
function setCookie(cname, cvalue) {
    const d = new Date();
    d.setTime(d.getTime() + (360 * 1000));    //50400
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
//----------------------------------Get cookies Function----------------------------------//
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
