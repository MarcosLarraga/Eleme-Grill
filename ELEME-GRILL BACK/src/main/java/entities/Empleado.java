package entities;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.util.ArrayList;

public class Empleado {
    private int EM_EMPLEADO_ID;
    private String EM_NOMBRE;
    private String EM_APELLIDO;
    private String EM_DIRECCION;
    private String EM_TELEFONO;
    private String EM_EMAIL;

    public Empleado(int EM_EMPLEADO_ID, String EM_NOMBRE, String EM_APELLIDO, String EM_DIRECCION, String EM_TELEFONO, String EM_EMAIL) {
        this.EM_EMPLEADO_ID = EM_EMPLEADO_ID;
        this.EM_NOMBRE = EM_NOMBRE;
        this.EM_APELLIDO = EM_APELLIDO;
        this.EM_DIRECCION = EM_DIRECCION;
        this.EM_TELEFONO = EM_TELEFONO;
        this.EM_EMAIL = EM_EMAIL;
    }

    public int getEM_EMPLEADO_ID() {
        return EM_EMPLEADO_ID;
    }

    public void setEM_EMPLEADO_ID(int EM_EMPLEADO_ID) {
        this.EM_EMPLEADO_ID = EM_EMPLEADO_ID;
    }

    public String getEM_NOMBRE() {
        return EM_NOMBRE;
    }

    public void setEM_NOMBRE(String EM_NOMBRE) {
        this.EM_NOMBRE = EM_NOMBRE;
    }

    public String getEM_APELLIDO() {
        return EM_APELLIDO;
    }

    public void setEM_APELLIDO(String EM_APELLIDO) {
        this.EM_APELLIDO = EM_APELLIDO;
    }

    public String getEM_DIRECCION() {
        return EM_DIRECCION;
    }

    public void setEM_DIRECCION(String EM_DIRECCION) {
        this.EM_DIRECCION = EM_DIRECCION;
    }

    public String getEM_TELEFONO() {
        return EM_TELEFONO;
    }

    public void setEM_TELEFONO(String EM_TELEFONO) {
        this.EM_TELEFONO = EM_TELEFONO;
    }

    public String getEM_EMAIL() {
        return EM_EMAIL;
    }

    public void setEM_EMAIL(String EM_EMAIL) {
        this.EM_EMAIL = EM_EMAIL;
    }

    @Override
    public String toString() {
        return "Empleado{" +
                "EM_EMPLEADO_ID=" + EM_EMPLEADO_ID +
                ", EM_NOMBRE='" + EM_NOMBRE + '\'' +
                ", EM_APELLIDO='" + EM_APELLIDO + '\'' +
                ", EM_DIRECCION='" + EM_DIRECCION + '\'' +
                ", EM_TELEFONO='" + EM_TELEFONO + '\'' +
                ", EM_EMAIL='" + EM_EMAIL + '\'' +
                '}';
    }

    // Convertir un objeto Empleado a una cadena JSON
    public static String toCadena(Empleado empleado) {
        return "Empleado{" +
                "\"EM_EMPLEADO_ID\"=" + empleado.getEM_EMPLEADO_ID() + ", " +
                "\"EM_NOMBRE\"='" + empleado.getEM_NOMBRE() + "', " +
                "\"EM_APELLIDO\"='" + empleado.getEM_APELLIDO() + "', " +
                "\"EM_DIRECCION\"='" + empleado.getEM_DIRECCION() + "', " +
                "\"EM_TELEFONO\"='" + empleado.getEM_TELEFONO() + "', " +
                "\"EM_EMAIL\"='" + empleado.getEM_EMAIL() + "', " +
                '}';
    }

    // Convertir un ArrayList de objetos Empleado a una cadena JSON
    public static String fromArrayToJson(ArrayList<Empleado> empleados) {
        StringBuilder resp = new StringBuilder("[");
        for (Empleado empleado : empleados) {
            resp.append("{")
                    .append("\"EM_EMPLEADO_ID\":").append(empleado.getEM_EMPLEADO_ID()).append(", ")
                    .append("\"EM_NOMBRE\":\"").append(empleado.getEM_NOMBRE()).append("\", ")
                    .append("\"EM_APELLIDO\":\"").append(empleado.getEM_APELLIDO()).append("\", ")
                    .append("\"EM_DIRECCION\":\"").append(empleado.getEM_DIRECCION()).append("\", ")
                    .append("\"EM_TELEFONO\":\"").append(empleado.getEM_TELEFONO()).append("\", ")
                    .append("\"EM_EMAIL\":\"").append(empleado.getEM_EMAIL()).append("\", ");
        }
        if (resp.length() > 1) {
            resp.setLength(resp.length() - 1); // Eliminar la coma final
        }
        resp.append("]");
        return resp.toString();
    }

    // Convertir un ArrayList de objetos Empleado a una cadena JSON con formato bonito
    public static String toArrayJson(ArrayList<Empleado> empleados) {
        GsonBuilder builder = new GsonBuilder();
        builder.setPrettyPrinting();

        Gson gson = builder.create();
        return gson.toJson(empleados);
    }
}
