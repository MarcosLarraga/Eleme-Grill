package dao;

import entities.Producto;
import motor.MotorSQL;

import java.sql.ResultSet;
import java.util.ArrayList;

public class ProductoDao implements IDao<Producto, Integer> {
    private final String SQL_FIND_ALL = "SELECT * FROM PRODUCTO WHERE 1=1 ";
    private final String SQL_ADD = "INSERT INTO PRODUCTO (PR_PRODUCTO_ID, PR_NOMBRE, PR_PRECIO, PR_CATEGORIA_ID, PR_FOTO) VALUES ";
    private final String SQL_DELETE = "DELETE FROM PRODUCTO WHERE PR_PRODUCTO_ID = ?";
    private final String SQL_UPDATE = "UPDATE PRODUCTO SET PR_NOMBRE = ?, PR_PRECIO = ?, PR_CATEGORIA_ID = ?, PR_FOTO = ? WHERE PR_PRODUCTO_ID = ?";

    @Override
    public int add(Producto producto) {
        int result = 0;
        MotorSQL motor = new MotorSQL();
        try {
            motor.connect();
            String sql = SQL_ADD + "(" +
                    producto.getPR_PRODUCTO_ID() + ", '" +
                    producto.getPR_NOMBRE() + "', " +
                    producto.getPR_PRECIO() + ", " +
                    producto.getPR_CATEGORIA_ID() + ", '" +
                    producto.getPR_FOTO() + "')";
            result = motor.execute(sql);
        } catch (Exception e) {
            System.out.println("Error adding product: " + e.getMessage());
        } finally {
            motor.disconnect();
        }
        return result;
    }

    @Override
    public int delete(Integer id) {
        int result = 0;
        MotorSQL motor = new MotorSQL();
        try {
            motor.connect();
            String sql = SQL_DELETE.replace("?", id.toString());
            result = motor.executeUpdate(sql);
        } catch (Exception e) {
            System.out.println("Error deleting product: " + e.getMessage());
        } finally {
            motor.disconnect();
        }
        return result;
    }

    @Override
    public int update(Producto producto) {
        int result = 0;
        MotorSQL motor = new MotorSQL();
        try {
            motor.connect();
            String sql = SQL_UPDATE
                    .replaceFirst("\\?", "'" + producto.getPR_NOMBRE() + "'")
                    .replaceFirst("\\?", String.valueOf(producto.getPR_PRECIO()))
                    .replaceFirst("\\?", String.valueOf(producto.getPR_CATEGORIA_ID()))
                    .replaceFirst("\\?", "'" + producto.getPR_FOTO() + "'")
                    .replaceFirst("\\?", String.valueOf(producto.getPR_PRODUCTO_ID()));
            result = motor.executeUpdate(sql);
        } catch (Exception e) {
            System.out.println("Error updating product: " + e.getMessage());
        } finally {
            motor.disconnect();
        }
        return result;
    }

    @Override
    public ArrayList<Producto> findAll(Producto producto) {
        ArrayList<Producto> productos = new ArrayList<>();
        MotorSQL motor = new MotorSQL();
        try {
            motor.connect();
            String sql = SQL_FIND_ALL;
            if (producto != null) {
                // Aquí podrías agregar lógica para construir la consulta SQL basada en los campos del objeto Producto
            }
            ResultSet rs = motor.executeQuery(sql);
            if (rs != null) {
                while (rs.next()) {
                    Producto p = new Producto(
                            rs.getInt("PR_PRODUCTO_ID"),
                            rs.getString("PR_NOMBRE"),
                            rs.getDouble("PR_PRECIO"),
                            rs.getInt("PR_CATEGORIA_ID"),
                            rs.getString("PR_FOTO"));
                    productos.add(p);
                }
            }
        } catch (Exception e) {
            System.out.println("Error finding products: " + e.getMessage());
        } finally {
            motor.disconnect();
        }
        return productos;
    }
}
