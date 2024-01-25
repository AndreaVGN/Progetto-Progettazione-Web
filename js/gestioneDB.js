function interrogaDB(filePHP, funzioneDiRisposta){
  let x = new XMLHttpRequest();
  x.open("GET", filePHP, true);
  x.send();
  x.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
      funzioneDiRisposta(JSON.parse(this.responseText));
    }
  }
}
    
function aggiornaDB(datoDaInviare, filePHP){
  let x = new XMLHttpRequest();
  x.open("POST", filePHP, true);
  x.setRequestHeader("Content-Type", "application/json");
  x.send(JSON.stringify(datoDaInviare));
}

function gestioneCredenzialiDB(datoDaInviare, filePHP, funzioneDiRisposta){
  let x = new XMLHttpRequest();
  x.open("POST", filePHP, true);
  x.setRequestHeader("Content-Type", "application/json");
  x.send(JSON.stringify(datoDaInviare));
  x.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
        funzioneDiRisposta(JSON.parse(this.responseText));
    }
  }
}