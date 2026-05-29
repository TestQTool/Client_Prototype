package utils;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.google.gson.JsonSyntaxException;
import org.apache.poi.util.StringUtil;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Map;

public class JsonUtils {

    private static ObjectMapper objectMapper = new ObjectMapper();

    public static Map<String, Object> getJsonDataAsMap(String jsonFileName) throws IOException {

        String completeJsonFilePath = System.getProperty("user.dir") + "/src/test/resources/" + jsonFileName;
        Map<String, Object> data = objectMapper.readValue(new File(completeJsonFilePath), new TypeReference<>() {
        });
        return data;
    }

    private static final String BASE_PATH = "src/test/resources/airlines/payloads";

    public static JsonNode readAsJsonNode(String fileName) throws FileNotFoundException {

        if (!fileName.toLowerCase().endsWith(".json"))
            fileName = fileName.concat(".json");

        File file = new File(String.format(BASE_PATH + "/" + fileName));
        if (!file.exists() || file.isDirectory()) {
            String message = "";
            StringBuilder stringBuilder = new StringBuilder();

            stringBuilder.append("\n----------E R R O R--------------------------------------------\n");
            stringBuilder.append("Given json file not found please check for the right path");
            stringBuilder.append("\n");
            stringBuilder.append("\tPath you have supplied: " + file.getPath());
            stringBuilder.append("\n--------------------------------------------------------------\n ");
            throw new FileNotFoundException(stringBuilder.toString());
        }
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            return objectMapper.readTree(file);
        } catch (Throwable th) {
            throw new JsonSyntaxException("Json file is not a valid json, Please use valid json only");
        }
    }

    public static String readAsString(String fileName) throws FileNotFoundException {
        return readAsJsonNode(fileName)
                .toPrettyString();
    }

    public static JsonNode addNewFieldInJson(String fileName,String newField, String NewValue) throws IOException {
        File file = new File("src/test/resources/airlines/payloads/"+fileName+".json");
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode rootNode = objectMapper.readTree(file);

        // Add a new field to the JSON object
        ((ObjectNode) rootNode).put(newField, NewValue);

        // Write the updated JSON data back to the file
        objectMapper.writeValue(file, rootNode);

        System.out.println("New field added and saved to the JSON file.");
        return rootNode;
    }
    public static JsonNode addNewFieldInJson(String fileName,String newField) throws IOException {
        File file = new File("src/test/resources/airlines/payloads/"+fileName+".json");
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode rootNode = objectMapper.readTree(file);

        // Add a new field to the JSON object
        ((ObjectNode) rootNode).put(newField, RandomDataGenerator.getRandomNumber(6));

        // Write the updated JSON data back to the file
        objectMapper.writeValue(file, rootNode);

        System.out.println("New field added and saved to the JSON file.");
        return rootNode;
    }
    }