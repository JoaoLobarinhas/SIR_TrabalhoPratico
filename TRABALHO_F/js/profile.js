var username = document.getElementById("username-profile");
var names = document.getElementById("name-profile");
var descricao = document.getElementById("descricao-profile");
var img_perfil = document.getElementById("img-profile");
var posts = document.getElementById("posts-profile");
var followers = document.getElementById("fle-profile");
var following = document.getElementById("flo-profile"); 


window.onload = function(){
    $("container").fadeIn();
    fetch("/Trabalho_F/php/checkSession.php").then(function(data){
        return data.json();
    }).then(function(data){
        if(data.erro!="erro"){
            fetch("/Trabalho_F/php/profile.php?").then(function(resp){
                return resp.json();
            }).then(function(data){
                username.innerHTML = data.user.username;
                var nome = data.user.firstName+" "+data.user.lastName;
                names.innerHTML = nome;
                descricao.innerHTML = data.user.descriptions;
                var path_full= data.user.img_url;
                var img = path_full.replace('c:/wamp64/www','');
                img_perfil.src=img;
                posts.innerHTML = data.posts.posts;
                followers.innerHTML = data.followers.followers;
                following.innerHTML = data.follow.follow;
                var body = document.getElementById("body");
                body.classList.remove("d-none");
                listFotos(data.user.id_user);
            })
        }
        else{
            window.location = "/Trabalho_F/html/index.html";
        }
        
    })
   
}

// Listar imagens do perfil

function listFotos(id){
    fetch("/Trabalho_F/php/getPhotosP.php?"+"user="+id).then(function(resp){
        return resp.json();
    }).then(function(data){
        // obter grid
        var grid = document.getElementById("images-profile");
        if(data.imagens =="noImages"){
            var ups = document.createElement("h5");
            ups.classList="lead";
            ups.innerHTML="No photos avaible";
            grid.appendChild(ups);
        }
        else if(data.imagens.length>0){
        
            for(var i=0;i<data.imagens.length;i++ ){

                var cards = document.createElement("div");
                cards.className="col-md-5 center-block";
            
                var content = document.createElement("div");
                content.className="card mb-5 shadow-sm";

                var head = document.createElement("div");
                head.className="card-header";

                var btnDelete = document.createElement("btn");
                btnDelete.type="button";
                btnDelete.id=data.imagens[i].id_imagem;
                btnDelete.className="btn btn-sm btn-warning";
                btnDelete.addEventListener("dblclick", function(event){
                    event.preventDefault();
                    $.get("/Trabalho_F/php/deletePhoto.php?",{id:this.id});
                    location.reload();
                })

                var span = document.createElement("span");
                span.innerHTML="Delete Image";
                btnDelete.appendChild(span);
                head.appendChild(btnDelete);
                content.appendChild(head);

                var img_display = document.createElement("img");
                img_display.className = "bd-placeholder-img card-img-top";
                var path_img = data.imagens[i].url_image;
                var imgs = path_img.replace('c:/wamp64/www','');
                img_display.src=imgs;
                img_display.width="100%";
                img_display.height="500";
                img_display.preserveAspectRatio="xMidYMid slice";
                img_display.focusable="false";

                content.appendChild(img_display);

                var card = document.createElement("div");
                card.className="card-body";

                var descs = document.createElement("p");
                descs.className="card-text";
                descs.innerHTML=data.imagens[i].descriptions;
                card.appendChild(descs);

                var locBtns = document.createElement("div");
                locBtns.className="d-flex justify-content-between align-items-center";

                var btns = document.createElement("div");
                btns.className="btn-group";

                var btnUp = document.createElement("btn");
                btnUp.type="button";
                btnUp.id=data.imagens[i].id_imagem;
                btnUp.addEventListener("click",function(event){
                    event.preventDefault()
                    if(this.className=="btn btn-sm btn-outline-success"){
                        var ids=this.id;
                        $.get("/Trabalho_F/php/action_react.php?",{id:this.id,tipo:0})
                        .done(function(data){
                            if(data=="Upvote"){
                                var leads = document.getElementsByClassName("pontos");
                                for(var x = 0; x < leads.length; x++){
                                    if(leads[x].id==ids){
                                        var pt = leads[x].innerHTML;
                                        var ints = parseInt(pt);
                                        leads[x].innerHTML=ints+1;
                                    }
                                }
                            }
                        })
                        this.className="btn btn-sm btn-success";
                        var aux = document.getElementsByClassName("btn btn-sm btn-danger");
                        for(var x = 0; x < aux.length; x++){
                            if(aux[x].id==this.id){
                                aux[x].className="btn btn-sm btn-outline-danger";
                            }
                        }
                    }
                    else if(this.className=="btn btn-sm btn-success"){
                        var ids=this.id;
                        $.get("/Trabalho_F/php/action_react.php?",{id:this.id,tipo:1})
                        .done(function(data){
                            if(data=="Pontuacao anulada"){
                                var leads = document.getElementsByClassName("pontos");
                                for(var x = 0; x < leads.length; x++){
                                    if(leads[x].id==ids){
                                        var pt = leads[x].innerHTML;
                                        var ints = parseInt(pt);
                                        leads[x].innerHTML=ints-1;
                                    }
                                }
                            }
                        })
                        this.className="btn btn-sm btn-outline-success";
                    }
                })

                var btnDown = document.createElement("btn");
                btnDown.type="button";
                btnDown.id=data.imagens[i].id_imagem
                btnDown.addEventListener("click",function(event){
                    event.preventDefault()
                    if(this.className=="btn btn-sm btn-outline-danger"){
                        var ids=this.id;
                        $.get("/Trabalho_F/php/action_react.php?",{id:this.id,tipo:2})
                        .done(function(data){
                            if(data=="Downvote"){
                                var leads = document.getElementsByClassName("pontos");
                                for(var x = 0; x < leads.length; x++){
                                    if(leads[x].id==ids){
                                        var pt = leads[x].innerHTML;
                                        var ints = parseInt(pt);
                                        leads[x].innerHTML=ints-1;
                                    }
                                }
                            }  
                        })
                        this.className="btn btn-sm btn-danger";
                        var aux = document.getElementsByClassName("btn btn-sm btn-success");
                        for(var x = 0; x < aux.length; x++){
                            if(aux[x].id==this.id){
                                aux[x].className="btn btn-sm btn-outline-success";
                            }
                        }
                    }
                    else if(this.className=="btn btn-sm btn-danger"){
                        var ids=this.id;
                        $.get("/Trabalho_F/php/action_react.php?",{id:this.id,tipo:1})
                        .done(function(data){
                            if(data=="Pontuacao anulada"){
                                var leads = document.getElementsByClassName("pontos");
                                for(var x = 0; x < leads.length; x++){
                                    if(leads[x].id==ids){
                                        var pt = leads[x].innerHTML;
                                        var ints = parseInt(pt);
                                        leads[x].innerHTML=ints+1;
                                    }
                                }
                            }
                        })
                        this.className="btn btn-sm btn-outline-danger";
                    }
                })

                
                var iconDown = document.createElement("object");
                iconDown.data="/Trabalho_F/icons/arrow-down.svg";
                iconDown.type="image/svg+xml";
                iconDown.width="24";
                iconDown.height="24";
                var iconUp = document.createElement("object");
                iconUp.data="/Trabalho_F/icons/arrow-up.svg";
                iconUp.type="image/svg+xml";
                iconUp.width="24";
                iconUp.height="24";

                btnUp.appendChild(iconUp);
                btnDown.appendChild(iconDown);

                $.ajax({
                    async: false,
                    type: 'GET',
                    url: "/Trabalho_F/php/getReact.php?"+"photo="+data.imagens[i].id_imagem,
                    success: function(datas) {
                        var obj = JSON.parse(datas);
                        if(obj==1){
                            btnUp.className="btn btn-sm btn-outline-success";
                            btnDown.className="btn btn-sm btn-outline-danger";
                        }
                        else if(obj.react.ponto == 1){
                            btnUp.className="btn btn-sm btn-success";
                            btnDown.className="btn btn-sm btn-outline-danger";
                        }
                        else if(obj.react.ponto == -1){
                            btnUp.className="btn btn-sm btn-outline-success";
                            btnDown.className="btn btn-sm btn-danger";
                        }
                        else{
                            btnUp.className="btn btn-sm btn-outline-success";
                            btnDown.className="btn btn-sm btn-outline-danger";
                        }
                    }
                });

            // $.get("/Trabalho_F/php/getReact.php?"+"photo="+data.imagens[i].id_imagem)
            //     .done(function (data) {
            //         if(data==1){
            //             btnUp.className="btn btn-sm btn-outline-success";
            //             btnDown.className="btn btn-sm btn-outline-danger";
            //         }
            //         else if(data.react.ponto == 1){
            //             btnUp.className="btn btn-sm btn-success";
            //             btnDown.className="btn btn-sm btn-outline-danger";
            //         }
            //         else if(data.react.ponto == -1){
            //             btnUp.className="btn btn-sm btn-outline-success";
            //             btnDown.className="btn btn-sm btn-danger";
            //         }
            //         else{
            //             btnUp.className="btn btn-sm btn-outline-success";
            //             btnDown.className="btn btn-sm btn-outline-danger";
            //         }
            //     })
            //     .fail(function (xhr) {
            //         console.log(xhr);
            //     });


                btns.appendChild(btnUp);
                btns.appendChild(btnDown);

                locBtns.appendChild(btns);

                var pontos = document.createElement("p");
                pontos.className="lead pontos";
                pontos.id=data.imagens[i].id_imagem;
                pontos.innerHTML=data.imagens[i].pontos;

                locBtns.appendChild(pontos);

                var time = document.createElement("p");
                time.className="text-muted";
                time.innerHTML=data.imagens[i].dates;

                locBtns.appendChild(time);

                card.appendChild(locBtns);

                content.appendChild(card);

                cards.appendChild(content);

                grid.appendChild(cards);

            }      
        }
    })
}

//Contas para calcular diferença de datas !IMPORTANTE

const _MS_PER_DAY = 1000 * 60 * 60 * 24;

// a and b are javascript Date objects
function dateDiffInDays(dateGiven) {

    var a = new Date(dateGiven*1000);
    var b = new Date();
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

var imagemP = false;
var imagemU = false;
var desc = false;

//escolha das fotos normais

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var textoImagem = e.target.result;
            if(textoImagem.includes("data:image/gif") || textoImagem.includes("data:image/png") || textoImagem.includes("data:image/jpeg")){
                $('#imgP-profile').attr('src', e.target.result);
                document.getElementById("input-imgP-profile").className="custom-file-input form-control is-valid";
                imagemP=true;
            }
            else{
                document.getElementById("input-imgP-profile").className="custom-file-input form-control is-invalid";
            }
        }
        reader.readAsDataURL(input.files[0]);
    }
}

$("#input-imgP-profile").change(function(){
    readURL(this);
    document.getElementById("urlP-Image").innerHTML=$('#input-imgP-profile').val()
});

// check if descricao não está empty

var description = document.getElementById("description-perfil");
description.addEventListener("keyup", function(event){
    event.preventDefault();
    checkDescription();
});

function checkDescription(){
    if(description.value.length>155 || description.value.length<5){
        description.className="form-control is-invalid";
    }
    else{
        description.className="form-control is-valid";
        desc=true;
    }
}

//Reset no form das imagens normais 

var observerP = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutationRecord) {
        if(targetP.style.cssText.includes("display: none;")){
            document.getElementById("urlP-Image").innerHTML= "Choose file";
            $('#imgP-profile').attr('src', "https://mdbootstrap.com/img/Photos/Others/placeholder-avatar.jpg");
            document.getElementById("input-imgP-profile").className="custom-file-input form-control";
            imagemP=false;
        }
    });    
});

var targetP = document.getElementById('modalP-profile');
observerP.observe(targetP, { attributes : true, attributeFilter : ['style'] });

// Escolha das fotos de perfil

function readURLU(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var textoImagem = e.target.result;
            if(textoImagem.includes("data:image/gif") || textoImagem.includes("data:image/png") || textoImagem.includes("data:image/jpeg")){
                $('#imgU-profile').attr('src', e.target.result);
                document.getElementById("input-imgU-profile").className="custom-file-input form-control is-valid";
                imagemU=true;
            }
            else{
                document.getElementById("input-imgU-profile").className="custom-file-input form-control is-invalid";
            }
        }
        reader.readAsDataURL(input.files[0]);
    }
}

$("#input-imgU-profile").change(function(){
    readURLU(this);
    document.getElementById("urlU-Image").innerHTML=$('#input-imgU-profile').val()
});

//Reset no form de fotos de perfil

var observerU = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutationRecord) {
        if(targetP.style.cssText.includes("display: none;")){
            document.getElementById("urlU-Image").innerHTML= "Choose file";
            $('#imgU-profile').attr('src', "https://mdbootstrap.com/img/Photos/Others/placeholder-avatar.jpg");
            document.getElementById("input-imgU-profile").className="custom-file-input form-control";
            imagemU=false;
        }
    });    
});

var targetU = document.getElementById('modalU-profile');
observerU.observe(targetU, { attributes : true, attributeFilter : ['style'] });

// Fazer o upload das fotos

var request;

//upload photo normal

$("#formP-profile").submit(function(event){
    
    event.preventDefault();

    if(imagemP==true && desc==true){

        if(request){
            request.abort();
        };

        var $form = $(this);
    
        var $inputs = $form.find("input, select, button, textarea");
    
        var form = $('#formP-profile')[0];
        var dataTeste = new FormData(form)
    
        $inputs.prop("disabled", true);

        request = $.ajax({
            url: "/Trabalho_F/php/upload_photo.php",
            contentType: false,       
            cache: false,             
            processData:false,  
            data: dataTeste,                         
            type: 'post',
            success: function (response) {
                console.log(response);            
                if(response != null){
                    document.getElementById("urlP-Image").innerHTML= "Choose file";
                    $('#imgP-profile').attr('src', "https://mdbootstrap.com/img/Photos/Others/placeholder-avatar.jpg");
                    document.getElementById("input-imgP-profile").className="custom-file-input form-control";
                    imagemP=false;
                    location.reload();
                }
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
            document.getElementById("formP-profile").reset();
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

// upload foto de perfil

$("#formU-profile").submit(function(event){
    
    event.preventDefault();

    if(imagemU==true){

        if(request){
            request.abort();
        };

        var $form = $(this);
    
        var $inputs = $form.find("input, select, button, textarea");
    
        var form = $('#formU-profile')[0];
        var dataTeste = new FormData(form)
    
        $inputs.prop("disabled", true);

        request = $.ajax({
            url: "/Trabalho_F/php/upload_photoU.php",
            contentType: false,       
            cache: false,             
            processData:false,  
            data: dataTeste,                         
            type: 'post',
            success: function (response) {
                document.getElementById("urlU-Image").innerHTML= "Choose file";
                $('#imgU-profile').attr('src', "https://mdbootstrap.com/img/Photos/Others/placeholder-avatar.jpg");
                document.getElementById("input-imgU-profile").className="custom-file-input form-control";
                imagemU=false;            
                location.reload();
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
            document.getElementById("formP-profile").reset();
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


