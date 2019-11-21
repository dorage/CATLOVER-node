/* eslint-disable */

function resetTask(id) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(post) {
        console.log(post);
    };
    xhttp.open('get', `https://api.catloverlife.com/task/reset?id=${id}`, true);
    xhttp.send();
    location.reload();
}

function resetTaskOnLocal(id) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(post) {
        console.log(post);
    };
    xhttp.open('get', `https://localhost:8383/task/reset?id=${id}`, true);
    xhttp.send();
    location.reload();
}
