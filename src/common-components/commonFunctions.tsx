export    const formatCurrency = (value: number, toFixed?: number) => {
    return (
      "$" +
      Number(value)
        .toFixed(toFixed ?? 2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,")
    );
  };
  
  export const downloadPdfData = (response: any) => {
    const blob = new Blob([response], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.download = 'document.pdf';
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
  };
  