package org.dmitrydrobysh.weblab2.servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.Deque;
import java.util.LinkedList;
import java.util.Locale;

import com.google.gson.Gson;
import jakarta.servlet.ServletContext;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import utils.ConcurrentShotCollection;
import utils.Shot;

@WebServlet(name = "AreaCheckServlet", value = "/validation")
public class AreaCheckServlet extends HttpServlet {
    public void init() {
        if (getServletContext().getAttribute("usersHits")==null)
            getServletContext().setAttribute("usersHits", ConcurrentShotCollection.getInstance());
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.setContentType("text/html");
        PrintWriter writer = resp.getWriter();
        writer.println("<html><head><link rel=\"stylesheet\" href=\"style.css\"></head><body>");
        writer.println("<form action=\"index.html\">\n" +
                "    <input type=\"submit\" value=\"Go Back\" />\n" +
                "</form>");
        writer.println("<table class=\"history_table\">");
        writer.println("<tr><th>X</th><th>Y</th><th>R</th><th>HIT</th><th>Time (UTC+0)</th><th>Exec Time</th></tr>");
        writer.println(processTable(req.getSession().getId(), getServletContext()));
        writer.println("</table>");
        writer.println("</body></html>");
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        if (request.getParameter("table")!=null)
            printTable(request, response);
        else if (request.getParameter("clear")!=null)
            clearTable(request, response);
        else
            printResultShooting(request, response);
    }

    private void clearTable(HttpServletRequest request, HttpServletResponse response) throws IOException {
        getUserHits(request.getSession().getId(), getServletContext()).clear();
        response.getWriter().println("cleared");
    }

    private void printResultShooting(HttpServletRequest request, HttpServletResponse response) throws IOException{
        long startTime = System.nanoTime();
        Shot shot = new Shot();
        String x = request.getParameter("x");
        String y = request.getParameter("y");
        String r = request.getParameter("r");
        if (validate(x,y,r)){
            shot.setX(x).setY(y).setR(r).setCode("0").setMsg("OK").setServer_time(timeFromSeconds(Instant.now().getEpochSecond()));
            if (isHit(Double.parseDouble(x),Double.parseDouble(y),Double.parseDouble(r)))
                shot.setHit("YES");
            else shot.setHit("NO");
            getUserHits(request.getSession().getId(), getServletContext()).addFirst(shot);
        }
        else{
            shot.setCode("1").setMsg("One or several of args are invalid");
        }
        shot.setExec_time(Long.toString((System.nanoTime()-startTime)/1000));
        response.setContentType("application/json");
        response.getWriter().println(new Gson().toJson(shot));
    }

    private void printTable(HttpServletRequest request, HttpServletResponse response) throws IOException{
        response.setContentType("text/html");
        response.getWriter().print(processTable(request.getSession().getId(), getServletContext()));
    }
    private static Deque<Shot> getUserHits(String sessionId, ServletContext servletContext){
        ConcurrentShotCollection usersHits = (ConcurrentShotCollection) servletContext.getAttribute("usersHits");
        if (!(usersHits.getMap().containsKey(sessionId)))
            usersHits.getMap().put(sessionId, new LinkedList<>());
        return usersHits.getMap().get(sessionId);
    }
    public static String processTable(String sessionId, ServletContext servletContext){
        Deque<Shot> userHits ;
        userHits = getUserHits(sessionId, servletContext);
        StringBuilder sb = new StringBuilder();
        for (Shot shot : userHits){
            sb.append("<tr>\n");
            sb.append("<td>").append(shot.getX()).append("</td>");
            sb.append("<td>").append(shot.getY()).append("</td>");
            sb.append("<td>").append(shot.getR()).append("</td>");
            sb.append("<td>").append(shot.getHit()).append("</td>");
            sb.append("<td>").append(shot.getServer_time()).append("</td>");
            sb.append("<td>").append(shot.getExec_time()).append("</td>");
            sb.append("</tr>\n");
        }
        return sb.toString();
    }

    private boolean validate(String x, String y, String r){
        //noinspection SuspiciousNameCombination
        return validateArg(x) && validateArg(y) && validateArg(r);
    }

    private boolean validateArg(String x){
        try {
            Double.parseDouble(x);
            return true;
        }
        catch (Exception e){
            return false;
        }
    }

    private boolean isHit(Double x, Double y, Double r){
        return inRect(x, y, r) || inTriangle(x, y, r) || inCircle(x, y, r);
    }

    private boolean inRect(Double x, Double y, Double r){
        return (x>=0 && x<=r/2 && y<=r && y>=0);
    }
    private boolean inTriangle(Double x, Double y, Double r){
        return x>=0 && x<=r/2 && y<=0 && y>=-r/2 && Math.abs(x)+Math.abs(y)<=r/2;
    }
    private boolean inCircle(Double x, Double y, Double r){
        return x*x+y*y<=r*r/4 && x<=0 && x>=-r/2 &&  y<=r/2 && y>=0;
    }
    private String timeFromSeconds(long seconds){
        LocalDateTime dateTime = LocalDateTime.ofEpochSecond(seconds, 0, ZoneOffset.UTC);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("EEEE, MMMM d, yyyy h:mm, a", Locale.ENGLISH);
        return dateTime.format(formatter);
    }
}
