$(function() {
    $('#quote-form').submit(function(e) {
        var errDisplay = document.getElementById("form-messages");
        errDisplay.style.visibility= "hidden";
        errDisplay.style.opacity = 0;
        e.preventDefault();
        var form = $(this);
        var url = "/api/contact-form/";
        // Read form data into JSON object
        var data = {};
        form.serializeArray().map(function(x){data[x.name] = x.value;});
        // Do some validation here
        $.ajax({
            type: "POST",
            url: url,
            data: JSON.stringify(data),
        }).done(function(response) {
            setTimeout(function(){window.location = response.url;}, 500);
        }).fail(function(jqXHR, textStatus, errorThrown) {
            // If fail
            errDisplay.innerHTML = JSON.parse(jqXHR.responseText).message;
            setTimeout(function(){
                errDisplay.style.visibility= "visible";
                errDisplay.style.opacity = 1;
            }, 200);
        })
    });
});