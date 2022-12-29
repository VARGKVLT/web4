<%@ page import="org.dmitrydrobysh.weblab2.servlets.AreaCheckServlet" %>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>God Of Web 2.0</title>
    <link rel="stylesheet" href="styles.css">
</head>
<tbody>
<table class="main-table">
    <tr>
        <th cellpadding="4" cellspacing="0" colspan="3" id="hat">
            Дробыш Дмитрий P32082<br>
            Вариант: 
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
                    <td><button id="xbutton0" value="-4" onclick="updateX(this)">-4</button><button id="xbutton1" value="-3" onclick="updateX(this)">-3</button><button id="xbutton2" value="-2" onclick="updateX(this)">-2</button><button id="xbutton3" value="-1" onclick="updateX(this)">-1</button><button id="xbutton4" value="0" onclick="updateX(this)">0</button><button id="xbutton5" value="1" onclick="updateX(this)">1</button><button id="xbutton6" value="2" onclick="updateX(this)">2</button><button id="xbutton7" value="3" onclick="updateX(this)">3</button><button id="xbutton8" value="4" onclick="updateX(this)">4</button></td>
                </tr>
                <tr class="input__Y">
                    <td><p>Y:</p></td>
                    <td><input type="text" id="ytextfield" placeholder="-5 < y < 5" required=""></td>
                </tr>
                <tr class="input__R">
                    <td><p>R:</p></td>
                    <td id="r_radiodots"><input name="R" type="radio" value="1"> 1
                        <input name="R" type="radio" value="1.5" > 1.5
                        <input name="R" type="radio" value="2" > 2
                        <input name="R" type="radio" value="2.5" > 2.5
                        <input name="R" type="radio" value="3" >3</td>
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
        </td>
        <td class="main-col__middle">
            <table class="subtable__middle">
                <tr>
                    <td class="header"><h2>График</h2></td>
                </tr>
                <tr class="row_img">
                    <td>
                        <canvas height='600' width='600' id='setka'>Пример</canvas>
                    </td>
                </tr>
            </table>
        </td>
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
    </tr>
</table>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<script src="script.js"></script>
</body>
</tbody>
</html>