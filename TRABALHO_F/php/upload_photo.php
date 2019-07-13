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

    if(isset($_POST["descriptions"])){
        $descricao = $_POST["descriptions"];
    }
    else{
        exit ("Sem descricao");
    }
    
    $username = $_SESSION["user"]["username"];
    $id_user = $_SESSION["user"]["id_user"];

    $rows = array();

    $sql = "SELECT MAX(id_imagem) as qtd_img from user_imagens";
    $result = $conn->getConnection()->query($sql);
    if(isset($result)){
        while($r = mysqli_fetch_assoc($result)) {
            $rows['qtd_img'] = $r;
        }
    }else{
        exit("erro no request do qtd de img");
    }

    $basePath = "c:/wamp64/www/Trabalho_F/Imagens/List/";
    $filePath = $_FILES['image']['name'];
    list($P_name, $end_point) = explode('.', $filePath);
    $targetPath = $basePath . $username. "_". $rows['qtd_img']['qtd_img'] ."." .$end_point;

    if (file_exists($targetPath)) {
        print_r("ficheiro ja existe");
    }
    
    if (!move_uploaded_file($_FILES['image']['tmp_name'],$targetPath)) {
        exit ("erro ao escrever");
    }

    $sql = "INSERT into user_imagens (descriptions,url_image,id_user) values ('". $descricao ."' , '". $targetPath ."' , '". $id_user ."')";
    $result = $conn->getConnection()->query($sql);
    if(isset($result)){
        // $rows['result'] = $r; 
    }else{
        exit("erro no request do qtd de img");
    }

    echo json_encode($rows)
?>