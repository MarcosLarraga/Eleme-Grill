package motor;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.ResultSet;

public class MotorSQL {
    // Objetos necesarios para hablar con la BD
    private Connection conn = null;
    private Statement st = null;
    private ResultSet rs = null;
    private static final String URL = "jdbc:oracle:thin:@reto-hamburguesas.c1iigicy6ifq.us-east-1.rds.amazonaws.com:1521:orcl";
    private static final String USER = "admin";
    private static final String PASSWORD = "123456789";

    public void connect() throws SQLException {
        try {
            // Cargar el driver de Oracle JDBC
            Class.forName("oracle.jdbc.OracleDriver");
            // Establecer la conexión
            conn = DriverManager.getConnection(URL, USER, PASSWORD);
            System.out.println("Conexión establecida con éxito.");
            st = conn.createStatement();
            System.out.println("Statement inicializado con éxito.");
        } catch (ClassNotFoundException ex) {
            throw new SQLException("No se encontró el driver de Oracle JDBC", ex);
        } catch (SQLException ex) {
            System.out.println("SQLException en connect(): " + ex.getMessage());
            throw ex;
        }
    }

    public ResultSet executeQuery(String sql) throws SQLException {
        if (st == null) {
            throw new SQLException("El Statement no está inicializado. Llame a connect() primero.");
        }
        try {
            rs = st.executeQuery(sql);
        } catch (SQLException ex){
            // Manejar cualquier error
            System.out.println("SQLException en executeQuery(): " + ex.getMessage());
            System.out.println("SQLState: " + ex.getSQLState());
            System.out.println("VendorError: " + ex.getErrorCode());
            throw ex;
        }
        return rs;
    }

    public int executeUpdate(String sql) throws SQLException {
        if (st == null) {
            throw new SQLException("El Statement no está inicializado. Llame a connect() primero.");
        }
        int iResults = 0;
        try {
            iResults = st.executeUpdate(sql);
        } catch (SQLException ex){
            // Manejar cualquier error
            System.out.println("SQLException en executeUpdate(): " + ex.getMessage());
            System.out.println("SQLState: " + ex.getSQLState());
            System.out.println("VendorError: " + ex.getErrorCode());
            throw ex;
        }
        return iResults;
    }

    public void disconnect() {
        if (rs != null) {
            try {
                rs.close();
            } catch (SQLException sqlEx) {
                System.out.println("SQLException durante rs.close(): " + sqlEx.getMessage());
            } finally {
                rs = null;
            }
        }
        if (st != null) {
            try {
                st.close();
            } catch (SQLException sqlEx) {
                System.out.println("SQLException durante st.close(): " + sqlEx.getMessage());
            } finally {
                st = null;
            }
        }
        if (conn != null) {
            try {
                conn.close();
            } catch (SQLException sqlEx) {
                System.out.println("SQLException durante conn.close(): " + sqlEx.getMessage());
            } finally {
                conn = null;
            }
        }
    }

    public int execute(String sql) {
        int resp = 0;
        try {
            resp = st.executeUpdate(sql);
        } catch (SQLException ex) {
            System.out.println("SQL Exception: " + ex.getMessage());
        }
        return resp;
    }
}
