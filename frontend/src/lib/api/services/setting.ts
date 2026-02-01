// src/lib/api/services/setting.ts
import apiClient from '../client';

export const getSettings = async () => {
  console.log('⚙️ Fetching settings...');
  try {
    const response = await apiClient.get('/settings');
    const data = response.data;
    console.log('✅ Settings API Response:', data);
    
    if (data.status === 'success') {
      return {
        success: true,
        data: data.data,
        message: data.message
      };
    }
    
    throw new Error(data.message || 'Failed to fetch settings');
  } catch (error: any) {
    console.error('❌ Error fetching settings:', error);
    // Default settings fallback
    return { 
      success: true, 
      data: {
        site_name: 'Afasya Projects',
        site_description: 'Solusi Digital Terpercaya untuk UMKM',
        contact_phone: '6282124515302',
        contact_email: 'info@afasya.com',
        site_logo: '',
        social_facebook: '',
        social_instagram: '',
        social_twitter: '',
        address: ''
      },
      message: 'Using default settings due to error'
    };
  }
};