package utils;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

public class ExcelUtils {

    public static List<LinkedHashMap<String, String>> getExcelDataAsListOfMap(String excelFileName, String sheetName) throws IOException {

        List<LinkedHashMap<String, String>> dataFromExcel = new ArrayList<>();
        Workbook workbook = WorkbookFactory.create(new File("src/test/resources/testdata/" + excelFileName + ".xlsx"));
        Sheet sheet = workbook.getSheet(sheetName);
        int totalRows = sheet.getPhysicalNumberOfRows();
        LinkedHashMap<String, String> mapData;
        List<String> allKeys = new ArrayList<>();
        DataFormatter dataFormatter = new DataFormatter();
        for (int i = 0; i < totalRows; i++) {
            mapData = new LinkedHashMap<>();
            if (i == 0) {
                int totalcols = sheet.getRow(0).getPhysicalNumberOfCells();
                for (int j = 0; j < totalcols; j++) {
                    allKeys.add(sheet.getRow(0).getCell(j).getStringCellValue());
                }
            } else {
                int totalcols = sheet.getRow(i).getPhysicalNumberOfCells();
                for (int j = 0; j < totalcols; j++) {
                    allKeys.add(sheet.getRow(i).getCell(j).getStringCellValue());
                    String cellValue = dataFormatter.formatCellValue(sheet.getRow(i).getCell(j));
                    int size = 6;
                    if (cellValue.contains("RandomNumber")) {
                        //with size
                        if (cellValue.contains("_")) {
                            size = Integer.parseInt(cellValue.split("_")[1]);
                        }
                        cellValue = RandomDataGenerator.getRandomNumber(size);
                    }
                    mapData.put(allKeys.get(j), cellValue);
                }
                dataFromExcel.add(mapData);
            }
        }
//        dataFromExcel = dataFromExcel.stream().filter(keyValuePair -> keyValuePair.get("Enabled").equalsIgnoreCase("Y"))
//                .collect(Collectors.toList());
        return dataFromExcel;
    }
}
