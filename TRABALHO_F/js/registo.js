var emails=false;
var pwds=false;
var usernames=false;
var countrys=false;
var firstNames=false;
var lastNames=false;
var image=false;
var descriptions = true;
 
var email = document.getElementById("email");
email.addEventListener("keyup", function(event){
    event.preventDefault();
    checkEmail();
})

function checkEmail(){
    var current_Email = email.value;
    if(current_Email.includes("@")){
        fetch("/Trabalho_F/php/registo_email.php?"+"email="+current_Email).then(function(resp){
            return resp.json();
        }).then(function(data){
            if(data.status != true){
                email.className="form-control is-invalid";
                emails=false;
            }
            else{
                email.className="form-control is-valid";
                emails=true;
            }
        })
    }
}

var username = document.getElementById("username");
username.addEventListener("keyup", function(event){
    event.preventDefault();
    checkUsername();
})


function checkUsername(){
    var current_User = username.value;
    if(current_User.length > 3){
        fetch("/Trabalho_F/php/registo_username.php?"+"user="+current_User).then(function(resp){
            return resp.json();
        }).then(function(data){
            if(data.status != true){
                username.className="form-control is-invalid";
                usernames=false;
            }
            else{
                username.className="form-control is-valid";
                usernames=true;
            }
        })
    }else{
        username.className="form-control is-invalid";
        usernames=false;
    }
}

var pwd = document.getElementById("password");
pwd.addEventListener("keyup", function(event){
    event.preventDefault();
    checkPwdLenght(pwd.value);
    checkPwdLenght2(pwd2.value,pwd.value);
})

var pwd2 = document.getElementById("password2");
pwd2.addEventListener("keyup", function(event){
    event.preventDefault();
    checkPwdLenght2(pwd2.value,pwd.value);
})

function checkPwdLenght(passTest){
    if(passTest < 5){
        pwd.className="form-control is-invalid";
        pwds=false;
    }
    else{
        pwd.className="form-control is-valid";
        pwds=true;
    }
}

function checkPwdLenght2(passTest, passTest2){
    if(passTest < 5){
        pwd2.className="form-control is-invalid";
        pwds=false;
    }
    else{
        pwd2.className="form-control is-valid";
        if(passTest == passTest2){
            pwd2.className="form-control is-valid";
            pwds=true;
        }
        else{
            pwd2.className="form-control is-invalid";
            pwds=false;
        }
    }
}

var firstName=document.getElementById("firstName");
firstName.addEventListener("keyup", function(event){
    event.preventDefault();
    checkFirstName();
});

function checkFirstName(){
    if(firstName.value  .length > 2){
        firstName.className="form-control is-valid";
        firstNames=true;
    }
    else{
        firstName.className="form-control is-invalid";
        firstNames=false;
    }
}

var lastName=document.getElementById("lastName");
lastName.addEventListener("keyup", function(event){
    event.preventDefault();
    checkLastName();
});

function checkLastName(){
    if(lastName.value.length > 2){
        lastName.className="form-control is-valid";
        lastNames=true;
    }
    else{
        lastName.className="form-control is-invalid";
        lastNames=false;
    }
}

var description = document.getElementById("description");
description.addEventListener("keyup", function(event){
    event.preventDefault();
    checkDescription();
});

function checkDescription(){
    if(description.value.length>255){
        description.className="form-control is-invalid";
    }
    else{
        description.className="form-control is-valid";
    }
}

var comboBox = document.getElementById("country");
comboBox.addEventListener("click", function(event){
    event.preventDefault();
    selectedValue();
})

function selectedValue(){
    if(comboBox.value != null){
        countrys = true;
        comboBox.classList.add('is-valid');
    }
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var textoImagem = e.target.result;
            if(textoImagem.includes("data:image/gif") || textoImagem.includes("data:image/png") || textoImagem.includes("data:image/jpeg")){
                $('#avatarImage').attr('src', e.target.result);
                image=true;
                document.getElementById("inputGroupFile").className="custom-file-input form-control is-valid";
            }
            else{
                document.getElementById("inputGroupFile").className="custom-file-input form-control is-invalid";
            }
        }
        reader.readAsDataURL(input.files[0]);
    }
}

$("#inputGroupFile").change(function(){
    readURL(this);
    document.getElementById("url-Image").innerHTML=$('#inputGroupFile').val()
});

//Finalização do registo 
var request;

$("#form-registo").submit(function(event){
    
    event.preventDefault();

    if(emails==true && pwds==true && usernames==true && countrys==true && firstNames==true && lastNames==true && image==true && descriptions==true){

        if(request){
            request.abort();
        };

        var $form = $(this);
    
        var $inputs = $form.find("input, select, button, textarea");
    
        var form = $('#form-registo')[0];
        var dataTeste = new FormData(form)
    
        $inputs.prop("disabled", true);

        request = $.ajax({
            url: "/Trabalho_F/php/registo.php",
            contentType: false,       
            cache: false,             
            processData:false,  
            data: dataTeste,                         
            type: 'post',
            success: function (response) {
                console.log(response);            
     
             },
             error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
             }
        });
    
        request.done(function (response, textStatus, jqXHR){
            // Log a message to the console
            console.log("Hooray, it worked!");
            var forms = document.getElementsByClassName('form-control');
            for(var i=0; i<forms.length; i++){
                if(forms[i].className.includes("is-valid")){
                    forms[i].classList.remove('is-valid');              
                }
            }
            
            window.location = "/Trabalho_F/html/login.html";
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
            document.getElementById("form-registo").reset();
        });
    }
    else{
        var forms = document.getElementsByClassName('form-control');
        for(var i=0; i<forms.length; i++){
            if(!(forms[i].className.includes("is-valid"))){
                if(!forms[i].className.includes("is-invalid")){
                    forms[i].classList.add('is-invalid');
                }               
            }
        }
    }
})

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

