<?php
    session_start();
    ob_start();

    require_once "Admin connect.php";

    /*
    * check if the session is set and not empty
    * assign the session to a variable
    */
    if(isset($_SESSION['Username']) && !empty ($_SESSION['Username'])) {
        $user_session = $_SESSION['Username'];

    }else {
        //redirect the user
        header("Location:Admin login.php");
    }
?>
<?php
	//create an instance of the object
	$call_db = DatabaseConnect::getInstance();
	
	$query = $call_db->connect->prepare("SELECT * FROM livematches ORDER BY match_id DESC");
	$query->execute();
	
	
	$count = $query->rowCount();
	while($result = $query->fetch(PDO::FETCH_ASSOC))
	{
		$id[]= $result['match_id'];
		$league_name[]= $result['leaguename'];
		$hometeam[]= $result['hometeam'];
		$awayteam[]= $result['awayteam'];
		$count ++;
		

		
		
	 }

	 // to delete from database
	 if(isset($_GET['match_id']))// if it is ok get the ID in the database
	 {
		 $delete=$_GET['match_id'];
		 //prepare the query
		 $del_query = $call_db->connect->prepare("DELETE FROM livematches WHERE match_id='$delete'");
		 $del_result =  $del_query->execute();


		 while($del_result = $del_query->fetch(PDO::FETCH_ASSOC)) 
		 {
		 	$del_id=$del_result['match_id'];
			$home=$del_result['hometeam'];
			$away=$del_result['awayteam'];
					 
		 }

		 if($del_result == true) {
			echo '<script>
				var msg = "Successfully Deleted";
				alert(msg);
			
				</script>';
		 }
		
			
	}

	
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>View live match</title>
<link href="css/adminupload.css" rel="stylesheet" type="text/css" />
<style type="text/css">
a:link {
	color: #333;
	text-decoration: none;
}
a:visited {
	text-decoration: none;
}
a:hover {
	text-decoration: underline;
	color: #278B47;
}
a:active {
	text-decoration: none;
}
</style>
</head>

<body bgcolor="#333333">
<div class="wrapper">
<form action="" method="post" enctype="multipart/form-data">
<div class="banner">
<div class="logo_box"><img src="../images/alabi logo.png" width="260" height="63" /></div>
</div>
<div class="left">
<div class="cont_box"><a href="category.php">Select Sports Category</a></div>
<div class="cont_box"><a href="league name.php">Select League Name</a></div>
<div class="cont_box"><a href="country.php">Select Country</a></div>
<div class="cont_box"><a href="Upload live matches.php">Upload Live Match</a></div>
<div class="cont_box"><a href="upload upcoming events.php">Upload Upcoming Events</a></div>
<div class="cont_box"><a href="View reg users.php">View Registered Users</a></div>
<div class="cont_box"><a href="view live match.php">View Live Match</a></div>
<div class="cont_box"><a href="#">Select Sports Category</a></div>
<div class="cont_box"><a href="#">Select Sports Category</a></div>
<div class="cont_box"><a href="#">Select Sports Category</a></div>

</div>

<div class="right">
  <div class="category">
<table width="742" cellpadding="5" cellspacing="5">
  <tr>
    <td width="69" bgcolor="#C61C1C">Match_id</td>
    <td width="185" bgcolor="#C61C1C">League Name</td>
    <td width="120" bgcolor="#C61C1C">Hometeam</td>
    <td width="128" bgcolor="#C61C1C">Away team</td>
    <td width="40" bgcolor="#C61C1C">Edit</td>
    <td width="47" bgcolor="#C61C1C">View</td>
    <td width="47" bgcolor="#C61C1C">Delete</td>
  </tr>
  <?php for( $a= 0; $a < $count ; ++$a ) {  ?>
	
  <tr>
    <td bgcolor="#278B47"><?php if(isset($id[$a])) {echo $id[$a];}?></td>
    <td bgcolor="#FFFFFF"><?php if(isset($league_name[$a])) { echo $league_name[$a];}?></td>
    <td bgcolor="#FFFFFF"><?php if(isset($hometeam[$a])) { echo $hometeam[$a]; }?></td>
    <td bgcolor="#FFFFFF"><?php if(isset($awayteam[$a])) {echo $awayteam[$a] ;}?></td>
    <td bgcolor="#CCCCCC"><a href="Edit live match.php?match_id=<?php if(isset($id[$a])) { echo $id[$a]; }?>">Edit</a></td>
    <td bgcolor="#CCCCCC"><a href="blank.php?match_id=<?php if(isset($id[$a])) { echo $id[$a]; }?>">View</a></td>
    <td bgcolor="#CCCCCC"><a href="view live match.php?match_id=<?php if(isset($id[$a])) { echo $id[$a]; }?>">Delete</a></td>
    </tr>
    <?php ;}?>
</table>

  </div>
</div>
</form>.

</div>
</body>
</html>