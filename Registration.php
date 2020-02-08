<?php
ob_start();

require_once "connect.php";
		//a function to createuser account 
		function CreateUser() {
			//instantiate the class
			$obj = DatabaseConnect::getInstance();
			
			//if all the condition is set submit to the database
			if(isset($_POST['Submit'])) {
				//prevent SQL injection
				$username = $obj->secureTxt( $_POST['Username']);
				$Pwd = $obj->securePwd(crypt($_POST['password1']));
				$confirm_Pwd = $obj->securePwd(crypt( $_POST['Confirm_pwd']));
				$email = $obj->secureTxt($_POST['Email']); 
				$sname = $obj->secureTxt($_POST['Sname']);
				$name = $obj->secureTxt($_POST['Name']);
				$day = $obj->secureTxt($_POST['day']);
				$month = $obj->secureTxt($_POST['month']);
				$year = $obj->secureTxt($_POST['year']);
				$date= $day.'/'.$month.'/'.$year;//concatenate day/month/year
				$gender = $obj->secureTxt($_POST['gender']);
				$contry = $obj->secureTxt($_POST['country']);
				$address = $obj->secureTxt($_POST['Address']);
				$city = $obj->secureTxt($_POST['City']);
				$state = $obj->secureTxt($_POST['State']);
				$mobile = $obj->secureTxt($_POST['Mobile']);	
				$check = $obj->secureTxt($_POST['agree']);	
				
				$user_id= uniqid(rand(100000,999999));
				$query = $obj->connect->prepare("SELECT * FROM registration WHERE User_ID ='$user_id'");
				$query->bindParam(':User_id', $user_id);
				$query->bindParam(':Username', $username);
				$query->bindParam(':password1', $Pwd);
				$query->bindParam(':Confirm_pwd', $confirm_Pwd);
				$query->bindParam(':Email', $email);
				$query->bindParam(':Sname', $sname);
				$query->bindParam(':Name', $name);
				$query->bindParam(':day', $day);
				$query->bindParam(':month', $month);
				$query->bindParam(':year', $year);
				$query->bindParam(':gender', $gender);
				$query->bindParam(':country', $contry);
				$query->bindParam(':Address', $address);
				$query->bindParam(':City', $city);
				$query->bindParam(':State', $state);
				$query->bindParam(':Mobile', $mobile);

				$query->execute();

				
				//check if there a record
				if($query->rowCount() > 0)
				{
					$user_id-= 1;
					
					}
					elseif($query->rowCount() ==0)
					{
				
				//submit to the database
				$insert= $obj->connect->prepare("INSERT INTO registration(Id,Username,
				User_ID,Password,ConfirmPwd,Email,Surname,Name,DOB,Gender,Country,Address,City,State,Mobile,agree)
				
				VALUES('','$username','$user_id','$Pwd','$confirm_Pwd','$email','$sname','$name',
				'$date','$gender','$contry','$address','$city','$state','$mobile','$check')");

				$result = $insert->execute();
				//var_dump($result);
				if($result == true){
					echo '<script>
				 	var msg = "Successfully Submitted";
				 	alert(msg);
					</script>';
				}
				

			header("Location:welcome registration.php?user_id= $user_id ");
					}
      }
      
      		


    }
    
		//execute the function
		$funct= CreateUser();


?>

<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Registration</title>
<link href="css/Registration.css" rel="stylesheet" type="text/css">
<style type="text/css">
body {
	margin-top: 0px;
	margin-left: 0px;
	margin-right: 0px;
	margin-bottom: 0px;
}
</style>
<link href="SpryAssets/SpryValidationTextField.css" rel="stylesheet" type="text/css">
<link href="SpryAssets/SpryValidationPassword.css" rel="stylesheet" type="text/css">
<link href="SpryAssets/SpryValidationConfirm.css" rel="stylesheet" type="text/css">
<script src="SpryAssets/SpryValidationTextField.js" type="text/javascript"></script>
<script src="SpryAssets/SpryValidationPassword.js" type="text/javascript"></script>
<script src="SpryAssets/SpryValidationConfirm.js" type="text/javascript"></script>

</head>

<body>
<div class="wrapper">
  <div class="banner_box">
<div class="logo_box"><img src="images/alabi logo.png" width="260" height="63"></div> 
	
    <div class="navbar">
    	<div class="button"><a href="#" title="Sport">SPORT</a></div>
        <div class="button"><a href="#" title="Live">LIVE</a></div>
        <div class="button"><a href="#" title="Casino">CASINO</a></div>
        <div class="button"><a href="#" title="Bet Odds">BET ODDS</a></div>
        <div class="button"><a href="#" title="Mobile">MOBILE</a></div>
    </div>
   	<div class="sign_in"><form action="<?php echo $_SERVER['PHP_SELF'];?>" method="post" enctype="multipart/form-data" id="form">
<div class="username"><input name="username" type="text" class="stylelayout" id="username" required="username"></div>
<div class="pasword"><input name="password" type="password" class="stylelayout" id="password" required="password"></div>
<div class="submit" title="Login"><input name="Submit" type="submit" class="stylesubmit" value="Login"></div>            
        </form>
        <div class="forgot_pwd"><a href="Forgotten pwd.php">Password Forgotten?</a></div>
        <div class="register"><a href="Registration.php">Register!!!</a></div>
    </div>


<nav style="top: 101px">
	<ul>
    	<li><a href="index.php">Home</a></li>
        <li><a href="#">Live Scores</a></li>
        <li><a href="How to Deposit.php">How to Deposit/Withdrawal</a></li>
        <li><a href="#">Results</a></li>
        <li><a href="#">Statistics</a></li>
        <li><a href="#">User guide</a></li>
        <li><a href="#">Live Centre</a></li>
        <li><a href="Contact us.php">Contact Us</a></li>
      <li><a href="FAQ.php">FAQs</a></li>
    </ul>
</nav>
</div>
<div class="social_box"><img src="images/images.png" width="30" height="30"></div>
<div class="small">Like</div>
<div class="small_1">Share</div>

<div class="container">
  <!--form--->
<form action="" method="POST" enctype="multipart/form-data">
<div class="open_acct">Open an account</div>
<div class="leftside">
<div class="clarify">Please in order to access all services you must complete fields (marked with *) and personal details must be correct in order to Deposite and Withdrawl Funds</div>
<div class="fields_mark">Fields mark with * must be filled</div>

<div class="horintal_rule"><hr align="left" class="horintal_rule"></div>
<div class="form_row">
<label>Username*</label>
<span id="sprytextfield1"  class="spry_box">
<label for="Username"></label>
<input name="Username" type="text" class="form_row_box" id="Username">
<span class="textfieldRequiredMsg">Username cannot be Empty! </span><span class="textfieldInvalidFormatMsg">Invalid username!<br>
Enter a username of your choice (min. 6 characters   and max. 14). You may use letters, numbers and underscores. Spaces are   not permitted<br>
.</span><span class="textfieldMaxCharsMsg">Exceeded maximum number of characters.</span><span class="textfieldMinCharsMsg">Minimum number of characters not met.</span></span></div>

<div class="Pwd_box">
<div class="form_row">
<label>Password*</label>
<span id="sprypassword2" class="spry_box">
<label for="password1"></label>
<input name="password1" type="password" class="form_row_box" id="password1"max="14" min="6">
<span class="passwordRequiredMsg">Password cannot be Empty!.</span><span class="passwordInvalidStrengthMsg">  Doesn't meet the specified strength.</span><span class="passwordMinCharsMsg">Minimum number of characters not met.</span><span class="passwordMaxCharsMsg">Exceeded maximum number of characters.</span></span>
</div>
<div class="pwd_text_box">Enter a password of your choice (min. 6 characters and max. 14). You must use letters and numbers. You may include underscores. Spaces are not permitted. Your password should not contain your name, username or date of birth.
</div>
</div>

<div class="form_row">
<label>Confirm Password*</label>
<span id="spryconfirm1" class="spry_box">
<label for="Confirm_pwd"></label>
<input name="Confirm_pwd" type="password" class="form_row_box" id="Confirm_pwd" max="14" min="6">
<span class="confirmRequiredMsg">Password cannot be empty!.</span><span class="confirmInvalidMsg">The values don't match.</span></span> </div>

<div class="form_row">
<label>Email*</label>
<span id="sprytextfield2" class="spry_box">
<label for="Email"></label>
<input name="Email" type="text" class="form_row_box" id="Email">
<span class="textfieldRequiredMsg">Email cannot be empty!.</span><span class="textfieldInvalidFormatMsg">Invalid email address.</span></span></div>


<div class="form_row">
<label>Surname*</label>
<span id="sprytextfield4" class="spry_box">
<label for="Sname"></label>
<input name="Sname" type="text" class="form_row_box" id="Sname">
<span class="spry_box"><span class="textfieldRequiredMsg">Surname cannot be empty!.</span></span></span> </div>


<div class="form_row">
<label>Name*</label>
<span id="sprytextfield3" class="spry_box">
<label for="Name"></label>
<input name="Name" type="text" class="form_row_box" id="Name">
<span class="textfieldRequiredMsg">Name cannot be empty!.</span></span> </div>


<div class="form_row">
<label>Date of Birth*</label>
<select name="day" size="1" class="date_birth" id="day">
<?php for ($i = 1; $i <= 31; $i++) {echo $i;?>
<option value="<?php echo $i?>"><?php echo $i?></option>
<?php }?>
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
<select name="year" size="1" class="date_birth" id="year">
 <?php for( $a= 1925; $a <= 1997; $a++) { echo $a;?>
  <option value="<?php echo $a;?>"><?php echo $a;?></option>
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
<div class="horintal_rule"><hr align="left" class="horintal_rule"></div>

<div class="form_row">
<label>Country*</label>
<select name="country" class="gender_box" id="country">
  <option>Nigeria</option>
 </select>
</div>

<div class="form_row">
<label>Address*</label>
<span id="sprytextfield7" class="spry_box">
<label for="Address"></label>
<input type="text" name="Address" id="Address" class="form_row_box">
<span class="textfieldRequiredMsg">A value is required.</span></span> </div>


<div class="form_row">
<label>City*</label>
<span id="sprytextfield5" class="spry_box">
<label for="City"></label>
<input name="City" type="text" class="form_row_box" id="City">
<span class="textfieldRequiredMsg">City cannot be empty!</span></span> </div>

<div class="form_row">
<label>State*</label>
<span id="sprytextfield6" class="spry_box">
<label for="State"></label>
<input name="State" type="text" class="form_row_box" id="State">
<span class="textfieldRequiredMsg">State cannot be empty!</span></span> </div>

<div class="Pwd_box">
<div class="form_row">
<label>Mobile Number*</label>
<span id="sprytextfield8" class="spry_box">
<label for="Mobile"></label>
<input name="Mobile" type="text" class="form_row_box" id="Mobile">
<span class="textfieldRequiredMsg">Mobile number is required.</span><span class="textfieldInvalidFormatMsg">Invalid format.</span></span> 
</div>
<div class="pwd_text_box">Please make sure you enter your mobile number correctly. We will send you an SMS with an activation code to complete your registration.</div>
</div>

<div class="horintal_rule"><hr class="horintal_rule"></div>

<div class="form_row">
  <div class="yes"><input name="agree" type="checkbox" value="I agree" id="agree"  required="agree"></div>
 By clicking you agree to accept our T&C, that you are over 18 and you are aware
 of our Responsible Gaming Policy *</div>
<div class="horintal_rule"><hr class="horintal_rule"></div>
<div class="form_row">
<div class="enter"><input name="Submit" type="submit" class="form_submit" value="Submit"  required="Submit" formaction="#"></div>
</div>

</div>
</form>
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
        <li><a href="#" title="Payment Method">Payment Method</a></li>
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

<script type="text/javascript">
var sprytextfield1 = new Spry.Widget.ValidationTextField("sprytextfield1", "none", {validateOn:["blur", "change"], minChars:6, maxChars:14});
var sprypassword2 = new Spry.Widget.ValidationPassword("sprypassword2", {validateOn:["blur", "change"], minAlphaChars:6, maxAlphaChars:14, minChars:6, maxChars:14, minNumbers:2, maxNumbers:2, maxUpperAlphaChars:1});
var spryconfirm1 = new Spry.Widget.ValidationConfirm("spryconfirm1", "password1", {validateOn:["blur", "change"]});
var sprytextfield2 = new Spry.Widget.ValidationTextField("sprytextfield2", "email", {validateOn:["blur", "change"], useCharacterMasking:true});
var sprytextfield3 = new Spry.Widget.ValidationTextField("sprytextfield3", "none", {validateOn:["blur", "change"]});
var sprytextfield4 = new Spry.Widget.ValidationTextField("sprytextfield4", "none", {validateOn:["blur", "change"]});
var sprytextfield5 = new Spry.Widget.ValidationTextField("sprytextfield5", "none", {validateOn:["blur", "change"]});
var sprytextfield6 = new Spry.Widget.ValidationTextField("sprytextfield6", "none", {validateOn:["blur", "change"]});
var sprytextfield8 = new Spry.Widget.ValidationTextField("sprytextfield8", "phone_number", {validateOn:["blur", "change"], format:"phone_custom", useCharacterMasking:true});
var sprytextfield7 = new Spry.Widget.ValidationTextField("sprytextfield7", "none", {validateOn:["blur", "change"]});
</script>
</body>
</html>