function gestioneInputRegistrazione(){
  let usernameInserito = document.getElementById("username").value;
  let passwordInserito = document.getElementById("password").value;
  let ripetiPasswordInserito = document.getElementById("ripetiPassword").value;

  document.getElementById("errorMessageUsername").textContent = "";
  document.getElementById("errorMessagePassword").textContent = "";

  if(checkInputRegistrazione(usernameInserito, passwordInserito, ripetiPasswordInserito)){
    const dato = {username: "", password: "", ripetiPassword: ""};
    dato.password = passwordInserito
    dato.username = usernameInserito;
    dato.ripetiPassword = ripetiPasswordInserito;
    gestioneCredenzialiDB(dato, "gestioneRegistrazione.php", gestioneRispostaRegistrazioneDB);
  }
}

function checkInputRegistrazione(username, password, ripetiPassword){
  if(username == password){
    document.getElementById("errorMessageUsername").textContent = "Username e Password devono essere diversi!";
    return false;
  }
  //username deve essere almeno di 8 caratteri
  if(username.length < 8){
    document.getElementById("errorMessageUsername").textContent = "L'username deve avere almeno 8 caratteri";
    return false;
  }

  let checkSpazi = 0;
  for(let i = 0; i < username.length; i++){
    if(username[i]!= " ")
      continue;
    checkSpazi = 1;
  }

  if(checkSpazi){
    document.getElementById("errorMessageUsername").textContent = "L'username non deve contenere spazi";
    return false;
  }
        
  checkSpazi = 0;
  let checkNumero = 0;
  //password deve avere almeno 8 caratteri, contenere un numero
  for(let i =0; i < password.length; i++){
    if(isNaN(password[i]))
      continue; 
    checkNumero = 1;
  }

  for(let i = 0; i < password.length; i++){
    if(password[i]!= " ")
      continue;
    checkSpazi = 1;
  }
  
  if(password.length < 8 || checkNumero == 0 || checkSpazi){
    document.getElementById("errorMessagePassword").textContent = "La Password deve avere almeno 8 caratteri, no spazi e contenere almeno 1 numero";
    return false;
  }
      
  if(password != ripetiPassword){
    document.getElementById("errorMessagePassword").textContent = "Password e RipetiPassword devono coincidere";
    return false;
  }

  return true;
}

function gestioneRispostaRegistrazioneDB(rispostaDB){
  switch(rispostaDB){
    case 0: 
      document.getElementById("errorMessagePassword").textContent = "Nome utente già presente nel database";
      break;
    case 1:
      window.location.href = "login.php";
      break;
    case 2:
      document.getElementById("errorMessagePassword").textContent = "Password e RipetiPassword non coincidono";
      break;
    default:
      document.getElementById("errorMessagePassword").textContent = "Si è verificato un errore, riprova!";
      break;
  }
}