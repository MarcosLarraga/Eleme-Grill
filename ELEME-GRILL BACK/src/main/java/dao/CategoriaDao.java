package dao;

import entities.Categoria;
import motor.MotorSQL;

import java.sql.ResultSet;
import java.util.ArrayList;

public class CategoriaDao implements IDao<Categoria, Integer> {
    private final String SQL_FIND_ALL = "SELECT * FROM CATEGORIA WHERE 1=1 ";
    private final String SQL_ADD = "INSERT INTO CATEGORIA (CA_CATEGORIA_ID, CA_NOMBRE) VALUES ";
    private final String SQL_DELETE = "DELETE FROM CATEGORIA WHERE CA_CATEGORIA_ID = ?";
    private final String SQL_UPDATE = "UPDATE CATEGORIA SET CA_NOMBRE = ? WHERE CA_CATEGORIA_ID = ?";

    @Override
    public int add(Categoria bean) {
        int resp = 0;
        MotorSQL motor = new MotorSQL();
        try {
            motor.connect();

            String sql = SQL_ADD + "("
                    + bean.getCA_CATEGORIA_ID() + ", '"
                    + bean.getCA_NOMBRE() + "')";

            resp = motor.execute(sql);
            System.out.println(sql);

        } catch (Exception e) {
            System.out.println(e);
        } finally {
            motor.disconnect();
        }
        if (resp > 0) {
            System.out.println("Categoria insertada con exito.");
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
    public int update(Categoria bean) {
        MotorSQL motor = new MotorSQL();
        int result = 0;
        try {
            motor.connect();
            String sql = SQL_UPDATE
                    .replaceFirst("\\?", "'" + bean.getCA_NOMBRE() + "'")
                    .replaceFirst("\\?", Integer.toString(bean.getCA_CATEGORIA_ID()));
            result = motor.executeUpdate(sql);
        } catch (Exception ex) {
            System.out.println("SQLException: " + ex.getMessage());
        } finally {
            motor.disconnect();
        }
        return result;
    }

    @Override
    public ArrayList<Categoria> findAll(Categoria bean) {
        ArrayList<Categoria> categorias = new ArrayList<>();
        MotorSQL motor = new MotorSQL();
        try {
            motor.connect();
            String sql = SQL_FIND_ALL;
            if (bean != null) {
                if (bean.getCA_CATEGORIA_ID() != 0) {
                    sql += " AND CA_CATEGORIA_ID=" + bean.getCA_CATEGORIA_ID();
                }
                if (bean.getCA_NOMBRE() != null) {
                    sql += " AND CA_NOMBRE='" + bean.getCA_NOMBRE() + "'";
                }
            }
            ResultSet rs = motor.executeQuery(sql);

            if (rs != null) {
                while (rs.next()) {
                    Categoria categoria = new Categoria(
                            rs.getInt("CA_CATEGORIA_ID"),
                            rs.getString("CA_NOMBRE"));
                    categorias.add(categoria);
                }
            } else {
                System.out.println("ResultSet is null");
            }

        } catch (Exception ex) {
            categorias.clear();
            System.out.println("SQLException: " + ex.getMessage());
        } finally {
            motor.disconnect();
        }
        return categorias;
    }
}
