<?php

    require_once("db_connection.php");

    $conn = Database::getInstance();

    if (isset($_POST["firstName"]) && isset($_POST["lastName"]) && isset($_POST["username"]) && isset($_POST["email"]) 
    && isset($_POST["password"]) && isset($_POST["pais"]) && isset($_FILES['image']) && isset($_POST["description"])) {
        $email = ($_POST["email"]);
        $pass = ($_POST["password"]);
        $firstName = ($_POST["firstName"]);
        $lastName = ($_POST["lastName"]);
        $username = ($_POST["username"]);
        $pais = ($_POST["pais"]);
        $description = ($_POST["description"]);
    } else {
        die ( 'This should not had happend' );
    }

    if ($_FILES['image']['size'] == 0 && $_FILES['image']['error'] == 0)
    {
        exit("Imagem está empty");
    }

    $basePath = "c:/wamp64/www/Trabalho_F/Imagens/Profile/";
    $filePath = $_FILES['image']['name'];
    list($P_name, $end_point) = explode('.', $filePath);
    $targetPath = $basePath . $username. "." .$end_point;

    if(!isset($filePath)){
        exit("Erro!");
    }

    if (file_exists($targetPath)) {
        exit("ficheiro ja existe");
    }
    
    if (!move_uploaded_file($_FILES['image']['tmp_name'],$targetPath)) {
        exit ("erro ao escrever");
    }

    $sql = "CALL INSERT_USER ('". $username ."', '". $firstName ."', '". $lastName ."', '". $targetPath ."', '". $email ."', '". $pass ."', '". $pais ."', '". $description ."')";

    $result = $conn->getConnection()->query($sql);

    $rows;

    if(isset($result)){
        $rows=true;
    }
    else{
        $rows=false;
    }

    echo $rows;
?>



?>