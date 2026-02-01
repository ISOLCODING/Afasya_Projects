// src/lib/api/services/payment_method.ts
import apiClient from '../client';

export interface PaymentMethod {
  id: number;
  type: 'bank' | 'qris';
  name: string;
  number?: string;
  bank_name?: string;
  bank_logo_url?: string;
  qris_image_url?: string;
}

export const getPaymentMethods = async () => {
  try {
    const response = await apiClient.get('/payment-methods');
    const data = response.data;
    return {
      success: data.status === 'success',
      data: data.data || [],
      message: data.message
    };
  } catch (error: any) {
    return { success: false, data: [], message: error.message || 'Failed to fetch payment methods' };
  }
};
