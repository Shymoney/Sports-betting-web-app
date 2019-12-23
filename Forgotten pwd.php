<?php
require_once('connect.php');

//check for the form submission
if($_SERVER['REQUEST_METHOD']=='POST'){
	
	
//check for the submission if it is not empty for validation
if(!empty($_POST['Username']) && !empty($_POST['Email']))
{
	//check if it isset
	if(isset($_POST['Send']))
	{
		$u= $_POST['Username'];
		$email= $_POST['Email'];
	
	
	//create the body of the mail
	$to = "Contact@AlabiBetinfo.com";
	$body = $u;
	$subject = "Forgotten Password";
	
	
	//sending the mail
	mail($to,$subject,$body,$email);
	}
}


$query = mysql_query("SELECT * FROM registration WHERE Email='$email' && Username='$u'",$connect) or die ('could not select'.mysql_error());
		
		while($row = mysql_fetch_array($query,MYSQL_ASSOC)) 
		{
		
			$p = $row['password1'];
			$p_2= $row['ConfirmPwd'];
		
		}
		
		header('Location:Email sent.php');
	}

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Forgotten password</title>
<link href="css/forgotten pwd.css" rel="stylesheet" type="text/css" />
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
	
    <div class="navbar" role="navigation" >
    	<div class="button"><a href="#" title="Sport">SPORT</a></div>
        <div class="button"><a href="#" title="Live">LIVE</a></div>
        <div class="button"><a href="#" title="Casino">CASINO</a></div>
        <div class="button"><a href="#" title="Bet Odds">BET ODDS</a></div>
        <div class="button"><a href="#" title="Mobile">MOBILE</a></div>
    </div>
   	<div class="sign_in"><form action="<?php echo $_SERVER['PHP_SELF']?>" method="post" enctype="multipart/form-data">
       			<div class="username"><input name="username" type="text" class="stylelayout" id="username" required="username"  placeholder="Username"/></div>
                <div class="pasword"><input name="password" type="password" class="stylelayout" id="password" required="password" placeholder="Password" /></div>
                <div class="submit" title="Login"><input name="Submit" type="submit" class="stylesubmit" value="Login" /></div>            
        </form>
        <div class="forgot_pwd"><a href="Forgotten pwd.php">Password Forgotten?</a></div>
        <div class="register"><a href="Registration.php">Register!!!</a></div>
    </div>


<nav style="top: 101px">
	<ul>
    	<li><a href="index.php" title="Home">Home</a></li>
        <li><a href="#" title="Live Scores">Live Scores</a></li>
        <li><a href="How to Deposit.php" title="How to Deposit/Withdrawal">How to Deposit/Withdrawal</a></li>
        <li><a href="#" title="Results">Results</a></li>
        <li><a href="#" title="Statistics">Statistics</a></li>
        <li><a href="#" title="User guide">User guide</a></li>
        <li><a href="#" title="Live Centre">Live Centre</a></li>
        <li><a href="Contact us.php" title="Contact Us">Contact Us</a></li>
      <li><a href="FAQ.php" title="FAQs">FAQs</a></li>
    </ul>
</nav>
</div>
<div class="social_box"><img src="images/images.png" width="30" height="30" /></div>
<div class="small">Like</div>
<div class="small_1">Share</div>

<div class="container">
<div class="left_side">
<div class="holder">
	<div class="srch"><form action="<?php echo "Search Result";?>" method="get" enctype="multipart/form-data"><input name="search" type="text" class="srch" id="search" placeholder="Search by Name"  title="Search"/> </form></div>
    <a href="#"title="LiveBetting">
    <div class="live_betting"> LiveBetting</div>
    </a>
    
    <a href="#" title="Soccer" role="link">
    <div class="colapse">
    	<div class="sport_img"><img src="images/football.png" width="25" height="20" /></div>
        <div class="sport_text">Soccer</div>
    </div>
    </a>
    <a href="#" title="Basketbal" role="link">
    <div class="colapse">
    	<div class="sport_img"><img src="images/basketball.png" width="25" height="20" /></div>
        <div class="sport_text">Basketball</div>
    </div>
    </a>
    <a href="#" title="American Football" role="link">
    <div class="colapse">
    	<div class="sport_img"><img src="images/ameriacan fotbal.png" width="30" height="20" /></div>
        <div class="sport_text">American Football</div>
    </div>
    </a>
    <a href="#" title="Rugby" role="link">
    <div class="colapse">
    	<div class="sport_img"><img src="images/rugby.png" width="30" height="20" /></div>
        <div class="sport_text">Rugby</div>
    </div>
    </a>
    
    <a href="#" title="Tennis" role="link">
    <div class="colapse">
    	<div class="sport_img"><img src="images/tennis.png" width="25" height="20" /></div>
        <div class="sport_text">Tennis</div>
    </div>
    </a>
    <a href="#" title="Boxing" role="link">
    <div class="colapse">
    	<div class="sport_img"><img src="images/dart.png" width="25" height="20" /></div>
        <div class="sport_text">Boxing</div>
    </div>
    </a>
    <a href="#" title="Snooker" role="link">
    <div class="colapse">
    	<div class="sport_img"><img src="images/snooker.png" width="25" height="20" /></div>
        <div class="sport_text">Snooker</div>
    </div>
    </a>
    <a href="#" title="Handball" role="link">
    <div class="colapse">
    	<div class="sport_img"><img src="images/handball.png" width="25" height="20" /></div>
        <div class="sport_text">Handball</div>
    </div>
    </a>
    <a href="#" title="BeachSoccer" role="link">
    <div class="colapse">
    	<div class="sport_img"><img src="images/beach.png" width="25" height="20" /></div>
        <div class="sport_text">BeachSoccer</div>
    </div>
    </a>
    
    <a href="#" title="Volleybal" role="link">
    <div class="colapse">
    	<div class="sport_img"><img src="images/volley.png" width="25" height="20" /></div>
        <div class="sport_text">Volleyball</div>
    </div>
    </a>
    <a href="#" title="Cricket" role="link">
    <div class="colapse">
    	<div class="sport_img"><img src="images/cricket.png" width="25" height="20" /></div>
        <div class="sport_text">Cricket</div>
    </div>
    </a>
    <a href="#" title="Ice Hockey" role="link">
    <div class="colapse">
    	<div class="sport_img"><img src="images/hockey.png" width="30" height="25" /></div>
        <div class="sport_text">Ice Hockey</div>
    </div>
    </a>
    <a href="#" title="Horse Racing" role="link">
    <div class="colapse">
    	<div class="sport_img"><img src="images/horse racing.png" width="30" height="27" /></div>
        <div class="sport_text">Horse Racing</div>
    </div>
    </a>
    <a href="#" title="Cycling" role="link">
    <div class="colapse">
    	<div class="sport_img"><img src="images/cycling.png" width="30" height="25" /></div>
        <div class="sport_text">Cycling</div>
    </div>
    </a>
    <a href="#" title="Golf" role="link">
    <div class="colapse">
    	<div class="sport_img"><img src="images/golf.png" width="25" height="20" /></div>
        <div class="sport_text">Golf</div>
    </div>
    </a>
    
     <a href="#" title="Darts" role="link">
    <div class="colapse">
    	<div class="sport_img"></div>
        <div class="sport_text">Darts</div>
    </div>
    </a>
    
     <a href="#" title="Darts" role="link">
    <div class="colapse">
    	<div class="sport_img"></div>
        <div class="sport_text">Darts</div>
    </div>
    </a></div>
</div>
<div class="middle">
<div class="lost_box">Have you forgotten your password?</div>
<div class="long">Please Enter your username. Your password will be automatically sent to the registered your email</div>
<div class="form_box">
<form action="" method="post" enctype="multipart/form-data">
<div class="username">Username</div>
<div class="username"><input name="Username" type="text"  placeholder="Username" required="Username" id="Username"/></div>
<div class="username">Email</div>
<div class="username"><input name="Email" type="Email"  placeholder="Email" required="Email" id="Email" /></div>
<div class="send"><input name="Send" type="submit" class="stylesubmit" id="Send" value="SEND" /></div>
</form>
</div>

</div>
<div class="right_side">
<a href="Registration.php">
<div class="register_now">Register Now! Now!! </div>
</a>
</div>
</div>

<div class="footer">
	<ul>
    	<h4><span><a href="#">ALABI BET</a></span>
      </h4>
    	<li><a href="index.php" title="Home">Home</a></li>
        <li><a href="Contact us.php" title="Contact Us">Contact Us</a></li>
        <li><a href="#" title="Userguide">Userguide</a></li>
        <li><a href="about us.php" title="About Us">About Us</a></li>
        <li><a href="#" title="Livescores">Livescore</a></li>
        <li><a href="#" title="Franchise">Franchise</a></li>
        <li><a href="#" title="Web Affiliates">Web Affiliates</a></li>
        <li><a href="How to Deposit.php" title="Payment Method">Payment Method</a></li>
    </ul>
    
    <ul>
    	<h4><span><a href="#">TERMS AND CONDITIONS</a></span>
      </h4>
    	<li><a href="Rules.php" title="Rules">Rules</a></li>
        <li><a href="Responsiblegaming.php" title="Responsible Gaming">Responsible Gaming</a></li>
        <li><a href="Anti-laundering.php" title="Anti-laundering">Anti-laundering</a></li>
        <li><a href="Generalterms&cond.php" title="General T&C">General T&C</a></li>
        <li><a href="Privacy.php" title="Privacy">Privacy</a></li>
        <li><a href="#" title="Work With Us">Work With Us</a></li>
        
    </ul>
    <div class="reserved">
      <p>&copy;Copy Right.2015&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;All Rights Reserved &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Alabi Bet is regulated by Enugu State lotteries Board with the Company Name:AUG group Limited</p>
    </div>
</div>

</div>
</body>
</html>