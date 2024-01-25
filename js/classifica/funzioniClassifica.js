function creaTabella(contenutoTabella){
  const tableContainer = document.getElementById('classifica'); 
  let rank = 1;
  let table = '<table>';  
  table += '<tr id="intestazione"><th>Rank</th><th>Utente</th><th>Ultimo accesso</th><th>Best</th></tr>';  
  contenutoTabella.forEach(item => {  
    table += `<tr><td>${rank}</td><td>${item[0]}</td><td>${item[1]}</td><td>${item[2]}</td></tr>`;  
    rank++;
  });  
  table += '</table>';   
  tableContainer.innerHTML = table;
}  
