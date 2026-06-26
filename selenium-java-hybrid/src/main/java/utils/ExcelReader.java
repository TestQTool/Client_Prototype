package utils;

import org.apache.poi.ss.usermodel.*;

import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public final class ExcelReader {
    private ExcelReader() {}

    public static List<Map<String, String>> readSheet(String filePath, String sheetName) {
        try (InputStream input = Files.newInputStream(Path.of(filePath));
             Workbook workbook = WorkbookFactory.create(input)) {
            Sheet sheet = sheetName == null || sheetName.isBlank() ? workbook.getSheetAt(0) : workbook.getSheet(sheetName);
            if (sheet == null) return List.of();
            Row header = sheet.getRow(sheet.getFirstRowNum());
            List<Map<String, String>> rows = new ArrayList<>();
            for (int i = sheet.getFirstRowNum() + 1; i <= sheet.getLastRowNum(); i++) {
                Row row = sheet.getRow(i);
                if (row == null) continue;
                Map<String, String> values = new LinkedHashMap<>();
                for (int j = 0; j < header.getLastCellNum(); j++) {
                    values.put(cellValue(header.getCell(j)), cellValue(row.getCell(j)));
                }
                rows.add(values);
            }
            return rows;
        } catch (Exception ex) {
            throw new RuntimeException("Unable to read Excel file: " + filePath, ex);
        }
    }

    public static String getCellData(String filePath, String sheetName, int rowIndex, int columnIndex) {
        try (InputStream input = Files.newInputStream(Path.of(filePath));
             Workbook workbook = WorkbookFactory.create(input)) {
            Sheet sheet = sheetName == null || sheetName.isBlank() ? workbook.getSheetAt(0) : workbook.getSheet(sheetName);
            Row row = sheet == null ? null : sheet.getRow(rowIndex);
            return row == null ? "" : cellValue(row.getCell(columnIndex));
        } catch (Exception ex) {
            throw new RuntimeException("Unable to read Excel cell", ex);
        }
    }

    private static String cellValue(Cell cell) {
        if (cell == null) return "";
        DataFormatter formatter = new DataFormatter();
        return formatter.formatCellValue(cell);
    }
}
