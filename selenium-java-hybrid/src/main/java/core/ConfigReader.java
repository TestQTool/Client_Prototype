package core;

public final class ConfigReader {
    private ConfigReader() {}

    public static String get(String key, String defaultValue) {
        return utils.ConfigReader.get(key, defaultValue);
    }
}
