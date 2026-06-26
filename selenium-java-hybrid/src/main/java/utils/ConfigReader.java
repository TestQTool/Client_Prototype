package utils;

import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Properties;

public final class ConfigReader {
    private static final Properties PROPERTIES = new Properties();

    static {
        loadFromClasspath();
        loadFromFileSystem();
    }

    private ConfigReader() {}

    public static String get(String key) {
        return get(key, "");
    }

    public static String get(String key, String defaultValue) {
        String systemValue = System.getProperty(key);
        if (systemValue != null && !systemValue.isBlank()) return systemValue;
        String envValue = System.getenv(key);
        if (envValue != null && !envValue.isBlank()) return envValue;
        return PROPERTIES.getProperty(key, defaultValue);
    }

    public static int getInt(String key, int defaultValue) {
        try {
            return Integer.parseInt(get(key, String.valueOf(defaultValue)).trim());
        } catch (Exception ignored) {
            return defaultValue;
        }
    }

    public static boolean getBoolean(String key, boolean defaultValue) {
        return Boolean.parseBoolean(get(key, String.valueOf(defaultValue)));
    }

    private static void loadFromClasspath() {
        try (InputStream input = ConfigReader.class.getClassLoader().getResourceAsStream("config/config.properties")) {
            if (input != null) PROPERTIES.load(input);
        } catch (Exception ignored) {
        }
    }

    private static void loadFromFileSystem() {
        Path path = Path.of("src", "test", "resources", "config", "config.properties");
        if (!Files.isRegularFile(path)) return;
        try (InputStream input = Files.newInputStream(path)) {
            PROPERTIES.load(input);
        } catch (Exception ignored) {
        }
    }
}
