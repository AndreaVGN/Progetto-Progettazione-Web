<?php
  session_start();
  if(!isset($_SESSION['start_time'])){
    header('Location: ../account/login.php');
    die;
  }
  else{
    $now = time();
    $time = $now - $_SESSION['start_time'];
    if($time > 3600){ //dopo un'ora la sessione viene distrutta
      header('Location:logout.php');
      die;
    }
  }
?>