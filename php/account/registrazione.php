<?php 
  session_start();
?>
<!DOCTYPE html>
<html lang="it-IT">
<head>
  <meta charset="utf-8">
  <title> 2048 Registrazione </title>
  <link rel="icon" type="image/x-icon" href="../../img/2048Logo.png">
  <link rel="stylesheet" href="../../css/styleLoginRegistrazione.css">
</head>
<body>
  <img src="../../img/2048Logo.png" alt="Logo">
  <form id="formRegistrazione">
    <h1> Signup </h1> 
    <label for="username"> Username: </label> <br>
    <input id="username" type="text" placeholder="Username" name="username" required>
    <br>
    <div id="errorMessageUsername"></div>
    <br>
    <label for="password"> Password: </label> <br>
    <input id="password" type="password" placeholder="Password" name="password" required>
    <br>
    <br>
    <label for="ripetiPassword"> Ripeti Password: </label> <br>
    <input id="ripetiPassword" type="password" placeholder="Ripeti Password" name="ripetiPassword" required>
    <br>
    <br>
    <div id="errorMessagePassword"></div>
    <button type="submit" id="bottoneSubmit">Registrati</button>
    <br>  
  </form>
  <script src="../../js/gestioneDB.js"> </script>
  <script src="../../js/registrazione/funzioniRegistrazione.js"></script>
  <script src="../../js/registrazione/codeRegistrazione.js"></script>
</body>
</html>

