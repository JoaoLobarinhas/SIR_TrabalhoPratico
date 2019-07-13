var firstName = document.getElementById("firstName");
var lastName = document.getElementById("lastName");
var username = document.getElementById("username");
var email = document.getElementById("email");
var pwd = document.getElementById("password");
var pwd2 = document.getElementById("password2");
var desc = document.getElementById("description");
var country = document.getElementById("country");

var emails=false;
var pwds=false;
var firstNames=false;
var lastNames=false;
var descriptions = true;

window.onload = function(){
    fetch("/Trabalho_F/php/getSettings.php").then(function(data){
        return data.json();
    }).then(function(data){
        firstName.placeholder=data.firstName;
        firstName.value=data.firstName;
        lastName.placeholder=data.lastName;
        lastName.value=data.lastName;
        email.placeholder=data.email;
        email.value=data.email;
        desc.placeholder=data.descriptions;
        desc.value=data.descriptions;
        country.value=data.pais;
    })
}

email.addEventListener("keyup", function(event){
    event.preventDefault();
    checkEmail();
})

function checkEmail(){
    var current_Email = email.value;
    if(current_Email.includes("@")){
        fetch("/Trabalho_F/php/settingsEmail.php?"+"email="+current_Email).then(function(resp){
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

pwd.addEventListener("keyup", function(event){
    event.preventDefault();
    checkPwdLenght(pwd.value);
    checkPwdLenght2(pwd2.value,pwd.value);
})

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

desc.addEventListener("keyup", function(event){
    event.preventDefault();
    checkDescription();
});

function checkDescription(){
    if(desc.value.length>255){
        desc.className="form-control is-invalid";
    }
    else{
        desc.className="form-control is-valid";
    }
}

country.addEventListener("click", function(event){
    event.preventDefault();
    selectedValue();
})

function selectedValue(){
    if(country.value != null){
        countrys = true;
        country.classList.add('is-valid');
    }
}

function notChanged(){
    if(emails==false){
        if(email.value==email.placeholder){
            emails=true;
        }
    }
    if(firstNames==false){
        if(firstName.value==firstName.placeholder){
            firstNames=true;
        }
    }
    if(lastNames==false){
        if(lastName.value==lastName.placeholder){
            lastNames=true;
        }
    }
    if(firstNames==false){
        if(firstName.value==firstName.placeholder){
            firstNames=true;
        }
    }
    if(descriptions==false){
        if(desc.value==desc.placeholder){
            descriptions=true;
        }
    }
}

//Finalização do registo 
var request;

$("#form-settings").submit(function(event){
    
    event.preventDefault();

    notChanged();

    if(emails==true && pwds==true && countrys==true && firstNames==true && lastNames==true && descriptions==true){

        if(request){
            request.abort();
        };

        var $form = $(this);
    
        var $inputs = $form.find("input, select, button, textarea");
    
        var form = $('#form-registo')[0];
        var dataTeste = new FormData(form)
    
        $inputs.prop("disabled", true);

        request = $.ajax({
            url: "/Trabalho_F/php/updateUser.php",
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
            
            window.location = "/Trabalho_F/html/profile.html";
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
