import React from "react";
import { jsPDF } from "jspdf";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const ResumePDFGenerator = (data: any) => {
  const generatePDF = async () => {
    console.log("Data passed to PDF generator:", data.data.EAN);
    // Create new jsPDF instance
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pageHeight = doc.internal.pageSize.height;
    let marginTop = 10;
    const marginBottom = 10;
    var currentY = marginTop;
    const checkAndAddPage = (lineHeight: any) => {
      // Create gradient header
      const canvas = document.createElement("canvas");
      canvas.width = 2100;
      canvas.height = 100;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Create gradient
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0, "#E74C3C");
        gradient.addColorStop(1, "#FFF5F5");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        //   doc.setTextColor(0, 0, 0);

        //   doc.setFontSize(12); // Reduced font size to fit smaller header
        //   doc.text("data.data.TESTIMPRINTFROMHNA", 10, 12);

        // Add gradient to PDF
        try {
          doc.addImage(
            canvas.toDataURL("23456789"),
            "JPEG",
            0, // x coordinate
            0, // y coordinate
            210, // width (A4 width in mm)
            10, // height (reduced to 10mm)
            undefined,
            "FAST"
          );
          doc.setTextColor(255, 255, 255);

          doc.setFontSize(14); // Reduced font size to fit smaller header
          doc.text(data.data.TESTIMPRINTFROMHNA, 10, 7);
          doc.setTextColor(0, 0, 0);
          doc.setFontSize(10);
        } catch (error) {
          console.error("Error adding gradient:", error);
        }
      }
      if (currentY + lineHeight > pageHeight - marginBottom) {
        doc.addPage();
        marginTop = 20;
        currentY = marginTop; // Reset to the top of the new page
      }
    };
    // Add white text for the header
    // // doc.setTextColor(255, 255, 255);
    // doc.setTextColor(0, 0, 0);

    // doc.setFontSize(12); // Reduced font size to fit smaller header
    // doc.text("data.data.TESTIMPRINTFROMHNA", 10, 12);
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(8);
    const leftColumnX = 10;
    currentY += 10;
    doc.setFontSize(12);
    doc.text(`ISBN:${data.data.EAN}`, leftColumnX, currentY);
    currentY += 7;
    doc.text(`TITLE:${data.data.FULL_TITLE}`, leftColumnX, currentY);
    currentY += 37;
    const imageUrl = data?.data?.IMAGE_URL;
    if (imageUrl) {
      const imageX = 150; // X-coordinate for the image (right side of the page)
      const imageY = 20; // Y-coordinate for the image
      const imageWidth = 40; // Width of the image in mm
      const imageHeight = 40; // Height of the image in mm

      try {
        doc.addImage(
          imageUrl, // Image source (Base64 string or URL)
          "JPEG", // Image format
          imageX, // X position
          imageY, // Y position
          imageWidth, // Width
          imageHeight // Height
        );
      } catch (error) {
        console.error("Error adding image to PDF:", error);
      }
    }
    const pages = 8;
    doc.setDrawColor(0);
    doc.setLineWidth(0.1);
    doc.line(
      pages,
      currentY - 2,
      doc.internal.pageSize.width - pages,
      currentY - 2
    );
    const leftFields = [
      { key: "AUTHOR", value: data?.data?.AUTHOR_1 || "-" },
      { key: "RELEASE DATE", value: data?.data?.RELEASE_DATE || "-" },
      { key: "PUBMONTH", value: data?.data?.PUBMONTH || "-" },
      { key: "ON SALE-DATE", value: data?.data?.PUB_DATE || "-" },
      { key: "AGE RANGE", value: data?.data?.AGE_RANGE || "-" },
      {
        key: "PRICE",
        value: `${data?.data?.US_PRICE || "-"} ,${
          data?.data?.UK_PRICE || "-"
        } ,${data?.data?.CANADIAN_PRICE || "-"}`,
      },
      {
        key: "  ANNOUNCED 1ST PRINTING BEST",
        value: data?.data?.ANNOUNCED_1ST_PRINTING__BEST || "-",
      },
      { key: "ORIGIN", value: data?.data?.ORIGIN || "-" },
      { key: "AUTHOR BY LINE", value: data?.data?.AUTHOR_1 || "-" },
    ];

    const rightFields = [
      { key: "EDITOR", value: data?.data?.EDITOR || "-" },
      { key: "SERIES", value: data?.data?.SERIES || "-" },
      { key: "FORMAT", value: data?.data?.FORMAT || "-" },
      { key: "PAGE COUNT", value: data?.data?.PAGES || "-" },
      { key: "LLUS /INSERT", value: data?.data?.INSERTS_ILLUS || "-" },
      {
        key: " BISAC SUBJECT(S)",
        value: `${data?.data?.BISAC1_DESC || "-"} | ${
          data?.data?.BISAC2_DESC || "-"
        } | ${data?.data?.BISAC3_DESC || "-"}`,
      },
    ];
    marginTop = 70;
    var currentY = marginTop;
    const pageWidth = doc.internal.pageSize.width;
    const middleX = pageWidth / 2;
    doc.setDrawColor(0); // Set color to black
    doc.setLineWidth(0.1);
    marginTop -= 5;
    doc.line(middleX, marginTop, middleX, doc.internal.pageSize.height - 140);
    marginTop += 5;
    leftFields.forEach(({ key, value }) => {
      const keyFontSize = 8;
      const valueFontSize = 9;
      const lineHeight = 10;
      const keyWidth = 20; // Width for the key (left side)
      const valueWidth = 50; // Width for the value (left side)

      checkAndAddPage(lineHeight);

      doc.setFontSize(keyFontSize);
      doc.setFont("helvetica", "bold");
      doc.text(`${key}:`, 10, currentY, { maxWidth: keyWidth });
      doc.setFontSize(valueFontSize);
      doc.setFont("helvetica", "normal");
      doc.text(`${value}`, 50, currentY, { maxWidth: valueWidth });
      currentY += lineHeight;
    });
    let rightFieldsStartY = marginTop;
    rightFields.forEach(({ key, value }) => {
      const keyFontSize = 8;
      const valueFontSize = 9;
      const lineHeight = 10;
      const keyWidth = 20; // Width for the key (right side)
      const valueWidth = 50; // Width for the value (right side)
      checkAndAddPage(lineHeight);
      doc.setFontSize(keyFontSize);
      doc.setFont("helvetica", "bold");
      doc.text(`${key}:`, 110, rightFieldsStartY, { maxWidth: keyWidth });
      doc.setFontSize(valueFontSize);
      doc.setFont("helvetica", "normal");
      doc.text(`${value}`, 150, rightFieldsStartY, { maxWidth: valueWidth });
      rightFieldsStartY += lineHeight;
    });
    const pageMargin = 8;
    doc.setDrawColor(0);
    doc.setLineWidth(0.1);
    doc.line(
      pageMargin,
      currentY + 2,
      doc.internal.pageSize.width - pageMargin,
      currentY + 2
    );

    const longValue = {
      key: "DESCRIPTION",
      value: data.data.DESCRIPTION,
    };
    var keyWidth = 40;
    doc.setFont("helvetica", "bold");
    doc.text(`${longValue.key}:`, 10, (currentY += 10), { maxWidth: keyWidth });
    doc.setFont("helvetica", "normal");
    const textLines = doc.splitTextToSize(longValue.value, 140);
    textLines.forEach((line: any) => {
      const lineHeight = 6;
      checkAndAddPage(lineHeight);
      doc.text(line, 40, currentY);
      currentY += lineHeight;
    });
    const ContributoR = {
      key: "Contributor Bio",
      value: data?.data?.AUTHOR_BIO || "-",
    };
    var keyWidth = 40;
    doc.setFont("helvetica", "bold");
    doc.text(`${ContributoR.key}:`, 10, currentY, { maxWidth: keyWidth });
    doc.setFont("helvetica", "normal");
    const textLine = doc.splitTextToSize(ContributoR.value, 140);
    doc.setFont("helvetica", "normal");
    textLine.forEach((line: any) => {
      const lineHeight = 6;
      checkAndAddPage(lineHeight);

      doc.text(line, 40, currentY);
      currentY += lineHeight;
    });
    const Marketing = {
      key: "Marketing",
      value: data?.data?.MARKETING_BULLETS__FACT_SHEET || "-",
    };
    var keyWidth = 40;
    doc.setFont("helvetica", "bold");
    doc.text(`${Marketing.key}:`, 10, currentY, { maxWidth: keyWidth });
    doc.setFont("helvetica", "normal");
    const line = doc.splitTextToSize(Marketing.value, 140);
    line.forEach((line: any) => {
      const lineHeight = 10;
      checkAndAddPage(lineHeight);

      doc.text(line, 40, currentY);
      currentY += lineHeight;
    });
    const Publicity = {
      key: "Publicity",
      value: data?.data?.PUBLICITY || "-",
    };
    var keyWidth = 40;

    const valueStartX = 40;
    doc.setFont("helvetica", "bold");
    doc.text(`${Publicity.key}:`, 10, currentY, { maxWidth: keyWidth });
    doc.setFont("helvetica", "normal");
    const Line = doc.splitTextToSize(Publicity.value, 140);
    Line.forEach((line: any) => {
      const lineHeight = 10;
      checkAndAddPage(lineHeight);
      doc.text(line, valueStartX, currentY);
      currentY += lineHeight;
    });
    const Category = {
      key: "Category",
      value: `${data?.data?.CATEGORY1 || "-"} ${data?.data?.CATEGORY2 || "-"} ${
        data?.data?.CATEGORY3 || "-"
      }`,
    };
    var keyWidth = 40;

    // const valueWidth = 180;
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text(`${Category.key}:`, 10, currentY, { maxWidth: keyWidth });
    doc.setFont("helvetica", "normal");
    const Lines = doc.splitTextToSize(Category.value, 140);
    Lines.forEach((line: any) => {
      const lineHeight = 10;
      checkAndAddPage(lineHeight);
      doc.text(line, valueStartX, currentY);
      currentY += lineHeight;
    });

    doc.setFontSize(10);
    const rightColumnX = 100;
    currentY = 20;

    try {
      // Save the PDF
      doc.save("resume.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <div className="p-2">
      <button
        onClick={generatePDF}
        className="px-4 py-2 font-semibold bg-red-500 text-white rounded hover:bg-red-600"
      >
        Generate PDF
      </button>
    </div>
  );
};

export default ResumePDFGenerator;
