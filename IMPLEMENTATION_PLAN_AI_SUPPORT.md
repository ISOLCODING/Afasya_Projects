# 🚀 IMPLEMENTATION PLAN: Advanced AI Assistant & Support System

## 📋 Overview
Implementasi sistem AI Assistant yang lebih canggih dengan:
1. ✅ Bug fixes untuk loading berulang
2. ✅ Real-time integration dengan Projects & UserPackages
3. ✅ Support Chat Widget (kanan bawah) dengan FAQ CRUD
4. ✅ Optimasi loading frontend
5. ✅ Update relasi service_id di Projects table

---

## 🎯 PHASE 1: Database & Backend API

### 1.1 Database Schema Updates

#### ✅ **support_faqs** table (CREATED)
```sql
CREATE TABLE support_faqs (
    id BIGINT PRIMARY KEY,
    question VARCHAR(255),
    answer TEXT,
    category VARCHAR(50) DEFAULT 'general',
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

#### 🔄 **projects** table (UPDATE NEEDED)
```sql
ALTER TABLE projects 
ADD COLUMN service_id BIGINT AFTER order_id,
ADD FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE SET NULL;
```

### 1.2 Models

- [x] `SupportFaq.php` - Model untuk FAQ
- [ ] Update `Project.php` - Add service_id relationship
- [ ] Update `Order.php` - Add service relationship

### 1.3 API Endpoints

#### Support Chat API
- `GET /api/v1/support/faqs` - Get active FAQs
- `GET /api/v1/support/faqs/{category}` - Get FAQs by category

#### Enhanced Order API
- `POST /api/v1/assistant/orders` - Enhanced with service_id
- `GET /api/v1/orders/{uuid}/status` - Real-time order status

#### Project Tracking API
- `GET /api/v1/projects/my-projects` - User's active projects
- `GET /api/v1/user-packages/active` - User's active packages

### 1.4 Filament Resources

- [ ] `SupportFaqResource.php` - CRUD untuk FAQ di admin panel
- [ ] Update `ProjectResource.php` - Add service selection

---

## 🎯 PHASE 2: Frontend Components

### 2.1 Fix ChatAssistantModal Bug

**Problem**: `resetChat()` dipanggil berulang karena `useEffect` dependency
**Solution**: Add dependency array dan prevent double initialization

```typescript
useEffect(() => {
    if (isOpen && messages.length === 0) {
        resetChat();
    }
}, [isOpen]); // Only run when modal opens
```

### 2.2 Support Chat Widget (NEW)

**File**: `frontend/src/components/common/SupportChatWidget.tsx`

**Features**:
- Floating button di kanan bawah
- Expandable chat interface
- FAQ list dari database
- Quick actions untuk WhatsApp
- Modern glassmorphism UI

**UI Structure**:
```
┌─────────────────────────┐
│  💬 Support Cepat       │
│  ● Online               │
├─────────────────────────┤
│  📌 Pertanyaan Umum:    │
│  ▸ Apa itu layanan X?   │
│  ▸ Berapa harga paket?  │
│  ▸ Cara pembayaran?     │
├─────────────────────────┤
│  💬 Chat WhatsApp       │
└─────────────────────────┘
```

### 2.3 Optimized Service Loading

**Current Issue**: Fetch semua data sekaligus
**Solution**: Implement lazy loading + caching

```typescript
// Use React Query for caching
const { data: services } = useQuery({
    queryKey: ['services'],
    queryFn: getServices,
    staleTime: 5 * 60 * 1000, // Cache 5 minutes
});
```

---

## 🎯 PHASE 3: Real-Time Integration

### 3.1 Enhanced Order Flow

```
User selects service package
↓
ChatAssistant collects data
↓
POST /api/v1/assistant/orders
{
    client_name,
    client_email,
    service_package_id,
    path: "purchase"
}
↓
Backend creates:
├─ Order (with service_id from package)
├─ User (if not exists)
└─ Returns order UUID
↓
User uploads payment proof
↓
Backend auto-creates:
├─ Project (with service_id)
└─ UserPackage (with expiry)
```

### 3.2 Project Auto-Creation Logic

**File**: `OrderController.php::uploadProof()`

```php
// Get service from package
$package = ServicePackage::with('service')->find($order->service_package_id);

// Create project with service_id
Project::create([
    'order_id' => $order->id,
    'user_id' => $order->user_id,
    'service_id' => $package->service_id, // ← NEW
    'service_package_id' => $package->id,
    'name' => "{$package->service->name} - {$order->client_name}",
    'status' => 'active',
    'total_budget' => $order->amount,
    'due_date' => now()->addDays($package->delivery_days),
]);
```

---

## 🎯 PHASE 4: UI/UX Improvements

### 4.1 Loading States

- Skeleton loaders untuk service cards
- Shimmer effect saat fetch data
- Progressive image loading

### 4.2 Error Handling

- Toast notifications untuk errors
- Retry mechanism untuk failed API calls
- Offline detection

### 4.3 Animations

- Smooth transitions dengan Framer Motion
- Micro-interactions pada buttons
- Page transitions

---

## 📦 FILES TO CREATE/MODIFY

### Backend (Laravel)

#### New Files:
1. `app/Models/SupportFaq.php`
2. `app/Http/Controllers/Api/V1/SupportFaqController.php`
3. `app/Filament/Resources/SupportFaqs/SupportFaqResource.php`
4. `app/Filament/Resources/SupportFaqs/Schemas/SupportFaqForm.php`
5. `app/Filament/Resources/SupportFaqs/Tables/SupportFaqsTable.php`
6. `database/seeders/SupportFaqSeeder.php`
7. `database/migrations/2026_02_07_add_service_id_to_projects.php`

#### Modified Files:
1. `app/Models/Project.php` - Add service relationship
2. `app/Models/Order.php` - Add service relationship
3. `app/Http/Controllers/Api/V1/OrderController.php` - Enhanced logic
4. `routes/api.php` - Add support FAQ routes

### Frontend (Next.js)

#### New Files:
1. `src/components/common/SupportChatWidget.tsx`
2. `src/lib/api/services/support.ts`
3. `src/hooks/useSupport.ts`
4. `src/components/common/SkeletonLoader.tsx`

#### Modified Files:
1. `src/components/services/ChatAssistantModal.tsx` - Bug fixes
2. `src/lib/api/services/service.ts` - Add caching
3. `src/pages/_app.tsx` - Add SupportChatWidget globally
4. `src/lib/api/services/assistant.ts` - Enhanced with service_id

---

## ⏱️ ESTIMATED TIMELINE

- **Phase 1** (Database & API): 2-3 hours
- **Phase 2** (Frontend Components): 3-4 hours
- **Phase 3** (Integration): 2 hours
- **Phase 4** (Polish & Testing): 2 hours

**Total**: ~10 hours of development

---

## 🧪 TESTING CHECKLIST

### Backend
- [ ] FAQ CRUD works in admin panel
- [ ] Support API returns correct data
- [ ] Order creates project with service_id
- [ ] UserPackage created with correct expiry

### Frontend
- [ ] ChatAssistant doesn't loop
- [ ] Support widget loads FAQs
- [ ] Service pages load fast
- [ ] Payment flow works end-to-end

### Integration
- [ ] Real-time project creation
- [ ] WhatsApp redirect with correct data
- [ ] Dashboard shows active projects
- [ ] Email notifications sent

---

## 🚀 DEPLOYMENT STEPS

1. Run migrations: `php artisan migrate`
2. Seed FAQ data: `php artisan db:seed --class=SupportFaqSeeder`
3. Clear cache: `php artisan optimize:clear`
4. Build frontend: `npm run build`
5. Test production build

---

**Status**: READY TO IMPLEMENT ✅
**Next Step**: Execute Phase 1 - Database & Backend API

