package config;

import java.io.*;
import java.util.Properties;

/**
 * ConfigReader — reads test config from environment variables and properties files.
 * Priority: System env → JVM args → config.properties
 */
public class ConfigReader {

    private static Properties props = new Properties();

    static {
        try (InputStream in = ConfigReader.class.getClassLoader()
                .getResourceAsStream("config.properties")) {
            if (in != null) props.load(in);
        } catch (IOException e) {
            System.err.println("config.properties not found — using env vars only");
        }
    }

    public static String get(String key) {
        // Priority: env var → JVM system prop → properties file
        String val = System.getenv(key.toUpperCase().replace(".", "_"));
        if (val != null) return val;
        val = System.getProperty(key);
        if (val != null) return val;
        return props.getProperty(key, "");
    }

    public static String getBaseUrl()   { return get("BASE_URL"); }
    public static String getBrowser()   { return get("browser") .isEmpty() ? "chrome" : get("browser"); }
    public static String getAdminUser() { return get("ADMIN_USERNAME"); }
    public static String getAdminPass() { return get("ADMIN_PASSWORD"); }
}
