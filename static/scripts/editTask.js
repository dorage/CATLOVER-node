/* eslint-disable */

function resetTask(id) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(post) {
        console.log(post);
    };
    xhttp.open('get', `http://localhost:4000/task/reset?id=${id}`, true);
    xhttp.send();
    location.reload();
}
