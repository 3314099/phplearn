<?php 


// task1(); //приведение типов

 // task2(); // вывод цифр введенного числа

// task3(); // нарисовать таблицу умножения

// task4(); // выборка четных чисел из массива 20 случайных чисел.

//task5(); // многомерный массив

// map(); // выделение области на карте

exit;














// function  map(){

// 	include ('map/map.php');
// };





function  task5(){

$people  = array(
				array(
					'name' => 'Петя',
					'position' => 'Старший',
					'age'=> 40,
					'cost'=> 25000,
					'hourCost' => 150,
						array(
							'mo' => 6,
							'tu' => 8,
							'we'=> 5,
							'th'=> 4,
							'fr'=> 6,
							'another'=> 7,
						),
				),


				array(
					'name' => 'Вася',
					'position' => 'Програм',
					'age'=> 30,
					'cost'=> 30000,
					'hourCost' => 100,
						array(
							'mo' => 6,
							'tu' => 8,
							'we'=> 1,
							'th'=> 4,
							'fr'=> 6,
							'another'=> 4,
						),
				),
				array(
					'name' => 'Коля',
					'position' => 'Ученик',
					'age'=> 30,
					'cost'=> 20000,
					'hourCost' => 80,
						array(
							'mo' => 6,
							'tu' => 8,
							'we'=> 4,
							'th'=> 4,
							'fr'=> 6,
							'another'=> 0,
						),
				),
 );
// <-- Шапка таблицы = ключи
	foreach ($people as $key => $value) {
			foreach ($value as $key0 => $value0) {
				if(!(is_numeric($key0)))
				echo ($key0)."\t";
			}
			echo "Hours\t";
			echo "Total";
		echo "\n";	
	break;
	}
// --> Шапка таблицы = ключи

// --> Тело таблицы 1-й вариант
	$i=0;
	$newArr = array();
	foreach ($people as $key => $value) {

			foreach ($value as $key0 => $value0) {
				// $people[3]['name']='Коля';
				$sum=0;
				if(is_string($key0))
				$newArr[$i][$key0]=$value0;
				if(!(is_array($value0)))
				echo ($value0)."\t";
					$hours = 0;
					if(is_array($value0)){
						foreach ($value0 as $value1) {
						$hours = $hours + $value1;
						};
					echo $hours."\t";
					$newArr[$i]['Hours']=$hours;
					}
					if($key0 === 'hourCost')
						$hourCost=$value0;
			};
			$sum = $hourCost*$hours;
			echo $sum;
			$newArr[$i]['Total']=$sum;	
		echo "\n";
		$i++;	
	};
// <-- Тело таблицы 1-й вариант
echo "\n";
// <-- 2-й вариант вывод из нового массива
$a = count($newArr);
echo  implode("\t", array_keys($newArr[0]))."\n";
for($i=0;$i<$a;$i++)
echo  implode("\t", $newArr[$i])."\n";
// --> 2-й вариант


};



echo "\n\n";

function task4(){
	echo "Случайные числа: ";
	for($i=0;$i<=20;$i++){
		// echo mt_rand(1,99);
		$arr[$i] = mt_rand(1,99);
		echo $arr[$i] . " ";
	}

	echo "\nЧетные числа:    ";

	for($i=0;$i<=20;$i++){
		// echo $arr[$i]
		if(!($arr[$i] % 2)){
			echo $arr[$i] . " ";

		}
	}

	 
}




function task3(){

for($i=1;$i<=9;$i++){
	for ($j=1;$j<=9;$j++){
		$mult = $i*$j;
		if($mult<10){
			echo " ";
		}
		echo ($mult).' ';
	}
	echo "\n";
}

} //task 2




function task2(){
 
input();

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
	echo " нет значения";
}

}


function input(){
	?>
<form name="authForm" method="GET" action="<?=$_SERVER['PHP_SELF']?>">
a:<input type="text" name="a">

<input type="submit">
</form>
<?php
}


// task1
function task1(){

	$bool = true;
	$int = "100";
	$float = "18.6456";
	$string = "10 негритят";
	$string2 = "это были 10 негритят";
	// echo gettype($bool);
	type($float);
}

function type($var){
    	echo  "bool для ". gettype($var) . "(" . $var . ") = " . (bool)$var . "\n";
    	echo  "int для ". gettype($var) . "(" . $var . ") = " . (int)$var . "\n";
    	echo  "float для ". gettype($var) . "(" . $var . ") = " . (float)$var . "\n";
    	echo  "string для ". gettype($var) . "(" . $var . ") = " . (string)$var . "\n";
    	echo  "string для ". gettype($var) . "(" . $var . ") = " . (string)$var . "\n";
    }

// task1

?>