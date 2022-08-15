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

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Category</title>
<link href="css/adminupload.css" rel="stylesheet" type="text/css" />
<style type="text/css">
a:link {
	color: #333;
	text-decoration: none;
}
a:hover {
	color: #278B47;
	text-decoration: underline;
}
a:active {
	color: #C61C1C;
	text-decoration: none;
}
a:visited {
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
<div class="cont_box"><a href="view live match.php">View Live Match</a></div>
<div class="cont_box"><a href="View reg users.php">View Registered User</a></div>
<div class="cont_box"><a href="#">Select Sports Category</a></div>
<div class="cont_box"><a href="#">Select Sports Category</a></div>
</div>

<?php
		//instantiate the dbconnect class
		$call_db = DatabaseConnect::getInstance();

		if(isset($_POST['submit'])){
			
			$category= $call_db->secureTxt($_POST['category']);

			$query= $call_db->connect->query("INSERT INTO category(Cat_id,CategoryName) VALUES('','$category')");
			
			//bind parameters
			$query->bindParam(':category',$category, PDO::PARAM_STR);
					
			//execute query
			$result = $query->execute();
		
			//output a message
			if($query == true ){
				echo '<script type="text/javascript">
							var msg="Successfully inserted";
							alert(msg);
							</script>';
			}
		}

?>


<div class="right">
<div class="category">
<div class="sport_box">Sports Category</div>
<div class="long">
	<input name="category" type="text" class="long_style" id="category" placeholder="select your sport category" required /></div>
</div>
<div class="category">
  <div class="submit"><input name="submit" type="submit" value="Submit" id="submit" /></div>

</div>


</div>
</form>
</div>
</body>
</html>