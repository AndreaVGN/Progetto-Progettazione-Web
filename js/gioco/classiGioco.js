class Casella {  
  constructor(scacchieraDiGioco, x, y, valoreCasella = Math.random() > 0.1 ? 2 : 4) {
    this.casellaDiGioco = document.createElement("div");
    this.casellaDiGioco.classList.add("casella");
    scacchieraDiGioco.append(this.casellaDiGioco);
    this.valoreCasella = valoreCasella;
    this.x = x;
    this.y = y;
    this.controlloEvoluzioneCasella = 0;
  }

  get valoreCasella() {
    return this._valoreCasella;
  }

  set valoreCasella(v) {
    this._valoreCasella = v;
    this.casellaDiGioco.textContent = v;
    if(v!=2){
      let valoreColore = "valore" + v/2;
      this.casellaDiGioco.classList.remove(valoreColore);
    }
    if(v <= 1024){
      this.casellaDiGioco.classList.add("valore" + v);
    } else {
      this.casellaDiGioco.classList.add("valore2048");
    }
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }
  
  set x(valore) {
    this._x = valore
    let nuovoValoreLeft = valore*135+15;
    this.casellaDiGioco.style.left = nuovoValoreLeft+"px";
  }

  set y(valore) {
    this._y = valore;
    let nuovoValoreTop = valore*135+15;
    this.casellaDiGioco.style.top = nuovoValoreTop+"px";
  }

  rimuoviCasellaDiGioco() {
    this.casellaDiGioco.remove();
  }
}
