package tests.frontend.qentrix;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

public final class QentrixConfig {
    private static final Properties PROPERTIES = new Properties();

    static {
        try (InputStream input = QentrixConfig.class.getClassLoader().getResourceAsStream("frontend/qentrix/config.properties")) {
            if (input != null) {
                PROPERTIES.load(input);
            }
        } catch (IOException e) {
            throw new IllegalStateException("Unable to load frontend/qentrix/config.properties", e);
        }
    }

    private QentrixConfig() {
    }

    public static String get(String key) {
        return PROPERTIES.getProperty(key, "");
    }

    public static Map<String, String> authHeaders() {
        Map<String, String> headers = new HashMap<>();
        String authType = get("auth.type");
        String token = get("auth.token");
        if (authType == null || authType.isBlank() || "none".equalsIgnoreCase(authType)) {
            return headers;
        }
        if ("bearer".equalsIgnoreCase(authType)) {
            headers.put("Authorization", "Bearer " + token);
        } else {
            headers.put("Authorization", token);
        }
        return headers;
    }
}
