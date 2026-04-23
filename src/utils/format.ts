export const formatRupiah = (uang: number): string => {
  const format = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(uang);
  return format;
};
