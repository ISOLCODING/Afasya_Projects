import api from '../client';

export interface Faq {
    id: number;
    uuid: string;
    question: string;
    answer: string;
    category: string;
    service_id: number | null;
    display_order: number;
    is_active: boolean;
    view_count: number;
    helpful_yes: number;
    helpful_no: number;
    created_by: number | null;
    updated_by: number | null;
    created_at: string;
    updated_at: string;
}

export interface FaqsResponse {
    status: string;
    data: Faq[];
    message: string;
}

export interface CategoriesResponse {
    status: string;
    data: string[];
    message: string;
}

export interface FaqFeedbackResponse {
    status: string;
    data: {
        helpful_yes: number;
        helpful_no: number;
    };
    message: string;
}

export interface ChatResponse {
    status: string;
    data: {
        type: 'answer' | 'text' | 'fallback';
        text: string;
        source?: string;
        related_id?: number | string;
        action_link?: string;
        show_whatsapp?: boolean;
    };
    message: string;
}

/**
 * Get all active support FAQs
 */
export const getSupportFaqs = async (category?: string, serviceId?: number): Promise<FaqsResponse> => {
    const params: any = {};
    if (category) params.category = category;
    if (serviceId) params.service_id = serviceId;
    
    const response = await api.get('/support/faqs', { params });
    return response.data;
};

/**
 * Get FAQs by specific category
 */
export const getFaqsByCategory = async (category: string): Promise<FaqsResponse> => {
    const response = await api.get(`/support/faqs/category/${category}`);
    return response.data;
};

/**
 * Get available FAQ categories
 */
export const getFaqCategories = async (): Promise<CategoriesResponse> => {
    const response = await api.get('/support/faqs/categories');
    return response.data;
};

/**
 * Send message to AI Support
 */
export const sendSupportMessage = async (message: string): Promise<ChatResponse> => {
    const response = await api.post('/support/chat', { message });
    return response.data;
};

/**
 * Increment FAQ view count
 */
export const incrementFaqView = async (uuid: string): Promise<void> => {
    await api.post(`/support/faqs/${uuid}/view`);
};

/**
 * Mark FAQ as helpful or not helpful
 */
export const markFaqHelpful = async (uuid: string, helpful: boolean): Promise<FaqFeedbackResponse> => {
    const response = await api.post(`/support/faqs/${uuid}/helpful`, { helpful });
    return response.data;
};
