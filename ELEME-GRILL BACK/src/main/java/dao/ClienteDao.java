package dao;

import entities.Cliente;
import motor.MotorSQL;

import java.sql.ResultSet;
import java.util.ArrayList;

public class ClienteDao implements IDao <Cliente, Integer>{
    private final String SQL_FIND_ALL = "SELECT * FROM CLIENTE WHERE 1=1 ";
    private final String SQL_ADD = "INSERT INTO CLIENTE (CL_CLIENTE_ID, CL_NOMBRE, CL_APELLIDO, CL_DIRECCION, CL_TELEFONO, CL_EMAIL, CL_CONTRASENA) VALUES ";
    private final String SQL_DELETE = "DELETE FROM CLIENTE WHERE CL_CLIENTE_ID = ?";
    private final String SQL_UPDATE = "UPDATE CLIENTE SET CL_NOMBRE = ?, CL_APELLIDO = ?, CL_DIRECCION = ?, CL_TELEFONO = ?, CL_EMAIL = ?, CL_CONTRASENA = ? WHERE CL_CLIENTE_ID = ?";


    @Override
    public int add(Cliente bean) {
        int resp = 0;
        MotorSQL motor = new MotorSQL();
        try {
            motor.connect();

            String sql = SQL_ADD + "("
                    + bean.getCL_CLIENTE_ID() + ", '"
                    + bean.getCL_NOMBRE() + "', '"
                    + bean.getCL_APELLIDO() + "', '"
                    + bean.getCL_DIRECCION() + "', '"
                    + bean.getCL_TELEFONO() +"', '"
                    + bean.getCL_EMAIL() +"', '"
                    + bean.getCL_CONTRASENA()  +"')";



            resp = motor.execute(sql);
            System.out.println(sql);

        } catch (Exception e) {
            System.out.println(e);
        } finally {
            motor.disconnect();
        }
        if (resp > 0) {
            System.out.println("Usuario insertada con exito.");
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
            System.out.println(sql);
            result = motor.executeUpdate(sql);
        } catch (Exception ex) {
            System.out.println("SQLException: " + ex.getMessage());
        } finally {
            motor.disconnect();
        }
        return result;
    }


    @Override
    public int update(Cliente bean) {
        MotorSQL motor = new MotorSQL();
        int result = 0;
        try {
            motor.connect();
            Cliente cliente = (Cliente) bean;
            String sql = SQL_UPDATE
                    .replaceFirst("\\?", "'" + cliente.getCL_NOMBRE() + "'")
                    .replaceFirst("\\?", "'" + cliente.getCL_APELLIDO() + "'")
                    .replaceFirst("\\?", "'" + cliente.getCL_DIRECCION() + "'")
                    .replaceFirst("\\?", "'" + cliente.getCL_TELEFONO() + "'")
                    .replaceFirst("\\?", "'" + cliente.getCL_EMAIL() + "'")
                    .replaceFirst("\\?", "'" + cliente.getCL_CONTRASENA() + "'")
                    .replaceFirst("\\?", Integer.toString(cliente.getCL_CLIENTE_ID()));
            result = motor.executeUpdate(sql);
        } catch (Exception ex) {
            System.out.println("SQLException: " + ex.getMessage());
        } finally {
            motor.disconnect();
        }
        return result;
    }

    @Override
    public ArrayList<Cliente> findAll(Cliente bean) {
        ArrayList<Cliente> clientes = new ArrayList<>();
        MotorSQL motor = new MotorSQL();
        try {
            motor.connect();
            String sql = SQL_FIND_ALL;
            if (bean != null) {
                Cliente cliente = (Cliente) bean;
                if (cliente.getCL_CLIENTE_ID() != 0) {
                    sql += " AND CL_CLIENTE_ID=" + cliente.getCL_CLIENTE_ID();
                }
                if (cliente.getCL_NOMBRE() != null) {
                    sql += " AND CL_NOMBRE='" + cliente.getCL_NOMBRE() + "'";
                }
                if (cliente.getCL_APELLIDO() != null) {
                    sql += " AND CL_APELLIDO='" + cliente.getCL_APELLIDO() + "'";
                }
                if (cliente.getCL_DIRECCION() != null) {
                    sql += " AND CL_DIRECCION='" + cliente.getCL_DIRECCION() + "'";
                }
                if (cliente.getCL_TELEFONO() != null) {
                    sql += " AND CL_TELEFONO='" + cliente.getCL_TELEFONO() + "'";
                }
                if (cliente.getCL_EMAIL() != null) {
                    sql += " AND CL_EMAIL='" + cliente.getCL_EMAIL() + "'";
                }
                if (cliente.getCL_CONTRASENA() != null) {
                    sql += " AND CL_CONTRASENA='" + cliente.getCL_CONTRASENA() + "'";
                }
            }
            ResultSet rs = motor.executeQuery(sql);

            if (rs != null) {
                while (rs.next()) {
                    Cliente cliente = new Cliente(
                            rs.getInt("CL_CLIENTE_ID"),
                            rs.getString("CL_NOMBRE"),
                            rs.getString("CL_APELLIDO"),
                            rs.getString("CL_DIRECCION"),
                            rs.getString("CL_TELEFONO"),
                            rs.getString("CL_EMAIL"),
                            rs.getString("CL_CONTRASENA"));
                    clientes.add(cliente);
                }
            } else {
                System.out.println("ResultSet is null");
            }

        } catch (Exception ex) {
            clientes.clear();
            System.out.println("SQLException: " + ex.getMessage());
        } finally {
            motor.disconnect();
        }
        return clientes;
    }
}
