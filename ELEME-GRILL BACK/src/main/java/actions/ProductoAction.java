package actions;

import com.google.gson.Gson;
import com.google.gson.JsonParser;
import dao.ProductoDao;
import entities.Producto;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;

import static controller.Controller.getBody;

public class ProductoAction implements IAction {
    @Override
    public String execute(HttpServletRequest request, HttpServletResponse response, String action) {
        String result = "";
        try {
            switch (action.toUpperCase()) {
                case "FIND_ALL":
                    result = findAll();
                    break;
                case "ADD":
                    result = add(request);
                    break;
                case "DELETE":
                    result = delete(request);
                    break;
                case "UPDATE":
                    result = update(request);
                    break;
                default:
                    result = "{\"error\": \"Invalid action.\"}";
            }
        } catch (Exception e) {
            result = "{\"error\": \"An error occurred while processing the action: " + e.getMessage() + "\"}";
        }
        return result;
    }

    private String findAll() {
        ProductoDao productoDao = new ProductoDao();
        ArrayList<Producto> productos = productoDao.findAll(null);
        return Producto.toArrayJson(productos);
    }

    private String add(HttpServletRequest request) {
        try {
            JsonParser parser = new JsonParser();
            Gson gson = new Gson();
            ProductoDao productoDao = new ProductoDao();
            Producto p = gson.fromJson(parser.parse(getBody(request)), Producto.class);
            int result = productoDao.add(p);
            if (result > 0) {
                return "Product added successfully.";
            } else {
                return "Error adding product.";
            }
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }

    private String delete(HttpServletRequest request) {
        try {
            int PR_PRODUCTO_ID = Integer.parseInt(request.getParameter("PR_PRODUCTO_ID"));
            ProductoDao productoDao = new ProductoDao();
            int result = productoDao.delete(PR_PRODUCTO_ID);
            if (result > 0) {
                return "Product deleted successfully.";
            } else {
                return "Error deleting product.";
            }
        } catch (NumberFormatException e) {
            return "Error: Product ID must be an integer.";
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }

    private String update(HttpServletRequest request) {
        try {
            // Crear un parser JSON y Gson
            JsonParser parser = new JsonParser();
            Gson gson = new Gson();

            // Obtener el cuerpo de la solicitud y convertirlo en un objeto Producto
            Producto p = gson.fromJson(parser.parse(controller.Controller.getBody(request)), Producto.class);

            // Llamar al método de actualización del DAO
            ProductoDao productoDao = new ProductoDao();
            int result = productoDao.update(p);

            // Devolver el resultado de la operación
            if (result > 0) {
                return "Product updated successfully.";
            } else {
                return "Error updating product.";
            }
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }
}
