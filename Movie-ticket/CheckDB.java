import java.sql.*;
public class CheckDB {
    public static void main(String[] args) throws Exception {
        Connection c = DriverManager.getConnection("jdbc:mysql://localhost:3306/?user=root&password=09022006");
        ResultSet rs = c.createStatement().executeQuery("SHOW DATABASES");
        while(rs.next()) System.out.println(rs.getString(1));
        c.close();
    }
}
