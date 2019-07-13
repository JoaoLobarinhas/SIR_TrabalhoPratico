var username = document.getElementById("username-profile");
var names = document.getElementById("name-profile");
var descricao = document.getElementById("descricao-profile");
var img_perfil = document.getElementById("img-profile");
var posts = document.getElementById("posts-profile");
var followers = document.getElementById("fle-profile");
var following = document.getElementById("flo-profile");
var btnFollow = document.getElementById("follow-profile");
var session=false;

window.onload = function(){
    fetch("/Trabalho_F/php/checkSession.php").then(function(data){
        return data.json();
    }).then(function(data){
        if(data.erro!="erro"){
            document.getElementById("btn-loggin").classList.add("d-none");
            document.getElementById("btn-reggist").classList.add("d-none");
            session=true;
        }
        else{
            document.getElementById("myProfile").classList.add("d-none");
            document.getElementById("feed").classList.add("d-none");
            document.getElementById("myAccount").classList.add("d-none");
        }
    });
    
    fetch("/Trabalho_F/php/profileSearch.php?").then(function(resp){
        return resp.json();
    }).then(function(data){
        if(data.user[0]!="erro"){
            clickFollow(data);
            btnFollow.id=data.user.id_user;
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
        }
        
    })
}

//Things follow

function clickFollow(datas){
    fetch("/Trabalho_F/php/checkSession.php").then(function(data){
        return data.json();
    }).then(function(data){
        if(data.erro =="erro"){
            btnFollow.classList.add("d-none");
        }
        else{
            session=true;
            if(btnFollow.classList.contains("d-none")){
                btnFollow.classList.remove("d-none");
            }

            fetch("/Trabalho_F/php/checkFollow.php?"+"user="+datas.user.id_user).then(function(dt){
                return dt.json();
            }).then(function(dt){
                console.log(dt);
                if(dt.follow == 0){
                    btnFollow.className="btn btn-outline-primary my-2";
                }
                else{
                    btnFollow.className="btn btn-primary my-2";
                }
            });
        } 
    });
}

btnFollow.addEventListener("click",function(event){
    event.preventDefault();
    console.log("estou aqui");
    if(btnFollow.className=="btn btn-primary my-2"){
        console.log("estou aqui 1");
        btnFollow.className = "btn btn-outline-primary my-2";
        btnFollow.innerHTML="Following";
        var pt = followers.innerHTML;
        var ints = parseInt(pt);
        followers.innerHTML=ints+1;
    }
    else{
        console.log("estou aqui 2");
        btnFollow.className="btn btn-primary my-2";
        btnFollow.innerHTML="Follow";
        var pt = followers.innerHTML;
        var ints = parseInt(pt);
        followers.innerHTML=ints-1;
    }
    console.log("estou aqui 3");
    fetch("/Trabalho_F/php/follow.php?"+"user="+this.id); 
})

// Listar imagens do perfil

function listFotos(id){
    fetch("/Trabalho_F/php/getPhotosU.php?"+"user="+id).then(function(resp){
        return resp.json();
    }).then(function(data){
        // obter grid
        var grid = document.getElementById("images-profile");
        if(data.imagens!="erro"){
        
            for(var i=0;i<data.imagens.length;i++ ){

                var cards = document.createElement("div");
                cards.className="col-md-5 center-block";
            
                var content = document.createElement("div");
                content.className="card mb-5 shadow-sm";
    
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