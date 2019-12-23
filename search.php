<?php 
//include("connect.php");
include('index.php'); 

//create an onject
//$obj=new Connect;
//$obj->Mysql();
 
 
 
 
		if(isset($_GET['search'])){
			
			$srch = $_GET['search'];
			
			$srch_query = "SELECT * FROM livematches  WHERE hometeam && awayteam ='$srch' ";
			$srch_sql = mysql_query($srch_query,$obj->connect) or die('could not select from db'.mysql_error());
			
			while($s=mysql_fetch_array($srch_sql,MYSQL_ASSOC)){
				$c= 0;
				$match_id = $s['match_id'];
				$lg = $s['leaguename'];
				$con = $s['country'];
				$hm_team = $s['hometeam'];
				$aw_team = $s['awayteam'];
				++$c;
				
				
				}
			
	}

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Untitled Document</title>
</head>

<body>
<table width="auto" border="2">
  <tr>
    <td colspan="3" align="center" style="font:Verdana, Geneva, sans-serif; background-color:#09F;">Search Query Results</td>
  </tr>
  <tr>
    <td colspan="3">S/N</td>
  </tr>
  <?php for($a=0; $a<$c; $a++){ ?>
  <tr>
    <td><?php echo $match_id?>&nbsp;</td>
    <td><?php echo $lg?>&nbsp;</td>
    <td><?php echo $con?>&nbsp;</td>
    <td><?php echo $hm_team?>&nbsp;</td>
    <td><?php echo $aw_team?>&nbsp;</td>
  </tr>
  <?php }?>
</table>


</body>
</html>