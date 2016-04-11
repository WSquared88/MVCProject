"use strict";

$(document).ready(function() {

    function handleError(message) {
        $("#errorMessage").text(message);
        $("#miiMessage").animate({width:'toggle'},350);
    }
    
    function sendAjax(action, data) {
        $.ajax({
            cache: false,
            type: "POST",
            url: action,
            data: data,
            dataType: "json",
            success: function(result, status, xhr) {
                $("#miiMessage").animate({width:'hide'},350);

                window.location = result.redirect;
            },
            error: function(xhr, status, error) {
                var messageObj = JSON.parse(xhr.responseText);
            
                handleError(messageObj.error);
            }
        });        
    }
    
    $("#makeMiiSubmit").on("click", function(e) {
        e.preventDefault();
		
        $("#miiMessage").animate({width:'hide'},350);
    
        if($("#miiName").val() == '' || $("#miiAge").val() == '' || $("#miiColor").val() == "") {
            handleError("All fields are required");
            return false;
        }

        sendAjax($("#MiiForm").attr("action"), $("#MiiForm").serialize());
        
        return false;
    });
    
});