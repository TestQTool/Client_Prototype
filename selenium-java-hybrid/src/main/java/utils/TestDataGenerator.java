package utils;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

public final class TestDataGenerator {
    private static final SecureRandom RANDOM = new SecureRandom();

    private TestDataGenerator() {}

    public static String randomString(int length) {
        String alphabet = "abcdefghijklmnopqrstuvwxyz";
        StringBuilder value = new StringBuilder();
        for (int i = 0; i < length; i++) {
            value.append(alphabet.charAt(RANDOM.nextInt(alphabet.length())));
        }
        return value.toString();
    }

    public static int randomNumber(int minInclusive, int maxInclusive) {
        return RANDOM.nextInt((maxInclusive - minInclusive) + 1) + minInclusive;
    }

    public static String randomEmail() {
        return "user_" + randomString(8) + "@example.com";
    }

    public static String uniqueId() {
        return UUID.randomUUID().toString();
    }

    public static String timestamp() {
        return LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
    }
}
