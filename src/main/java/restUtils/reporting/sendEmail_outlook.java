package restUtils.reporting;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Properties;

public class sendEmail_outlook{
    public static StringBuilder testCase_Summary_Report = new StringBuilder();
    public static String strDate;
    public static void sendReportByOutlook() throws IOException {
    //Credentials:
        final String username = "Bhavya_Kakumanu@quality-matrix.com";
        final String password = "Mco@1234";
    // Setting date for subject
        Date date = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("MM/dd/yyyy");
        strDate = formatter.format(date);
        formatter = new SimpleDateFormat("dd-M-yyyy hh.mm.ss");
        strDate = formatter.format(date);

        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.office365.com");
        props.put("mail.smtp.port", "587");
        props.put("mail.smtp.ssl.protocols", "TLSv1.2");

        Session session = Session.getInstance(props,
                new javax.mail.Authenticator() {
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(username, password);
                    }
                });

        try {
            Message message = new MimeMessage(session);
        //Setting From and to recipients
            message.setFrom(new InternetAddress("Bhavya_Kakumanu@quality-matrix.com"));
            String toMail = "teamautomation@quality-matrix.com";
            message.setRecipients(Message.RecipientType.TO,
                    InternetAddress.parse(toMail));
            message.setRecipients(Message.RecipientType.CC, InternetAddress.parse(toMail));
        //Setting subject
            System.out.println(strDate);
            message.setSubject("Vtiger Automation Test Report - " + strDate + "");
            //message.setText(body);

            BodyPart objMessageBodyPart = new MimeBodyPart();
            objMessageBodyPart.setText("Please Find The Attached Report File!");
            testCase_Summary_Report.append("<html>"
                    + "<p style=\"color:#0082c3;\">Hi All, <br>Please find below list of <b>Automation Test Cases</b> triggered by Automation build.</p>"
                    + "<style>table#t01, th, td {border: 1px solid black;border-collapse: collapse;}table#t01 th{background-color:#80e5ff; } table#t01 tr:nth-child(even) {background-color: #f2f2f2;} table#t01 tr:nth-child(odd) { background-color: #DFEDEC;}table#t01 th, td {padding: 5px;}table#t01 th {text-align: center;} table#t01 caption {color: #008ae6;font-weight: bold;}</style>"
                    + "<h3 align=\"center\" style=\"color:#008ae6;\"> Daily Status Report for Automation (" + strDate
                    + ")</h3>");
            testCase_Summary_Report.append("<table style=\"width:100%\" id=\"t01\"><tr>"
                    + "<td style=\"width:50%; background: #0082c3;color:#ffffff;\"><b> Total No Test Scenario's </b></td>"
                    + "<td><b>" + Setup.totalTestCases.size() + "</b></td>" + " </tr>");
            testCase_Summary_Report
                    .append(" <tr> " + "<td style=\"width:50%; background: #0082c3;color:#ffffff;\"><b>Pass</b> </td>"
                            + "<td><b style='color:green;'>" + Setup.passedTests.size() + "</b> </td>" + " </tr>");



            testCase_Summary_Report.append(" <tr style=\"color:#008ae6;\"> "
                    + "<td style=\"width:50%; background: #0082c3;color:#ffffff;\"><b>Fail</b> </td>"
                    + "<td><b style='color:red;'>" + Setup.failedTests.size() + "</b> </td>" + " </tr>");


            testCase_Summary_Report.append(
                    "</table><p style=\"color:#008ae6;\"><br><br><br> Thanks & Regards,<br>Automation Team</p> <html>");
            objMessageBodyPart.setContent(testCase_Summary_Report.toString(), "text/html; charset=ISO-8859-1");

            Multipart multipart = new MimeMultipart();
            multipart.addBodyPart(objMessageBodyPart);
            objMessageBodyPart = new MimeBodyPart();
            String filename = System.getProperty("user.dir") + "/reports/"+Setup.fileName;
            DataSource source = new FileDataSource(filename);
            objMessageBodyPart.setDataHandler(new DataHandler(source));
            objMessageBodyPart.setFileName(filename);
            objMessageBodyPart.setFileName("Execution_Report.html");
            multipart.addBodyPart(objMessageBodyPart);
            message.setContent(multipart);
            Transport.send(message);
            System.out.println("Email sent successfully To : " + toMail);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }
}
