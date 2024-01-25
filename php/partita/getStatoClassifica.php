<?php 
  require "../sessione/sessione.php";

  $connection = new mysqli("localhost", "root", "", "Vagnoli_635788");
  $query = "SELECT U.username, if(DATE_FORMAT(L.data,'%d-%m-%Y'), DATE_FORMAT(L.data,'%d-%m-%Y'), 
            DATE_FORMAT(date(current_timestamp()),'%d-%m-%Y')) as data1, U.record 
            FROM utente U LEFT OUTER JOIN (
            SELECT utente, date(MAX(timestampFineSessione)) as data
            FROM logTable
            GROUP BY utente ) as L
            ON U.username = L.utente 
            ORDER BY U.record DESC";
  $result = $connection->query($query);
  $row = mysqli_fetch_all($result);
  echo json_encode($row);
  $result->free();
  $connection->close();
?>