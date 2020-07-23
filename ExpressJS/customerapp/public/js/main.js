$(document).ready(function(){
    $('.deleteUser').on('click', deleteUser);
});

function deleteUser(){
    var confirmation = confirm('Are You Sure');
    if(confirmation){
        alert(1);
    }
}