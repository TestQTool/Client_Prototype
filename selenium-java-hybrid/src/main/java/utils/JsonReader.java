package utils;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Map;

public final class JsonReader {
    private static final ObjectMapper MAPPER = new ObjectMapper();

    private JsonReader() {}

    public static JsonNode readTree(String filePath) {
        try {
            return MAPPER.readTree(Files.readString(Path.of(filePath)));
        } catch (Exception ex) {
            throw new RuntimeException("Unable to read JSON file: " + filePath, ex);
        }
    }

    public static Map<String, Object> readMap(String filePath) {
        try {
            return MAPPER.readValue(Files.readString(Path.of(filePath)), new TypeReference<>() {});
        } catch (Exception ex) {
            throw new RuntimeException("Unable to read JSON map: " + filePath, ex);
        }
    }

    public static String getString(String filePath, String fieldName) {
        JsonNode node = readTree(filePath).path(fieldName);
        return node.isMissingNode() || node.isNull() ? "" : node.asText();
    }
}
