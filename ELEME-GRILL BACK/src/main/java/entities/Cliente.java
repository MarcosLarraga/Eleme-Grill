package entities;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.util.ArrayList;

public class Cliente {
    private int CL_CLIENTE_ID;
    private String CL_NOMBRE;
    private String CL_APELLIDO;
    private String CL_DIRECCION;
    private String CL_TELEFONO;
    private String CL_EMAIL;
    private String CL_CONTRASENA;

    // Constructor con todos los atributos
    public Cliente(int CL_CLIENTE_ID, String CL_NOMBRE, String CL_APELLIDO, String CL_DIRECCION, String CL_TELEFONO, String CL_EMAIL,String CL_CONTRASENA) {
        this.CL_CLIENTE_ID = CL_CLIENTE_ID;
        this.CL_NOMBRE = CL_NOMBRE;
        this.CL_APELLIDO = CL_APELLIDO;
        this.CL_DIRECCION = CL_DIRECCION;
        this.CL_TELEFONO = CL_TELEFONO;
        this.CL_EMAIL = CL_EMAIL;
        this.CL_CONTRASENA = CL_CONTRASENA;
    }

    // Constructor vacío
    public Cliente() {}

    // Getters and Setters
    public int getCL_CLIENTE_ID() {
        return CL_CLIENTE_ID;
    }

    public void setCL_CLIENTE_ID(int CL_CLIENTE_ID) {
        this.CL_CLIENTE_ID = CL_CLIENTE_ID;
    }

    public String getCL_NOMBRE() {
        return CL_NOMBRE;
    }

    public void setCL_NOMBRE(String CL_NOMBRE) {
        this.CL_NOMBRE = CL_NOMBRE;
    }

    public String getCL_APELLIDO() {
        return CL_APELLIDO;
    }

    public void setCL_APELLIDO(String CL_APELLIDO) {
        this.CL_APELLIDO = CL_APELLIDO;
    }

    public String getCL_DIRECCION() {
        return CL_DIRECCION;
    }

    public void setCL_DIRECCION(String CL_DIRECCION) {
        this.CL_DIRECCION = CL_DIRECCION;
    }

    public String getCL_TELEFONO() {
        return CL_TELEFONO;
    }

    public void setCL_TELEFONO(String CL_TELEFONO) {
        this.CL_TELEFONO = CL_TELEFONO;
    }

    public String getCL_EMAIL() {
        return CL_EMAIL;
    }

    public void setCL_EMAIL(String CL_EMAIL) {
        this.CL_EMAIL = CL_EMAIL;
    }

    public String getCL_CONTRASENA() {
        return CL_CONTRASENA;
    }

    public void setCL_CONTRASENA(String CL_CONTRASENA) {
        this.CL_CONTRASENA = CL_CONTRASENA;
    }

    @Override
    public String toString() {
        return "Cliente{" +
                "CL_CLIENTE_ID=" + CL_CLIENTE_ID +
                ", CL_NOMBRE='" + CL_NOMBRE + '\'' +
                ", CL_APELLIDO='" + CL_APELLIDO + '\'' +
                ", CL_DIRECCION='" + CL_DIRECCION + '\'' +
                ", CL_TELEFONO='" + CL_TELEFONO + '\'' +
                ", CL_EMAIL='" + CL_EMAIL + '\'' +
                ", CL_CONTRASENA='" + CL_CONTRASENA + '\'' +
                '}';
    }

    // Convert a Cliente object to a JSON string
    public static String toCadena(Cliente cliente) {
        return "Cliente{" +
                "\"CL_CLIENTE_ID\"=" + cliente.getCL_CLIENTE_ID() + ", " +
                "\"CL_NOMBRE\"='" + cliente.getCL_NOMBRE() + "', " +
                "\"CL_APELLIDO\"='" + cliente.getCL_APELLIDO() + "', " +
                "\"CL_DIRECCION\"='" + cliente.getCL_DIRECCION() + "', " +
                "\"CL_TELEFONO\"='" + cliente.getCL_TELEFONO() + "', " +
                "\"CL_EMAIL\"='" + cliente.getCL_EMAIL() + "', " +
                "\"CL_CONTRASENA\"='" + cliente.getCL_CONTRASENA() + "'" +
                '}';
    }

    // Convert an ArrayList of Cliente objects to a JSON string
    public static String fromArrayToJson(ArrayList<Cliente> clientes) {
        StringBuilder resp = new StringBuilder("[");
        for (Cliente cliente : clientes) {
            resp.append("{")
                    .append("\"CL_CLIENTE_ID\":").append(cliente.getCL_CLIENTE_ID()).append(", ")
                    .append("\"CL_NOMBRE\":\"").append(cliente.getCL_NOMBRE()).append("\", ")
                    .append("\"CL_APELLIDO\":\"").append(cliente.getCL_APELLIDO()).append("\", ")
                    .append("\"CL_DIRECCION\":\"").append(cliente.getCL_DIRECCION()).append("\", ")
                    .append("\"CL_TELEFONO\":\"").append(cliente.getCL_TELEFONO()).append("\", ")
                    .append("\"CL_EMAIL\":\"").append(cliente.getCL_EMAIL()).append("\", ")
                    .append("\"CL_CONTRASENA\":\"").append(cliente.getCL_CONTRASENA()).append("\"},");
        }
        if (resp.length() > 1) {
            resp.setLength(resp.length() - 1); // Remove the trailing comma
        }
        resp.append("]");
        return resp.toString();
    }

    // Convert an ArrayList of Cliente objects to a pretty-printed JSON string
    public static String toArrayJson(ArrayList<Cliente> clientes) {
        GsonBuilder builder = new GsonBuilder();
        builder.setPrettyPrinting();

        Gson gson = builder.create();
        return gson.toJson(clientes);
    }
}
