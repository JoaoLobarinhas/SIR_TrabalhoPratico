<?php

    require_once("db_connection.php");

    session_start();

    $conn = Database::getInstance();

    if ($_FILES['image']['size'] == 0 && $_FILES['image']['error'] == 0)
    {
        exit("Imagem está empty");
    }

    if(!(isset($_SESSION["user"]))){
        exit("Session nao iniciada");
    }

    $id_user = $_SESSION["user"]["id_user"];
    $username = $_SESSION["user"]["username"];

    $basePath = "c:/wamp64/www/Trabalho_F/Imagens/Profile/";
    $filePath = $_FILES['image']['name'];
    list($P_name, $end_point) = explode('.', $filePath);
    $targetPath = $basePath . $username. "." .$end_point;

    if (!move_uploaded_file($_FILES['image']['tmp_name'],$targetPath)) {
        exit ("erro ao escrever");
    }

    $sql="UPDATE users SET img_url='". $targetPath ."' where id_user='". $id_user ."'";
    $result = $conn->getConnection()->query($sql);
    if(isset($result)){
         exit("fucionou");
    }else{
        exit("erro no request do qtd de img");
    }
?>