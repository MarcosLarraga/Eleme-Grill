package actions;

import com.google.gson.Gson;
import com.google.gson.JsonParser;
import controller.Controller;
import entities.Cliente;
import dao.ClienteDao;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;

public class ClienteAction implements IAction {
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
        ClienteDao clienteDao = new ClienteDao();
        ArrayList<Cliente> clientes = clienteDao.findAll(null);
        return Cliente.toArrayJson(clientes);
    }

    /*private String add(HttpServletRequest request) {
        try {


            int CL_CLIENTE_ID = Integer.parseInt(request.getParameter("CL_CLIENTE_ID"));
            String CL_NOMBRE = request.getParameter("CL_NOMBRE");
            String CL_APELLIDO = request.getParameter("CL_APELLIDO");
            String CL_DIRECCION = request.getParameter("CL_DIRECCION");
            String CL_TELEFONO = request.getParameter("CL_TELEFONO");
            String CL_EMAIL = request.getParameter("CL_EMAIL");
            String CL_CONTRASENA = request.getParameter("CL_CONTRASENA");

            // Validar que todos los parámetros estén presentes
            if (CL_NOMBRE == null || CL_NOMBRE.isEmpty() ||
                    CL_APELLIDO == null || CL_APELLIDO.isEmpty() ||
                    CL_DIRECCION == null || CL_DIRECCION.isEmpty() ||
                    CL_TELEFONO == null || CL_TELEFONO.isEmpty() ||
                    CL_EMAIL == null || CL_EMAIL.isEmpty() ||
                    CL_CONTRASENA == null || CL_CONTRASENA.isEmpty()) {
                return "Error: Todos los campos son obligatorios.";
            }

            JsonParser parser = new JsonParser();
            Gson gson = new Gson();

            ClienteDao clienteDao = new ClienteDao();
            Cliente cliente = new Cliente(CL_CLIENTE_ID, CL_NOMBRE, CL_APELLIDO, CL_DIRECCION, CL_TELEFONO, CL_EMAIL, CL_CONTRASENA);
            int result = clienteDao.add(cliente);

            if (result > 0) {
                return "Cliente añadido con éxito.";
            } else {
                return "Error al añadir cliente.";
            }
        } catch (NumberFormatException e) {
            return "Error: El ID del cliente y el ID de zona privada deben ser números enteros.";
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }*/

   private String add(HttpServletRequest request) {
        try {

            JsonParser parser = new JsonParser();
            Gson gson = new Gson();

            ClienteDao clienteDao = new ClienteDao();
            Cliente c  = gson.fromJson(parser.parse(controller.Controller.getBody(request)), Cliente.class);

            int result = clienteDao.add(c);

            if (result > 0) {
                return "Cliente añadido con éxito.";
            } else {
                return "Error al añadir cliente.";
            }
        } catch (NumberFormatException e) {
            return "Error: El ID del cliente y el ID de zona privada deben ser números enteros.";
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }
    private String delete(HttpServletRequest request) {
        try {


            int CL_CLIENTE_ID = Integer.parseInt(request.getParameter("CL_CLIENTE_ID"));

            ClienteDao clientesDAO = new ClienteDao();
            int result = clientesDAO.delete(CL_CLIENTE_ID);


            if (result > 0) {
                return "Cliente eliminado con éxito.";
            } else {
                return "Error al eliminar cliente.";
            }
        } catch (NumberFormatException e) {
            return "Error: El ID del cliente debe ser un número entero.";
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }
    private String update(HttpServletRequest request) {
        try {
            // Crear un parser JSON y Gson
            JsonParser parser = new JsonParser();
            Gson gson = new Gson();

            // Obtener el cuerpo de la solicitud y convertirlo en un objeto Cliente
            Cliente cliente = gson.fromJson(parser.parse(Controller.getBody(request)), Cliente.class);

            // Llamar al método de actualización del DAO
            ClienteDao clienteDao = new ClienteDao();
            int result = clienteDao.update(cliente);

            // Devolver el resultado de la operación
            if (result > 0) {
                return "Cliente actualizado con éxito.";
            } else {
                return "Error al actualizar cliente.";
            }
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }
}
