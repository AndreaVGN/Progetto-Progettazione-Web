const griglia = document.getElementById("scacchiera");
creaCelle(griglia);
inizializzaGrigliaDiGioco();

SCORE = parseInt(document.getElementById("score").textContent.slice(7));

interrogaDB("getStatoPartita.php", impostaCaricaPartita);
impostaPulsantiMenu();

avviaMossa();




