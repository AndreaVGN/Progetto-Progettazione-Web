<?php 
  require "../sessione/sessione.php";
?>
<!DOCTYPE html>
<html lang="it-IT">
<head>
  <meta charset="UTF-8">
  <title>2048</title>
  <link rel="icon" type="image/x-icon" href="../../img/2048Logo.png">
  <link rel="stylesheet" href="../../css/styleGioco.css">
</head>
<body> 
  <div id="menuGioco">
    <img src="../../img/2048Logo.png" alt="Logo">
    <p id="score"> SCORE: 
      <?php 
        $username = $_SESSION['username'];
        $connection = new mysqli("localhost", "root", "", "Vagnoli_635788");
        $query = "SELECT ultimoScore FROM utente WHERE username = '$username'";
        $result = $connection->query($query);
        $user_row = $result->fetch_array();
        $connection->close();
        echo "<br>";
        echo $user_row['ultimoScore'];
      ?>
    </p>
    <p id="record"> RECORD: <br>
      <?php 
        $username = $_SESSION['username'];
        $connection = new mysqli("localhost", "root", "", "Vagnoli_635788");
        $query = "SELECT record FROM utente WHERE username = '$username'";
        $result = $connection->query($query);
        $user_row = $result->fetch_array();
        $connection->close();
        echo $user_row['record'];
      ?>
    </p>
    <button id = "bottoneDocumentazione"> ? </button>
    <div id="navMenu"> 
      <div class="linea"> </div>
      <div class="linea"> </div>
      <div class="linea"> </div>      
    </div>
  </div>
  <div id="gioco"> 
    <div id="scacchiera"></div>
  </div>
  <div id="menuTendina" class="menuScomparsa">
    <a id="pulsanteChiudi">&times;</a>
    <div id="contenutoMenuScomparsa">
      <div class="oggettiMenu">CIAO 
        <?php echo $_SESSION['username'];?>!
      </div> 
      <br>
      <div id= "messaggioSconfitta" > HAI PERSO! </div> 
      <a href="#" id="pulsanteSalvaPartita" class="oggettiMenu">Salva Partita</a>
      <a href="#" id="pulsanteNuovaPartita" class="oggettiMenu">Nuova Partita</a>
      <a href="../../html/Classifica.html" target="_blank" id="pulsanteClassifica" class="oggettiMenu">Classifica</a>
      <a href="../sessione/salvaSessione.php" id="Logout" class="oggettiMenu"> Logout </a>
    </div>
  </div>   
  <script src="../../js/gestioneDB.js"></script> 
  <script src="../../js/gioco/classiGioco.js"></script>
  <script src="../../js/gioco/meccanicaDiGioco.js"></script>    
  <script src="../../js/gioco/gestionePartite.js"></script>
  <script src="../../js/gioco/codeGioco.js"></script>
</body>
</html>