/* eslint-disable */

function deleteTag(id) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(post) {
        console.log(post);
        location.reload();
    };
    xhttp.open('DELETE', `http://3.220.98.25:8383/ui/tags?id=${id}`, true);
    xhttp.send();
}
