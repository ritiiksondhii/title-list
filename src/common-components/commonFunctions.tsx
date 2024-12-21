export    const formatCurrency = (value: number, toFixed?: number) => {
    return (
      "$" +
      Number(value)
        .toFixed(toFixed ?? 2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,")
    );
  };