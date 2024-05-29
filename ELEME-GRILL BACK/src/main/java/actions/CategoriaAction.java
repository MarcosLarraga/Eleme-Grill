package actions;

import com.google.gson.Gson;
import com.google.gson.JsonParser;
import entities.Categoria;
import dao.CategoriaDao;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;

public class CategoriaAction implements IAction {
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
        CategoriaDao categoriaDao = new CategoriaDao();
        ArrayList<Categoria> categorias = categoriaDao.findAll(null);
        return Categoria.toArrayJson(categorias);
    }

    private String add(HttpServletRequest request) {
        try {
            JsonParser parser = new JsonParser();
            Gson gson = new Gson();

            CategoriaDao categoriaDao = new CategoriaDao();
            Categoria categoria = gson.fromJson(parser.parse(controller.Controller.getBody(request)), Categoria.class);

            int result = categoriaDao.add(categoria);

            if (result > 0) {
                return "Categoria añadida con éxito.";
            } else {
                return "Error al añadir categoria.";
            }
        } catch (NumberFormatException e) {
            return "Error: El ID de la categoria debe ser un número entero.";
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }

    private String delete(HttpServletRequest request) {
        try {
            int CA_CATEGORIA_ID = Integer.parseInt(request.getParameter("CA_CATEGORIA_ID"));

            CategoriaDao categoriaDao = new CategoriaDao();
            int result = categoriaDao.delete(CA_CATEGORIA_ID);

            if (result > 0) {
                return "Categoria eliminada con éxito.";
            } else {
                return "Error al eliminar categoria.";
            }
        } catch (NumberFormatException e) {
            return "Error: El ID de la categoria debe ser un número entero.";
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }

    private String update(HttpServletRequest request) {
        try {
            int CA_CATEGORIA_ID = Integer.parseInt(request.getParameter("CA_CATEGORIA_ID"));
            String CA_NOMBRE = request.getParameter("CA_NOMBRE");

            if (CA_NOMBRE == null || CA_NOMBRE.isEmpty()) {
                return "Error: Todos los campos son obligatorios.";
            }

            Categoria categoria = new Categoria();
            categoria.setCA_CATEGORIA_ID(CA_CATEGORIA_ID);
            categoria.setCA_NOMBRE(CA_NOMBRE);

            CategoriaDao categoriaDao = new CategoriaDao();
            int result = categoriaDao.update(categoria);

            if (result > 0) {
                return "Categoria actualizada con éxito.";
            } else {
                return "Error al actualizar categoria.";
            }
        } catch (NumberFormatException e) {
            return "Error: El ID de la categoria debe ser un número entero.";
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }
}
