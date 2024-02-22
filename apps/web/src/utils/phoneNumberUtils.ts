// utils/phoneNumberUtils.ts
const convertPhoneNumberToNumber = (phoneNumber: string): number => {
  // Hapus semua karakter yang bukan angka dari nomor telepon
  const numericPhoneNumber: string = phoneNumber.replace(/\D/g, "");

  // Konversi nomor telepon ke tipe number
  const parsedPhoneNumber: number = parseInt(numericPhoneNumber, 10);

  return parsedPhoneNumber;
};

export default convertPhoneNumberToNumber;
