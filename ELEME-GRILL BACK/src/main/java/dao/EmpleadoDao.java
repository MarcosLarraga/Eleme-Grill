package dao;

import entities.Empleado;
import motor.MotorSQL;

import java.sql.ResultSet;
import java.util.ArrayList;

public class EmpleadoDao implements IDao<Empleado, Integer> {
    private final String SQL_FIND_ALL = "SELECT * FROM EMPLEADO WHERE 1=1 ";
    private final String SQL_ADD = "INSERT INTO EMPLEADO (EM_EMPLEADO_ID, EM_NOMBRE, EM_APELLIDO, EM_DIRECCION, EM_TELEFONO, EM_EMAIL) VALUES ";
    private final String SQL_DELETE = "DELETE FROM EMPLEADO WHERE EM_EMPLEADO_ID = ?";
    private final String SQL_UPDATE = "UPDATE EMPLEADO SET EM_NOMBRE = ?, EM_APELLIDO = ?, EM_DIRECCION = ?, EM_TELEFONO = ?, EM_EMAIL = ? WHERE EM_EMPLEADO_ID = ?";

    @Override
    public int add(Empleado bean) {
        int resp = 0;
        MotorSQL motor = new MotorSQL();
        try {
            motor.connect();

            String sql = SQL_ADD + "("
                    + bean.getEM_EMPLEADO_ID() + ", '"
                    + bean.getEM_NOMBRE() + "', '"
                    + bean.getEM_APELLIDO() + "', '"
                    + bean.getEM_DIRECCION() + "', '"
                    + bean.getEM_TELEFONO() + "', '"
                    + bean.getEM_EMAIL() + "')";

            resp = motor.execute(sql);
            System.out.println(sql);

        } catch (Exception e) {
            System.out.println(e);
        } finally {
            motor.disconnect();
        }
        if (resp > 0) {
            System.out.println("Empleado insertado con éxito.");
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
    public int update(Empleado bean) {
        MotorSQL motor = new MotorSQL();
        int result = 0;
        try {
            motor.connect();
            Empleado empleado = (Empleado) bean;
            String sql = SQL_UPDATE
                    .replaceFirst("\\?", "'" + empleado.getEM_NOMBRE() + "'")
                    .replaceFirst("\\?", "'" + empleado.getEM_APELLIDO() + "'")
                    .replaceFirst("\\?", "'" + empleado.getEM_DIRECCION() + "'")
                    .replaceFirst("\\?", "'" + empleado.getEM_TELEFONO() + "'")
                    .replaceFirst("\\?", "'" + empleado.getEM_EMAIL() + "'")
                    .replaceFirst("\\?", Integer.toString(empleado.getEM_EMPLEADO_ID()));
            result = motor.executeUpdate(sql);
        } catch (Exception ex) {
            System.out.println("SQLException: " + ex.getMessage());
        } finally {
            motor.disconnect();
        }
        return result;
    }

    @Override
    public ArrayList<Empleado> findAll(Empleado bean) {
        ArrayList<Empleado> empleados = new ArrayList<>();
        MotorSQL motor = new MotorSQL();
        try {
            motor.connect();
            String sql = SQL_FIND_ALL;
            if (bean != null) {
                Empleado empleado = (Empleado) bean;
                if (empleado.getEM_EMPLEADO_ID() != 0) {
                    sql += " AND EM_EMPLEADO_ID=" + empleado.getEM_EMPLEADO_ID();
                }
                if (empleado.getEM_NOMBRE() != null) {
                    sql += " AND EM_NOMBRE='" + empleado.getEM_NOMBRE() + "'";
                }
                if (empleado.getEM_APELLIDO() != null) {
                    sql += " AND EM_APELLIDO='" + empleado.getEM_APELLIDO() + "'";
                }
                if (empleado.getEM_DIRECCION() != null) {
                    sql += " AND EM_DIRECCION='" + empleado.getEM_DIRECCION() + "'";
                }
                if (empleado.getEM_TELEFONO() != null) {
                    sql += " AND EM_TELEFONO='" + empleado.getEM_TELEFONO() + "'";
                }
                if (empleado.getEM_EMAIL() != null) {
                    sql += " AND EM_EMAIL='" + empleado.getEM_EMAIL() + "'";
                }
            }
            ResultSet rs = motor.executeQuery(sql);

            if (rs != null) {
                while (rs.next()) {
                    Empleado empleado = new Empleado(
                            rs.getInt("EM_EMPLEADO_ID"),
                            rs.getString("EM_NOMBRE"),
                            rs.getString("EM_APELLIDO"),
                            rs.getString("EM_DIRECCION"),
                            rs.getString("EM_TELEFONO"),
                            rs.getString("EM_EMAIL"));
                    empleados.add(empleado);
                }
            } else {
                System.out.println("ResultSet is null");
            }

        } catch (Exception ex) {
            empleados.clear();
            System.out.println("SQLException: " + ex.getMessage());
        } finally {
            motor.disconnect();
        }
        return empleados;
    }
}
