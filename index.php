<?php 

// task1(); // вывод цифр введенного числа






function task1(){
?>
<form name="authForm" method="GET" action="<?=$_SERVER['PHP_SELF']?>">
a:<input type="text" name="a">

<input type="submit">
</form>
<?php 

if (isset($_GET['a'])) {
	$a = $_GET['a'];

	if (is_numeric($a)) {
		for ($i=0;$i<strlen($a);$i++){
			echo $i+1 . "-я цифра = " . $a[$i];
			echo "<br>";
		};
	}else{
		echo " Значение не является цифрой";
	};
	
}else{
	echo " нет значения ";
}

}







?>