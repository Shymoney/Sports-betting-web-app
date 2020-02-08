<?php 
	session_start();
 	ob_start();
 
/* here we include our "Admin connect page" were the database is selected*/
 require_once "Admin connect.php";
	
 

class AdminLogin extends DatabaseConnect {


	//object property decleration
	 protected $u;
	 protected $p;
	 protected $p2;

	
	//a function handles the user input
	public function handle_login() {
		//create an instance of the object
		$call_db = DatabaseConnect::getInstance();
		
		

		if(isset($_POST['Submit'])) {

			//prevent SQL injection
			$this->u = $call_db->secureTxt($_POST['username']);
			$this->p = $call_db->securePwd($_POST['password1']);
			$this->p2 =$call_db->securePwd($_POST['password2']);
			
			$login =$call_db->connect-> prepare("SELECT * FROM adminlogin WHERE Username=:username && Password = :password1 && ConfirmPassword = :password2 ");
			
			//bind paramters with input placeholders
			$login->bindParam(':username',$this->u, PDO::PARAM_STR);
			$login->bindParam(':password1', $this->p, PDO::PARAM_STR);
			$login->bindParam(':password2',$this->p2, PDO::PARAM_STR);
			
			//execute the query
			$result = $login->execute();
			//var_dump($result); exit();
			
			//now we set our session
			if($login->rowCount()  > 0){
			
			// fetch the data 
			$session_data = $login->fetch(PDO::FETCH_ASSOC);
						
			// set session data
			$_SESSION['Username'] = $session_data['Username'];
			
			//redirect after a successful login
			header('Location:Upload live matches.php');
			
			 }else{
				echo '<script type="text/javascript">
					var msg = "Wrong Username or Password";
					alert(msg);
					</script>';	
			}
		
		
		}

		
			
	}

	
}
	//excute
	$obj = new AdminLogin;
	$obj->handle_login();
	
?>	


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title></title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<link href="css/admin login.css" rel="stylesheet" type="text/css" />
<style type="text/css">
body {
	margin-top: 0px;
	margin-left: 0px;
	margin-right: 0px;
	margin-bottom: 0px;
}
</style>
<link href="../SpryAssets/SpryValidationTextField.css" rel="stylesheet" type="text/css" />
<link href="../SpryAssets/SpryValidationPassword.css" rel="stylesheet" type="text/css" />
<link href="../SpryAssets/SpryValidationConfirm.css" rel="stylesheet" type="text/css" />
<script src="../SpryAssets/SpryValidationTextField.js" type="text/javascript"></script>
<script src="../SpryAssets/SpryValidationPassword.js" type="text/javascript"></script>
<script src="../SpryAssets/SpryValidationConfirm.js" type="text/javascript"></script>
</head>

<body bgcolor="#2A2E37">
<div class="wrapper">
<div class="banner_box">
<div class="logo_box"><img src="../images/alabi logo.png" width="260" height="63" /></div>
<div class="sign_in"></div>
 

<nav style="top: 101px">
	<ul>
    	<li><a href="../index.php" title="Home">Home</a></li>
        <li><a href="#" title="Live Scores">Live Scores</a></li>
        <li><a href="#" title="How to Deposit/Withdrawal">How to Deposit/Withdrawal</a></li>
        <li><a href="#" title="Results">Results</a></li>
        <li><a href="#" title="Statistics">Statistics</a></li>
        <li><a href="#" title="User guide">User guide</a></li>
        <li><a href="#" title="Live Centre">Live Centre</a></li>
        <li><a href="../Contact us.php" title="Contact Us">Contact Us</a></li>
    
    </ul>
</nav>
</div>
<div class="container">
  

<div class="middle">
<div class="header">ADMIN LOGIN</div>
<div class="txtbox">
<form action="" method="post" enctype="multipart/form-data">
<div class="admin_box">
<div class="label-box"><label>Username*</label></div>
<span id="sprytextfield1">
<label for="text2"></label>
<input type="text" name="username" id="text2" class="form_row_box"  required="username"/>
<span class="textfieldRequiredMsg">A value is required.</span></span> 
</div>

<div class="admin_box">
<div class="label-box"><label>Password*</label></div>
<span id="sprypassword1" class="spry_box">
<label for="password1"></label>
<input type="password" name="password1" id="password1"  class="form_row_box" required="password1" value="<?php ?>"/>
<span class="passwordRequiredMsg">A value is required.</span></span>
</div>

<div class="admin_box">
<div class="label-box"><label>Confirm Password*</label></div>
<span id="spryconfirm1" class="spry_box">
<label for="password2"></label>
<input type="password" name="password2" id="password2"  class="form_row_box"  required="password2"/>
<span class="confirmRequiredMsg">A value is required.</span><span class="confirmInvalidMsg">The values don't match.</span></span> 
</div>

<div class="submit_box">
	<input name="Submit" type="submit" class="stylesubmit" id="Submit" value="Login" />
</div>
</form>
</div>

</div>
</div>
</div>
</div>
<script type="text/javascript">
var sprytextfield1 = new Spry.Widget.ValidationTextField("sprytextfield1", "none", {validateOn:["blur", "change"]});
var sprypassword1 = new Spry.Widget.ValidationPassword("sprypassword1", {validateOn:["blur", "change"]});
var spryconfirm1 = new Spry.Widget.ValidationConfirm("spryconfirm1", "password1", {validateOn:["blur", "change"]});
</script>
</body>
</html>