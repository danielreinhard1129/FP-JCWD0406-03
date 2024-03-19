import * as yup from 'yup';
import YupPassword from 'yup-password';
YupPassword(yup);

export const validationSchema = yup.object().shape({
  name: yup.string().required('Required to booking'),
  card_number: yup
    .number()
    .required('Required to booking')
    .min(16, 'Maximum length is 16 characters'),
  cvv: yup
    .number()
    .required('Required to booking')
    .min(3, 'Maximum length is 3 characters'),
  expired_card: yup
    .string()
    .required('Required to booking')
    .test('is-valid-date', 'Invalid expiration date format', (value) => {
      // Lakukan pemeriksaan format di sini
      return /^\d{2}\/\d{2}$/.test(value);
    })
    .test('is-valid-month', 'Invalid month in expiration date', (value) => {
      // Lakukan pemeriksaan bulan di sini
      const [month, year] = value.split('/');
      return parseInt(month) >= 1 && parseInt(month) <= 12;
    })
    .test('is-valid-year', 'Invalid year in expiration date', (value) => {
      // Lakukan pemeriksaan tahun di sini
      const [month, year] = value.split('/');
      const currentYear = new Date().getFullYear().toString().substr(-2);
      return parseInt(year) >= parseInt(currentYear);
    }),
});
