<?php
session_start();

	require_once "connect.php";

	function SeleectAllUsers() {

        //call the instance of the class
        $obj =  DatabaseConnect::getInstance();

        if(isset($_POST['Submit'])) {

            //check if the username field is empty  
            if(empty($_POST['Username'])) {
                
                //print out a an error msg
                echo '<script>
                        var msg = " Username Cannot be empty";
                        alert(msg);
                    </script>';
                            
            }else{
                //query the database
                $u = $obj->connect->quote($_POST['Username']);
            }
        
            //check if password field is empty
            if(empty($_POST['password1'])) {
                
                //print out an error msg
                echo '<script>
                        var msg = " Password Cannot be empty";
                        alert(msg);
                    </script>';
                            
            }else{
                //query the database for the password
                $p = $obj->connect->quote($_POST['password1']);
            }
		
		
            //query the database
            $login= $obj->connect->prepare("SELECT * 
                            FROM registration 
                            WHERE Username='$u' && Password='$p'");
                //bind parameters            
                $login->bindParam(':Username', $u );
                $login->bindParam(':Password', $p); 
            //execute query   
            $login->execute();
            
            if($login->rowCount() > 0){
            
                while($row= fetch(PDO::FETCH_ASSOC)) {
                        
                        $id=$row['REG_id'];
                        $user=$row['Username'];
                        $pwd=$row['password1'];
                        $confm=$row['ConfirmPwd'];
                        $view=$row['view'];
                    }
                
                

                
                $query = $obj->connect->prepare("update registration set view=view+1");
                $query->execute();
                                    
                $_SESSION['Username'] = $row['Username'];
                header('location:Userprofile.php');
                                
            }
                            
                    else{
                            echo'<script type="text/javascript">
                            var msg="wrong username or password";
                                alert(msg);
                                    </script>';
                        }
                    
                        
	}
    	return true;

	}   //here i execute the function
    	SeleectAllUsers();


?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Live Betting</title>
<link href="css/Livebetting.css" rel="stylesheet" type="text/css" />
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
<div class="header">Live Betting Terms & Conditions</div>
<div class="txtbox">
<strong>Article 1<br />
Technical time lag for acceptance</strong><br />
Once you have placed the bet, you will need to wait the time required for acceptance before it comes to validity. If during this interval the chosen odds  removed or suspended, the bet will be automatically rejected. Should the odds change , the bet will be rejected, unless the "Accept Change Odds" option on the coupon has been checked.<p>

<strong>Article 2<br />

Bet acceptance with reservation</strong><br />
Whenever a bet is submitted to manual approval, Bet9ja retains the right to refuse it or to reduce the amount staked. The stake can be reduced only if the "Accept Odds Changes" option on the coupon has been checked.<p>

<strong>Article 3<br />
Bet acceptance in "Danger Zone"
</strong><br />
Bet9ja reserves the right to extend the time lag for acceptance whenever a bet is placed during a risky action whose outcome may alter noticeably the odds available (s.c. "Danger Zone"). In this case a message will inform the customer about the risky action, and all bets placed during this interval will be accepted or refused at its conclusion.<p>

<strong>Article 4</strong><br />
It is up to the Customer to verify that the number of bets placed and the amount staked are coherent with his will before confirming the bet. Once confirmed, the bet cannot be changed or cancelled by the Customer.<p>

<strong>Article 5</strong><br />
The Customer declares not to be aware of the outcome of the event when placing a bet. In the event that there are reasons to believe that a bet has been placed on an event, which the result is already known, or after the selected team has obtained a material benefit (eg. Goals or Expulsion, etc..), Bet9ja reserves the right to cancel the bet as reported in the Section XIII of the general Terms and Conditions of Bet9ja.<p>

<strong>Article 6</strong><br />
Bet9ja reserves the right to deny access or to terminate access to the Live Betting section of our website, as well as to modify, suspend or discontinue the Live Betting at its sole discretion and without informing the Customer. All contents scheduled on Live Betting are subject to change and Bet9ja may vary, suspend, replace or withdraw the planned events without notice to the Customer.<p>

<strong>Article 7</strong><br />
All the data about the match (current result, timing, etc) published in the Live Betting section of our website is purely indicative and may not be used as a reliable source of information for placing bets. Bet9ja will not accept any liability for any loss that is caused by such information being reported incorrectly or being not up-to-date.<p>

<strong>Article 8<br />
Dead-Heat rule</strong><br />
Where two selections Dead-Heat half the stake money is lost and the full odds are paid to the other half. If more than two Dead-Heat the stake is proportioned accordingly.
<p>

<strong>Article 9</strong><br />
Unless otherwise stated for certain sports/bet typologies, whenever an event is officially interrupted and not completed within midnight (CET) of the day following that scheduled for the match, all the bets still open at the moment of the interruption will be considered void.<p>


<strong>Article 10</strong><br />
If an event is not offered with the market " Any Other " , Bet9ja reserves the rightto add new participantsat any timeafter the publication ofthe initial list , including eventually requestsby customers.<p>

<strong>Article 11</strong><br />
The minimum betting amount for a live bet is 0,20€ for a single or multiple-choice bet.<p>
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