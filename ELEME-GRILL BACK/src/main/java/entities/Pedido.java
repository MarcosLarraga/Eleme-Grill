package entities;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.util.ArrayList;


public class Pedido {
    private int PE_PEDIDO_ID;
    private int PE_CLIENTE_ID;
    private int PE_EMPLEADO_ID;
    private String PE_FECHAPEDIDO;

    public Pedido(int PE_PEDIDO_ID, int PE_CLIENTE_ID, int PE_EMPLEADO_ID, String PE_FECHAPEDIDO) {
        this.PE_PEDIDO_ID = PE_PEDIDO_ID;
        this.PE_CLIENTE_ID = PE_CLIENTE_ID;
        this.PE_EMPLEADO_ID = PE_EMPLEADO_ID;
        this.PE_FECHAPEDIDO = PE_FECHAPEDIDO;
    }

    public Pedido() {}

    // Getters and Setters
    public int getPE_PEDIDO_ID() {
        return PE_PEDIDO_ID;
    }

    public void setPE_PEDIDO_ID(int PE_PEDIDO_ID) {
        this.PE_PEDIDO_ID = PE_PEDIDO_ID;
    }

    public int getPE_CLIENTE_ID() {
        return PE_CLIENTE_ID;
    }

    public void setPE_CLIENTE_ID(int PE_CLIENTE_ID) {
        this.PE_CLIENTE_ID = PE_CLIENTE_ID;
    }

    public int getPE_EMPLEADO_ID() {
        return PE_EMPLEADO_ID;
    }

    public void setPE_EMPLEADO_ID(int PE_EMPLEADO_ID) {
        this.PE_EMPLEADO_ID = PE_EMPLEADO_ID;
    }

    public String getPE_FECHAPEDIDO() {
        return PE_FECHAPEDIDO;
    }

    public void setPE_FECHAPEDIDO(String PE_FECHAPEDIDO) {
        this.PE_FECHAPEDIDO = PE_FECHAPEDIDO;
    }

    @Override
    public String toString() {
        return "Pedido{" +
                "PE_PEDIDO_ID=" + PE_PEDIDO_ID +
                ", PE_CLIENTE_ID=" + PE_CLIENTE_ID +
                ", PE_EMPLEADO_ID=" + PE_EMPLEADO_ID +
                ", PE_FECHAPEDIDO=" + PE_FECHAPEDIDO +
                '}';
    }

    // Convert a Pedido object to a JSON string
    public static String toCadena(Pedido pedido) {
        return "Pedido{" +
                "\"PE_PEDIDO_ID\"=" + pedido.getPE_PEDIDO_ID() + ", " +
                "\"PE_CLIENTE_ID\"=" + pedido.getPE_CLIENTE_ID() + ", " +
                "\"PE_EMPLEADO_ID\"=" + pedido.getPE_EMPLEADO_ID() + ", " +
                "\"PE_FECHAPEDIDO\"='" + pedido.getPE_FECHAPEDIDO() + "'" +
                '}';
    }

    // Convert an ArrayList of Pedido objects to a JSON string
    public static String fromArrayToJson(ArrayList<Pedido> pedidos) {
        StringBuilder resp = new StringBuilder("[");
        for (Pedido pedido : pedidos) {
            resp.append("{")
                    .append("\"PE_PEDIDO_ID\":").append(pedido.getPE_PEDIDO_ID()).append(", ")
                    .append("\"PE_CLIENTE_ID\":").append(pedido.getPE_CLIENTE_ID()).append(", ")
                    .append("\"PE_EMPLEADO_ID\":").append(pedido.getPE_EMPLEADO_ID()).append(", ")
                    .append("\"PE_FECHAPEDIDO\":\"").append(pedido.getPE_FECHAPEDIDO()).append("\"},");
        }
        if (resp.length() > 1) {
            resp.setLength(resp.length() - 1); // Remove the trailing comma
        }
        resp.append("]");
        return resp.toString();
    }

    // Convert an ArrayList of Pedido objects to a pretty-printed JSON string
    public static String toArrayJson(ArrayList<Pedido> pedidos) {
        GsonBuilder builder = new GsonBuilder();
        builder.setPrettyPrinting();

        Gson gson = builder.create();
        return gson.toJson(pedidos);
    }
}
