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
<title>Responsible Gaming</title>
<link href="css/responsiblegaming.css" rel="stylesheet" type="text/css" />
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
<div class="header">RESPONSIBLE GAMING</div>
<div class="txtbox">AlabiBet believes in betting as a form of pure entertainment and   guarantees its customers a pleasant recreational experience while   remaining aware of the social and financial problems related to   betting. AlabiBet has developed a series of measures for responsible   betting which allow customers to limit their spending and, if necessary,   to choose to exclude themselves for a certain period of time.
  

</div>
<div class="header">
  RELAX, IT&rsquo;S ONLY A GAME
</div>
<div class="txtbox">
If you play you can win or lose. Gambling can be fun, exciting but there is no economic or mathematical certainty because of course, it’s only a game. In the worst cases you buy a little excitement at the right price.<br />
What is the right price?<br />
For sure it’s what you can afford to gamble while feeling completely at ease. You decide in advance how much to spend on betting and never exceed that limit. You keep the commitment you have made to yourself. Naturally, we offer you the chance to personalise your daily, weekly and monthly spending limit by simply contacting our customer services. 
</div>
<div class="header">
FOLLOW THE 10 BET9JA TIPS
</div>
<div class="txtbox">
1. Gamble for fun, don’t look at gambling as a way of making money;<p>
2. Invest in gambling only the amounts of money that you could possibly afford to lose and don’t gamble the money that you need for daily living;<p>
3. Decide how much time to dedicate to gambling and don’t exceed this limit;<p>
4. Decide how much money to invest in your entertainment and respect the decision you have made;<p>
5. Don’t chase losses, accept the outcome as the cost of entertainment;<p>
6. Don’t ask for credit for gambling;<p>
7. Ensure that you know the rules of the game and the house edge;<p>
8. Balance the time that you dedicate to gambling with other leisure activities ;<p>
9. Don’t gamble to escape from loneliness or depression, only gamble for the desire to play and have fun;<p>
10. Do not bet if your clarity has been impaired by alcohol or drugs. 
</div>
<div class="header">
IF BETTING BECOMES A PROBLEM TAKE A BREAK
</div>
<div class="txtbox">
Problem gambling can be recognised by modes of conduct such as a high level of spending, poor work results, relationship difficulties, theft, lying and depression. If gambling becomes a problem then it is no longer entertainment. If gambling worries you take a break. You should decide when and for how long, just contact us.<p>

TAKE THE TEST AND FIND OUT WHAT TYPE OF PUNTER YOU ARE
<p>
Check periodically to assess your gambling habits. We would like to help you to better understand them and correct them if necessary. Start from this easy test – it will just take a minute:<br />
1. In the last 12 months, have betting or gambling often caused you problems at work or at home?<br />
2. In the last 12 months, have betting or gambling caused arguments or other serious problems with your family, friends, neighbours or colleagues?<br />
3. In the last 12 months, have you tried to hide the amount that you wanted to bet from family members or friends?<br />
4. Do you sometimes say that you are winning when in reality you are losing?<br />
5. With the passing of time have you had to increase the amount of your betting and gambling to keep it exciting?<br />
6. In the last 12 months, have you used gambling or betting to escape from personal problems or to feel better?<br />
7. In the last 12 months, after having lost money gambling, have you immediately gambled again to try to win back the money lost?<br />
8. In the last 12 months, have you tried to collect money for bets by using false cheques, stealing or by resorting to other illegal acts?<br />
9. In the last 12 months, have you gambled even though you had promised yourself not to do so or have had amounts of bets in excess of or for a longer time period than what you prearranged?<br />
If you have responded yes to more than five questions, betting is no longer a form of entertainment for you and may constitute a serious problem. Therefore seriously consider the possibility of taking a break and seek help.<p>
Protecting minors is a fundamental part of our responsible betting policy. Minors less than 18 years of age are forbidden from opening a betting account with Bet9ja. We immediately check the identity of all customers to prevent the services offered on our website being used by minors.<p>
We furthermore recommend that you install a filter programme such as Net Nanny or Cyper Patrol in order to block access by children and adolescents to the betting site.
</div>
<div class="header">DO YOU NEED HELP?</div>
<div class="txtbox">
If you wish to speak to someone contact our customer services available 24 hours a day, 7 days a week, or contact one of the therapeutic associations recommended by Bet9ja.<br>
Gambling Therapy and Gam Care offer help and assistance in professional manner and free to all of those who suffer from problems linked to betting.<p>
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