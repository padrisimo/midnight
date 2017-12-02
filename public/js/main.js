$(document).ready(function(){
    $('.delete_user').on('click', deleteUser);
});

var deleteUser = function(){
    var confirmation = confirm('Are you sure?');

    if(confirmation){
         $.ajax({
            type: 'DELETE',
            url: '/users/delete/' + $(this).data('id')
        });
        window.location.replace('/');
    } else {
        return false;
    }
}