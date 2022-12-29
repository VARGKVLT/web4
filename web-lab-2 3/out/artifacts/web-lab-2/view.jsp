<%@ page import="org.dmitrydrobysh.weblab2.servlets.AreaCheckServlet" %>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>Web 2</title>
    <link rel="stylesheet" href="style.css">
</head>
<tbody>
<table class="main-table">
    <tr>
        <th cellpadding="4" cellspacing="0" colspan="3" id="hat">
            Кузнецов Владимир P32141<br>
            Вариант: 14103
        </th>
    </tr>

    <tr class="main-row">
        <td class="main-col__left">
            <table class="subtable__left">
                <tr>
                    <td colspan="2" class="header"><h2>Ввод данных</h2></td>
                </tr>
                <tr class="input__X">
                    <td><p>X:</p></td>
                    <td id="x_radiodots"><input name="X" type="radio" value="-3"> -3
                        <input name="X" type="radio" value="-2" > -2
                        <input name="X" type="radio" value="-1" > -1
                        <input name="X" type="radio" value="0" > 0
                        <input name="X" type="radio" value="1" >1
                        <input name="X" type="radio" value="2" >2
                        <input name="X" type="radio" value="3" >3
                        <input name="X" type="radio" value="4" >4
                        <input name="X" type="radio" value="5" >5
                    </td>
                </tr>
                <tr class="input__Y">
                    <td><p>Y:</p></td>
                    <td><input type="text" id="ytextfield" placeholder="-3 < y < 5" required=""></td>
                </tr>
                <tr class="input__R">
                <td><p>R:</p></td>
                <td><input type="text" id="rtextfield" placeholder="2 < r < 5" required=""></td>
                </tr>

                <tr class="input__buttons"><td colspan=2><button id="send">send</button><button id = "clear">clear</button></td></tr>
                <tr><td colspan="2" class="header"><h2>Текущие значения</h2></td></tr>
                <tr>
                    <td colspan="2">
                        <table class="current_table">
                            <tr><th>X</th><th>Y</th><th>R</th></tr>
                            <tr><td id="current_x"></td><td id="current_y"></td><td id="current_r"></td></tr>
                        </table>
                    </td>
                </tr>
            </table>
            <div id="iddiv">
            </div>
        </td>

        <td class="main-col__middle">
            <table class="subtable__middle">
                <tr>
                    <td class="header"><h2>График</h2></td>
                </tr>
                <tr class="row_img" heihht>
                    <td>
                        <canvas height='700' width='700' id='setka'>Пример</canvas>
                    </td>
            </table>

        </td>
    </tr>
</table>
<td class="main-col__right">
    <table class="subtable__right">
        <tr><td class="header"><h2>Результаты</h2> </td></tr>
        <tr><td>
            <table class="history_table">
                <tr id="history_head">
                    <th class="history_table__X">X</th><th class="history_table__Y">Y</th><th class="history_table__R">R</th><th class="history_table__HIT">HIT</th><th class="history_table__ST">Time (UTC+0)</th><th class="history_table__RT">Exec Time</th>
                </tr>
                <%= AreaCheckServlet.processTable(session.getId(),application)%>
            </table>
        </td></tr>
    </table>
</td>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<script src="script.js"></script>
</body>
</tbody>
</html>