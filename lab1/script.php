<?php
session_start();
date_default_timezone_set('Europe/Moscow');
$time_start = microtime(true);
$x = $_POST['real_x'];
$y = $_POST['y'];
$r = $_POST['real_r'];
// валидация на сервере. Так сломать сложнее!
if(isset($r) && is_numeric($r)&& ( $r==1 || $r==2 || $r==3 || $r==4 ||$r==5 ) ){
    if(isset($y) && is_numeric($y) &&  preg_match("/-[1-2]|0|[1-2]/m", $y) && ($y>-5 && $y<5)){
        if(isset($x) && is_numeric($x) && ( $x == -5 || $x == -4 || $x == -3 || $x == -2 || $x == -1 ||$x == 0 || $x == 1 || $x == 2 || $x == 3 )){
            //перехожу к проверке на попадание
            $flag = false;

            //triangle
            if($x<=0 && $x>=-$r/2 && $y<=$r && $y>=0 &&($x+$y<=$r/2)){
                $flag = true;
            }
            //square
            if($x<=0 && $x>=-$r/2 && $y<=0 && $y>=-$r){
                $flag=true;
            }
            //circle
            if(($x^2+$y^2<=($r)^2)&&$x<=$r && $x>=0 && $y>=0 && $y<=$r){
                $flag=true;
            }
            //TIME FOR TIIIIMEEEE

            $current_time = date('Y-m-d, H:i:s');
            $session_time = number_format(microtime(true)-$time_start,5);

            $after_all = [$x,$y,$r, $flag ? "Есть" : "Нет", $session_time];

            //Чтобы построить таблицу, необходимо передать все эти данные, а хранить лучше в сессии
            $_SESSION['history'][] = $after_all;
            $_SESSION['time']['0'] = $current_time;
            $table_result = "<table id=\"main_table\" class=\"super_table\" border=\"3\"><tr><th>X:</th><th>Y:</th><th>R:</th><th>Попадание:</th><th>Время работы:</th></tr>";
                foreach ($_SESSION['history'] as $line) {
                    $table_result.="<tr><td>$line[0]</td><td>$line[1]</td><td>$line[2]</td><td>$line[3]</td><td>$line[4]</td></tr>";
                }
                $table_result = "<label for=\"main_table\" class=\"against_the_current\">Текущая дата и время: $current_time</label>".$table_result;
                $table_result.="</table>";
                echo $table_result;
        } else {
            die("Hack detected "."<label class=\"error\">Вы пытались сломать X</label>");
        }
    } else {
        die("Hack detected "."<label class=\"error\">Вы пытались сломать Y</label>");
    }
} else {
    die("Hack detected "."<label class=\"error\">Вы пытались сломать R</label>");
}
?>