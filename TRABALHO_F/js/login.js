var request;

$("#form-login").submit(function(event){
    event.preventDefault();

    if(request){
        request.abort();
    };

    var $form = $(this);

    var $inputs = $form.find("input, select, button, textarea");

    var serializedData = $form.serialize();

    $inputs.prop("disabled", true);

    request = $.post('/Trabalho_F/php/login.php', serializedData, function(response) {
        // Log the response to the console
        console.log("Response: "+response);
 
        var aux=JSON.parse(response);
        if(isEmpty(aux)){
            document.getElementById("alert-login").className="alert alert-danger";
        }
        else{
            document.getElementById("alert-login").className="alert alert-danger d-none";
            window.location = "/Trabalho_F/html/profile.html";
        }
    });

    request.done(function (response, textStatus, jqXHR){
        console.log("Hooray, it worked!");
    });

    request.fail(function (jqXHR, textStatus, errorThrown){
        // Log the error to the console
        console.error(
            "The following error occurred: "+
            textStatus, errorThrown
        );
    });

    request.always(function () {
        // Reenable the inputs
        $inputs.prop("disabled", false);
        document.getElementById("form-login").reset();
    });
})

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}


