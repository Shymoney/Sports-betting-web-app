<?php 

require_once('connect.php');

if(isset($_POST['Submit']))
	{
		$u=mysql_real_escape_string( $_POST['Username']);
		$p=mysql_real_escape_string( $_POST['password1']);

		
//query the database
$login= mysql_query("SELECT * 
				FROM registration 
				WHERE Username='$u' && password1='$p'",$connect) or die('could not login'.mysql_error());

		
	$num= mysql_num_rows($login); 
	while($row= mysql_fetch_array($login))
		{	
			$id=$row['REG_id'];
			$user=$row['Username'];
			$pwd=$row['password1'];
			$confm=$row['ConfirmPwd'];
			$view=$row['view'];
		}
		
		
			//this is where we set our cookies
			if($num>0)
	{
		
$sql= mysql_query("update registration set view=view+1",$connect) or die('could not update'.mysql_error());
							
setcookie('user',$user,time()+3600,'/');
header('location:Userprofile.php');
				
		}
			
			else{echo '<script type="text/javascript">
						var msg="wrong username or password";
						alert(msg);
						</script>';}
						
	}




if(isset($_GET['User_id']))	
	$id= $_GET['User_id'];
	
	$result= mysql_query("select * from registration",$connect ) or die ('could not select'.mysql_error());
	$num= mysql_num_rows($result);
	while($row = mysql_fetch_assoc($result))
	{
		$id2= $row['User_id'];
		$username = $row['Username'];
		
	 }
	
?>



<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Welcome Registration</title>
<link href="css/welcome registration.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" language="javascript"></script>
<style type="text/css">
body {
	margin-top: 0px;
	margin-left: 0px;
	margin-right: 0px;
	margin-bottom: 0px;
}
</style>
</head>

<body>
<div class="wrapper">
  <div class="banner_box">
<div class="logo_box"><img src="images/alabi logo.png" width="260" height="63" /></div> 
	
    <div class="navbar">
    	<div class="button"><a href="#" title="Sport">SPORT</a></div>
        <div class="button"><a href="#" title="Live">LIVE</a></div>
        <div class="button"><a href="#" title="Casino">CASINO</a></div>
        <div class="button"><a href="#" title="Bet Odds">BET ODDS</a></div>
        <div class="button"><a href="#" title="Mobile">MOBILE</a></div>
    </div>
   	<div class="sign_in"><form action="" method="post" enctype="multipart/form-data">
       			<div class="username"><input name="Username" type="text" class="stylelayout" id="Username" required="username" /></div>
                <div class="pasword"><input name="password1" type="password" class="stylelayout" id="password1" required="password" /></div>
                <div class="submit" title="Login"><input name="Submit" type="submit" class="stylesubmit" value="Login" /></div>            
        </form>
        <div class="forgot_pwd"><a href="Forgotten pwd.php">Password Forgotten?</a></div>
        <div class="register"><a href="Registration_part_two.php">Register!!!</a></div>
    </div>


<nav style="top: 101px">
	<ul>
    	<li><a href="index.php">Home</a></li>
        <li><a href="#">Live Scores</a></li>
        <li><a href="How to Deposit.php">How to Deposit/Withdrawal</a></li>
        <li><a href="#">Results</a></li>
        <li><a href="#">Statistics</a></li>
        <li><a href="#">User guide</a></li>
        <li><a href="#">Live Centre</a></li>
        <li><a href="Contact us.php">Contact Us</a></li>
      <li><a href="FAQ.php">FAQs</a></li>
    </ul>
</nav>
</div>
<div class="social_box"><img src="images/images.png" width="30" height="30" /></div>
<div class="small">Like</div>
<div class="small_1">Share</div>

<div class="container">

<div class="open_acct">Open an account</div>
<div class="leftside">
<div class="reg_cmplt_msg">
	<span>Password  successfully Sent!</span><br>
    <span>Please,check  your Email address </span></p>
	<p>You are now ready to start playing and winning. <br>
	To get started with AlabiBet, log-in using your username and password.</p>
	<p>Good luck and have fun!</p>

</div>
<a href="index.php">
<div class="start_playing">START PLAYING</div>
</a>
</div>

</div>


<div class="footer">
	<ul>
    	<h4><span><a href="#">ALABI BET</a></span>
      </h4>
    	<li><a href="index.php" title="Home">Home</a></li>
        <li><a href="Contact us.php"title="Contact Us">Contact Us</a></li>
        <li><a href="#" title="Userguide">Userguide</a></li>
        <li><a href="#" title="Results">Results</a></li>
        <li><a href="#" title="Livescores">Livescore</a></li>
        <li><a href="#" title="Franchise">Franchise</a></li>
        <li><a href="#" title="Web Affiliates">Web Affiliates</a></li>
        <li><a href="How to Deposit.php" title="Payment Method">Payment Method</a></li>
    </ul>
    
    <ul>
    	<h4><span><a href="#">TERMS AND CONDITIONS</a></span>
      </h4>
    	<li><a href="Rules.php" title="Rules">Rules</a></li>
        <li><a href='Responsiblegaming.php' title="Responsible Gaming">Responsible Gaming</a></li>
        <li><a href="Anti-laundering.php" title="Anti-laundering">Anti-laundering</a></li>
        <li><a href="Generalterms&cond.php" title="General T&C">General T&C</a></li>
        <li><a href='Privacy.php' title="Privacy">Privacy</a></li>
        <li><a href="#" title="Work With Us">Work With Us</a></li>
        
    </ul>
    <div class="reserved">
      &copy;Copy Right.2015&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;All Rights Reserved &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Alabi Bet is regulated by Enugu State lotteries Board with the Company Name:AUG group Limited
    </div>
</div>

</div>
<script type="text/javascript" language="javascript">



</script>
</body>
</html>