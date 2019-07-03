$(function(){
    $("input[type='number']").on("keydown", function(event){
        if(event.keyCode == 69) {
            return false;
        } else {
            return true;
        }
    });

    $("#donate_form").submit(function(event){
        var hostUrl = "http://9.199.145.54:7000/fundInflow";
        var formData = {
            "Name"  : $('input#name').val(),
            "Amount" : $('input#amount').val(),
            "Comments" : $('textarea#comments').val()
        };
        doFormPost(hostUrl, formData, event.target.id);
        event.preventDefault();
    });

    $("#dist_form").submit(function(event){
        var availFund = parseInt($("input#inputAvailAmount").val());
        var allotingFund = parseInt($('input#amount').val());
        if(allotingFund > availFund) {
            $("input#amount").parent().addClass("is-invalid");
            $("#" + event.target.id +" .invalid-feedback").show();
            return false;
        } else {
            var hostUrl = "http://9.199.145.54:7000/fundDistribution";
            var formData = {
                "Rel_Org_Id"  : $('select#rel_org_id').val(),
                "Amount" : $('input#amount').val(),
                "Comments" : $('textarea#comments').val()
            };
            doFormPost(hostUrl, formData, event.target.id);
        }
        event.preventDefault();
    });
    
    var doFormPost = function(hostUrl, formData, formId) {
        $.ajax({
            url: hostUrl,
            type: "POST",
            dataType: "json",
            timeout: 50000,     // timeout milliseconds
            contentType: "application/json",
            data: JSON.stringify(formData),
            crossDomain : true,
            beforeSend: function(){
                $("#submitLoader").modal("show");
            },
            success: function (result,status,jqXhr) {   // success callback function
                $("#submitLoader").modal("hide");
                $("#"+formId).trigger("reset");
                $("#modal-success .modal-body p").html("Data Posted Successfully !");
                $("#modal-success").modal('show');
            },
            error: function (jqXhr, textStatus, errorThrown) { // error callback 
                $("#"+formId).trigger("reset");
                $("#modal-danger .modal-body p").html("Data submission failed !");
                $('#modal-danger').modal('show');
                //console.log(jqXhr);
            }
        });
    };

    $("#login_form").submit(function(event){
        if($("input#email").val() == "admin@example.com" && $("input#password").val() == "password") {
            var currentDate = new Date();
            var date = currentDate.getDate();
            var month = currentDate.getMonth(); //Be careful! January is 0 not 1
            var year = currentDate.getFullYear();
            return true;
        } else {
            event.preventDefault();
        }
    });
});