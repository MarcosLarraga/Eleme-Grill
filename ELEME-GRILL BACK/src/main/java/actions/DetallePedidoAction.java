package actions;

import com.google.gson.Gson;
import com.google.gson.JsonParser;
import dao.DetallePedidoDao;
import entities.DetallePedido;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;

public class DetallePedidoAction implements IAction {
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
        DetallePedidoDao detallePedidoDao = new DetallePedidoDao();
        ArrayList<DetallePedido> detallesPedido = detallePedidoDao.findAll(null);
        return DetallePedido.toArrayJson(detallesPedido);
    }

    private String add(HttpServletRequest request) {
        try {
            JsonParser parser = new JsonParser();
            Gson gson = new Gson();

            DetallePedidoDao detallePedidoDao = new DetallePedidoDao();
            DetallePedido detallePedido = gson.fromJson(parser.parse(request.getReader()), DetallePedido.class);

            int result = detallePedidoDao.add(detallePedido);

            if (result > 0) {
                return "Detalle de pedido añadido con éxito.";
            } else {
                return "Error al añadir detalle de pedido.";
            }
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }

    private String delete(HttpServletRequest request) {
        try {
            int DE_DETALLE_ID = Integer.parseInt(request.getParameter("DE_DETALLE_ID"));

            DetallePedidoDao detallePedidoDao = new DetallePedidoDao();
            int result = detallePedidoDao.delete(DE_DETALLE_ID);

            if (result > 0) {
                return "Detalle de pedido eliminado con éxito.";
            } else {
                return "Error al eliminar detalle de pedido.";
            }
        } catch (NumberFormatException e) {
            return "Error: El ID del detalle de pedido debe ser un número entero.";
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }

    private String update(HttpServletRequest request) {
        try {
            // Crear un parser JSON y Gson
            JsonParser parser = new JsonParser();
            Gson gson = new Gson();

            // Obtener el cuerpo de la solicitud y convertirlo en un objeto DetallePedido
            DetallePedido detallePedido = gson.fromJson(parser.parse(getBody(request)), DetallePedido.class);

            // Llamar al método de actualización del DAO
            DetallePedidoDao detallePedidoDao = new DetallePedidoDao();
            int result = detallePedidoDao.update(detallePedido);

            // Devolver el resultado de la operación
            if (result > 0) {
                return "Detalle de pedido actualizado con éxito.";
            } else {
                return "Error al actualizar detalle de pedido.";
            }
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }

    // Método para obtener el cuerpo de una solicitud HTTP
    private String getBody(HttpServletRequest request) throws Exception {
        StringBuilder stringBuilder = new StringBuilder();
        String line;
        while ((line = request.getReader().readLine()) != null) {
            stringBuilder.append(line);
        }
        return stringBuilder.toString();
    }
}

