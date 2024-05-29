package entities;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.util.ArrayList;

public class Categoria {
    private int CA_CATEGORIA_ID;
    private String CA_NOMBRE;

    // Constructor vacío
    public Categoria() {}

    // Constructor con todos los atributos
    public Categoria(int CA_CATEGORIA_ID, String CA_NOMBRE) {
        this.CA_CATEGORIA_ID = CA_CATEGORIA_ID;
        this.CA_NOMBRE = CA_NOMBRE;
    }

    // Getters y Setters
    public int getCA_CATEGORIA_ID() {
        return CA_CATEGORIA_ID;
    }

    public void setCA_CATEGORIA_ID(int CA_CATEGORIA_ID) {
        this.CA_CATEGORIA_ID = CA_CATEGORIA_ID;
    }

    public String getCA_NOMBRE() {
        return CA_NOMBRE;
    }

    public void setCA_NOMBRE(String CA_NOMBRE) {
        this.CA_NOMBRE = CA_NOMBRE;
    }

    @Override
    public String toString() {
        return "Categoria{" +
                "CA_CATEGORIA_ID=" + CA_CATEGORIA_ID +
                ", CA_NOMBRE='" + CA_NOMBRE + '\'' +
                '}';
    }

    // Convertir un objeto Categoria a una cadena JSON
    public static String toCadena(Categoria categoria) {
        return "Categoria{" +
                "\"CA_CATEGORIA_ID\"=" + categoria.getCA_CATEGORIA_ID() + ", " +
                "\"CA_NOMBRE\"='" + categoria.getCA_NOMBRE() + "'" +
                '}';
    }

    // Convertir un ArrayList de objetos Categoria a una cadena JSON
    public static String fromArrayToJson(ArrayList<Categoria> categorias) {
        StringBuilder resp = new StringBuilder("[");
        for (Categoria categoria : categorias) {
            resp.append("{")
                    .append("\"CA_CATEGORIA_ID\":").append(categoria.getCA_CATEGORIA_ID()).append(", ")
                    .append("\"CA_NOMBRE\":\"").append(categoria.getCA_NOMBRE()).append("\"},");
        }
        if (resp.length() > 1) {
            resp.setLength(resp.length() - 1); // Eliminar la coma final
        }
        resp.append("]");
        return resp.toString();
    }

    // Convertir un ArrayList de objetos Categoria a una cadena JSON con formato
    public static String toArrayJson(ArrayList<Categoria> categorias) {
        GsonBuilder builder = new GsonBuilder();
        builder.setPrettyPrinting();

        Gson gson = builder.create();
        return gson.toJson(categorias);
    }
}
