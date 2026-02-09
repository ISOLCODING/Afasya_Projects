// src/lib/api/services/assistant.ts
import apiClient from '../client';

export interface AssistantOrderData {
    client_name: string;
    client_email: string;
    client_whatsapp: string;
    company?: string;
    path: 'consultation' | 'purchase';
    service_package_id?: number | string;
    payment_method_id?: number | string;
    note?: string;
}

export const createAssistantOrder = async (data: AssistantOrderData) => {
    try {
        const response = await apiClient.post('/assistant/orders', data);
        return {
            success: response.data.status === 'success',
            data: response.data.data,
            message: response.data.message
        };
    } catch (error: any) {
        return {
            success: false,
            data: null,
            message: error.response?.data?.message || error.message || 'Gagal memproses pesanan'
        };
    }
};

export const uploadPaymentProof = async (uuid: string, file: File) => {
    try {
        const formData = new FormData();
        formData.append('payment_proof', file);
        
        const response = await apiClient.post(`/orders/${uuid}/payment-proof`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        
        return {
            success: response.data.status === 'success',
            data: response.data.data,
            message: response.data.message
        };
    } catch (error: any) {
        return {
            success: false,
            data: null,
            message: error.response?.data?.message || error.message || 'Gagal mengunggah bukti pembayaran'
        };
    }
};

export const getPaymentMethods = async () => {
    try {
        const response = await apiClient.get('/payment-methods');
        return {
            success: response.data.status === 'success',
            data: response.data.data,
            message: response.data.message
        };
    } catch (error: any) {
        return {
            success: false,
            data: [],
            message: error.message || 'Gagal mengambil metode pembayaran'
        };
    }
};
