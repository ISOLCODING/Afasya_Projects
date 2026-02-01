// src/utils/apiDebugger.ts
import { getServices, getPortfolios, getPosts, getTeam, getSettings, getPage } from '@/lib/api';

export const testAllEndpoints = async () => {
  console.log('🚀 Testing all API endpoints...');
  
  const endpoints = [
    { name: 'Settings', func: getSettings },
    { name: 'Services', func: getServices },
    { name: 'Portfolios', func: getPortfolios },
    { name: 'Posts', func: () => getPosts({ limit: 3 }) },
    { name: 'Team', func: getTeam },
    { name: 'Page (home)', func: () => getPage('home') },
  ];

  for (const endpoint of endpoints) {
    console.log(`\n🔍 Testing: ${endpoint.name}`);
    try {
      const result = await endpoint.func();
      console.log(`✅ Success:`, result);
      console.log(`📊 Data length:`, result.data?.length || 'No data array');
    } catch (error) {
      console.error(`❌ Failed:`, error);
    }
  }
};

// Tambahkan ke window untuk debugging
if (typeof window !== 'undefined' && import.meta.env.DEV) {
  (window as any).debugAPI = testAllEndpoints;
  console.log('🔧 Debug tool available: window.debugAPI()');
}