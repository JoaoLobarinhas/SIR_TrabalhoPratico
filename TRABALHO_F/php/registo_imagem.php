<?php
    var_dump($_FILES);

    if ($_FILES['file']['size'] == 0 && $_FILES['file']['error'] == 0)
    {
        exit("Imagem está empty");
    }

    $basePath = "c:/wamp64/www/Trabalho_F/Imagens/Profile/";
    $filePath = $_FILES['file']['name'];
    $targetPath = $basePath . $filePath;

    if(!isset($filePath)){
        exit("this is fucking shit");
    }

    if (file_exists($targetPath)) {
        exit("ficheiro ja existe");
    }
    
    if (!move_uploaded_file($_FILES['file']['tmp_name'],$targetPath)) {
        exit ("erro ao escrever");
    }

    echo json_encode($targetPath);
?>