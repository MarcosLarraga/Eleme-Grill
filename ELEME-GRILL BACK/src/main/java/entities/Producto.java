package entities;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.util.ArrayList;

public class Producto {
    private int PR_PRODUCTO_ID;
    private String PR_NOMBRE;
    private double PR_PRECIO;
    private int PR_CATEGORIA_ID;
    private String PR_FOTO;


    // Constructor con todos los atributos
    public Producto(int PR_PRODUCTO_ID, String PR_NOMBRE, double PR_PRECIO, int PR_CATEGORIA_ID, String PR_FOTO) {
        this.PR_PRODUCTO_ID = PR_PRODUCTO_ID;
        this.PR_NOMBRE = PR_NOMBRE;
        this.PR_PRECIO = PR_PRECIO;
        this.PR_CATEGORIA_ID = PR_CATEGORIA_ID;
        this.PR_FOTO = PR_FOTO;

    }

    // Constructor vacío
    public Producto() {
    }

    // Getters y Setters
    public int getPR_PRODUCTO_ID() {
        return PR_PRODUCTO_ID;
    }

    public void setPR_PRODUCTO_ID(int PR_PRODUCTO_ID) {
        this.PR_PRODUCTO_ID = PR_PRODUCTO_ID;
    }

    public String getPR_NOMBRE() {
        return PR_NOMBRE;
    }

    public void setPR_NOMBRE(String PR_NOMBRE) {
        this.PR_NOMBRE = PR_NOMBRE;
    }

    public double getPR_PRECIO() {
        return PR_PRECIO;
    }

    public void setPR_PRECIO(double PR_PRECIO) {
        this.PR_PRECIO = PR_PRECIO;
    }

    public int getPR_CATEGORIA_ID() {
        return PR_CATEGORIA_ID;
    }

    public void setPR_CATEGORIA_ID(int PR_CATEGORIA_ID) {
        this.PR_CATEGORIA_ID = PR_CATEGORIA_ID;
    }

    public String getPR_FOTO() {
        return PR_FOTO;
    }

    public void setPR_FOTO(String PR_FOTO) {
        this.PR_FOTO = PR_FOTO;
    }


    @Override
    public String toString() {
        return "Producto{" +
                "PR_PRODUCTO_ID=" + PR_PRODUCTO_ID +
                ", PR_NOMBRE='" + PR_NOMBRE + '\'' +
                ", PR_PRECIO='" + PR_PRECIO + '\'' +
                ", PR_CATEGORIA_ID='" + PR_CATEGORIA_ID + '\'' +
                ", PR_FOTO='" + PR_FOTO + '\'' +
                '}';
    }

    // Convertir un objeto Producto a una cadena JSON
    public static String toCadena(Producto producto) {
        return "Producto{" +
                "\"PR_PRODUCTO_ID\"=" + producto.getPR_PRODUCTO_ID() + ", " +
                "\"PR_NOMBRE\"='" + producto.getPR_NOMBRE() + "', " +
                "\"PR_PRECIO\"=" + producto.getPR_PRECIO() + ", " +
                "\"PR_CATEGORIA_ID\"=" + producto.getPR_CATEGORIA_ID() + ", " +
                "\"PR_FOTO\"='" + producto.getPR_FOTO() + '\'' +
                '}';
    }

    // Convertir un ArrayList de objetos Producto a una cadena JSON
    public static String fromArrayToJson(ArrayList<Producto> productos) {
        StringBuilder resp = new StringBuilder("[");
        for (Producto producto : productos) {
            resp.append("{")
                    .append("\"PR_PRODUCTO_ID\":").append(producto.getPR_PRODUCTO_ID()).append(", ")
                    .append("\"PR_NOMBRE\":\"").append(producto.getPR_NOMBRE()).append("\", ")
                    .append("\"PR_PRECIO\":").append(producto.getPR_PRECIO()).append(", ")
                    .append("\"PR_CATEGORIA_ID\":").append(producto.getPR_CATEGORIA_ID()).append(", ")
                    .append("\"PR_FOTO\":\"").append(producto.getPR_FOTO()).append("\"},");
        }
        if (resp.length() > 1) {
            resp.setLength(resp.length() - 1); // Eliminar la coma final
        }
        resp.append("]");
        return resp.toString();
    }

    // Convertir un ArrayList de objetos Producto a una cadena JSON con formato
    public static String toArrayJson(ArrayList<Producto> productos) {
        GsonBuilder builder = new GsonBuilder();
        builder.setPrettyPrinting();

        Gson gson = builder.create();
        return gson.toJson(productos);
    }
}