<?php
    require_once("db_connection.php");

    session_start();

    $conn = Database::getInstance();
    
    if(isset($_SESSION["user"])){
        $user_id = $_SESSION["user"]["id_user"];
    }
    else{
        exit("Erro Session");
    }
    $date=null;
    $startDate=null;
    if(isset($_SESSION["date"])){
        $startDate = $_SESSION["date"];
        $date = date("Y-m-d H:i:s", strtotime("$startDate -1 day"));
        $_SESSION["date"] = $date;
        $exist = true;
    }
    else{
        $date = date("Y-m-d H:i:s");
        $date = date("Y-m-d H:i:s", strtotime("$date -1 day"));
        $_SESSION["date"] = $date;
        $exist = false;
    }

    $rows = array();

    if($exist==true){
        $sql = ("SELECT id_imagem, upvotes, downvotes, pontos, user_imagens.descriptions, dates, url_image, users.id_user, users.username, users.img_url as user_img from user_imagens, seguir, users WHERE seguir.id_user_follow='". $user_id ."' and  seguir.id_user=user_imagens.id_user  and user_imagens.id_user=users.id_user and user_imagens.dates> '". $date ."' and user_imagens.dates< '". $startDate ."' order by dates DESC; ");
        $result=$conn->getConnection()->query($sql);
    }
    else{
        $sql = ("SELECT id_imagem, upvotes, downvotes, pontos, user_imagens.descriptions, dates, url_image, users.id_user, users.username, users.img_url as user_img from user_imagens, seguir, users WHERE seguir.id_user_follow='". $user_id ."' and  seguir.id_user=user_imagens.id_user and user_imagens.id_user=users.id_user and user_imagens.dates> '". $date ."' order by dates DESC; ");
        $result=$conn->getConnection()->query($sql);
    }
    

    if(isset($result)){
        if(mysqli_num_rows($result) > 0){
            while($r = mysqli_fetch_assoc($result)) {
                $rows['imagens'][] = $r;
            }
            echo json_encode($rows);
        }
        else{
            $rows['imagens'] = "noImages";
            echo json_encode($rows);
        }
        
    }else{ 
        $rows['imagens'] = "erro";
        echo json_encode($rows);
    }

?>