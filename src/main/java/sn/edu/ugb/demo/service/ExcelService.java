package sn.edu.ugb.demo.service;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import sn.edu.ugb.demo.entity.Produit;
import sn.edu.ugb.demo.repository.ProduitRepository;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@Service
public class ExcelService {
    private ProduitRepository produitRepository;
    public ExcelService(ProduitRepository produitRepository) {
        this.produitRepository = produitRepository;
    }

    public ByteArrayInputStream exportExcel() throws IOException {

        List<Produit> produits = produitRepository.findAll();

        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Produits");

        Row header = sheet.createRow(0);
        header.createCell(0).setCellValue("ID");
        header.createCell(1).setCellValue("Nom");
        header.createCell(2).setCellValue("Prix");
        header.createCell(3).setCellValue("Quantite");

        int rowNum = 1;

        for (Produit p : produits) {

            Row row = sheet.createRow(rowNum++);

            row.createCell(0).setCellValue(p.getId());
            row.createCell(1).setCellValue(p.getNom());
            row.createCell(2).setCellValue(p.getPrix().doubleValue());
            row.createCell(3).setCellValue(p.getQuantite());

        }

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        workbook.write(out);
        workbook.close();

        return new ByteArrayInputStream(out.toByteArray());
    }
}