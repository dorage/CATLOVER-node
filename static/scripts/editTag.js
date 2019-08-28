/* eslint-disable */

function deleteTag(id) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(post) {
        console.log(post);
        location.reload();
    };
    xhttp.open('DELETE', `http://localhost:4000/ui/tags?id=${id}`, true);
    xhttp.send();
}
