$("#cancel-addList").click(function(e) {
    e.preventDefault();
    var $newListInput = $('#newList');
    $("#addList").hide();
    $newListInput.val('');
});

jQuery(function($) {
    $('.task').hover(function() {
       $(this).children('.icon-pencil').addClass('glyphicon glyphicon-pencil');
    },function() {
       $(this).children('.icon-pencil').removeClass('glyphicon glyphicon-pencil');
    });
}); 

//function showOff(divId) {
//    $("." + divId).removeClass('glyphicon glyphicon-pencil');
//}

$(function () {
  $("#datepicker").datepicker({ 
        autoclose: true, 
        todayHighlight: true
  });
});

$('#modalAddList').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget);
  var recipient = button.data('whatever');
  var modal = $(this);
  modal.find('.modal-title').text('Add New List');
  modal.find('.modal-body input').val(recipient);
})

$('#closemodal').click(function() {
    $('#savemodal').attr('disabled', 'disabled');
});

$('#savemodal').click(function() {
    $('#modalAddList').modal('hide');
    $('#savemodal').attr('disabled', 'disabled');
});

(function() {
    $('#list-name').keyup(function() {
        var empty = false;
        if ($('#list-name').val() == '') {
            empty = true;
        }
        if (empty) {
            $('#savemodal').attr('disabled', 'disabled'); 
        } else {
            $('#savemodal').removeAttr('disabled'); 
        }
    });
})()