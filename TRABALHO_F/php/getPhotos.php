<?php
    require_once("db_connection.php");

    $conn = Database::getInstance();

    $rows = array();

    $sql = 'SELECT id_imagem, upvotes, downvotes, pontos, user_imagens.descriptions, dates, url_image, users.id_user, users.username, users.img_url as user_img from user_imagens, users where user_imagens.id_user=users.id_user and dates >= now() - INTERVAL 1 DAY ORDER BY pontos DESC LIMIT 25';
    $result = $conn->getConnection()->query($sql);
    if(isset($result)){
        if(mysqli_num_rows($result) > 0){
            while($r = mysqli_fetch_assoc($result)) {
                $rows['imagens'][] = $r;
            }
            echo json_encode($rows);
        }
        else{
            $rows['imagens'] = "erro";
            echo json_encode($rows);
        }
        
    }else{ 
        $rows['imagens'] = "erro";
        echo json_encode($rows);
    }

?>