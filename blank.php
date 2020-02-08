<?php
  require_once "connect.php";

  //instantiate the class
  $obj = DatabaseConnect::getInstance();

  $search = $obj->connect->prepare("SELECT * FROM livematches WHERE country LIKE 'g%' " );

  $search->execute();
  $count = $search->rowCount();
  while($row= $search->fetch(PDO::FETCH_ASSOC))
  {
    $id= $row['match_id'];
    $club = $row['country'];
    $home_team= $row['hometeam'];
    $away_team= $row['awayteam'];	
    
    
  }


?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Untitled Document</title>
</head>

<body>
<?php for($a=0; $a<=$count; $a++){?>
<table width="800" border="1" height="124">
  <tr>
    <td><?php echo $id;?></td>
    <td><?php echo $club;?></td>
    <td><?php echo $home_team;?></td>
    <td><?php echo $away_team;?></td>
  </tr>
  
 <?php ;}?>

</table>



</body>
</html>