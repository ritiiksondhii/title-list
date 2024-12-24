import React from 'react';
import { jsPDF } from 'jspdf';

const ResumePDFGenerator = (data:any) => {
  const generatePDF = async () => {
    // Create new jsPDF instance
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Create gradient header
    const canvas = document.createElement('canvas');
    canvas.width = 2100; // 10x the PDF width for better quality
    canvas.height = 100;  // 10x the header height (10mm)
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop(0, '#E74C3C');    // Solid red color
      gradient.addColorStop(1, '#FFF5F5');    // Light pink/white

      // Fill canvas with gradient
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add gradient to PDF
      try {
        doc.addImage(
          canvas.toDataURL('image/jpeg'),
          'JPEG',
          0,   // x coordinate
          0,   // y coordinate
          210, // width (A4 width in mm)
          10,  // height (reduced to 10mm)
          undefined,
          'FAST'
        );
      } catch (error) {
        console.error('Error adding gradient:', error);
      }
    }

    // Add white text for the header
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12); // Reduced font size to fit smaller header
    doc.text(data.data.TESTIMPRINTFROMHNA, 10, 7); // Adjusted y-position for smaller header

    // Reset text color for main content
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);

    // Create two-column layout
    // Left column - adjusted starting position due to smaller header
    const leftColumnX = 10;
    let currentY = 20; // Reduced from 40 to account for smaller header

    doc.setFontSize(14);
    doc.text('Contact', leftColumnX, currentY);
    currentY += 10;
    
    doc.setFontSize(12);
    doc.text('Email:', leftColumnX, currentY);
    currentY += 7;
    doc.text('Phone:', leftColumnX, currentY);
    currentY += 7;
    doc.text('Location:', leftColumnX, currentY);
    currentY += 15;

    // Add more sections to left column
    doc.setFontSize(14);
    doc.text('Skills', leftColumnX, currentY);
    currentY += 10;
    
    doc.setFontSize(12);
    doc.text('• Skill 1', leftColumnX + 5, currentY);
    currentY += 7;
    doc.text('• Skill 2', leftColumnX + 5, currentY);

    // Right column - adjusted starting position
    const rightColumnX = 100;
    currentY = 20; // Reduced from 40 to account for smaller header

    // Add profile image
    // const addImageToDoc = (imageUrl: string): Promise<void> => {
    //   return new Promise((resolve, reject) => {
    //     const img = new Image();
    //     img.crossOrigin = 'Anonymous';  // Handle CORS
    //     img.onload = () => {
    //       const canvas = document.createElement('canvas');
    //       canvas.width = img.width;
    //       canvas.height = img.height;
    //       const ctx = canvas.getContext('2d');
          
    //       if (!ctx) {
    //         reject(new Error('Failed to get canvas context'));
    //         return;
    //       }

    //       ctx.drawImage(img, 0, 0);
          
    //       try {
    //         doc.addImage(
    //           canvas.toDataURL('image/jpeg'),
    //           'JPEG',
    //           160,  // x coordinate
    //           2,    // y coordinate (adjusted for smaller header)
    //           20,   // width (reduced size)
    //           25    // height (reduced size)
    //         );
    //         resolve();
    //       } catch (error) {
    //         reject(error);
    //       }
    //     };
    //     img.onerror = reject;
    //     img.src = imageUrl;
    //   });
    // };

    try {
      // Replace with actual image URL
    //   await addImageToDoc('YOUR_IMAGE_URL');
      
      // Add work experience section
      doc.setFontSize(14);
      doc.text('Work Experience', rightColumnX, currentY);
      currentY += 10;
      
      doc.setFontSize(12);
      doc.text('Job Title', rightColumnX, currentY);
      currentY += 7;
      doc.text('Company Name', rightColumnX, currentY);
      currentY += 7;
      doc.text('• Responsibility 1', rightColumnX + 5, currentY);
      
      // Save the PDF
      doc.save('resume.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className="p-4">
      <button 
        onClick={generatePDF}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Generate PDF
      </button>
    </div>
  );
};

export default ResumePDFGenerator;