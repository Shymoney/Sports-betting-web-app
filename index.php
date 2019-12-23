<?php

ob_start();
//connecting to our database
require('connect.php');
$obj = new Connect;
$obj->Mysql();


if(isset($_POST['Submit']))
	{
		if(empty($_POST['Username'])){
			
			//print out a an error msg
			echo '<script>
					var msg = " Username Cannot be empty";
					alert(msg);
			
				</script>';
						
		}else{
			
			$u= mysqli_real_escape_string($obj->connect,$_POST['Username']);
		}
	
		if(empty($_POST['password1'])){
			
			//print out an error msg
			echo '<script>
					var msg = " Password Cannot be empty";
					alert(msg);
			
				</script>';
						
		}else{
			
			$p= mysqli_real_escape_string($obj->connect,$_POST['password1']);
		}
		
		
//query the database
$login= mysqli_query($obj->connect,"SELECT * 
				FROM registration 
				WHERE Username='$u' && Password='$p'") or die('could not login'.mysqli_error($obj->connect));

		
	$num= mysqli_num_rows($login); 
	while($row= mysqli_fetch_array($login))
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
		
$sql= mysqli_query($obj->connect,"update registration set view=view+1") or die('could not update'.mysqli_error($obj->connect));
							
setcookie('user',$user,time()+3600,'/');
header('location:Userprofile.php');
				
		}
			
			else{echo'<script type="text/javascript">
						var msg="wrong username or password";
						alert(msg);
						</script>';}
					
	}
						
$query = mysqli_query($obj->connect,"SELECT * FROM livematches order by match_id desc limit 0,7") or die('could not select'.mysqli_error($obj->connect));
		  
		  $count=0;
		  while($value= mysqli_fetch_array($query,MYSQLI_ASSOC))
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
			while($hold= mysqli_fetch_array($query_2,MYSQLI_ASSOC))
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
			
		
		
	mysqli_close($obj->connect);
	
	

?>


<!doctype html>
<html manifest="text/cache-manifest">
<head>
<!--meta tags---->
<meta charset="utf-8">
<meta http-equiv="content-Type" content="text/html; charset=utf-8">
<meta name="keywords" content="AlabiBet.com, nigeria, betting, bet, Alabi, alabi bet, naija, 9ja, Alabibet, betting website, livescore, predict, premiership betting, sportsbetting, odds, Live, Racing, horse racing, virtual game, virtual soccer, virtual football, win, win big, mobile, virtual, deposit, Soccer, Bonus, sports, betting bonus">

<meta name="description" content="Number one sport betting site in Nigeria. For fast deposit and withdrawal, visit AlabiBet.com Place bets on premiership matches with the best available odds."><base>

<meta name="SKYPE_TOOLBAR" content="SKYPE_TOOLBAR_PARSER_COMPATIBLE">
<meta name="google-site-verification" content="KElNVUl-UFP7_YUhfEJt-Bz1Rf3juWSTADskgP_1D1c">
<meta name="msvalidate.01" content="11CE253C71CD5153071856CAC7F454C8">
<meta name="Subject" content="The Best Sports Betting Site in Nigeria">
<meta name="Robots" content="Index,Follow">

<title>AlabiBet - Best Sports Betting Premiership, Champions League and more.</title>

<!-----Css----->
<link href="css/index.css" rel="stylesheet" type="text/css">
<link rel="shortcut icon" href="images/acf7ef943fdeb3cbfed8dd0d8f584731.ico" type="image/x-icon">

<!---------Css--------------------------->
<link rel="stylesheet" type="text/css" href="css/index.css">

<!---javascript ---->
<script type="text/javascript" src="jquery/jquery-1.11.3.js"></script>
<script type="text/javascript">
document.documentElement.id = "js";
var deltaTime = new Date().getTime() - 1000*1459506844;
</script>


<script type="text/javascript">
var $j = jQuery.noConflict();
</script>
<script type="text/javascript" src="themes/jquery.cookie.js"></script>
<script type="text/javascript" src="themes/init_betcart.js"></script>
<script type="text/javascript">
/*<![CDATA[*/
jQuery(document).bind('keypress', function ( e ){
var elem = e.target, type = elem.type, $form;
if ( (type === "text" || type === "password") && e.keyCode === 13 && ($form = jQuery(e.target).closest('form')).length && $form.attr('action') ) {
$form.submit();return false;}})
;/*]]>*/
</script>

<script type="text/javascript" src="themes/betcart-template.js"></script>
<script type="text/javascript" src="themes/save_odds_plugin.js"></script>
<script type="text/javascript" src="js/bet_cart_of_naija_bet.js"></script>

<script type="text/javascript">
js_messages = {"Odds value for this market should be between 1.01 and 1000":"Odds value for this market should be between 1.01 and 1000"};
var live_menu_station = {},
select_monitor_id = null;
</script>

<script type="text/javascript">
	jQuery(function($){
		$('a').each(function(){
			if ($(this).attr('rev')) {
				var id = $(this).attr('id').split(':');
				if (!$(this).attr('onClick')) {
					$(this).attr('onClick', 'javascript:addToCookie('+id[1]+');');
				}
			}
		});
	});
</script>
<script type="text/javascript" src="themes/v32/js/jquery.plugins.js"></script>
<!-- main top slider	-->
<script type="text/javascript" language="javascript" src="themes/v32/js/jquery.carouFredSel-5.2.3.js"></script>
<!--[if IE 8]>
<script src="http://css3-mediaqueries-js.googlecode.com/svn/trunk/css3-mediaqueries.js"></script>
<![endif]--><!--[if lt IE 9]>
<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->
<link href="css/media-queries.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="js/odds.updater.js"></script> 
<script type="text/javascript" src="js/socket.odds.updater.js"></script>


</head>
<script type="text/javascript">
$j(document).ready(function($){window. addEventListener ("click", clickPage, true);function clickPage(){$.cookie('last_activity', (new Date()).getTime());}});
</script> 




<style type="text/css">
body {
	margin-top: 0px;
	margin-left: 0px;
	margin-right: 0px;
	margin-bottom: 0px;
}
</style>
<script type="text/javascript">

jQuery(document).ready(function(e) {
    
		$("#search").mouseover(function() {
			$(this).css("background-color","#CCC")
		$("#search").mouseout(function(){
			$(this).css("background-color","#FFF")
			
					
		});
			
	
	});
	
	jQuery(".right_side").click(function(){
		var div = $(".right_side")
		div.animate({height:'300px',opacity:'0.4'},"slow");
		div.animate({width:'300px',opacity:'0.8'},"slow");
		div.animate({height:'100px',opacity:'0.4'},"slow");
		div.animate({width:'100px',opacity:'0.8'},"slow");
		div.animate({left:'100px'},"slow");
		div.animate({fontSize:'3em'},"slow");
		$(".right_side").stop();
					
		});
	
	jQuery(".short_box").mouseover(function(){
		$(".short_box").css("background-color","#0F0").slideDown("slow");
		});
	
	
});


</script>

</head>

<body bgcolor="#2A2E37" onLoad="">
<div class="wrapper">
  <div class="banner_box">
<div class="logo_box"><img src="images/alabi logo.png" width="260" height="63"></div> 
	
    <div class="navbar" role="navigation">
    	<div class="button" id="nav-mainAct"><a href="#" title="Sport">SPORT</a></div>
        <div class="button" id="nav-liveAct"><a href="#" title="Live">LIVE</a></div>
        <div class="button"><a href="#" title="Casino">CASINO</a></div>
        <div class="button" id="nav-virtualAct"><a href="#" title="Virtual">VIRTUAL</a></div>
        <div class="button"><a href="#" title="Bet Odds">BET ODDS</a></div>
        <div class="button"><a href="#" title="Mobile">MOBILE</a></div>
    </div>
    



<div class="sign_in">

    <form action="<?php $_SERVER['PHP_SELF'];?>" method="post" enctype="multipart/form-data">
       <div class="username">
       
         <input name="Username" type="text" class="stylelayout" id="Username"   placeholder="Username"/>
         
         </div>
             <div class="pasword">
             <input name="password1" type="password" class="stylelayout" id="password1"  placeholder="Password" />
             </div>
             
                <div class="submit" title="Login">
                
                <input name="Submit" type="submit" class="stylesubmit" value="Login" />
                
                </div>            
        </form>
        
        <div class="forgot_pwd"><a href="Forgotten pwd.php">Password Forgotten?</a></div>
        
        <div class="register"><a href="Registration.php">Register!!!</a></div>
    </div>        

<div class="accordion" data-role="accordion">welcome</div>
<nav style="top: 101px" role="navigation">
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
<div class="social_box"><img src="images/images.png" width="30" height="30"></div>
<div class="small">Like</div>
<div class="small_1">Share</div>

<div class="container">
<div class="left_side">
<div class="holder">
	<div class="srch">
    <form action="search.php" method="get" onSubmit="button_search(); return false;">
    <input name="search" type="text" class="srch" id="searchbox" placeholder="Search by Name"  title="Search" onClick="button_search();">
     </form>
     	</div>
    <a href="javascript:;"title="LiveBetting" onClick=""> 
    <div class="live_betting"> LiveBetting</div>
    </a>
    
    <a href="javascript:;" title="Soccer">
    <div class="colapse">
    	<div class="sport_img">
        <img src="images/football.png" width="25" height="20"></div>
        <div class="sport_text"><span style="font-weight:500;">Soccer</span></div>
    </div>
    </a>
    <a href="javascript:;" title="Basketbal">
    <div class="colapse">
    	<div class="sport_img"><img src="images/basketball.png" width="25" height="20"></div>
        <div class="sport_text">Basketball</div>
    </div>
    </a>
    <a href="javascript:;" title="American Football">
    <div class="colapse">
    	<div class="sport_img"><img src="images/ameriacan fotbal.png" width="30" height="20"></div>
        <div class="sport_text">American Football</div>
    </div>
    </a>
    <a href="javascript:;" title="Rugby">
    <div class="colapse">
    	<div class="sport_img"><img src="images/rugby.png" width="30" height="20"></div>
        <div class="sport_text">Rugby</div>
    </div>
    </a>
    
    <a href="javascript:;" title="Tennis">
    <div class="colapse">
    	<div class="sport_img"><img src="images/tennis.png" width="25" height="20"></div>
        <div class="sport_text">Tennis</div>
    </div>
    </a>
    <a href="javascript:;" title="Boxing">
    <div class="colapse">
    	<div class="sport_img"><img src="images/dart.png" width="25" height="20"></div>
        <div class="sport_text">Boxing</div>
    </div>
    </a>
    <a href="javascript:;" title="Snooker">
    <div class="colapse">
    	<div class="sport_img"><img src="images/snooker.png" width="25" height="20"></div>
        <div class="sport_text">Snooker</div>
    </div>
    </a>
    <a href="javascript:;" title="Handball">
    <div class="colapse">
    	<div class="sport_img"><img src="images/handball.png" width="25" height="20"></div>
        <div class="sport_text">Handball</div>
    </div>
    </a>
    <a href="javascript:;" title="BeachSoccer">
    <div class="colapse">
    	<div class="sport_img"><img src="images/beach.png" width="25" height="20"></div>
        <div class="sport_text">BeachSoccer</div>
    </div>
    </a>
    
    <a href="javascript:;" title="Volleybal">
    <div class="colapse">
    	<div class="sport_img"><img src="images/volley.png" width="25" height="20"></div>
        <div class="sport_text">Volleyball</div>
    </div>
    </a>
    <a href="javascript:;" title="Cricket">
    <div class="colapse">
    	<div class="sport_img"><img src="images/cricket.png" width="25" height="20"></div>
        <div class="sport_text">Cricket</div>
    </div>
    </a>
    <a href="javascript:;" title="Ice Hockey">
    <div class="colapse">
    	<div class="sport_img"><img src="images/hockey.png" width="30" height="25"></div>
        <div class="sport_text">Ice Hockey</div>
    </div>
    </a>
    <a href="javascript:;" title="Horse Racing">
    <div class="colapse">
    	<div class="sport_img"><img src="images/horse racing.png" width="30" height="27"></div>
        <div class="sport_text">Horse Racing</div>
    </div>
    </a>
    <a href="javascript:;" title="Cycling">
    <div class="colapse">
    	<div class="sport_img"><img src="images/cycling.png" width="30" height="25"></div>
        <div class="sport_text">Cycling</div>
    </div>
    </a>
    <a href="javascript:;" title="Golf">
    <div class="colapse">
    	<div class="sport_img"><img src="images/golf.png" width="25" height="20"></div>
        <div class="sport_text">Golf</div>
    </div>
    </a>
    
     <a href="javascript:;" title="Darts">
    <div class="colapse">
    	<div class="sport_img"></div>
        <div class="sport_text">Darts</div>
    </div>
    </a>
    
     <a href="javascript:;" title="Darts">
    <div class="colapse">
    	<div class="sport_img"></div>
        <div class="sport_text">Darts</div>
    </div>
    </a></div>
</div>
<div class="middle">
	<div class="image_slider">
    <img name="" src="images/helpdesk.jpg" width="680" height="259" alt="" style="background-color: #3300CC"></div>
<div class="upcoming_matches">
    <div class="header">Live Matches</div>
    <div class="current_date"><?php echo "";?>Tuesday,5 October 2015</div>
	
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
        
        
        <a id=":905969342" href="javascript:;" class="market_id1756407314 b-link b-link_ev b-cell_hover" rev='{&quot;odds&quot;:4.24,&quot;oid&quot;:&quot;905969342&quot;,&quot;mid&quot;:&quot;1112549&quot;,&quot;market_id&quot;:&quot;1756407314&quot;,&quot;event&quot;:&quot;Swansea City vs Chelsea FC&quot;,&quot;type&quot;:&quot;1x2&quot;,&quot;type_title&quot;:&quot;Match Odds&quot;,&quot;beton&quot;:&quot;Swansea City&quot;,&quot;beton_outright_market&quot;:&quot;&quot;,&quot;sport&quot;:&quot;s&quot;,&quot;event_status&quot;:&quot;notstarted&quot;,&quot;bir_delay&quot;:8,&quot;lid&quot;:&quot;214&quot;,&quot;multiplicity&quot;:1,&quot;tax_percent&quot;:&quot;0&quot;,&quot;default_stake&quot;:&quot;0.00&quot;,&quot;lay&quot;:0,&quot;live_minute&quot;:&quot;&quot;,&quot;live_result&quot;:&quot;&quot;,&quot;pitchers&quot;:[],&quot;scope_key&quot;:&quot;FE&quot;,&quot;scope&quot;:&quot;fe&quot;,&quot;scope_title&quot;:&quot;Full event&quot;,&quot;sport_name&quot;:&quot;Soccer&quot;,&quot;country_name&quot;:&quot;England&quot;,&quot;league_name&quot;:&quot;English Premier League&quot;,&quot;season&quot;:&quot;&quot;,&quot;matchday&quot;:&quot;&quot;,&quot;event_details&quot;:[],&quot;enabled&quot;:true,&quot;popular_code&quot;:&quot;&quot;,&quot;beton_val&quot;:0}'><b class="g-round b-index_block_size odds_value"><div class="short_box" id="home"><?php echo $home[$a];?></div></b></a>
        
        
         <div class="short_box"><?php echo $draw[$a]; ?></div>
         <div class="short_box"><?php echo $away[$a];?></div>
         <div class="short_box"><?php echo $over[$a]; ?></div>
         <div class="short_box"><?php echo $under[$a];?></div>      
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
    <div class="short_box" onMouseOver="" id="1"><?php echo $hw[$y];?></div>
    <div class="short_box" onMouseOver="" id="2"><?php echo $drw[$y];?></div>
    <div class="short_box" onMouseOver="" id="3"><?php echo $aw[$y];?></div>
    <div class="short_box" onMouseOver="" id="4"><?php echo $hd[$y];?></div>
    <div class="short_box" onMouseOver="" id="5"><?php echo $dc[$y];?></div>
    <div class="short_box" onMouseOver="" id="6"><?php echo $ad[$y];?></div>
    <div class="short_box" onMouseOver="" id="7"><?php echo $ov[$y];?></div>
    <div class="short_box" onMouseOver="" id="8"><?php echo $un[$y];?></div>
    <div class="short_box" onMouseOver="" id="9"><?php echo $GG[$y];?></div>
    <div class="short_box" onMouseOver="" id="10"><?php echo $NG[$y];?></div>
    <div class="others_box">+13</div>
</div>
<?php }?>

</div>
</div>


</div>  
</div>
<div class="right_side" id="right">
<a href="Registration.php">
<div class="register_now">Register Now! Now!! </div>
</a>
<div class="Alabibet_info_two">Betslip</div>
<div class="betslip_txt">Click on the odds to add your betslip</div>
<div class="pic_box"><img src="images/book.jpg" width="216" height="179"></div>
<div class="pic_box"><img src="images/agent_number.jpg" width="216" height="179"></div>
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



<!------------end of metro js script------------------------------------------->












</body>
</html>