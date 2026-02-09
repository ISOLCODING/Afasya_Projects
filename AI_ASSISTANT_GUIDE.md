# 🤖 AI Business Assistant - Complete Implementation Guide

## 📋 Overview

Sistem **AI Business Assistant** adalah entry point utama untuk proses bisnis digital agency Afasya. Sistem ini menggantikan form tradisional dengan conversational AI yang dapat:

1. **Mengumpulkan data klien** secara natural
2. **Menyimpan lead** ke database secara real-time
3. **Memproses pembayaran** dan aktivasi proyek otomatis
4. **Membuat user account** untuk klien baru

---

## 🏗️ Architecture

### Backend (Laravel)

#### **Database Schema**

```
orders
├── id
├── uuid (unique identifier)
├── client_name
├── client_email
├── client_whatsapp
├── company
├── note
├── user_id (nullable - auto-created)
├── service_package_id (nullable for inquiry)
├── amount (default 0)
├── status (inquiry | pending_payment | paid | confirmed | rejected)
├── payment_method_id (nullable)
└── admin_note

projects
├── id
├── order_id (links to orders)
├── user_id
├── service_id
├── name
├── description
├── status (active | completed | cancelled)
├── progress (0-100)
├── total_budget
├── start_date
└── due_date

user_packages
├── id
├── user_id
├── service_package_id
├── order_id
├── status (active | expired)
├── started_at
└── expired_at
```

#### **API Endpoints**

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/assistant/orders` | Create order from AI chat |
| POST | `/api/v1/orders/{uuid}/payment-proof` | Upload payment proof |
| GET | `/api/v1/payment-methods` | Get available payment methods |
| GET | `/api/v1/services/{slug}` | Get service details |

#### **OrderController Flow**

```php
storeFromAssistant(Request $request)
├── Validate client data
├── Find or Create User
│   ├── Check if user exists by email
│   └── Create new user if not found
├── Create Order
│   ├── Path A (consultation): status = 'inquiry'
│   └── Path B (purchase): status = 'pending_payment'
└── Return order with UUID

uploadProof(Request $request, $uuid)
├── Validate image file
├── Save to media collection
├── Update order status to 'paid'
├── Create Project (auto-activation)
│   ├── Set status = 'active'
│   ├── Calculate due_date from delivery_days
│   └── Link to order
└── Create UserPackage (entitlement)
    ├── Set status = 'active'
    └── Set expiration date
```

---

### Frontend (Next.js + TypeScript)

#### **Component Structure**

```
ChatAssistantModal.tsx
├── State Management
│   ├── step (intro | collect_info | choose_path | payment_method | success)
│   ├── formData (client info)
│   ├── messages (chat history)
│   └── orderUuid (for payment upload)
├── API Integration
│   ├── createAssistantOrder()
│   ├── uploadPaymentProof()
│   └── getPaymentMethods()
└── UI Components
    ├── Chat bubbles (bot + user)
    ├── Form inputs (name, email, wa, company)
    ├── Path selection buttons
    ├── Payment method cards
    └── File upload for proof
```

#### **User Flow**

```mermaid
graph TD
    A[User clicks "Mulai Proyek"] --> B[AI greets & asks for data]
    B --> C[User fills form: Name, Email, WA, Company]
    C --> D{Choose Path}
    D -->|Consultation| E[Create Order: status=inquiry]
    E --> F[Redirect to WhatsApp]
    D -->|Purchase| G[Create Order: status=pending_payment]
    G --> H[Show Payment Methods]
    H --> I[User selects Bank]
    I --> J[Show Account Details]
    J --> K[User uploads Payment Proof]
    K --> L[Backend Auto-Creates Project + UserPackage]
    L --> M[Success: Redirect to Dashboard]
```

---

## 🚀 Implementation Steps

### 1. Backend Setup

```bash
# Run migrations
php artisan migrate:fresh --seed

# Verify tables
php artisan tinker
>>> Schema::getColumnListing('orders')
>>> Schema::getColumnListing('projects')
>>> Schema::getColumnListing('user_packages')
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### 3. Test the Flow

1. Navigate to any service detail page
2. Click **"Mulai Proyek"** button
3. Fill in client information
4. Choose **"Langsung Order"**
5. Select payment method
6. Upload a test image as payment proof
7. Verify in database:

```sql
SELECT * FROM orders WHERE status = 'paid';
SELECT * FROM projects WHERE status = 'active';
SELECT * FROM user_packages WHERE status = 'active';
```

---

## 📊 Business Logic

### Path A: Consultation (Inquiry)

```
User Input → AI Chat → Database
{
  client_name: "John Doe",
  client_email: "john@example.com",
  client_whatsapp: "08123456789",
  company: "ABC Corp",
  path: "consultation"
}
↓
Order Created:
{
  status: "inquiry",
  service_package_id: null,
  amount: 0
}
↓
WhatsApp Link Generated with UUID
```

### Path B: Purchase & Payment

```
User Input → AI Chat → Database
{
  client_name: "Jane Smith",
  client_email: "jane@example.com",
  client_whatsapp: "08198765432",
  company: "XYZ Ltd",
  path: "purchase",
  service_package_id: 1,
  payment_method_id: 1
}
↓
Order Created:
{
  status: "pending_payment",
  amount: 5000000
}
↓
User Uploads Payment Proof
↓
Backend Triggers:
1. Order.status = "paid"
2. Project.create() → status = "active"
3. UserPackage.create() → status = "active"
```

---

## 🔐 Security Considerations

1. **File Upload Validation**
   - Max size: 5MB
   - Allowed types: image/*
   - Stored via Spatie Media Library

2. **User Creation**
   - Random password generated
   - Email verification can be added
   - Auto-assigned "client" role

3. **Order UUID**
   - Used for public-facing URLs
   - Prevents ID enumeration attacks

---

## 🎨 UI/UX Features

1. **Typing Animation**: Bot messages appear with realistic typing delay
2. **Progressive Disclosure**: Forms appear step-by-step
3. **Real-time Validation**: Instant feedback on form inputs
4. **Loading States**: Clear indicators during API calls
5. **Success Confirmation**: Celebratory message with next steps

---

## 📈 Analytics & Tracking

### Recommended Metrics

- Conversion rate: Inquiry → Purchase
- Average time to complete flow
- Drop-off points in the funnel
- Payment proof upload success rate

### Implementation

```typescript
// Add to ChatAssistantModal.tsx
useEffect(() => {
  if (step === 'success') {
    // Track conversion
    analytics.track('Order Completed', {
      order_uuid: orderUuid,
      service: serviceName,
      package: selectedPackage.package_name,
      amount: selectedPackage.price
    });
  }
}, [step]);
```

---

## 🐛 Troubleshooting

### Common Issues

1. **"Column not found" error**
   ```bash
   php artisan migrate:fresh --seed
   ```

2. **CORS errors**
   - Check `config/cors.php`
   - Ensure frontend URL is whitelisted

3. **File upload fails**
   - Verify storage is linked: `php artisan storage:link`
   - Check file permissions

4. **Order not creating**
   - Check API logs: `tail -f storage/logs/laravel.log`
   - Verify API endpoint in frontend

---

## 🚀 Future Enhancements

1. **Email Notifications**
   - Send confirmation email on order creation
   - Notify admin of new inquiries

2. **Payment Gateway Integration**
   - Midtrans/Xendit for automated payment
   - Webhook for instant activation

3. **AI Improvements**
   - Natural language processing for custom questions
   - Smart package recommendations

4. **Admin Dashboard**
   - Real-time order tracking
   - One-click project activation

---

## 📝 Code Examples

### Creating an Order via API

```typescript
import { createAssistantOrder } from '@/lib/api';

const result = await createAssistantOrder({
  client_name: "Test User",
  client_email: "test@example.com",
  client_whatsapp: "08123456789",
  company: "Test Company",
  path: "purchase",
  service_package_id: 1,
  payment_method_id: 1
});

console.log(result.data.uuid); // Use for payment upload
```

### Uploading Payment Proof

```typescript
import { uploadPaymentProof } from '@/lib/api';

const file = document.querySelector('input[type="file"]').files[0];
const result = await uploadPaymentProof(orderUuid, file);

if (result.success) {
  console.log('Project activated:', result.data.project);
}
```

---

## ✅ Checklist

- [x] Database migrations created
- [x] API endpoints implemented
- [x] Frontend chat component built
- [x] Payment flow integrated
- [x] Auto-project activation working
- [x] User auto-creation functional
- [ ] Email notifications (future)
- [ ] Payment gateway (future)
- [ ] Analytics tracking (future)

---

**Last Updated**: 2026-02-07  
**Version**: 1.0.0  
**Author**: Afasya Development Team
