import java.sql.Connection;
import java.sql.DriverManager;

public class TestDB {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/MovieTicketDB?createDatabaseIfNotExist=true&useUnicode=true&characterEncoding=UTF-8";
        String user = "root";
        String password = "09022006";

        try {
            Connection conn = DriverManager.getConnection(url, user, password);
            System.out.println("Connection successful!");
            conn.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
