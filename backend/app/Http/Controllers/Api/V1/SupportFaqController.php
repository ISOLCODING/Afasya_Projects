<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\FAQ;
use App\Models\Service;
use App\Models\Portfolio;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class SupportFaqController extends ApiController
{
    /**
     * Get all active FAQs for support widget
     */
    public function index(Request $request)
    {
        $category = $request->query('category');
        $serviceId = $request->query('service_id');

        $faqs = FAQ::where('is_active', true)
            ->when($category, fn($q) => $q->where('category', '=', $category))
            ->when($serviceId, fn($q) => $q->where('service_id', '=', $serviceId))
            ->orderBy('display_order', 'asc')
            ->orderBy('created_at', 'desc')
            ->get();

        return $this->success($faqs, 'FAQs retrieved successfully');
    }

    /**
     * Handle chat interaction
     */
    public function chat(Request $request)
    {
        $message = strtolower($request->input('message', ''));
        
        if (empty($message)) {
            return $this->success([
                'type' => 'text',
                'text' => "Afasya siap membantu! Ada yang bisa saya jelaskan hari ini? 😊",
            ], 'Empty message');
        }

        // --- 1. SERVICE MATCHING (High Priority) ---
        $services = Service::where('is_active', true)->with(['features', 'packages'])->get();
        $matchedService = null;
        
        // Priority 1: Exact or long match
        foreach($services as $service) {
            $name = strtolower($service->name);
            if (Str::contains($message, $name) || Str::contains($name, $message)) {
                if (strlen($message) > 3) {
                    $matchedService = $service;
                    break;
                }
            }
        }
        
        // Priority 2: Keyword match
        if (!$matchedService) {
            foreach($services as $service) {
                $name = strtolower($service->name);
                $keywords = ['web', 'toko', 'booking', 'mobile', 'design', 'seo', 'marketing', 'ui', 'ux', 'app', 'aplikasi'];
                foreach($keywords as $kw) {
                    if (Str::contains($message, $kw) && Str::contains($name, $kw)) {
                        $matchedService = $service;
                        break 2;
                    }
                }
            }
        }

        if ($matchedService) {
             $minPrice = number_format($matchedService->price_min, 0, ',', '.');
            $features = $matchedService->features()->orderBy('display_order')->take(4)->get();
            $featureList = $features->map(fn($f) => "   ✅ {$f->feature_name}")->join("\n");
            
            $text = "🎯 **INFO LAYANAN: {$matchedService->name}**\n";
            $text .= "━━━━━━━━━━━━━━━━━━━━\n";
            $text .= "_{$matchedService->short_description}_\n\n";
            $text .= "💎 **Benefit Utama:**\n{$featureList}\n\n";
            $text .= "💰 **Investasi:** Mulai Rp **{$minPrice}**\n";
            $text .= "⏱️ **Estimasi:** {$matchedService->delivery_time}\n";
            $text .= "━━━━━━━━━━━━━━━━━━━━\n\n";
            $text .= "💡 _Ingin konsultasi gratis atau custom fitur? Klik tombol di bawah ya Kak!_ 👇";

            return $this->success([
                'type' => 'answer',
                'text' => $text,
                'source' => 'service_card',
                'related_id' => $matchedService->id,
                'action_link' => "/services/{$matchedService->slug}",
                'show_whatsapp' => true
            ], 'Service card response');
        }

        // --- 2. GREETINGS (Refined) ---
        if (Str::contains($message, ['halo', 'hi', 'selamat', 'pagi', 'siang', 'malam', 'assalamualaikum', 'permisi', 'hai'])) {
            $timeOfDay = 'hari ini';
            $hour = \Illuminate\Support\Carbon::now()->hour;
            if ($hour >= 5 && $hour < 11) $timeOfDay = 'pagi yang cerah ini';
            else if ($hour >= 11 && $hour < 15) $timeOfDay = 'siang ini';
            else if ($hour >= 15 && $hour < 19) $timeOfDay = 'sore ini';
            else $timeOfDay = 'malam ini';

            return $this->success([
                'type' => 'text',
                'text' => "Halo! 👋 Selamat datang di **Afasya Digital Solusi**.\n\nSenang sekali bisa menyapa Kakak di {$timeOfDay}! Saya **Afasya**, asisten digital yang siap mendampingi Kakak mewujudkan ide digital impian.\n\nApa yang ingin Kakak ketahui? Afasya bisa bantu jelaskan:\n✨ **Layanan & Harga**\n🚀 **Cara Order Proyek**\n🎨 **Lihat Portfolio**\n🎁 **Promo & Garansi**\n📞 **Hubungi Tim Ahli**\n\n_Ketik salah satu topik di atas ya!_ 😊",
            ], 'Greeting');
        }

        // --- 3. WHO ARE YOU ---
        if (Str::contains($message, ['siapa kamu', 'siapa afasya', 'kamu siapa', 'what are you', 'bot', 'ai assistant'])) {
            return $this->success([
                'type' => 'text',
                'text' => "Senang berkenalan dengan Kakak! 😊\n\nSaya **Afasya**, AI Assistant dari Afasya Projects. Saya ahli dalam memandu Kakak memilih solusi digital terbaik, baik itu Website, Toko Online, maupun Aplikasi Mobile.\n\nAda yang bisa saya bantu untuk bisnis Kakak? 🚀",
            ], 'Who are you');
        }

        // --- 4. WHY AFASYA ---
        if (Str::contains($message, ['kenapa afasya', 'keunggulan', 'kelebihan', 'keuntungan'])) {
            return $this->success([
                'type' => 'text',
                'text' => "Kenapa harus **Afasya Projects**? 💎\n\n1. **Premium Design**: Eksklusif dan mewah.\n2. **High Performance**: Super cepat & ringan.\n3. **SEO Optimized**: Siap bersaing di Google.\n4. **Support Berkelanjutan**: Kami dampingi sampai mahir.\n\n_Elevate Your Digital Presence._ ✨",
            ], 'Why Afasya');
        }

        // --- 5. SERVICES LIST (Generic) ---
        if (Str::contains($message, ['layanan', 'jasa', 'apa saja', 'daftar', 'list', 'menu'])) {
            $serviceList = Service::where('is_active', true)->orderBy('display_order')->pluck('name')->map(fn($n) => "• **{$n}**")->join("\n");
            
            return $this->success([
                'type' => 'text',
                'text' => "🌟 **Layanan Kami** 🌟\n\nBerikut solusi digital yang bisa Kakak pilih:\n{$serviceList}\n\n💡 _Ketik nama layanan di atas untuk info harga detailnya ya!_",
            ], 'Service list');
        }

        // --- 6. PRICE INQUIRY (Generic) ---
        if (Str::contains($message, ['harga', 'biaya', 'cost', 'price', 'tarif', 'budget'])) {
             return $this->success([
                 'type' => 'text',
                 'text' => "💰 **Penasaran dengan Harganya?**\n\nHarga kami sangat kompetitif untuk kualitas premium. \n\nAgar Afasya bisa kasih info akurat, Kakak sedang butuh jasa apa? \n• **Web Development**\n• **Ecommerce Store**\n• **Mobile App**\n• **Desain UI/UX**\n\nKetik nama layanannya ya! 😊",
             ], 'Generic price');
        }

        // --- 7. PROMO & DISCOUNT ---
        if (Str::contains($message, ['promo', 'diskon', 'discount', 'gratis'])) {
            return $this->success([
                'type' => 'text',
                'text' => "🎁 **Promo & Bonus!**\n\nKami punya banyak kejutan bulan ini:\n✨ Potongan harga project bundle.\n✨ Gratis konsultasi sepuasnya.\n✨ Bonus maintenance 3 bulan.\n\nYuk chat Tim Sales di WhatsApp untuk dapetin kupon rahasia! 😉",
                'show_whatsapp' => true
            ], 'Promo');
        }

        // --- 8. THANK YOU / CLOSING ---
        if (Str::contains($message, ['terima kasih', 'thanks', 'makasih', 'oke', 'sip', 'siap', 'tq'])) {
            return $this->success([
                'type' => 'text',
                'text' => "Sama-sama Kak! Senang bisa membantu. 😊\n\nKapanpun Kakak siap mulai project-nya, Afasya dan tim siap beraksi! _Have a great day!_ ✨",
            ], 'Thank you');
        }

        // --- 9. FAQ SEARCH ---
        $faq = FAQ::where('is_active', true)
            ->whereRaw('LOWER(question) LIKE ?', ["%{$message}%"])
            ->first(['*']);

        if ($faq) {
            $text = "💡 **INFO FAQ: {$faq->question}**\n";
            $text .= "━━━━━━━━━━━━━━━━━━━━\n\n";
            $text .= $faq->answer . "\n\n";
            $text .= "━━━━━━━━━━━━━━━━━━━━\n";
            $text .= "💡 _Ingin tanya lebih detail? Klik tombol WhatsApp di bawah ya!_";

            return $this->success([
                'type' => 'answer',
                'text' => $text,
                'source' => 'faq',
                'related_id' => $faq->id,
                'show_whatsapp' => true
            ], 'FAQ found');
        }

        // --- 10. FALLBACK ---
        return $this->success([
            'type' => 'fallback',
            'text' => "Afasya belum mengerti pertanyaan itu. 😅\n\nCoba tanya tentang:\n1. 🌟 **Layanan & Harga**\n2. 🚀 **Cara Order**\n3. 🎨 **Lihat Portfolio**\n\nAtau langsung chat Tim CS via WhatsApp? 👇",
            'show_whatsapp' => true
        ], 'Fallback');
    }

    /**
     * Get FAQs by category
     */
    public function byCategory($category)
    {
        $faqs = FAQ::where('is_active', true)
            ->where('category', '=', $category)
            ->orderBy('display_order', 'asc')
            ->orderBy('created_at', 'desc')
            ->get();

        return $this->success($faqs, "FAQs for category '{$category}' retrieved successfully");
    }

    /**
     * Get FAQ categories
     */
    public function categories()
    {
        $categories = FAQ::where('is_active', true)
            ->select('category')
            ->distinct()
            ->pluck('category');

        return $this->success($categories, 'Categories retrieved successfully');
    }

    /**
     * Increment view count
     */
    public function incrementView($uuid)
    {
        $faq = FAQ::where('uuid', $uuid)->firstOrFail();
        $faq->increment('view_count', 1);
        
        return $this->success([
            'view_count' => $faq->view_count
        ], 'View count updated');
    }

    /**
     * Mark FAQ as helpful
     */
    public function markHelpful(Request $request, $uuid)
    {
        $faq = FAQ::where('uuid', $uuid)->firstOrFail();
        
        $isHelpful = $request->input('helpful', true);
        
        if ($isHelpful) {
            $faq->increment('helpful_yes', 1);
        } else {
            $faq->increment('helpful_no', 1);
        }
        
        return $this->success([
            'helpful_yes' => $faq->helpful_yes,
            'helpful_no' => $faq->helpful_no,
        ], 'Feedback recorded');
    }
}
