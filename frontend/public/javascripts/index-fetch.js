document.addEventListener('DOMContentLoaded', function () {
    getUserData()
});

function getUserData() {
    fetch("api/v1/users/getMe", {
        method: "get",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }).then((response) => {
        response.json().then((userData) => {
            document.getElementById("profile-img").src = userData.data.profileImage;
            document.getElementById("balance").innerHTML = userData.data.balance;
            document.getElementById("username").innerHTML = userData.data.username;
        });
    }).catch((err) => { console.log(err) });
}
