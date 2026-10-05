import {Image} from 'react-native';
import {CreateDrink, Drink} from '../components/OrderDrink/OrderDrink.view';

const API_URL = 'http://localhost:5094/api/Drink';

//getDrinks
export const getDrinks = async () => {
  const response = await fetch(`${API_URL}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Không thể lấy danh sách sản phẩm');
  }
  return response.json();
};

//postDrinks
export const postDrinks = async (addDrinks: CreateDrink) => {
  const formData = new FormData();
  formData.append('DrinkName', addDrinks.drinkName);
  formData.append('Price', addDrinks.price);
  // formData.append('DrinkImage', {
  //   uri: '',
  //   type: '',
  //   name: '',
  // } as any);
  const response = await fetch(`${API_URL}`, {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) {
    throw new Error('Thêm sản phẩm thất bại');
  }
  console.log('Response:', response.status);
  console.log(response);
  return response.json();
};

//putDrinks
export const putDrinks = async (updatedDrink: Drink) => {
  const formData = new FormData();
  formData.append('DrinkName', updatedDrink.drinkName);
  formData.append('Price', updatedDrink.price.toString());
  // if (updatedDrink.imageUrl) {
  //   formData.append('DrinkImage', {
  //     uri: updatedDrink.imageUrl,
  //     type: '',
  //     name: '',
  //   }) as any;
  // }
  const response = await fetch(`${API_URL}/${updatedDrink.drinkId}`, {
    method: 'PUT',
    body: formData,
  });
  if (!response.ok) {
    throw new Error('Cập nhật đồ uống thất bại');
  }
  await new Promise(resolve => setTimeout(resolve, 1000));
  return response;
};

//deleteDrinks
export const deleteDrinks = async (id: number) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Xóa thất bại');
  }
  return response;
};
