package dao;

import entities.DetallePedido;
import motor.MotorSQL;

import java.sql.ResultSet;
import java.util.ArrayList;

public class DetallePedidoDao implements IDao<DetallePedido, Integer> {
    private final String SQL_FIND_ALL = "SELECT * FROM DETALLE_PEDIDO WHERE 1=1 ";
    private final String SQL_ADD = "INSERT INTO DETALLE_PEDIDO (DE_DETALLE_ID, DE_PEDIDO_ID, DE_PRODUCTO_ID, DE_CANTIDAD, DE_PRECIOUNITARIO) VALUES ";
    private final String SQL_DELETE = "DELETE FROM DETALLE_PEDIDO WHERE DE_DETALLE_ID = ?";
    private final String SQL_UPDATE = "UPDATE DETALLE_PEDIDO SET DE_PEDIDO_ID = ?, DE_PRODUCTO_ID = ?, DE_CANTIDAD = ?, DE_PRECIOUNITARIO = ? WHERE DE_DETALLE_ID = ?";

    @Override
    public int add(DetallePedido bean) {
        int resp = 0;
        MotorSQL motor = new MotorSQL();
        try {
            motor.connect();

            String sql = SQL_ADD + "("
                    + bean.getDE_DETALLE_ID() + ", "
                    + bean.getDE_PEDIDO_ID() + ", "
                    + bean.getDE_PRODUCTO_ID() + ", "
                    + bean.getDE_CANTIDAD() + ", "
                    + bean.getDE_PRECIOUNITARIO() + ")";

            resp = motor.execute(sql);
            System.out.println(sql);

        } catch (Exception e) {
            System.out.println(e);
        } finally {
            motor.disconnect();
        }
        if (resp > 0) {
            System.out.println("Detalle de pedido insertado con éxito.");
        }
        return resp;
    }

    @Override
    public int delete(Integer id) {
        MotorSQL motor = new MotorSQL();
        int result = 0;
        try {
            motor.connect();
            String sql = SQL_DELETE.replace("?", id.toString());
            result = motor.executeUpdate(sql);
        } catch (Exception ex) {
            System.out.println("SQLException: " + ex.getMessage());
        } finally {
            motor.disconnect();
        }
        return result;
    }

    @Override
    public int update(DetallePedido bean) {
        MotorSQL motor = new MotorSQL();
        int result = 0;
        try {
            motor.connect();
            String sql = SQL_UPDATE
                    .replaceFirst("\\?", Integer.toString(bean.getDE_PEDIDO_ID()))
                    .replaceFirst("\\?", Integer.toString(bean.getDE_PRODUCTO_ID()))
                    .replaceFirst("\\?", Integer.toString(bean.getDE_CANTIDAD()))
                    .replaceFirst("\\?", Double.toString(bean.getDE_PRECIOUNITARIO()))
                    .replaceFirst("\\?", Integer.toString(bean.getDE_DETALLE_ID()));
            result = motor.executeUpdate(sql);
        } catch (Exception ex) {
            System.out.println("SQLException: " + ex.getMessage());
        } finally {
            motor.disconnect();
        }
        return result;
    }

    @Override
    public ArrayList<DetallePedido> findAll(DetallePedido bean) {
        ArrayList<DetallePedido> detallesPedido = new ArrayList<>();
        MotorSQL motor = new MotorSQL();
        try {
            motor.connect();
            String sql = SQL_FIND_ALL;
            if (bean != null) {
                // Aquí podrías agregar condiciones adicionales según tus necesidades
            }
            ResultSet rs = motor.executeQuery(sql);

            if (rs != null) {
                while (rs.next()) {
                    DetallePedido detallePedido = new DetallePedido(
                            rs.getInt("DE_DETALLE_ID"),
                            rs.getInt("DE_PEDIDO_ID"),
                            rs.getInt("DE_PRODUCTO_ID"),
                            rs.getInt("DE_CANTIDAD"),
                            rs.getDouble("DE_PRECIOUNITARIO"));
                    detallesPedido.add(detallePedido);
                }
            } else {
                System.out.println("ResultSet is null");
            }

        } catch (Exception ex) {
            detallesPedido.clear();
            System.out.println("SQLException: " + ex.getMessage());
        } finally {
            motor.disconnect();
        }
        return detallesPedido;
    }
}
