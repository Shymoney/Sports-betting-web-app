<?php
ob_start();

require_once "connect.php";
		//a function to createuser account 
		function CreateUser() {
			//instantiate the class
			$obj = DatabaseConnect::getInstance();

			//if all the condition is set submit to the database
			if(isset($_POST['Submit'])) {
				$username = ( $_POST['Username']);
				$Pwd = se(($_POST['password1']));
				$confirm_Pwd = crypt(quote( $_POST['Confirm_pwd']));
				$email =$this->txt(quote($_POST['Email'])); 
				$sname = quote($_POST['Sname']);
				$name = quote($_POST['Name']);
				$day = quote($_POST['day']);
				$month = quote($_POST['month']);
				$year = quote($_POST['year']);
				$date= $day.'/'.$month.'/'.$year;//concatenate day/month/year
				$gender = quote($_POST['gender']);
				$contry = quote($_POST['country']);
				$address = quote($_POST['Address']);
				$city = quote($_POST['City']);
				$state = quote($_POST['State']);
				$mobile = quote($_POST['Mobile']);	
				$check = $_POST['agree'];	
				
				$user_id= uniqid(rand(100000,999999));
				$query = $obj->connect->prepare("SELECT * FROM registration WHERE User_id='$user_id'");
				$query->bindParam(':User_id', user_id);
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
					elseif($num==0)
					{
				
				//submit to the database
				$insert= $obj->connect->prepare("INSERT INTO registration
				
				values('','$user_id',
				'$username',
				'$Pwd','$confirm_Pwd',
				'$email','$sname','$name',
				'$date','$gender','$contry',
				'$address','$city','$state',
				'$mobile','$check','')");

				$insert->execute();
				

			header("Location:welcome registration.php?= $user_id ");
					}
			}
			


		}
	

?>