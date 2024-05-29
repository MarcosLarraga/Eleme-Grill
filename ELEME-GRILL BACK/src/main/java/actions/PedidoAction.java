package actions;

import com.google.gson.Gson;
import com.google.gson.JsonParser;
import controller.Controller;
import dao.EmpleadoDao;
import entities.Empleado;
import entities.Pedido;
import dao.PedidoDao;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;

public class PedidoAction implements IAction {
    @Override
    public String execute(HttpServletRequest request, HttpServletResponse response, String action) {
        String strReturn = "";
        try {
            switch (action.toUpperCase()) {
                case "FIND_ALL":
                    strReturn = findAll();
                    break;
                case "ADD":
                    strReturn = add(request);
                    break;
                case "DELETE":
                    strReturn = delete(request);
                    break;
                case "UPDATE":
                    strReturn = update(request);
                    break;
                default:
                    strReturn = "{\"error\": \"Acción inválida.\"}";
            }
        } catch (Exception e) {
            strReturn = "{\"error\": \"Ocurrió un error al procesar la acción: " + e.getMessage() + "\"}";
        }
        return strReturn;
    }

    private String findAll() {
        PedidoDao pedidoDao = new PedidoDao();
        ArrayList<Pedido> pedidos = pedidoDao.findAll(null);
        return Pedido.toArrayJson(pedidos);
    }

    private String add(HttpServletRequest request) {
        try {
            JsonParser parser = new JsonParser();
            Gson gson = new Gson();

            PedidoDao pedidoDao = new PedidoDao();
            Pedido pedido = gson.fromJson(parser.parse(request.getReader()), Pedido.class);

            int result = pedidoDao.add(pedido);

            if (result > 0) {
                return "Pedido añadido con éxito.";
            } else {
                return "Error al añadir pedido.";
            }
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }

    private String delete(HttpServletRequest request) {
        try {
            int PE_PEDIDO_ID = Integer.parseInt(request.getParameter("PE_PEDIDO_ID"));

            PedidoDao pedidoDao = new PedidoDao();
            int result = pedidoDao.delete(PE_PEDIDO_ID);

            if (result > 0) {
                return "Pedido eliminado con éxito.";
            } else {
                return "Error al eliminar pedido.";
            }
        } catch (NumberFormatException e) {
            return "Error: El ID del pedido debe ser un número entero.";
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }

    private String update(HttpServletRequest request) {
        try {
            // Crear un parser JSON y Gson
            JsonParser parser = new JsonParser();
            Gson gson = new Gson();

            // Obtener el cuerpo de la solicitud y convertirlo en un objeto Empleado
            Pedido pedido = gson.fromJson(parser.parse(Controller.getBody(request)), Pedido.class);

            // Llamar al método de actualización del DAO
            PedidoDao pedidoDao = new PedidoDao();
            int result = pedidoDao.update(pedido);

            // Devolver el resultado de la operación
            if (result > 0) {
                return "Pedido actualizado con éxito.";
            } else {
                return "Error al actualizar empleado.";
            }
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }

}