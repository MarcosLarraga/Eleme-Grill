package dao;

import entities.Pedido;
import motor.MotorSQL;

import java.sql.ResultSet;
import java.util.ArrayList;

public class PedidoDao implements IDao<Pedido, Integer> {
    private final String SQL_FIND_ALL = "SELECT * FROM PEDIDO WHERE 1=1 ";
    private final String SQL_ADD = "INSERT INTO PEDIDO (PE_PEDIDO_ID, PE_CLIENTE_ID, PE_EMPLEADO_ID, PE_FECHAPEDIDO) VALUES ";
    private final String SQL_DELETE = "DELETE FROM PEDIDO WHERE PE_PEDIDO_ID = ?";
    private final String SQL_UPDATE = "UPDATE PEDIDO SET PE_CLIENTE_ID = ?, PE_EMPLEADO_ID = ?, PE_FECHAPEDIDO = ? WHERE PE_PEDIDO_ID = ?";

    @Override
    public int add(Pedido bean) {
        int resp = 0;
        MotorSQL motor = new MotorSQL();
        try {
            motor.connect();

            String sql = SQL_ADD + "("
                    + bean.getPE_PEDIDO_ID() + ", "
                    + bean.getPE_CLIENTE_ID() + ", "
                    + bean.getPE_EMPLEADO_ID() + ", '"
                    + bean.getPE_FECHAPEDIDO() + "')";

            resp = motor.execute(sql);
            System.out.println(sql);

        } catch (Exception e) {
            System.out.println(e);
        } finally {
            motor.disconnect();
        }
        if (resp > 0) {
            System.out.println("Pedido insertado con éxito.");
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
    public int update(Pedido bean) {
        MotorSQL motor = new MotorSQL();
        int result = 0;
        try {
            motor.connect();
            String sql = SQL_UPDATE
                    .replaceFirst("\\?", Integer.toString(bean.getPE_CLIENTE_ID()))
                    .replaceFirst("\\?", Integer.toString(bean.getPE_EMPLEADO_ID()))
                    .replaceFirst("\\?", "'" + bean.getPE_FECHAPEDIDO() + "'")
                    .replaceFirst("\\?", Integer.toString(bean.getPE_PEDIDO_ID()));
            result = motor.executeUpdate(sql);
        } catch (Exception ex) {
            System.out.println("SQLException: " + ex.getMessage());
        } finally {
            motor.disconnect();
        }
        return result;
    }

    @Override
    public ArrayList<Pedido> findAll(Pedido bean) {
        ArrayList<Pedido> pedidos = new ArrayList<>();
        MotorSQL motor = new MotorSQL();
        try {
            motor.connect();
            String sql = SQL_FIND_ALL;
            ResultSet rs = motor.executeQuery(sql);

            if (rs != null) {
                while (rs.next()) {
                    Pedido pedido = new Pedido(
                            rs.getInt("PE_PEDIDO_ID"),
                            rs.getInt("PE_CLIENTE_ID"),
                            rs.getInt("PE_EMPLEADO_ID"),
                            rs.getString("PE_FECHAPEDIDO"));
                    pedidos.add(pedido);
                }
            } else {
                System.out.println("ResultSet is null");
            }

        } catch (Exception ex) {
            pedidos.clear();
            System.out.println("SQLException: " + ex.getMessage());
        } finally {
            motor.disconnect();
        }
        return pedidos;
    }
}
