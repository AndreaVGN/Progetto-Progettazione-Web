let grigliaDiGioco = []; 
let SCORE = 0;
let checkRecord = 0;
let controllaMovimento = 0;

function creaCelle(scacchieraDiGioco){ //crea le celle vuote che conterranno le caselle
  for(let i = 0; i < 16; i++){
    const cella = document.createElement("div");
    cella.classList.add("cella");
    scacchieraDiGioco.append(cella);
  }
}

function inizializzaGrigliaDiGioco(){
  for(let i = 0; i < 16; i++){
    grigliaDiGioco[i] = null;
  }
}

function trovaCelleLibere(){ //trova celle che non contengono caselle
  let vettoreIndiciLiberi = [];
  j = 0;
  for(let i = 0; i < 16; i++){
    if(grigliaDiGioco[i] == null){
      vettoreIndiciLiberi[j] = i;
      j++;
    }
  }
  return vettoreIndiciLiberi;
}

function generaCasella(){ //genera una nuova casella se possibile
  let caselleLibere = trovaCelleLibere();
  if(caselleLibere.length == 0){
    return;
  }
  let indice = Math.floor(Math.random() * caselleLibere.length); // indice a caso del vettore caselleLibere
  grigliaDiGioco[caselleLibere[indice]] = new Casella(griglia, caselleLibere[indice] % 4,  Math.floor(caselleLibere[indice]/4));
}

function controllaSconfitta(){
  //controllo per righe 
  for(let i=0; i<4; i++){
    for(let j=0; j<3; j++){
      if(grigliaDiGioco[i*4+j].valoreCasella == grigliaDiGioco[i*4+j+1].valoreCasella)
        return;
  }
}

  //controllo per colonne 
  for(let i=0; i<3; i++){
    for(let j=0; j<4; j++){
      if(grigliaDiGioco[i*4+j].valoreCasella == grigliaDiGioco[(i+1)*4+j].valoreCasella)
        return;
    }
  }

  document.getElementById("messaggioSconfitta").style.visibility = 'visible'; //mostro HAI PERSO! a schermo
  salvaPartita();
  apriMenuTendina();
}

function azzeraMossa(){ //    controlloEvoluzioneCasella è una variabile che gestisce il merge multiplo di caselle in'unica mossa, 
  for(let i=0; i <16; i++) // azione proibita dal gioco
    if(grigliaDiGioco[i]!=null)
      grigliaDiGioco[i].controlloEvoluzioneCasella = 0;
  controllaMovimento = 0;
}


function avviaMossa() {
  window.addEventListener("keydown", gestisciMossa, true);
}

function gestisciMossa(e) {
  switch (e.key) {
    case "ArrowUp":
      e.preventDefault();
      spostaCaselleNord();
      break;

    case "ArrowDown":
      e.preventDefault();
      spostaCaselleSud();
      break;

    case "ArrowLeft":
      e.preventDefault();
      spostaCaselleOvest();
      break;
  
    case "ArrowRight":
      e.preventDefault();
      spostaCaselleEst();
      break;

    default:
      avviaMossa();
      return;
}

  if(controllaMovimento == 1) //se è avvenuto effettivamente un movimento di almeno 1 casella ne genero una nuova, se possibile
    generaCasella();
  azzeraMossa();
  avviaMossa(); //reimposto l'event listener
  aggiornaTabelloniScoreRecord();

  if(trovaCelleLibere().length == 0)
    controllaSconfitta();
}

function aggiornaTabelloniScoreRecord(){
  document.getElementById("score").innerHTML = "SCORE: <br>" + SCORE;
  if(parseInt(document.getElementById("record").textContent.slice(8)) < SCORE){ //se SCORE > RECORD inizio ad aggiornare RECORD ogni volta
    checkRecord = 1;
    document.getElementById("record").innerHTML = "RECORD: <br>" + SCORE;
  }
}

function giraMatrice90GradiOrario(numeroGiri){ //mi permette di girare una matrice di un multiplo di pi/2
  let matriceRuotata = [];
  for(let i = 0; i < 16; i++){
    matriceRuotata[i] = grigliaDiGioco[i];
  }

  for(let k = 0; k < numeroGiri; k++){
    gira90Orario(grigliaDiGioco);
  }
}

function gira90Orario(matriceRuotata){
  let matriceCopia = [];
  for(let i = 0; i < 4; i++){
    for(let j = 0; j < 4; j++){
      matriceCopia[i*4+j] = matriceRuotata[i*4+j]
    }
  }

  for(let i = 0; i < 4; i++){
    for(let j = 0; j < 4; j++){
      matriceRuotata[j*4 + 4-1-i] = matriceCopia[i*4 + j];
      //console.log(grigliaDiGioco[i*4 + j]);
    }
  }
}

function spostaCaselle(direzione){ //la direzione di default implementata è quella verso nord
  for(let j = 0; j < 4; j++){ //per tutte le colonne
    for(let i = 1; i < 4; i++){ //parto dall'analizzare la seconda riga della tabella, perche la prima riga non si puo muovere su
      if(grigliaDiGioco[i*4+j] == null) 
        continue;
      let numeroAvanzamentiCasella = 0;
      let posizioneCorrente = i*4+j;
      for(let c = i-1; c >= 0; c--){ 
        if(grigliaDiGioco[c*4+j] == null){ //sto controllando se mi posso spostare nella casella sopra
          controllaMovimento = 1;
          grigliaDiGioco[c*4+j] = grigliaDiGioco[(c+1)*4+j];
          grigliaDiGioco[(c+1)*4+j] = null;
          posizioneCorrente = c*4+j;
          numeroAvanzamentiCasella++;
        }
        //se la casella è non vuota devo controllare se la casella adiacente è uguale, in tal caso vanno unite
        else if(grigliaDiGioco[c*4+j].valoreCasella == grigliaDiGioco[(c+1)*4+j].valoreCasella  
                && grigliaDiGioco[c*4+j].controlloEvoluzioneCasella == 0 && grigliaDiGioco[(c+1)*4+j].controlloEvoluzioneCasella ==0){
          controllaMovimento = 1;
          grigliaDiGioco[c*4+j].rimuoviCasellaDiGioco();
          grigliaDiGioco[c*4+j] = grigliaDiGioco[(c+1)*4+j];
          grigliaDiGioco[(c+1)*4+j] = null;
          grigliaDiGioco[c*4+j].valoreCasella = 2* grigliaDiGioco[c*4+j].valoreCasella;
          numeroAvanzamentiCasella++;
          posizioneCorrente = c*4+j;
          grigliaDiGioco[c*4+j].controlloEvoluzioneCasella = 1;
          SCORE += grigliaDiGioco[c*4+j].valoreCasella;
          break;
          }
      }
      switch(direzione){
        case "NORD":
          grigliaDiGioco[posizioneCorrente].y = grigliaDiGioco[posizioneCorrente].y - numeroAvanzamentiCasella;
          break;

        case "EST":
          grigliaDiGioco[posizioneCorrente].x = grigliaDiGioco[posizioneCorrente].x + numeroAvanzamentiCasella;
          break;

        case "SUD":
          grigliaDiGioco[posizioneCorrente].y = grigliaDiGioco[posizioneCorrente].y + numeroAvanzamentiCasella;
          break;

        case "OVEST":
          grigliaDiGioco[posizioneCorrente].x = grigliaDiGioco[posizioneCorrente].x - numeroAvanzamentiCasella;
          break;

        default: 
            break;
      }
    }   
  }
}

function spostaCaselleNord(){
  spostaCaselle("NORD");
}

function spostaCaselleSud(){
  giraMatrice90GradiOrario(2);
  spostaCaselle("SUD");
  giraMatrice90GradiOrario(2);
}

function spostaCaselleEst(){
  giraMatrice90GradiOrario(3);
  spostaCaselle("EST");
  giraMatrice90GradiOrario(1);
}

function spostaCaselleOvest(){
  giraMatrice90GradiOrario(1);
  spostaCaselle("OVEST");
  giraMatrice90GradiOrario(3);
}


