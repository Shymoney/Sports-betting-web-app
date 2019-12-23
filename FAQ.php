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
<title>FAQ</title>
<link href="css/faq.css" rel="stylesheet" type="text/css" />
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
<div class="username"><input name="Username" type="text" class="stylelayout" id="Username" required="Username"  placeholder="Username"/></div>
<div class="pasword"><input name="password1" type="password" class="stylelayout" id="password1" required="password1" placeholder="Password" /></div>
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
<div class="header">FAQ</div>
<div class="head">
<div class="but">Quick link</div>
<div class="but">General</div>
<div class="but">Payment</div>
<div class="but">Sport</div>
<div class="but">Extra</div>
</div>
<div class="header">GENERAL</div>
<p>&nbsp;</p>
<div class="txtbox">
  <strong><em>Does it cost any money to register on Bet9ja?</em></strong><br />
  No. It’s completely free of charge.
    <p>
    <strong><em>How to register on Bet9ja?</em></strong><br />
    Visit the  Bet9ja website and click on “Register Now” in the top right hand corner, fill in the registration form and submit it by clicking on “Save”.<br />
    N.B: Your personal details need to be correct.</p>
    
    <em><strong>Can I change my username?</strong></em><br />
    Unfortunately no; the username that you have chosen during the registration process cannot be changed once you have created your Bet9ja account.<p>
    
    <em><strong>Forgotten Login Details?</strong></em><br />
    To retrieve your password, please click on “Forgotten Password” on the home page, next to the login area.
    <br />If you have forgotten your username, please contact our Customer Services via mail: cs@mybet9ja.com<p>
    
    <em><strong>How to Change Password?</strong></em><br />
    Login into your account, go to “Account Detail” section, click on the “Change Password” and follow the steps.<p>
    
    <em><strong>Incorrect personal details/email how can I update them?</strong></em><br />
    In case of inaccuracies, please contact our Customer Services to rectify any errors.<p>
    
    <em><strong>Can I open more than one account in Bet9ja?</strong></em><br />
    No. Multiple accounts are not allowed.<p>
    
    <em><strong>What is the minimum age for betting on Bet9ja?</strong></em><br />
    It is  strictly forbidden for persons<strong> under the age of 18</strong> to open an account in Bet9ja and use our services.
    <p>
    
    <em><strong>How to check the Bet9ja provisions?</strong></em><br />
    At the bottom of the website you will find our provisions, divided by products.
    Sport Terms and Conditions, Live Betting T&C and Racing T&C.
  </p>
</div>
<div class="header">PAYMENT</div>
<div class="txtbox"><strong><em>How to Deposit with Debit Card?</em></strong><br />
1. Go to "My Account" section at the top right corner and click on the "Deposit";<br />
2. Click on the image of the Cards;<br />
3. Insert the Amount and click on "Next";<br />
4. Select your type of Card;<br />
5. Click on "Agree with policy and Make Payment";<br />
6. Follow the instructions to complete the payment.<p>

<em><strong>What is the minimum and the maximum deposit amount with Debit Card?</strong></em><br />
The minimum deposit amount is NGN 100.<br />
The maximum deposit amount is NGN 1 000 000.<p>

<em><strong>Are there any fees when depositing?</strong></em><br />
No, there is no fee when depositing withBet9ja.<p>

<em><strong>Can I use my international card?</strong></em><br />
International cards cannot be used on the Bet9ja website.<br />
Only Nigerian Debit Cards can be used on Bet9ja website.<p>

<em><strong>Where can I view information about my previous transactions?</strong></em><br />
Your account statement records the transactions you have made previously such as your deposits or withdrawals and your account balances.<p>

<em><strong>How to Withdraw?</strong></em><br />
1. Go to "My Account" section at the top right corner and click on the "Withdraw".<br />
2. Click on the image of Bank Transfer.<br />
3. Insert your information in the empty fields and click on "Next".<br />
Withdrawal via Bank Transfer is for FREE.<br />
Withdrawals via bank transfer take up to 24 hours after authorisation and are only actioned during banking hours.<p>

<em><strong>Are there any fees when withdrawing?</strong></em><br />
No, there aren't any fees. It's for FREE.<p>

<em><strong>How to check the status of my withdrawal request?</strong></em><br />
You can check the status of your withdrawal request clicking on the withdrawal transaction from your “Account Statement”.</div>
<div class="header">SPORT</div>
<div class="txtbox">
<em><strong>How to place a bet in Sport?</strong></em><br />
To place a bet simply choose a sport type (soccer, tennis, basketball, etc) from the menu located on the left of the homepage,  select Championships/Leagues, select events, click on the chosen odds and insert the stake you wish to bet in the coupon in the right-hand menu, then confirm your bet.<p>
You can place different kind of bets: singles, multiples and system (combined) bets.
Multiple bets may be placed by combining different sports: football, tennis, Formula 1, etc.<p>

<em><strong>What is the minimum and maximum stake for a bet in Sport?</strong></em><br />
The minimum stake is NGN 100 per bet.
There is no strictly defined maximum stake.<p>

<em><strong>What is the maximum Payout?</strong></em><br />
The maximum payout is NGN 20 000 000.<p>

<em><strong>Where can I see my bets in Sport?</strong></em><br />
Go to “My Account” section and click on “Bet List”. You will find a list of all bets you have placed, you can filter them by time and by status.<p>

<em><strong>Can I cancel a bet?</strong></em><br />
No. A confirmed bet cannot be cancelled for any reason.<p>

<em><strong>What is a “Void Bet”?</strong></em><br />
"Void Bet" means the bet is nil or invalid. This occurs when an event is postponed, or when it has started but not finished within the period specified in our policy.
Once the match has been set as void (with odd 1.00) the rest of the winning ticket will then be paid out.<p>

<em><strong>What is Handicap?</strong></em><br />
When betting with a traditional handicap, points or goals are subtracted from the favourite team. If you bet on the stronger team, it will need to perform better than the handicap for you to win your bet (the handicap will be preceded by the sign “-“). The handicap will in fact be subtracted from its final score. Please note that the betting options are 1, X and 2, and that the standard 90 minutes play time has to be completed.
Example: Everton - Liverpool (-1), with Liverpool as favourite team, handicap “-1”. The betting options are 1=you bet on Everton;  x=you bet on a draw; 2=you bet on Liverpool.<p>
1: wins if the match is a draw or Everton wins (ex. Everton – Liverpool: 1-0 or 1-1)<br />
X: wins if Everton loses with a score difference of 1 goal (ex. Everton – Liverpool: 0-1 or 1-2)<br />
2: wins if Liverpool wins with a score difference of at least 2 goals (ex. Everton – Liverpool: 0-2, or 1-3)<br />

The game has finished, but my bet is still not updated?
After a game has finished, there is a working time needed to check the official results, to update the results and settle the bets.<p>

<em><strong>How many events I can add to my bet slip?</strong></em><br />
The maximum number of events you can add to your bet slip is 40.<p>

<em><strong>How to make a system bet/combined bet?</strong></em><br />
Let's choose 4 events and try to combine them.<br />
For easy understanding will name the events with letters:<br />
Arsenal - Chelsea = A<br />
Everton - Liverpool = B<br />
Fulham - West Ham = C<br />
Man Utd - Tottenham = D<br />
If you fully combine the events, the possible combinations will be:<br />
Singles= 4<br />
A, B, C, D<br />
Doubles= 6<br />
AB, AC, AD, BC, BD, CD<br />
Trebles= 4<br />
ABC, ABD, BCD, ACD<br />
4-Folds= 1<br />
ABCD<br />
For example if event A is losing, all combinations that content that event, will be losing:<br />
AB- losing<br />
AC- losing<br />
AD- losing<br />
BC- winning<br />
BD- winning<br />
CD- winning<br />
ABC- losing<br />
ABD- losing<br />
ACD- losing<br />
BCD- winning<br />
ABCD- losing<br />
<p>
And all combinations that don't contain the losing event, will be winning.<br />
You can decide to make part combinations, for example to bet only on doubles, or only on trebles, etc or to make full combination as above.<p>
Our system calculates automatically the number of the combinations, so you need just to select the events, click on COMBINED, to tick the desired combination and to insert the stake.<p>

<em><strong>How long does it take for my bet to be settled?</strong></em><br />
Be assured that Bet9ja strives to settle all events as soon as we can. Nevertheless, in order for us to uphold the accuracy of the results we present to you, there may be cases where additional time is taken to seek official confirmation of results.<p>

<em><strong>Where can I find statistics of an event?</strong></em><br />
For your assistance, Bet9ja provides statistical information on events as reference during betting.
Just click on “Statistics” from the home page, to take an advantage of this service.<p>

<em><strong>Where I can find the results of an event that has ended?</strong></em><br />
For your assistance, Bet9ja provides information about the results of events,. <br />Just click on “Results” from the home page, to take an advantage of this service.<p>

<em><strong>What is Live Betting?</strong></em><br />
Live Betting is an exciting form of wagering that allows to place bets on events that are ongoing at the same time when you are browsing the odds on Bet9ja’s website. The odds are dynamic and change in accordance to the course of the actual event, offering double excitement as you get to monitor the event during play.
</div>
<div class="header">EXTRA</div>
<div class="txtbox">
<em><strong>Does Bet9ja offer bonuses and promotions?</strong></em><br />
Yes. Bet9ja offers a unique bonus on multiple bets.
We add an extra 170% extra bonus to your winning betting slip with minimum of 5 selections.<p>

<em><strong>My Racing ticket has lost, am I still entitled to the Jackpot draw?</strong></em><br />
Yes. All tickets are eligible for the Jackpot draw.<p>

<em><strong>How to become and Agent?</strong></em><br />
If you are interested to become an Agent of Bet9ja, you can reach us through our hot lines 01-4405148 or send an email to: agent@mybet9ja.com and our team of professionals will respond to all your queries.<p>
	
  <strong>Betslip
Click on the odds to add to your betslip </strong></div>

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