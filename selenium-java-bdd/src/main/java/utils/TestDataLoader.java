package utils;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.io.FileReader;
import java.io.IOException;
import java.lang.reflect.Type;
import java.nio.file.Path;
import java.util.Collections;
import java.util.List;
import java.util.Map;

public final class TestDataLoader {
    private static final Gson GSON = new Gson();
    private static final Type MAP_TYPE = new TypeToken<Map<String, Object>>() { }.getType();
    private static final Map<String, Object> TEST_DATA = load();

    private TestDataLoader() {
    }

    public static Map<String, Object> load() {
        Path path = Path.of("utils", "testdata.json");
        try (FileReader reader = new FileReader(path.toFile())) {
            return GSON.fromJson(reader, MAP_TYPE);
        } catch (IOException exception) {
            throw new IllegalStateException("Unable to read utils/testdata.json", exception);
        }
    }

    public static Object get(String key) {
        return TEST_DATA.get(key);
    }

    public static String getString(String key) {
        Object value = get(key);
        return value == null ? "" : String.valueOf(value);
    }

    @SuppressWarnings("unchecked")
    public static List<Object> getList(String key) {
        Object value = get(key);
        return value instanceof List<?> ? (List<Object>) value : Collections.emptyList();
    }
}
