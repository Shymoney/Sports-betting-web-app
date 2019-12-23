<?php
ob_start();
//connecting to our database
require('connect.php');

//instance of a class is known as obj
$obj = new Connect;
$obj->Mysql();

if(isset($_COOKIE['user']))  $logid= $_COOKIE['user']; else{header('Location:Userprofile.php');}

// we query the database to fetch the user information using the select all query
 $query2= mysql_query("SELECT * from registration
 						WHERE Username='$logid' ",$obj->connect)or die('could not select'.mysql_error());
 while($row= mysql_fetch_array($query2,MYSQL_ASSOC))
 	{
	 
	 $uid= $row['User_id'];
	 $user= $row['Sname'];
	 $name= $row['Name'];

 
	
}




	//deposit query
	//if all is set submit to database
	if(isset($_POST['Submit']))
	{
		$amount= $_POST['Balance'];//this is the value we are submitting 
		
		// now before i insert the values to the database first of all i have to query the database  
		$confirm= mysql_query("select * from payment where P_id='$uid' && Username='$logid' && Balance='$amount'",$obj->connect) or die('could not select'.mysql_error());
		// this is were i'm fetching the values form the database using the loop(while) statement 
		while($colum = mysql_fetch_array($confirm,MYSQL_ASSOC))
		{
			$id= $colum['P_id'];
			$user_name = $colum['Username'];
			$balance = $colum['Balance'];
			
			
		}
		// now we insert those values we got from our select query
		$insert="insert into payment values('','$logid','$amount','','','') ";
		$result=mysql_query($insert,$connect) or die ('could not insert'.mysql_error());
		
		//update the column balance each time a user deposit
		$update=mysql_query("update payment set Balance= + ($amount)",$connect);
	
	
	}
	
	
	
	//using OOP to achieve this deposite result
	
	class Deposite{
	//variable declaration 
	var $balance;
	var $sql;
	
	public function Balance() {
		
		$this->sql = mysql_query("select * from payment where P_id='$uid' && Username='$logid' && Balance='$amount'");
		
		//check if al is set then submit
		if(isset($_POST['submit'])) {}	
		
		
		}
		
		public function Addition(){
			
			
			
			}
	
	
	
		
		
		
		
		
		
		
		}
	
	
	
			
	



			
		
	


?>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Deposit</title>
<link href="css/deposit.css" rel="stylesheet" type="text/css" />
<style type="text/css">
body {
	margin-top: 0px;
	margin-left: 0px;
	margin-right: 0px;
	margin-bottom: 0px;
}
</style>
<script type="text/javascript" language="javascript"></script>
</head>

<body bgcolor="#2A2E37">
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
   	<div class="sign_in">
    
    <div class="user_box"><?php echo $uid; ?></div>
    <div class="user_box"><?php echo $user; ?></div>
    <div class="user_box"><?php echo $name; ?></div>
    <div class="money_box">
    <div class="user_box">
    <form action="" method="post" enctype="multipart/form-data">
    <div class="refresh_box"><input type="image" src="images/Refresh_ico.png" align="right" /></div>
    </form>
    </div>
    <div class="user_box">Availability:</div>
    <div class="user_box"><?php if(isset($update)){echo $update;}?>.00NGN</div>
    </div>
    <div class="money_box2">
    <div class="user_box">Balance</div>
    <div class="user_box"><?php echo $amount + $update?>.00NGN</div>
    </div>
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
	<div class="srch"><form action="" method="post" enctype="multipart/form-data"><input name="search" type="text" class="srch" id="search" placeholder="Search by Name"  title="Search"/> </form></div>
    <a href="#"title="LiveBetting">
    <div class="live_betting"> LiveBetting</div>
    </a>
    
    <a href="#" title="Soccer">
    <div class="colapse">
    	<div class="sport_img"><img src="images/football.png" width="25" height="20" /></div>
        <div class="sport_text">Soccer</div>
    </div>
    </a>
    <a href="#" title="Basketbal">
    <div class="colapse">
    	<div class="sport_img"><img src="images/basketball.png" width="25" height="20" /></div>
        <div class="sport_text">Basketball</div>
    </div>
    </a>
    <a href="#" title="American Football">
    <div class="colapse">
    	<div class="sport_img"><img src="images/ameriacan fotbal.png" width="30" height="20" /></div>
        <div class="sport_text">American Football</div>
    </div>
    </a>
    <a href="#" title="Rugby">
    <div class="colapse">
    	<div class="sport_img"><img src="images/rugby.png" width="30" height="20" /></div>
        <div class="sport_text">Rugby</div>
    </div>
    </a>
    
    <a href="#" title="Tennis">
    <div class="colapse">
    	<div class="sport_img"><img src="images/tennis.png" width="25" height="20" /></div>
        <div class="sport_text">Tennis</div>
    </div>
    </a>
    <a href="#" title="Boxing">
    <div class="colapse">
    	<div class="sport_img"><img src="images/dart.png" width="25" height="20" /></div>
        <div class="sport_text">Boxing</div>
    </div>
    </a>
    <a href="#" title="Snooker">
    <div class="colapse">
    	<div class="sport_img"><img src="images/snooker.png" width="25" height="20" /></div>
        <div class="sport_text">Snooker</div>
    </div>
    </a>
    <a href="#" title="Handball">
    <div class="colapse">
    	<div class="sport_img"><img src="images/handball.png" width="25" height="20" /></div>
        <div class="sport_text">Handball</div>
    </div>
    </a>
    <a href="#" title="BeachSoccer">
    <div class="colapse">
    	<div class="sport_img"><img src="images/beach.png" width="25" height="20" /></div>
        <div class="sport_text">BeachSoccer</div>
    </div>
    </a>
    
    <a href="#" title="Volleybal">
    <div class="colapse">
    	<div class="sport_img"><img src="images/volley.png" width="25" height="20" /></div>
        <div class="sport_text">Volleyball</div>
    </div>
    </a>
    <a href="#" title="Cricket">
    <div class="colapse">
    	<div class="sport_img"><img src="images/cricket.png" width="25" height="20" /></div>
        <div class="sport_text">Cricket</div>
    </div>
    </a>
    <a href="#" title="Ice Hockey">
    <div class="colapse">
    	<div class="sport_img"><img src="images/hockey.png" width="30" height="25" /></div>
        <div class="sport_text">Ice Hockey</div>
    </div>
    </a>
    <a href="#" title="Horse Racing">
    <div class="colapse">
    	<div class="sport_img"><img src="images/horse racing.png" width="30" height="27" /></div>
        <div class="sport_text">Horse Racing</div>
    </div>
    </a>
    <a href="#" title="Cycling">
    <div class="colapse">
    	<div class="sport_img"><img src="images/cycling.png" width="30" height="25" /></div>
        <div class="sport_text">Cycling</div>
    </div>
    </a>
    <a href="#" title="Golf">
    <div class="colapse">
    	<div class="sport_img"><img src="images/golf.png" width="25" height="20" /></div>
        <div class="sport_text">Golf</div>
    </div>
    </a>
    
     <a href="#" title="Darts">
    <div class="colapse">
    	<div class="sport_img"></div>
        <div class="sport_text">Darts</div>
    </div>
    </a>
    
     <a href="#" title="Darts">
    <div class="colapse">
    	<div class="sport_img"></div>
        <div class="sport_text">Darts</div>
    </div>
    </a></div>
</div>
<div class="middle">
<div class="open_acct">Deposits</div>
<div class="vertical_box">
<a href="Deposit.php">
<div class="details">Pay with your card</div>
</a>
<div class="details">Pay with Visa</div>
<div class="details">Pay at ATM</div>
<div class="details">Bank Deposit</div>
<div class="details">Pay to Agent</div>
</div>
<div class="pic_box">
You can now fund your NairaBet account with your Bank Atm card<p><div class="pix"><img src="images/vervemaster.png" /></div>

Accepted Cards are Interswitch Verve cards and Naira Master Cards.<p>


Terms:<br />
* Deposit fees charge applies:<br />
If you use WebPay as your deposit option, we will apply a deposit fee of 1.5%. Maximum charge is N2,000. That means if you wish to credit your NairaBet account with 1,000Naira, your card would be charged 1,015.23 Naira only. If you do not want this charge, please contact an agent to credit you without charge.<br />
* Reports of Unauthorized use of a third party's ATM card would result in your account being suspended, and the funds including any wins may not be released to you.<br />
* By using the Interswitch portal at NairaBet.com, you agree to our terms and conditions.<p>
How To Make Payments with Interswitch Webpay:<p>

Step One: You should have either an Interswitch powered debit card, Verve card or Naira Master Card.<br />
Step Two: Click on the 'Deposits' Link, and then on the 'Pay with your card' option.<br />
Step Three: Enter the amount you want to fund your account with and click on pay. You'll be directed to the payment gateway page.<br />
Step Four: On the payment gateway, select your card type and provide card details, pin and whatever other information is required.<br />
Step Five: You'll be redirected to a status page, where you can view the status of your transaction.<br />
Step Six: If your transaction is successful, your NairaBet account would be funded instantly, and you can make use of the funds.
<p>
<h3>If you have any challenges please contact us at <a href="mailto:support@worldsoccerng.com">support@worldsoccerng.com</a> or alternatively, make use of <a href="www.quickteller.com/Alabibet">www.quickteller.com/Alabibet</a></h3> 

<div class="payment_box">
<form action="" method="post" enctype="multipart/form-data">
<div class="mk_deposit">Make deposit here</div>
<div class="next">
<div class="amount_box">Amount (NGN)</div>
<div class="amount_box"><input name="Balance" type="text" class="style" id="Balance" /></div>
</div>
<div class="next">
<div class="amount_box"><input name="Submit" type="submit" class="submit" value="Next" /></div>
</div>
</form>
</div>
</div>
</div>
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