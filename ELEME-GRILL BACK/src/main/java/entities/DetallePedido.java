package entities;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.util.ArrayList;

public class DetallePedido {
    private int DE_DETALLE_ID;
    private int DE_PEDIDO_ID;
    private int DE_PRODUCTO_ID;
    private int DE_CANTIDAD;
    private double DE_PRECIOUNITARIO;

    public DetallePedido(int DE_DETALLE_ID, int DE_PEDIDO_ID, int DE_PRODUCTO_ID, int DE_CANTIDAD, double DE_PRECIOUNITARIO) {
        this.DE_DETALLE_ID = DE_DETALLE_ID;
        this.DE_PEDIDO_ID = DE_PEDIDO_ID;
        this.DE_PRODUCTO_ID = DE_PRODUCTO_ID;
        this.DE_CANTIDAD = DE_CANTIDAD;
        this.DE_PRECIOUNITARIO = DE_PRECIOUNITARIO;
    }

    public DetallePedido() {}

    // Getters and Setters
    public int getDE_DETALLE_ID() {
        return DE_DETALLE_ID;
    }

    public void setDE_DETALLE_ID(int DE_DETALLE_ID) {
        this.DE_DETALLE_ID = DE_DETALLE_ID;
    }

    public int getDE_PEDIDO_ID() {
        return DE_PEDIDO_ID;
    }

    public void setDE_PEDIDO_ID(int DE_PEDIDO_ID) {
        this.DE_PEDIDO_ID = DE_PEDIDO_ID;
    }

    public int getDE_PRODUCTO_ID() {
        return DE_PRODUCTO_ID;
    }

    public void setDE_PRODUCTO_ID(int DE_PRODUCTO_ID) {
        this.DE_PRODUCTO_ID = DE_PRODUCTO_ID;
    }

    public int getDE_CANTIDAD() {
        return DE_CANTIDAD;
    }

    public void setDE_CANTIDAD(int DE_CANTIDAD) {
        this.DE_CANTIDAD = DE_CANTIDAD;
    }

    public double getDE_PRECIOUNITARIO() {
        return DE_PRECIOUNITARIO;
    }

    public void setDE_PRECIOUNITARIO(double DE_PRECIOUNITARIO) {
        this.DE_PRECIOUNITARIO = DE_PRECIOUNITARIO;
    }

    @Override
    public String toString() {
        return "DetallePedido{" +
                "DE_DETALLE_ID=" + DE_DETALLE_ID +
                ", DE_PEDIDO_ID=" + DE_PEDIDO_ID +
                ", DE_PRODUCTO_ID=" + DE_PRODUCTO_ID +
                ", DE_CANTIDAD=" + DE_CANTIDAD +
                ", DE_PRECIOUNITARIO=" + DE_PRECIOUNITARIO +
                '}';
    }

    // Convertir una lista de objetos DetallePedido a una cadena JSON formateada
    public static String toArrayJson(ArrayList<DetallePedido> detallesPedido) {
        GsonBuilder builder = new GsonBuilder();
        builder.setPrettyPrinting();
        Gson gson = builder.create();
        return gson.toJson(detallesPedido);
    }

}
