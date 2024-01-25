<?php 
  session_start();
?>
<!DOCTYPE html>
<html lang="it-IT">
<head>
  <meta charset="utf-8">
  <title>2048 Login</title>
  <link rel="icon" type="image/x-icon" href="../../img/2048Logo.png">
  <link rel="stylesheet" href="../../css/styleLoginRegistrazione.css">
</head>
<body>
<img src="../../img/2048Logo.png" alt="Logo">
<form id="formRegistrazione">
  <h1> Login </h1> <a href="registrazione.php" id="signup" target="_blank"> Nuovo utente? </a>
  <br>
  <label for="username"> Username: </label> <br>
  <input id="username" type="text" placeholder="Username" name="username" required>
  <br>
  <label for="password"> Password: </label> <br>
  <input id="password" type="password" placeholder="Password" name="password" required>
  <div id="errorMessage"> </div>
  <br>
  <button type="submit" id="bottoneSubmit" value="Accedi">Login</button>
  <br>
</form>
<script src="../../js/gestioneDB.js"></script>
<script src="../../js/login/funzioniLogin.js"></script>
<script src="../../js/login/codeLogin.js"></script>
</body>
</html>


        


