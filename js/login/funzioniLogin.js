function gestioneInputLogin(){
  let usernameInserito = document.getElementById("username").value;
  let passwordInserito = document.getElementById("password").value;

  document.getElementById("errorMessage").textContent = "";

  if(checkInputLogin(usernameInserito, passwordInserito)){
    const dato = {username: "", password: ""};
    dato.password = passwordInserito
    dato.username = usernameInserito;
    gestioneCredenzialiDB(dato, "gestioneLogin.php", gestioneRispostaLoginDB);
  }
}

function checkInputLogin(username, password){
  //username deve essere almeno di 8 caratteri
  if(username.length < 8){
    document.getElementById("errorMessage").textContent = "Credenziali inserite non valide";
    return false;
  }
        
  let checkNumero = 0;
  for(let i = 0; i < username.length; i++){
    if(username[i]!= " ")
      continue;
    checkNumero = 1;
  }

  if(checkNumero){
    document.getElementById("errorMessage").textContent = "L'username non deve contenere spazi";
    return false;
  }

  checkNumero = 0;
  let checkSpazi = 0;
  //password deve avere almeno 8 caratteri, contenere un numero
  for(let i =0; i < password.length; i++){
    if(isNaN(password[i]) && password[i]!=" ")
      continue; 
    checkSpazi = 1;
  }

  for(let i = 0; i < password.length; i++){
    if(password[i]!= " ")
      continue;
    checkNumero = 1;
  }
  
  if(password.length < 8 || checkSpazi == 0 || checkNumero){
    document.getElementById("errorMessage").textContent = "Credenziali inserite non valide";
    return false;
  }

  return true;
}

function gestioneRispostaLoginDB(rispostaDB){
  switch(rispostaDB){
    case 0: 
      document.getElementById("errorMessage").textContent = "Utente non presente nel database";
      break;
    case 1:
      window.location.href = "../partita/gioco.php";
      break;
    case 2:
      document.getElementById("errorMessage").textContent = "Password Errata";
      break;
    default:
      document.getElementById("errorMessage").textContent = "Si è verificato un errore, riprova!";
 }
}