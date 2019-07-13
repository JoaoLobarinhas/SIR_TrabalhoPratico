<?php
    require_once("db_connection.php");

    session_start();

    $conn = Database::getInstance();
    
    if(isset($_GET["id"]) && isset($_GET["tipo"])){
        $id=$_GET["id"];
        $tipo = $_GET["tipo"];
    }
    else{
        exit ("Erro ao passar os parametros");
    }

    if(!(isset($_SESSION["user"]))){
        exit("Session nao iniciada");
    }

    $id_user = $_SESSION["user"]["id_user"];

    $sql = "SELECT * from interacao where id_imagem='". $id ."' and id_user='". $id_user ."'";
    $result=$conn->getConnection()->query($sql);

    if(!(isset($result))){
        exit ("Erro no select");
    }

    if(mysqli_num_rows($result) > 0){
        $exist=true;
    }
    else{
        $exist=false;
    }

    if($tipo==0){
        if($exist==true){
            $sql="DELETE from interacao where id_imagem='". $id ."' and id_user='". $id_user ."'";
            $result=$conn->getConnection()->query($sql);
            $sql = "INSERT into interacao (id_imagem,id_user,ponto) values ('". $id ."','". $id_user ."', '1')";
            $result=$conn->getConnection()->query($sql);
            if(isset($result)){
                echo ("Upvote");
            }
            else{
                exit ("erro no tipo=0");
            }
        }
        elseif($exist==false){
            $sql = "INSERT into interacao (id_imagem,id_user,ponto) values ('". $id ."','". $id_user ."', '1')";
            $result=$conn->getConnection()->query($sql);
            if(isset($result)){
                echo ("Upvote");
            }
            else{
                exit ("erro no tipo=0");
            }
        }
    }
    elseif($tipo==1){
        if($exist==true){
            $sql="DELETE from interacao where id_imagem='". $id ."' and id_user='". $id_user ."'";
            $result=$conn->getConnection()->query($sql);
            if(isset($result)){
                echo ("Pontuacao anulada");
            }
            else{
                exit ("erro no tipo=1");
            }
        }
        elseif($exist==false){
            exit("it's ok");
        }
    }
    elseif($tipo==2){
        if($exist==true){
            $sql="DELETE from interacao where id_imagem='". $id ."' and id_user='". $id_user ."'";
            $result=$conn->getConnection()->query($sql);
            $sql = "INSERT into interacao (id_imagem,id_user,ponto) values ('". $id ."','". $id_user ."', '-1')";
            $result=$conn->getConnection()->query($sql);
            if(isset($result)){
                echo ("Downvote");
            }
            else{
                exit ("erro no tipo=2");
            }
        }
        elseif($exist==false){
            $sql = "INSERT into interacao (id_imagem,id_user,ponto) values ('". $id ."','". $id_user ."', '-1')";
            $result=$conn->getConnection()->query($sql);
            if(isset($result)){
                echo ("Downvote");
            }
            else{
                exit ("erro no tipo=2");
            }
        }
    }
    
?>