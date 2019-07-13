var divNoUser = document.getElementById("no-user-text")
var session = false;

window.onload = function(){
    fetch("/Trabalho_F/php/checkSession.php").then(function(data){
        return data.json();
    }).then(function(data){
        if(data.erro!="erro"){
            divNoUser.classList.add('d-none');
            document.getElementById("btn-loggin").classList.add("d-none");
            document.getElementById("btn-reggist").classList.add("d-none");
            session=true;
        }
        else{
            document.getElementById("myProfile").classList.add("d-none");
            document.getElementById("feed").classList.add("d-none");
            document.getElementById("myAccount").classList.add("d-none");
        }
        loadFotos();
        loadFotosTop();
    })
}

function loadFotos(){
    fetch("/Trabalho_F/php/getPhotos.php?").then(function(resp){
        return resp.json();
    }).then(function(data){
        // obter grid
        var grid = document.getElementById("images-index");
        
        if(data.imagens!="erro"){
        
            for(var i=0;i<data.imagens.length;i++ ){

                var cards = document.createElement("div");
                cards.className="col-md-5 center-block";
            
                var content = document.createElement("div");
                content.className="card mb-5 shadow-sm";

                var cardHead = document.createElement("div");
                cardHead.classList="card-header";
                cardHead.style="padding: .0rem .0rem!important;";

                var rowCh = document.createElement("div");
                rowCh.classList="row";

                var rowImg = document.createElement("div");
                rowImg.classList="py-1 col-3 col-md-2 pl-4";

                var imgperfil = document.createElement("img");
                var path_img = data.imagens[i].user_img;
                var imgs = path_img.replace('c:/wamp64/www','');
                imgperfil.src=imgs;
                imgperfil.classList="rounded-circle z-depth-1-half avatar-pic";
                imgperfil.alt="Profile Picture";
                imgperfil.id="img-profile";
                imgperfil.width=40;
                imgperfil.height=40;

                rowImg.appendChild(imgperfil);
                rowCh.appendChild(rowImg);

                var rowUsername = document.createElement("div");
                rowUsername.classList="py-2 col-8 col-md-8 pl-1 pb-1";
                
                var username = document.createElement("p");
                username.id=data.imagens[i].id_user;
                username.classList="text-left font-weight-bold";
                username.innerHTML=data.imagens[i].username;
                username.addEventListener("click",function(event){
                    event.preventDefault();
                    $.get("/Trabalho_F/php/profiles.php?id_user="+this.id)
                    .done(function(data){
                        var ok = JSON.parse(data);
                        if(ok=="myProfile"){
                            window.location = "/Trabalho_F/html/profile.html";
                        }
                        else{
                            window.location = "/Trabalho_F/html/profileSearch.html";
                        } 
                    })
                });

                rowUsername.appendChild(username);
                rowCh.appendChild(rowUsername);

                cardHead.appendChild(rowCh);
                content.appendChild(cardHead);
    
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
                var btnDown = document.createElement("btn");
                btnDown.type="button";
                btnDown.id=data.imagens[i].id_imagem;

                if(session==true){
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
                }
                else{
                    btnUp.className="btn btn-sm btn-outline-success";
                    btnDown.className="btn btn-sm btn-outline-danger";
                }

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

function loadFotosTop(){
    fetch("/Trabalho_F/php/getPhotosTop.php?").then(function(resp){
        return resp.json();
    }).then(function(data){
        // obter grid
        var grid = document.getElementById("images-indexTop");
        
        if(data.imagens!="erro"){
        
            for(var i=0;i<data.imagens.length;i++ ){

                var cards = document.createElement("div");
                cards.className="col-md-5 center-block";
            
                var content = document.createElement("div");
                content.className="card mb-5 shadow-sm";

                var cardHead = document.createElement("div");
                cardHead.classList="card-header";
                cardHead.style="padding: .0rem .0rem!important;";

                var rowCh = document.createElement("div");
                rowCh.classList="row";

                var rowImg = document.createElement("div");
                rowImg.classList="py-1 col-3 col-md-2 pl-4";

                var imgperfil = document.createElement("img");
                var path_img = data.imagens[i].user_img;
                var imgs = path_img.replace('c:/wamp64/www','');
                imgperfil.src=imgs;
                imgperfil.classList="rounded-circle z-depth-1-half avatar-pic";
                imgperfil.alt="Profile Picture";
                imgperfil.id="img-profile";
                imgperfil.width=40;
                imgperfil.height=40;

                rowImg.appendChild(imgperfil);
                rowCh.appendChild(rowImg);

                var rowUsername = document.createElement("div");
                rowUsername.classList="py-2 col-8 col-md-8 pl-1 pb-1";
                
                var username = document.createElement("p");
                username.id=data.imagens[i].id_user;
                username.classList="text-left font-weight-bold";
                username.innerHTML=data.imagens[i].username;
                username.addEventListener("click",function(event){
                    event.preventDefault();
                    $.get("/Trabalho_F/php/profiles.php?id_user="+this.id)
                    .done(function(data){
                        var ok = JSON.parse(data);
                        if(ok=="myProfile"){
                            window.location = "/Trabalho_F/html/profile.html";
                        }
                        else{
                            window.location = "/Trabalho_F/html/profileSearch.html";
                        } 
                    })
                });

                rowUsername.appendChild(username);
                rowCh.appendChild(rowUsername);

                cardHead.appendChild(rowCh);
                content.appendChild(cardHead);
    
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
                btnUp.id=data.imagens[i].id_imagem
                btnUp.addEventListener("click",function(event){
                    event.preventDefault()
                    if(this.className=="btn btn-sm btn-outline-success"){
                        $.get("/Trabalho_F/php/action_react.php?",{id:this.id,tipo:0})
                        .done(function(data){
                            
                        })
                        this.className="btn btn-sm btn-success";
                        var aux = document.getElementsByClassName("btn btn-sm btn-danger");
                        for(var x = 0; x < aux.length; x++){
                            if(aux[x].id=this.id){
                                aux[x].className="btn btn-sm btn-outline-danger";
                            }
                        }
                    }
                    else if(this.className=="btn btn-sm btn-success"){
                        $.get("/Trabalho_F/php/action_react.php?",{id:this.id,tipo:1})
                        .done(function(data){
                            
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
                        $.get("/Trabalho_F/php/action_react.php?",{id:this.id,tipo:2})
                        .done(function(data){
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
                        $.get("/Trabalho_F/php/action_react.php?",{id:this.id,tipo:1})
                        .done(function(data){

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

                btns.appendChild(btnUp);
                btns.appendChild(btnDown);

                locBtns.appendChild(btns);

                var pontos = document.createElement("p");
                pontos.className="lead";
                pontos.id=data.imagens[i].id
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