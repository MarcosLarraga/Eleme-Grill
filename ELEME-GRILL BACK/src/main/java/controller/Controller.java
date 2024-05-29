package controller;

import actions.*;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.*;

@WebServlet(name = "Controller", urlPatterns = {"/Controller"})
public class Controller extends HttpServlet {

    private void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        response.setHeader("Access-Control-Max-Age", "3600");

        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
            return;
        }

        response.setContentType("application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();
        String strAction = request.getParameter("ACTION");
        String[] arrayAction = new String[2];

        if (strAction != null && !strAction.isEmpty()) {
            arrayAction = strAction.split("\\.");
        } else {
            sendErrorResponse(response, "No se especificó una acción.");
            return;
        }

        try {
            String result = "";
            switch (arrayAction[0].toUpperCase()) {
                case "CATEGORIA":
                    result = new CategoriaAction().execute(request, response, arrayAction[1]);
                    break;
                case "CLIENTE":
                    result = new ClienteAction().execute(request, response, arrayAction[1]);
                    break;
                case "EMPLEADO":
                    result = new EmpleadoAction().execute(request, response, arrayAction[1]);
                    break;
                case "PRODUCTO":
                    result = new ProductoAction().execute(request, response, arrayAction[1]);
                    break;
                case "PEDIDO":
                    result = new PedidoAction().execute(request, response, arrayAction[1]);
                    break;
                case "DETALLEPEDIDO":
                    result = new DetallePedidoAction().execute(request, response, arrayAction[1]);
                    break;
                default:
                    sendErrorResponse(response, "Acción " + arrayAction[0] + " no válida");
                    return;
            }
            out.print(result);
        } catch (Exception e) {
            sendErrorResponse(response, e.getMessage());
        }
    }

    private void sendErrorResponse(HttpServletResponse response, String errorMessage) throws IOException {
        response.setContentType("application/json;charset=UTF-8");
        response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        PrintWriter out = response.getWriter();
        out.print("{\"error\": \"" + errorMessage + "\"}");
        out.flush();
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    @Override
    protected void doOptions(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }
    public static String getBody(HttpServletRequest request)  {

        String body = null;
        StringBuilder stringBuilder = new StringBuilder();
        BufferedReader bufferedReader = null;

        try {
            InputStream inputStream = request.getInputStream();
            if (inputStream != null) {
                bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
                char[] charBuffer = new char[256];
                int bytesRead = -1;
                while ((bytesRead = bufferedReader.read(charBuffer)) > 0) {
                    stringBuilder.append(charBuffer, 0, bytesRead);
                }
            } else {
                stringBuilder.append("");
            }
        } catch (IOException ex) {
            // throw ex;
            return "";
        } finally {
            if (bufferedReader != null) {
                try {
                    bufferedReader.close();
                } catch (IOException ex) {

                }
            }
        }

        body = stringBuilder.toString();
        return body;
    }
}

