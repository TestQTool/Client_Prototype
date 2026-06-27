package core;

import java.io.FileInputStream;
import java.util.Properties;

public final class ConfigReader {
    private static final Properties PROPERTIES = new Properties();
    static {
        try (FileInputStream input = new FileInputStream("config/config.properties")) {
            PROPERTIES.load(input);
        } catch (Exception ignored) {
            // Static template: config can be supplied by generated client project.
        }
    }
    private ConfigReader() {}
    public static String get(String key, String defaultValue) {
        String systemValue = System.getProperty(key);
        if (systemValue != null && !systemValue.isBlank()) return systemValue;
        String envValue = System.getenv(key);
        if (envValue != null && !envValue.isBlank()) return envValue;
        return PROPERTIES.getProperty(key, defaultValue);
    }
}
