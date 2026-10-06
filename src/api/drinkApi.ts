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
  const extension = addDrinks.imageUrl.split('.').pop()?.toLowerCase();
  const mimeType =
    extension === 'png'
      ? 'image/png'
      : extension === 'webp'
      ? 'image/webp'
      : 'image/jpeg';
  formData.append('DrinkName', addDrinks.drinkName);
  formData.append('Price', addDrinks.price);
  if (addDrinks.imageUrl) {
    formData.append('DrinkImage', {
      uri: addDrinks.imageUrl,
      type: mimeType,
      name: addDrinks.imageUrl.split('\\').pop() || `drink.${extension}`,
    } as any);
  }
  console.log('UPLOAD:', {
    path: addDrinks.imageUrl,
    extension,
    mimeType,
  });
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
  const extension = updatedDrink.imageUrl.split('.').pop()?.toLowerCase();
  const mimeType =
    extension === 'png'
      ? 'image/png'
      : extension === 'webp'
      ? 'image/webp'
      : 'image/jpeg';
  formData.append('DrinkName', updatedDrink.drinkName);
  formData.append('Price', updatedDrink.price.toString());
  if (updatedDrink.imageUrl) {
    formData.append('DrinkImage', {
      uri: updatedDrink.imageUrl,
      type: mimeType,
      name: updatedDrink.imageUrl.split('\\').pop() || `drink.${extension}`,
    } as any);
  }
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
