$(document).ready(function(){
    $('.deleteItem').on('click', deleteItem);
});

function deleteItem(){
    var confirmation = confirm('Are You Sure');
    if(confirmation){
        $.ajax({
            type:'DELETE',
            url: '/delete/' + $(this).data('id')
        })
        window.location.replace('/');
    } else{
        return false;
    }
}