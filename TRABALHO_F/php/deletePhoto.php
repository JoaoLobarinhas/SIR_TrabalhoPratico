<?php
     require_once("db_connection.php");

     session_start();
 
     $conn = Database::getInstance();

     if(isset($_GET["id"]) && isset($_SESSION["user"])){
         $photo = $_GET["id"];
         $id_user = $_SESSION["user"]["id_user"];
     }
     else{
         exit("Imagen ou Sessão não existe");
     }

     $rows = array();

     $sql="SELECT url_image from user_imagens where id_imagem='". $photo ."' and id_user='". $id_user ."'";
     $result = $conn->getConnection()->query($sql);
     if(isset($result)){
        if(mysqli_num_rows($result) > 0){
            while($r = mysqli_fetch_assoc($result)) {
                $rows['imagem'] = $r;
            }
        }
        else{
            exit("Não existe registo");
        }
    }
    else{
        exit("erro no request do qtd de img");
    }

    $sql = "DELETE from user_imagens where id_imagem='". $photo ."' and id_user='". $id_user ."'";
    $result = $conn->getConnection()->query($sql);
    if(isset($result)){
        print_r($rows['imagem']);
        $filepath=$rows["imagem"]["url_image"];
        if (is_file($filepath)){

            unlink($filepath);
            $sql="DELETE from interacao where id_imagem='". $photo ."'";
            $result = $conn->getConnection()->query($sql);
            if(isset($result)){
                print_r("Deleted");
            }
            else{
                exit("erro no delete interacao");
            }
        }
        else{
            exit("Nao consegue localizar o file");
        }
    }
    else{
        exit("erro a eliminar");
    }
?>