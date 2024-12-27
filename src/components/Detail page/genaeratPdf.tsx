import React from "react";
import { jsPDF } from "jspdf";
import moment from "moment";

const ResumePDFGenerator = (data: any) => {
  const generatePDF = async () => {
    console.log("Data passed to PDF generator:", data.data.EAN);
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });
    let marginTop = 15;
    let marginBottom = 10;
    var currentY = marginTop;
    const checkAndAddPage = (
      doc: any,
      currentY: any,
      lineHeight: any,
      marginBottom: any,
      footerHeight: any
    ) => {
      const pageHeight = doc.internal.pageSize.height;
      let pageWidth = doc.internal.pageSize.getWidth();
      const marginPadding = 3;
      const headerHeight = 10;
      const headerBottomPadding = 3;
      const contentHeight =
        pageHeight - headerHeight - footerHeight - 1 * marginPadding;
      const contentTop = headerHeight + marginPadding + headerBottomPadding;
      const availableHeight =
        pageHeight -
        marginBottom -
        footerHeight -
        headerBottomPadding -
        1 * marginPadding;

      doc.setLineWidth(0.1);
      doc.setDrawColor(0, 0, 0);
      doc.rect(
        marginPadding,
        contentTop,
        pageWidth - 2 * marginPadding,
        contentHeight
      );
      const canvas = document.createElement("canvas");
      canvas.width = 2100;
      canvas.height = 100;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0, "#E74C3C");
        gradient.addColorStop(1, "#FFF5F5");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        try {
          doc.addImage(
            canvas.toDataURL("23456789"),
            "JPEG",
            marginPadding,
            marginPadding,
            pageWidth - 2 * marginPadding,
            headerHeight
            // undefined,
            // "FAST"
          );
          doc.setTextColor(255, 255, 255);
          doc.setFontSize(14);
          const leftText = data.data.TESTIMPRINTFROMHNA;
          const rightText = "Fall 2025";
          const leftTextX = 10;
          const rightTextX = pageWidth - 10 - doc.getTextWidth(rightText);
          doc.text(leftText, leftTextX, 10);
          doc.setTextColor(0, 0, 0);
          doc.setFontSize(8);
          doc.text(rightText, rightTextX, 10);
          doc.setTextColor(0, 0, 0);
          doc.setFontSize(10);
        } catch (error) {
          console.error("Error adding gradient:", error);
        }
      }

      if (currentY + lineHeight > availableHeight) {
        doc.addPage();
        return 20;
      }
      return currentY;
    };

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(8);
    const leftColumnX = 10;
    currentY += 10;
    doc.setFontSize(12);

    const fields = [
      { key: "ISBN", value: data.data.EAN || "-" },
      { key: "TITLE", value: data.data.FULL_TITLE || "-" },
    ];
    const keyFontSize = 10;
    const valueFontSize = 10;
    const lineHeight = 7;
    fields.forEach(({ key, value }) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(keyFontSize);
      doc.text(`${key}:`, leftColumnX, currentY);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(valueFontSize);
      const valueX = leftColumnX + 30;
      doc.text(`${value}`, valueX, currentY);
      currentY += lineHeight;
    });
    const imageUrl = data?.data?.IMAGE_URL;
    if (imageUrl) {
      const imageX = 150;
      const imageY = 20;
      const imageWidth = 40;
      const imageHeight = 40;

      try {
        doc.addImage(imageUrl, "JPEG", imageX, imageY, imageWidth, imageHeight);
      } catch (error) {
        console.error("Error adding image to PDF:", error);
      }
    }
    const pages = 8;
    doc.setDrawColor(0);
    doc.setLineWidth(0.1);
    doc.line(
      pages,
      currentY + 25,
      doc.internal.pageSize.width - pages,
      currentY + 25
    );

    const footerHeight = 15; 
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
        key: "ANNOUNCED 1ST PRINTING BEST",
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
      { key: "ILLUS/INSERT", value: data?.data?.INSERTS_ILLUS || "-" },
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
    doc.setDrawColor(0);
    doc.setLineWidth(0.1);
    marginTop -= 5;
    doc.line(middleX, marginTop, middleX, doc.internal.pageSize.height - 140);
    marginTop += 5;
    leftFields.forEach(({ key, value }) => {
      const keyFontSize = 9.5;
      const valueFontSize = 9;
      const lineHeight = 10;
      const keyWidth = 40;
      const valueWidth = 50;
      currentY = checkAndAddPage(
        doc,
        currentY,
        lineHeight,
        marginBottom,
        footerHeight
      );
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
      const keyFontSize = 9.5;
      const valueFontSize = 9;
      const lineHeight = 10;
      const keyWidth = 40;
      const valueWidth = 50;
      rightFieldsStartY = checkAndAddPage(
        doc,
        rightFieldsStartY,
        lineHeight,
        marginBottom,
        footerHeight
      );
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
      key: "Description",
      value: data.data.DESCRIPTION || "",
    };
    var keyWidth = 40;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(keyFontSize);
    doc.text(`${longValue.key}:`, 10, (currentY += 10), { maxWidth: keyWidth });
    doc.setFont("helvetica", "normal");
    const textLines = doc.splitTextToSize(longValue.value, 155);
    textLines.forEach((line: any) => {
      const lineHeight = 6;
      currentY = checkAndAddPage(
        doc,
        currentY,
        lineHeight,
        marginBottom,
        footerHeight
      );
      doc.text(line, 40, currentY);
      currentY += lineHeight;
    });
    const ContributoR = {
      key: "Contributor Bio",
      value: data?.data?.AUTHOR_BIO || "-",
    };
    var keyWidth = 40;
    doc.setFont("helvetica", "bold");
    doc.text(`${ContributoR.key}:`, 10, (currentY += 3), {
      maxWidth: keyWidth,
    });
    doc.setFont("helvetica", "normal");
    const textLine = doc.splitTextToSize(ContributoR.value, 155);
    doc.setFont("helvetica", "normal");
    textLine.forEach((line: any) => {
      const lineHeight = 6;
      currentY = checkAndAddPage(
        doc,
        currentY,
        lineHeight,
        marginBottom,
        footerHeight
      );

      doc.text(line, 40, currentY);
      currentY += lineHeight;
    });
    const Marketing = {
      key: "Marketing",
      value: data?.data?.MARKETING_BULLETS__FACT_SHEET || "-",
    };
    var keyWidth = 40;
    doc.setFont("helvetica", "bold");
    doc.text(`${Marketing.key}:`, 10, (currentY += 3), { maxWidth: keyWidth });
    doc.setFont("helvetica", "normal");
    const line = doc.splitTextToSize(Marketing.value, 155);
    line.forEach((line: any) => {
      const lineHeight = 6;
      currentY = checkAndAddPage(
        doc,
        currentY,
        lineHeight,
        marginBottom,
        footerHeight
      );
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
    doc.text(`${Publicity.key}:`, 10, (currentY += 3), { maxWidth: keyWidth });
    doc.setFont("helvetica", "normal");
    const Line = doc.splitTextToSize(Publicity.value, 155);
    Line.forEach((line: any) => {
      const lineHeight = 6;
      currentY = checkAndAddPage(
        doc,
        currentY,
        lineHeight,
        marginBottom,
        footerHeight
      );
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

    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text(`${Category.key}:`, 10, (currentY += 3), { maxWidth: keyWidth });
    doc.setFont("helvetica", "normal");
    const Lines = doc.splitTextToSize(Category.value, 155);
    Lines.forEach((line: any) => {
      const lineHeight = 6;
      currentY = checkAndAddPage(
        doc,
        currentY,
        lineHeight,
        marginBottom,
        footerHeight
      );
      doc.text(line, valueStartX, currentY);
      currentY += lineHeight;
    });

    const addFooter = (pageNumber: any, totalPages: any) => {
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const footerY = pageHeight - footerHeight;
      const logoUrl = "/images/Abrams.png";
      const imgWidth = 40;
      const imgHeight = 12;
      const logoY = footerY + 2;

      try {
        doc.addImage(logoUrl, "PNG", 10, logoY, imgWidth, imgHeight);
      } catch (error) {
        console.error("Error adding footer image:", error);
      }

      // const currentDate = new Date().toLocaleDateString();
      const currentDate = data.data.PUB_DATE;
      const formattedDate = moment(currentDate).format("MM/DD/YYYY");
      const dateTextWidth = doc.getTextWidth(formattedDate);
      const dateTextX = (pageWidth - dateTextWidth) / 2;
      const dateY = footerY + 10;
      doc.text(formattedDate, dateTextX, dateY);

      const pageNumberText = `Page ${pageNumber} of ${totalPages}`;
      const pageNumberTextWidth = doc.getTextWidth(pageNumberText);
      const pageNumberX = pageWidth - 10 - pageNumberTextWidth;
      const pageNumberY = footerY + 10;
      doc.text(pageNumberText, pageNumberX, pageNumberY);
    };
    const totalPages = doc.internal.pages.length - 1;
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      addFooter(i, totalPages);
    }

    doc.setFontSize(10);
    const rightColumnX = 100;
    currentY = 20;

    try {
      doc.save("Title-List.pdf");
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
