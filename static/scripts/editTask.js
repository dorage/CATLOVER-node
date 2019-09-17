/* eslint-disable */

function resetTask(id) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(post) {
        console.log(post);
    };
    xhttp.open('get', `http://3.220.98.25:8383/task/reset?id=${id}`, true);
    xhttp.send();
    location.reload();
}
