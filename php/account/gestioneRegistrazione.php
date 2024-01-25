<?php
  session_start();
  $data = json_decode(file_get_contents("php://input"), true);
  $username = $data['username'];
  $password = $data['password'];
  $ripetiPassword = $data['ripetiPassword'];
  if(strlen($username) !=0 && strlen($password)!=0){
    if($password == $ripetiPassword && $password != $username && strlen($password) >= 8 && strlen($username) >= 8
      && preg_match('~[0-9]+~', $password) && !preg_match('/\s/', $password) && !preg_match('/\s/', $username)){ 
      //validazione dell'input anche lato server
      $password = password_hash($password, PASSWORD_BCRYPT); // cifratura della password
      $connection = new mysqli("localhost", "root", "", "Vagnoli_635788");
      $username = $connection->real_escape_string($username);
      $query = "SELECT * FROM utente WHERE username = '$username'";
      $result = $connection->query($query);
      if($result->num_rows != 0){
        $codiceRisposta = 0;
        $_SESSION['message'] = "L'utente &egrave; gi&agrave; presente nel database!";
      } 
      else{
        $codiceRisposta = 1;
        $query = "INSERT INTO utente (username, password, DB_username, DB_password, statoPartita, ultimoScore, record)
                  VALUES ('$username', '$password', 'root', '', 'XXXXXXXXXXXXXXXX', '0', '0')";
        $connection->query($query);
      }
      $result->free();
      $connection->close();
    }
    else{
      $codiceRisposta = 2;
      $_SESSION['message'] = "Errore nella formattazione degli input";
    }
  }
  else{
    $codiceRisposta = 3;
    $_SESSION['message'] = "Errore Imprevisto!";
  }
  echo json_encode($codiceRisposta);
  exit();
?> 