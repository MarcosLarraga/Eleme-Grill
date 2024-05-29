package actions;

import com.google.gson.Gson;
import com.google.gson.JsonParser;
import controller.Controller;
import dao.EmpleadoDao;
import entities.Empleado;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;

public class EmpleadoAction implements IAction {
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
        EmpleadoDao empleadoDao = new EmpleadoDao();
        ArrayList<Empleado> empleados = empleadoDao.findAll(null);
        return Empleado.toArrayJson(empleados);
    }

    private String add(HttpServletRequest request) {
        try {
            JsonParser parser = new JsonParser();
            Gson gson = new Gson();
            EmpleadoDao empleadoDao = new EmpleadoDao();
            Empleado empleado = gson.fromJson(parser.parse(controller.Controller.getBody(request)), Empleado.class);
            int result = empleadoDao.add(empleado);
            if (result > 0) {
                return "Empleado añadido con éxito.";
            } else {
                return "Error al añadir empleado.";
            }
        } catch (NumberFormatException e) {
            return "Error: El ID del empleado debe ser un número entero.";
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }

    private String delete(HttpServletRequest request) {
        try {
            int EM_EMPLEADO_ID = Integer.parseInt(request.getParameter("EM_EMPLEADO_ID"));
            EmpleadoDao empleadoDao = new EmpleadoDao();
            int result = empleadoDao.delete(EM_EMPLEADO_ID);
            if (result > 0) {
                return "Empleado eliminado con éxito.";
            } else {
                return "Error al eliminar empleado.";
            }
        } catch (NumberFormatException e) {
            return "Error: El ID del empleado debe ser un número entero.";
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
            Empleado empleado = gson.fromJson(parser.parse(Controller.getBody(request)), Empleado.class);

            // Llamar al método de actualización del DAO
            EmpleadoDao empleadoDao = new EmpleadoDao();
            int result = empleadoDao.update(empleado);

            // Devolver el resultado de la operación
            if (result > 0) {
                return "Empleado actualizado con éxito.";
            } else {
                return "Error al actualizar empleado.";
            }
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }

}
