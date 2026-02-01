// src/lib/api/services/order.ts
import apiClient from '../client';

export interface OrderRequest {
  service_package_id: number;
  payment_method_id: number;
}

export const createOrder = async (orderData: OrderRequest) => {
  try {
    const response = await apiClient.post('/orders', orderData);
    const data = response.data;
    return {
      success: data.status === 'success',
      data: data.data,
      message: data.message
    };
  } catch (error: any) {
    return { success: false, data: null, message: error.message || 'Failed to create order' };
  }
};

export const uploadPaymentProof = async (orderUuid: string, file: File) => {
  try {
    const formData = new FormData();
    formData.append('payment_proof', file);
    
    const response = await apiClient.post(`/orders/${orderUuid}/payment-proof`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    const data = response.data;
    return {
      success: data.status === 'success',
      data: data.data,
      message: data.message
    };
  } catch (error: any) {
    return { success: false, data: null, message: error.message || 'Failed to upload proof' };
  }
};
