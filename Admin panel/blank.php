
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Untitled Document</title>
<link href="css/adminupload.css" rel="stylesheet" type="text/css" />
</head>

<body bgcolor="#333333">
<div class="wrapper">
<form action="" method="post" enctype="multipart/form-data">
<div class="banner">
<div class="logo_box"><img src="../images/alabi logo.png" width="260" height="63" /></div>
</div>
<div class="left"></div>

<div class="right">
<div class="category">
<div class="sport_box">Sports Category</div>
<div class="long"><select size="1" class="long_style">
<?php $sport= array(
'Soccer',
'basketball',
'Tennis',
'Boxing',
'Snooker',
'Cricket',
'Hockey',
'Handball',
'Rugby',
'Horseracing',
'Cycling',
'Golf',
'Beach soccer',
'Ameriacan football',);

foreach($sport as $sp){echo $sp;
?>
    <option selected="selected"><?php echo $sp ?></option>
  <?php ;}?>
</select></div>
</div>

<div class="category">
<div class="sport_box">League Name</div>
<div class="sport_box">
  <label for="select"></label>
  <select name="select" size="1" class="stylelayout" id="select">
  <?php 
$league= array('Premier League','Laliga BBVA','Bundesliga','Seria A','Ligue 1','Eredivise',);
foreach($league as $lg){echo $lg;
?>
    <option><?php echo $lg ?></option>
    <?php ;}?>
  </select>
</div>
<div class="sport_box">Country</div>
<div class="sport_box"><select size="1" class="stylelayout">
<?php 
$country= array('England','France','Spain','Holland','Italy','Germany',);
foreach($country as $count){echo $count;
?>
  <option><?php echo $count?></option>
 <?php ;}?>
</select></div>
</div>
<div class="category">
<div class="sport_box">Odds</div>
<div class="odd_box"><input type="text" class="odds_style"  placeholder="Home"/></div>
<div class="odd_box"><input type="text" class="odds_style"  placeholder="Away"/></div>
<div class="odd_box"><input type="text" class="odds_style"  placeholder="Draw"/></div>
<div class="odd_box"><input type="text" class="odds_style"  placeholder="Over1.5"/></div>
<div class="odd_box"><input type="text" class="odds_style"  placeholder="Under1.5"/></div>
<div class="odd_box"><input type="text" class="odds_style"  placeholder="1X"/></div>
</div>

<div class="category">
<div class="sport_box">Score</div>
<div class="sport_box"><input name="" type="text" /></div>
</div>
<div class="category">
<div class="sport_box">Time</div>
<div class="odd_box"><input name="" type="text"  placeholder="match time"/></div>
</div>
<div class="category">
<div class="sport_box">Club Name</div>
<div class="club"><input type="text" class="club_style"  placeholder="Home Club"/></div>
<div class="club"><input type="text" class="club_style"  placeholder="Away Club"/></div>


</div>

<div class="category">
<div class="submit"><input name="" type="submit" value="Load Live Match" /></div>

</div>


</div>
</form>
</div>
</body>
</html>