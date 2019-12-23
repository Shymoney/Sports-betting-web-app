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
<title>General Terms&amp; conditions</title>
<link href="css/GeneralT&C.css" rel="stylesheet" type="text/css" />
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
<div class="header">General Terms &amp; Conditions</div>
<div class="txtbox">
  1. These general Terms and Conditions ("Terms and Conditions" or "T&C") shall be valid for all betting games offered by Bet9ja (a company duly organized under the laws of Nigeria, with business registration RC 1035305.<p>

2. Bet9ja shall offer betting services through various channels not limited to POS, SMS, USSD hereon referred to as ‘the service".<p>

3. By using the service you are bound by the following terms and conditions:<p>

• The General Terms and Conditions;<br />
<br />

• The Live Betting Rules;<br />
<br />

• The Privacy Policy;<br />
<br />

• The General Sport Betting Rules;<br />
<br />

• Any terms and conditions and/or rules concerning bonuses, promotions and special offers which may be advertised in any part of our website;<p>

• Any further terms and conditions contained in any of the software which you may download in order to be able to use the services we provide.<p>

4. All the terms and conditions listed in this page shall together be referred to as "the Terms of Use". "User" and "Customer", "You" and "Your" refers to you, the person accessing the Service and accepting the Company's terms and conditions. Whenever the Customer uses the service such as to place a bet or to participate in any of the promotions offered, he agrees to be bound by the Terms of Use, including any amendment which may periodically take place.<p>

5. The Terms and Conditions contained herein represent the complete, final and exclusive agreement between the Customer and the Company and supersede and merge all prior agreements, representations and understandings.<p>

6. By using the service the Customer confirms that he/she has reached the age of 18 or such legal age as he/she must have reached under the laws governing betting that are applicable to him/her. Irrespective of national regulations concerning the legal age, however, Bet9ja does not accept any Users under the age of 18. Bet9ja reserves the right to verify any Customer's statement of age and to exclude Customers from its services, if there are any doubts regarding the attainment of the minimum age required. Any Customer using our services, who is identified as underage, shall have all his winnings forfeited and his/her (betting) account (hereinafter referred to as the "Account" shall be blocked immediately.<p>

7. Non-Commercial, non-professional purposes: the Customer´s interest in using the service is of a personal nature, and is to be used purely for personal entertainment. Any commercial and professional interest is discarded.<p>

8. Bet9ja does not warrant the constant availability and functionality of all or any products offered by Bet9ja. Bet9ja may not be held liable and will be held harmless by the Customer for any damages, losses, costs, loss of profits or any other disadvantage a Customer may incur in connection with any disconnection from or the non-availability of any of the products offered by Bet9ja for whatever reason.<p>

9. Bet9ja cannot be held liable in any case for any damage or loss caused directly or indirectly by the service or by its contents or by the contents provided by a third party, unless they are based on intentional or gross negligence.<p>

10. Bet9ja shall not be liable if the Customer is unable to place a bet due to congestion on the sms system or any other electronic communication media used for the purposes of betting.<p>

11. All indicated dates and times are based on WAT (West Africa Time) unless stipulated otherwise.<p>

12. Any exception to the existing Terms of Use will be communicated in written form to the Customer. Any verbal statement made by Bet9ja employees or affiliates will not be considered in case of a dispute.<p>

13. The betting contract, as well as any other legal relationship between the Customer and the Company, for every circumstance not regulated by the Terms of Use, is subject to Nigerian laws.<p>

14. The betting service is available in Nigerian Naira (NGN) only.<p>
</div>
<div class="header">
  LEGAL USE OF THE WEBSITE AND OF ITS COMPONENTS
</div>
<div class="txtbox">

1. Under no circumstances shall the Website be used for any purpose different from personal entertainment without our express consent. Bet9ja is not liable for any attempts to use the services offered by means or ways not intended by us.<p>

2. All Trademarks, Domains, Terms of Use, Logos, Images and any other material used by or in Bet9ja’s products (Ex. graphics, pictures, text etc.), as well as any other content or underlying idea that can be found within our Website, are owned by Bet9ja and protected by copyright in their entirety and may not be modified, reproduced and redistributed, in whole or in part, without Bet9ja’s express previous written permission. All necessary legal actions will be undertaken in order to ensure compliance to this policy.<p>

3. Any action aimed to interfere with the normal functioning of the website including, but not limited to, releasing or propagating viruses, worms or logic bombs or similar is strictly prohibited and will be pursued to the fullest extent permitted by law.<p>

4. The repeated placement of the same bet may be considered as an attempt to elude our controls and may result in the voidance of the repeated bet(s) as well as in the closure of the game account, even after said bets have been settled.<p>

5. Bet9ja reserves the right to restrict access to certain parts of the Website and to certain services offered, including, but not limited to Live Betting, Live Chat and Internal Messaging system.<p>

6. Bet9ja may at any time and without previous notice, remove or amend any product offered via the Website, as well as alter available prices where such alterations do not affect bets already in progress.<p>

7. Under some circumstances Bet9ja may provide its Customers with software designed internally or by third parties in order to optimize the functioning of the Website or to benefit from additional services. In such circumstances the Customer may be asked to accept further Terms and Conditions related to the utilization of the new component. Any attempt to interfere with, modify or reverse engineer any software provided is strictly prohibited.<p>

8. Bet9ja is not liable for any possible IT failures caused by the electronic equipment used by the Customer while accessing the Website or for faults due to the internet service provider used by the Customer while accessing the Website.<p>

9. Bet9ja also assumes no liability for correctness, completeness or up-to-dateness of the information services provided neither for the accuracy of livescores, statistics and intermediate results available in our website.
</div>

<div class="header">RESPONSIBLE GAMING</div>
<div class="txtbox">
  <p>1. We believe in Responsible Gaming and take our responsibility in this matter seriously. Gambling should be an exciting pastime, and we urge our Customers to have fun, but not bet beyond their means. Bet9ja is committed to endorsing responsible wagering among its Customers as well as promoting the awareness of problem gambling and improving prevention, intervention and treatment.&lt;p&gt;</p>
  <p>2. We undertake any effort in order to ensure your pleasant online gaming experience while playing in Bet9ja, keeping full awareness of the financial harms associated with problem gambling. With regard to the purposes pointed out herewith, we do strongly suggest our Customers to try keeping clearly separate gambling from his/her daily activities; try establishing affordable deposit limits; try considering the lasting time of each gambling session before its commencing; not to understand gambling as an alternative source of income or a way to recoup debit;&lt;p&gt;</p>
  <p>3. At any time the Customer may request to our Customer Service temporary or permanent self-exclusion from part or all of our services as well as the closure of his/her account. We will use all our reasonable endeavours to ensure compliance with self-exclusion; however you accept that we are not liable if you manage to by-pass our security measures in circumstances which are beyond our reasonable control.&lt;p&gt;</p>
  <p>4. The Customer may as well request to our Customer Service to activate deposit limits on his/her account, or to modify the existing ones. Bet9ja provides its users with the facilities to set their own limit on deposits on a daily, weekly or a monthly basis. We will use all our reasonable endeavours to ensure the effective enforcement of the deposit limits; however you accept that we are not liable if you manage to by-pass our security measures in circumstances which are beyond our reasonable control. Revocation of previously self-imposed limit shall come into effect only after seven days after the Company has received the request of Revocation.</p>
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