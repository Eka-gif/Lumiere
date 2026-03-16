package sn.edu.ugb.demo.service;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;
import org.springframework.stereotype.Service;
import sn.edu.ugb.demo.entity.Produit;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.util.List;

@Service
public class PdfService {

    public ByteArrayInputStream generateStockPdf(List<Produit> produits){

        Document document = new Document();
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try{

            PdfPTable table = new PdfPTable(3);
            table.setWidthPercentage(100);
            table.addCell("ID");
            table.addCell("Nom");
            table.addCell("Quantité");

            for(Produit p : produits){

                table.addCell(String.valueOf(p.getId()));
                table.addCell(p.getNom());
                table.addCell(String.valueOf(p.getQuantite()));

            }

            PdfWriter.getInstance(document,out);

            document.open();
            document.add(new Paragraph("Rapport de Stock"));
            document.add(table);
            document.close();

        }catch(Exception e){
            e.printStackTrace();
        }

        return new ByteArrayInputStream(out.toByteArray());

    }

}