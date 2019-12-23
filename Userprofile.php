<?php
require('connect.php');

//instance of a class is known as obj
$obj = new Connect;
$obj->Mysql();

 if(isset($_COOKIE['user']))  $logid= $_COOKIE['user']; else{header('Location:index.php');}
 


 $query2= mysqli_query($obj->connect,"SELECT * from registration
 						WHERE Username='$logid'")or die('could not select'.mysqli_error($obj->connect));
 while($row= mysqli_fetch_array($query2,MYSQL_ASSOC))
 	{
	 
	 $uid= $row['User_id'];
	 $user= $row['Sname'];
	 $name= $row['Name'];

 
	
}

$query = mysqli_query($obj->connect,"SELECT * FROM livematches order by match_id desc limit 0,5") or die('could not select'.mysqli_error($obj->connect));
		  
		  $count=0;
		  while($value= mysqli_fetch_array($query,MYSQL_ASSOC))
		  		{
					
				$match_id[]= $value['match_id'];
				$category[]= $value['category'];
				$league[]= $value['leaguename'];
				$country[]= $value['country'];
				$home[]= $value['home'];
				$draw[]= $value['draw'];
				$away[]= $value['away'];
				$over[]= $value['over'];
				$under[]= $value['under'];
				$score[]= $value['score'];
				$score_1[]= $value['score1'];
				$time[]= $value['time'];
				$club_home[]= $value['hometeam'];
				$club_away[]= $value['awayteam'];
				$count++;
															
				}
		  
$query_2= mysqli_query($obj->connect,"SELECT * FROM upcomingevents 
						order by match_id desc limit 0,15 ") or die('could not select'.mysqli_error($obj->connect));
						
			$rows=0;
			while($hold= mysqli_fetch_array($query_2,MYSQL_ASSOC))
			{
				
			$match_id[]=$hold['match_id'];
			$tm[]=$hold['time'];
			$date[]=$hold['date'];
			$hw[]=$hold['homewin'];
			$drw[]=$hold['draw'];
			$aw[]=$hold['awaywin'];
			$hd[]=$hold['homedraw'];
			$dc[]=$hold['doublechance'];
			$ad[]=$hold['awaydraw'];
			$ov[]=$hold['over'];
			$un[]=$hold['under'];
			$GG[]=$hold['GoalGoal'];
			$NG[]=$hold['NoGoal'];
			$hteam[]=$hold['hometeam'];
			$ateam[]=$hold['awayteam'];
			
			$rows++;
			
			
			}
			
	//$search = mysqli_query("Select * from livematches WHERE country LIKE'g%'",$connect) or die('could not find'.mysqli_error());
		
 	

 
 
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>User profile</title>
<link href="css/userprofile.css" rel="stylesheet" type="text/css" />
<style type="text/css">
body {
	margin-top: 0px;
	margin-left: 0px;
	margin-right: 0px;
	margin-bottom: 0px;
}
</style>
<script type="text/javascript" language="javascript" src="jquery/jquery-1.11.3.js"></script>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<script type="text/javascript" language="javascript">

$(document).ready(function(e) {
    
	
	
	
	
});




</script>
<script>
			
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
			
 ga('create', 'UA-56491023-1', 'auto');
ga('send', 'pageview');
						  
</script>

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
    <div class="user_box">0.00NGN</div>
    </div>
    <div class="money_box2">
    <div class="user_box">Balance</div>
    <div class="user_box">0.00NGN</div>
    </div>
    <div class="money_box">
    <div class="but"><a href="Deposit.php">Deposit</a></div>
    <div class="but"><a href="#">My Account</a>
    <ul>
    	<li><a href="#">Account Statement</a></li> 
        <li><a href="#">Bet List </a></li> 
        <li><a href="#">Transaction List </a></li> 
        <li><a href="#">Deposit</a></li> 
        <li><a href="#">Withdraw</a></li> 
        <li><a href="#">Messages</a></li> 
        <li><a href="#">Account Details</a></li> 
        <li><a href="#">Change Personal data</a></li> 
        <li><a href="#">Change Password</a></li> 
    </ul>
    </div>
    <div class="but"><a href="logout.php">Logout</a></div>
    </div>
    </div>


<nav style="top: 101px">
	<ul>
    	<li><a href="index.php" title="Home">Home</a></li>
        <li><a href="#" title="Live Scores">Live Scores</a></li>
        <li><a href="#" title="How to Deposit/Withdrawal">How to Deposit/Withdrawal</a></li>
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
	<div class="srch"><form action="blank.php" method="get" ><input name="search" type="text" class="srch" id="search" placeholder="Search by Name"  title="Search"/> </form></div>
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
	<div class="image_slider">
    <img name=""  src="images/ronaldoflip.jpg" width="670" height="259" alt="" style="background-color: #3300CC" /></div>
	<div class="upcoming_matches">
	  <div class="header">Live Matches</div>
    <div class="current_date"><script> document.write(Date());</script>Tuesday,5 October 2015</div>
	 <?php for($a = 0; $a<$count; $a++){?>
    	<div class="matches">
		<div class="head">
		<div class="score_box">
        	<div class="digits_box"><?php echo $score[$a]; ?></div>
            <div class="digits_box1"><?php echo $score_1[$a];?></div>
            <div class="minutes"><?php echo $time[$a] ;?></div>
        </div>
        <div class="club_box">
        <div class="club_match"><?php echo $club_home[$a] ;?></div>
        <div class="club_match_1"><?php echo $club_away[$a]; ?></div>
        <div class="league_type"><?php echo $league[$a];?> 	<?php echo'Code:'.$match_id[$a];?></div>
        </div> 
        <div class="header_row">
        	<div class="short_odds">1</div>
            <div class="short_odds">X</div>
            <div class="short_odds">2</div>
            <div class="short_odds">Over</div>
            <div class="short_odds">Under</div>
        </div>
<a href="betslip.php?
match_id=<?php echo $match_id[$a]?>&home=<?php echo $home[$a];?>&hometeam=<?php echo $club_home[$a]?>&awayteam=<?php echo $club_away[$a]?>"><div class="short_box"><?php echo $home[$a];?></div></a>
        
<a href="betslip.php?match_id=<?php echo $match_id[$a]?>&draw=<?php echo $draw[$a]; ?>&hometeam=<?php echo $club_home[$a]?>
&awayteam=<?php echo $club_away[$a]?>"><div class="short_box"><?php echo $draw[$a]; ?></div></a>
        
        
<a href="betslip.php?match_id=<?php echo $match_id[$a]?>&away=<?php echo $away[$a];?>&hometeam=<?php echo $club_home[$a]?>
&awayteam=<?php echo $club_away[$a]?>"><div class="short_box"><?php echo $away[$a];?></div></a>
        
        
        
<a href="betslip.php?match_id=<?php echo $match_id[$a]?>&over=<?php echo $over[$a];?>&hometeam=<?php echo $club_home[$a]?>
&awayteam=<?php echo $club_away[$a]?>"><div class="short_box"><?php echo $over[$a]; ?></div></a>


<a href="betslip.php?match_id=<?php echo $match_id[$a]?>&under=<?php echo $under[$a];?>&hometeam=<?php echo $club_home[$a]?>
&awayteam=<?php echo $club_away[$a]?>"><div class="short_box"><?php echo $under[$a];?></div></a>     
        </div>
        </div>
<?php }?>		
</div>
<div class="header">Upcoming Matches/Events</div>
<div class="matches">
		<div class="head">
		<div class="short">Time</div>
		<div class="long">Matches</div>
		<div class="short">1</div>
		<div class="short">X</div>
		<div class="short">2</div>
		<div class="short">1X</div>
		<div class="short">12</div>
		<div class="short">X2</div>
		<div class="short">Over</div>
		<div class="short">Under</div>
		<div class="short">GG</div>
		<div class="short">NG</div>
		<div class="short">Others</div>
</div>
<?php for($y=0; $y<$rows; $y++) {?>
<div class="matches">
	<div class="time_box"><?php	echo $tm[$y];?></div>
	<div class="long_box">
    <div class="Mtch_date"><?php echo $hteam[$y];?>-<?php echo $ateam[$y];?></div>
    <div class="Mtch_date_1"><?php echo $date[$y];?>  &nbsp;Code:<?php echo $match_id[$y];?></div>
    </div>
   <a href="betslip.php"> <div class="short_box"><?php echo $hw[$y];?></div></a>
    <a href="betslip.php"><div class="short_box"><?php echo $drw[$y];?></div></a>
   <a href="betslip.php"> <div class="short_box"><?php echo $aw[$y];?></div></a>
    <a href="betslip.php"><div class="short_box"><?php echo $hd[$y];?></div></a>
   <a href="betslip.php"> <div class="short_box"><?php echo $dc[$y];?></div></a>
   <a href="betslip.php"> <div class="short_box"><?php echo $ad[$y];?></div></a>
    <a href="betslip.php"><div class="short_box"><?php echo $ov[$y];?></div></a>
    <a href="betslip.php"><div class="short_box"><?php echo $un[$y];?></div></a>
   <a href="betslip.php"> <div class="short_box"><?php echo $GG[$y];?></div></a>
   <a href="betslip.php"> <div class="short_box"><?php echo $NG[$y];?></div></a>
    <a href="betslip.php"><div class="others_box">+13</div>
</div>

<?php }?>
</div>
</div>

</div>
</div>  
<div class="right_side" id="Betslip"></div>


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
        <li><a href='Anti-laundering.php' title="Anti-laundering">Anti-laundering</a></li>
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