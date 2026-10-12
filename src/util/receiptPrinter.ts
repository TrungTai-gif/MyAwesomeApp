import {NativeModules} from 'react-native';

export type ReceiptItem = {
  drinkName: string;
  quantity: number;
  price: number;
};

export type ReceiptData = {
  invoiceCode: string;
  tableNumber: number;
  staffEmail: string;
  items: ReceiptItem[];
  invoiceDate?: string;

  // Có thể chỉnh thông tin cửa hàng tại đây.
  storeName?: string;
  storeAddress?: string;
  storePhone?: string;
};

type ReceiptPrinterNative = {
  PrintReceipt(receiptText: string): Promise<boolean>;
};

const nativePrinter = NativeModules.ReceiptPrinter as
  | ReceiptPrinterNative
  | undefined;

const STORE_NAME = 'ME LINH COFFEE';
const STORE_ADDRESS = '166/1C Ấp Đông 3, Thới Tam Thôn, Hóc Môn, TP.HCM ';
const STORE_PHONE = '0372181221';

const cleanText = (value: string): string =>
  value.replace(/[\r\n\t]/g, ' ').trim();

const formatMoney = (amount: number): string =>
  Math.round(amount).toLocaleString('vi-VN') + ' đ';

export async function printReceipt(receipt: ReceiptData): Promise<boolean> {
  if (!nativePrinter?.PrintReceipt) {
    throw new Error(
      'Không tìm thấy NativeModules.ReceiptPrinter. ' +
        'Hãy kiểm tra việc đăng ký native module.',
    );
  }
  if (!receipt.items || receipt.items.length === 0) {
    throw new Error('Hóa đơn chưa có món nước.');
  }
  if (!receipt.staffEmail?.trim()) {
    throw new Error('Chưa có email nhân viên từ FormOrder.');
  }
  for (const item of receipt.items) {
    if (!item.drinkName?.trim()) {
      throw new Error('Tên món nước không hợp lệ.');
    }
    if (!Number.isInteger(item.quantity) || item.quantity <= 0) {
      throw new Error('Số lượng món phải là số nguyên dương.');
    }
    if (!Number.isFinite(item.price) || item.price < 0) {
      throw new Error('Đơn giá không hợp lệ.');
    }
  }
  const total = receipt.items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0,
  );

  const invoiceDate = receipt.invoiceDate;
  if (!invoiceDate) {
    throw new Error('Thiếu ngày giờ hóa đơn.');
  }

  const lines: string[] = [
    `__STORE_NAME__=${cleanText(receipt.storeName ?? STORE_NAME)}`,
    `__STORE_ADDRESS__=${cleanText(receipt.storeAddress ?? STORE_ADDRESS)}`,
    `__STORE_PHONE__=${cleanText(receipt.storePhone ?? STORE_PHONE)}`,
    `__INVOICE__=${cleanText(receipt.invoiceCode)}`,
    `__TABLE__=${receipt.tableNumber}`,
    `__DATETIME__=${cleanText(invoiceDate)}`,
    `__STAFF_EMAIL__=${cleanText(receipt.staffEmail)}`,
    '__ITEMS_BEGIN__',
    'Món hàng\tSL\tĐơn giá\tThành tiền',
  ];

  for (const item of receipt.items) {
    const lineTotal = item.quantity * item.price;

    lines.push(
      [
        cleanText(item.drinkName),
        String(item.quantity),
        formatMoney(item.price),
        formatMoney(lineTotal),
      ].join('\t'),
    );
  }

  lines.push('__ITEMS_END__', `__TOTAL__=${formatMoney(total)}`);
  return nativePrinter.PrintReceipt(lines.join('\n'));
}
