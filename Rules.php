<?php


require_once('connect.php');

if(isset($_POST['Submit']))
	{
		$u= $_POST['Username'];
		$p= $_POST['password1'];

		
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



?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Live Betting</title>
<link href="css/rules.css" rel="stylesheet" type="text/css" />
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
<div class="username"><input name="Username" type="text" class="stylelayout" id="Username" required="username"  placeholder="Username"/></div>
<div class="pasword"><input name="password1" type="password" class="stylelayout" id="password1" required="password" placeholder="Password" /></div>
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
<div class="Alabibet_info"> AlabiBet Info</div>

<a href="about us.php">
<div class="colapse">
<div class="sport_text">About Us</div>
</div>

</a>
<a href="Tutorial.php">
<div class="colapse">
<div class="sport_text">Tutorials</div>
</div>

</a>
<a href="Responsiblegaming.php">
<div class="colapse">
<div class="sport_text">Responsible Gaming</div>
</div>

</a>
<a href="Contact us.php">
<div class="colapse">
<div class="sport_text">Contact Us</div>
</div>
</a>
    
<div class="Alabibet_info">Terms & Conditions</div>
<a href="Generalterms&cond.php">
<div class="colapse">
<div class="sport_text">General T&C</div>
</div>
</a>

<a href="Privacy.php">
<div class="colapse">
<div class="sport_text">Privacy</div>
</div>
</a>

<a href="Livebetting.php">
<div class="colapse">
<div class="sport_text">Live Betting</div>
</div>
</a>
</div>
</div>

<div class="middle">
<div class="header">RULES</div>
<div class="txtbox">

</div>

</div>
<div class="right_side">
<div class="Alabibet_info_two">Betslip</div>
<div class="betslip_txt">Click on the odds to add your betslip</div>
<div class="pic_box"><img src="images/book.jpg" width="216" height="179" /></div>
<div class="pic_box"><img src="images/agent_number.jpg" width="216" height="179" /></div>
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