$("#cancel-addList").click(function(e) {
    e.preventDefault();
    var $newListInput = $('#newList');
    $("#addList").hide();
    $newListInput.val('');
});

function toggler(divId) {
    $("#" + divId).show();
}