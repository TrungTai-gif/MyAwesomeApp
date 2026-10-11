import {OrderItem} from '../screens/OrderDrinks/OrderDrink.view';
import apiClient from './apiClient';

const API_URL = 'http://localhost:5094/api/Invoice/no';

export const postInvoice = async (orderData: OrderItem[], email: string) => {
  const invoice = {
    invoiceCode: 'string',
    customerId: 1,
    telephoneNumber: '00000000',
    address: 'string',
    invoiceDate: new Date().toISOString(),
    paymentstatus: true,
    tableNumber: 5,
    email: email,
    isPrinted: true,
    details: orderData.map(item => {
      return {
        id: 0,
        invoiceCode: 'string',
        ...item,
      };
    }),
  };
  const response = await apiClient(`${API_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(invoice),
  });
  console.log(response.status);
  const result = await response.json();
  if (!response.ok) {
    throw new Error(`${result.status}: ${result.title}`);
  }
  return result;
};
