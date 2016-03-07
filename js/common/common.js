$(document).ready(function(){
    $("#cancel-addList").click(function(e) {
        e.preventDefault();
        var $newListInput = $('#newList');
        $("#addList").hide();
        $newListInput.val('');
    });

    $(function () {
      $("#datepickerSetDate").datepicker({ 
            autoclose: true, 
            todayHighlight: true,
      });
    });
    
    $(function () {
      $("#datepickerUpdate").datepicker({ 
            autoclose: true, 
            todayHighlight: true,
            format: 'dd-mm-yyyy'
      });        
    });
    
    $(function () {
        $('.form_datetime').datetimepicker({
            //language:  'fr',
            weekStart: 1,
            todayBtn:  1,
            autoclose: 1,
            todayHighlight: 1,
            startView: 2,
            forceParse: 0,
            showMeridian: 1,
            format: 'dd-mm-yyyy hh:ii'
        });
    });
    
    $('#closemodal').click(function() {
        $('#list-name').val("");
        $('#savemodal').attr('disabled', 'disabled');
    });

    $('#savemodal').click(function() {
        $('#modalAddList').modal('hide');
        $('#savemodal').attr('disabled', 'disabled');
    });

    $('#saveeditmodal').click(function() {
        $('#modalEditList').modal('hide');
    });

    $(function() {
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
    });
    $(function() {
        $('#list-name-edit').keyup(function() {
            var empty = false;
            if ($('#list-name-edit').val() == '') {
                empty = true;
            }
            if (empty) {
                $('#saveeditmodal').attr('disabled', 'disabled');
            } else {
                $('#saveeditmodal').removeAttr('disabled');
            }
        });
    });
    
    $('.nav-pills a').click(function (e) {
        e.preventDefault()
        $(this).tab('show')
    })
});