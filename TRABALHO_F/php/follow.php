<?php
    require_once("db_connection.php");

    session_start();

    $conn = Database::getInstance();

    if(isset($_GET["user"]) && isset($_SESSION["user"])){
        $id = $_GET["user"];
        $id_follow = $_SESSION["user"]["id_user"];
    }
    else{
        exit("Dados nao validos");
    }

    $sql = "SELECT * from seguir where id_user='". $id ."' and id_user_follow='". $id_follow ."'";
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

    if($exist==true){
        $sql="DELETE from seguir where id_user='". $id ."' and id_user_follow='". $id_follow ."'";
        $result=$conn->getConnection()->query($sql);
        if(isset($result)){
            echo ("Unfollowed");
        }
        else{
            exit ("erro no unfollow");
        }
    }
    elseif($exist==false){
        $sql = "INSERT into seguir (id_user,id_user_follow) values ('". $id ."','". $id_follow ."')";
        $result=$conn->getConnection()->query($sql);
        if(isset($result)){
            echo ("Follow");
        }
        else{
            exit ("erro no follow");
        }
    }
?>