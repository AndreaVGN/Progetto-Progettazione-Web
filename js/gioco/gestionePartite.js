function apriMenuTendina() {
  document.getElementById("menuTendina").style.width = "100%";
}
  
function chiudiMenuTendina() {
  document.getElementById("menuTendina").style.width = "0%";
  document.getElementById("pulsanteNuovaPartita").style.color = '#818181';
  document.getElementById("pulsanteSalvaPartita").style.color = '#818181';
  document.getElementById("pulsanteClassifica").style.color = '#818181';
}    
  
function impostaCaricaPartita(rispostaDB){
  caricaPartita(rispostaDB.statoPartita);
}
  
function caricaPartita(ultimoStatoPartita){
  if(ultimoStatoPartita == "XXXXXXXXXXXXXXXX"){
    generaCasella();
    generaCasella();
  }
  else{
    //carichiamo la partita precedente
    const array = ultimoStatoPartita.split("");
    for(let i = 0; i < 16; i++){
      if(array[i]=='X'){
        continue;
      } 
      if(array[i].charCodeAt(0) >= 65){
        array[i] = array[i].charCodeAt(0) - 65 + 10;
      }
      let value = Math.pow(2, array[i]);
      grigliaDiGioco[i] = new Casella(griglia, i % 4,  Math.floor(i/4), value);
    }
  }
}
    
function salvaPartita() {
  let datoDaInviare = "";
  for(let i=0; i<16; i++){
    if(grigliaDiGioco[i]==null)
      datoDaInviare = datoDaInviare +"X";
    else{
      let logaritmo = Math.log2(grigliaDiGioco[i].valoreCasella)
      if(logaritmo <= 9)
        datoDaInviare = datoDaInviare + logaritmo;
      else 
        datoDaInviare = datoDaInviare + String.fromCharCode(65 - 10 + logaritmo);
    }
  }
  aggiornaDB(datoDaInviare, "salvaPartita.php");
  aggiornaDB(SCORE, "salvaScore.php");
  if(checkRecord == 1){
    checkRecord = 0;
    let RECORD = parseInt(document.getElementById("record").textContent.slice(8));
    aggiornaDB(RECORD, "salvaRecord.php");
  }
}
    
function nuovaPartita() {
  for(let i = 0; i < 16; i++){
    if(grigliaDiGioco[i] != null){
      grigliaDiGioco[i].rimuoviCasellaDiGioco();
      grigliaDiGioco[i] = null;
    }
  }
  document.getElementById("score").innerHTML = "SCORE: <br> 0";
  SCORE = 0;
  caricaPartita("XXXXXXXXXXXXXXXX");
  document.getElementById("messaggioSconfitta").style.visibility = 'hidden';
  salvaPartita();
  avviaMossa();
}

function impostaPulsantiMenu(){ //gestisce i colori delle scritte del meno e del bottone della documentazione
  document.getElementById("navMenu").addEventListener("click", apriMenuTendina);
  document.getElementById("pulsanteChiudi").addEventListener("click", chiudiMenuTendina);

  document.getElementById("pulsanteSalvaPartita").addEventListener("click", function(){
    salvaPartita();
    document.getElementById("pulsanteNuovaPartita").style.color = '#818181';
    document.getElementById("pulsanteSalvaPartita").style.color = 'white';
    document.getElementById("pulsanteClassifica").style.color = '#818181';
  });
    
  document.getElementById("pulsanteNuovaPartita").addEventListener("click", function(){
    nuovaPartita();
    document.getElementById("pulsanteNuovaPartita").style.color = 'white';
    document.getElementById("pulsanteSalvaPartita").style.color = '#818181';
    document.getElementById("pulsanteClassifica").style.color = '#818181';
  });

  document.getElementById("pulsanteClassifica").addEventListener("click", function(){
    document.getElementById("pulsanteNuovaPartita").style.color = '#818181';
    document.getElementById("pulsanteSalvaPartita").style.color = '#818181';
    document.getElementById("pulsanteClassifica").style.color = 'white';
  });
  
  document.getElementById("bottoneDocumentazione").addEventListener("click", function(){
    window.open("../../html/documentazione.html", '_blank');
  });

  document.getElementById("Logout").addEventListener("click", function(){
    salvaPartita();
  });
}