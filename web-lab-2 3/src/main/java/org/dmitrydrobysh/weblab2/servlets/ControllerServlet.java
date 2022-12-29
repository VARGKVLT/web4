package org.dmitrydrobysh.weblab2.servlets;

import java.io.*;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;
import utils.ConcurrentShotCollection;


@WebServlet(name = "ControllerServlet", value = "/index.html")
public class ControllerServlet extends HttpServlet {

    public void init() {
        if (getServletContext().getAttribute("usersHits")==null)
            getServletContext().setAttribute("usersHits", ConcurrentShotCollection.getInstance());
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String table = request.getParameter("table");
        String x = request.getParameter("x");
        String y = request.getParameter("y");
        String r = request.getParameter("r");
        if (table!=null || x!=null || y !=null || r!=null)
            getServletContext().getRequestDispatcher("/validation").forward(request,response);
    }

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        response.setContentType("text/html");
        getServletContext().getRequestDispatcher("/view.jsp").forward(request, response);
    }

    public void destroy() {
    }
}