<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Registration</title>
<link href="css/Registration.css" rel="stylesheet" type="text/css" />
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
       			<div class="username"><input name="username" type="text" class="stylelayout" id="username" required="username" /></div>
                <div class="pasword"><input name="password" type="password" class="stylelayout" id="password" required="password" /></div>
                <div class="submit" title="Login"><input name="Submit" type="submit" class="stylesubmit" value="Login" /></div>            
        </form>
        <div class="forgot_pwd"><a href="#">Password Forgotten?</a></div>
        <div class="register"><a href="Registration_part_two.php">Register!!!</a></div>
    </div>


<nav style="top: 101px">
	<ul>
    	<li><a href="index.php">Home</a></li>
        <li><a href="#">Live Scores</a></li>
        <li><a href="#">How to Deposit/Withdrawal</a></li>
        <li><a href="#">Results</a></li>
        <li><a href="#">Statistics</a></li>
        <li><a href="#">User guide</a></li>
        <li><a href="#">Live Centre</a></li>
        <li><a href="#">Contact Us</a></li>
      <li><a href="#">FAQs</a></li>
    </ul>
</nav>
</div>
<div class="social_box"><img src="images/images.png" width="30" height="30" /></div>
<div class="small">Like</div>
<div class="small_1">Share</div>

<div class="container">
<form action="" method="post" enctype="multipart/form-data">
<div class="open_acct">Open an account</div>
<div class="leftside">
<div class="clarify">Please in order to access all services you must complete fields (marked with *) and personal details must be correct in order to Deposite and Withdrawl Funds</div>
<div class="fields_mark">Fields mark with * must be filled</div>

<div class="horintal_rule"><hr align="left" class="horintal_rule" /></div>
<div class="form_row">
<label>Username*</label>
<input name="username" type="text" class="form_row_box"id="username" required="username" />
</div>

<div class="Pwd_box">
<div class="form_row">
<label>Password*</label>
<input name="password" type="password" class="form_row_box" id="password"  required="password"/>
</div>
<div class="pwd_text_box">Enter a password of your choice (min. 6 characters and max. 14). You must use letters and numbers. You may include underscores. Spaces are not permitted. Your password should not contain your name, username or date of birth.
</div>
</div>

<div class="form_row">
<label>Confirm Password*</label>
<input name="confirm_password" type="password" class="form_row_box" id="confirm_password" required="confirm_password" />
</div>

<div class="form_row">
<label>Email*</label>
<input name="email" type="email" class="form_row_box" id="email" value="email"  required="email"/>
</div>

<div class="form_row">
<label>Name*</label>
<input name="name" type="text" class="form_row_box" id="name"  required="name"/>
</div>

<div class="form_row">
<label>Surname*</label>
<input name="sname" type="text" class="form_row_box" id="sname" required="sname" />
</div>

<div class="form_row">
<label>Date of Birth*</label>
<select name="day" size="1" class="date_birth" id="day">
<?php for ($i = 1; $i <= 31; $i++) {echo $i;?>
<option value="<?php $i?>"><?php echo $i?></option>
<?php };?>
</select>
<select name="month" size="1" class="month_box" id="month" >
  <option>January</option>
  <option>Febuary</option>
  <option>March</option>
  <option>April</option>
  <option>May</option>
  <option>June</option>
  <option>July</option>
  <option>August</option>
  <option>September</option>
  <option>October</option>
  <option>November</option>
  <option>December</option>
</select>
<select name="year" class="date_birth" id="year">
<?php for( $a= 1997; $a <= 1925; $a++) { echo $a;?>
  <option><?php echo $a?></option>
<?php }?>
</select>
</div>

<div class="form_row">
<label>Gender*</label>
<select name="gender" class="gender_box"  id="gender">
  <option>Male</option>
  <option>Female</option>
</select>
</div>
<div class="horintal_rule"><hr align="left" class="horintal_rule" /></div>

<div class="form_row">
<label>Country*</label>
<select name="country" class="gender_box" id="country">
  <option>Nigeria</option>
 </select>
</div>
<div class="form_row">
  <label>City*</label>
<input name="city" type="text"  class="form_row_box" id="city" required="city"/>
</div>

<div class="form_row">
<label>State*</label>
<input name="state" type="text" class="form_row_box" id="state" required="state" />
</div>

<div class="Pwd_box">
<div class="form_row">
<label>Mobile Number*</label>
<input name="mobile" type="text" class="form_row_box" id="mobile"  required="mobile"/>
</div>
<div class="pwd_text_box">Please make sure you enter your mobile number correctly. We will send you an SMS with an activation code to complete your registration.</div>
</div>

<div class="horintal_rule"><hr class="horintal_rule" /></div>

<div class="form_row"><div class="yes"><input name="agree" type="checkbox" value="" id="agree"  required="agree"/></div>
By clicking you agree to accept our T&C, that you are over 18 and you are aware
 of our Responsible Gaming Policy *</div>
<div class="horintal_rule"><hr class="horintal_rule" /></div>
<div class="form_row">
<div class="enter"><input name="Submit" type="submit" class="form_submit" value="Submit"  required="Submit"/></div>
</div>

</div>
</form>
</div>


<div class="footer">
	<ul>
    	<h4><span><a href="#">ALABI BET</a></span>
      </h4>
    	<li><a href="#" title="Home">Home</a></li>
        <li><a href="#" title="Contact Us">Contact Us</a></li>
        <li><a href="#" title="Userguide">Userguide</a></li>
        <li><a href="#" title="Results">Results</a></li>
        <li><a href="#" title="Livescores">Livescore</a></li>
        <li><a href="#" title="Franchise">Franchise</a></li>
        <li><a href="#" title="Web Affiliates">Web Affiliates</a></li>
        <li><a href="#" title="Payment Method">Payment Method</a></li>
    </ul>
    
    <ul>
    	<h4><span><a href="#">TERMS AND CONDITIONS</a></span>
      </h4>
    	<li><a href="#" title="Rules">Rules</a></li>
        <li><a href="#" title="Responsible Gaming">Responsible Gaming</a></li>
        <li><a href="#" title="Anti-laundering">Anti-laundering</a></li>
        <li><a href="#" title="General T&C">General T&C</a></li>
        <li><a href="#" title="Privacy">Privacy</a></li>
        <li><a href="#" title="Work With Us">Work With Us</a></li>
        
    </ul>
    <div class="reserved">
      <p>&copy;Copy Right.2015&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;All Rights Reserved &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Alabi Bet is regulated by Enugu State lotteries Board with the Company Name:AUG group Limited</p>
    </div>
</div>

</div>
</body>
</html>