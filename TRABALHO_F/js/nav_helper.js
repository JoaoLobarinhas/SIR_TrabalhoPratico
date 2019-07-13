var btn_logout = document.getElementById("logOut");
btn_logout.addEventListener("click", function(event){
    event.preventDefault;
    $.get("/Trabalho_F/php/logout.php");
    window.location = "/Trabalho_F/html/login.html"; // Isto vai ser alterado para recarregar a pagina atual mas sem a sessao iniciada
})

var searchBar = document.getElementById("quicksearch");
searchBar.addEventListener("keyup", function(event){
    event.preventDefault();
    getSugest();
})

function getSugest(){
    var div = document.getElementById("aux-search");
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
    if(searchBar.value.length>0){
        $.get("/Trabalho_F/php/searchBarUsernames?user="+searchBar.value)
        .done(function(data){
            var datas = JSON.parse(data);
            if(!(datas.users[0]=="erro")){
                for(var i=0; i<datas.users.length; i++){
                    var li = document.createElement("li");

                    var a = document.createElement("a");
                    a.className="dropdown-item";
                    a.innerHTML=datas.users[i].username;
                    a.id=datas.users[i].id_user;
                    a.addEventListener("click", function(event){
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
                    })

                    li.appendChild(a);
                    div.appendChild(li);
                }
            }
        })
    }
}

