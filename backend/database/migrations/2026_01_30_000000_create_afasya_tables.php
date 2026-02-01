<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('icon', 100)->nullable();
            $table->string('short_description', 500);
            $table->text('full_description');
            $table->decimal('price_min', 12, 2)->default(0);
            $table->decimal('price_max', 12, 2)->default(0);
            $table->string('currency', 3)->default('IDR');
            $table->string('delivery_time', 50);
            $table->integer('display_order')->default(0);
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_active')->default(true);
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->text('meta_keywords')->nullable();
            $table->integer('view_count')->default(0);
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
            $table->softDeletes();

            $table->index('is_featured');
            $table->index('is_active');
            $table->index('display_order');
        });

        Schema::create('service_features', function (Blueprint $table) {
            $table->id();
            $table->foreignId('service_id')->constrained()->cascadeOnDelete();
            $table->string('feature_name');
            $table->text('description')->nullable();
            $table->string('icon', 100)->nullable()->default('✓');
            $table->integer('display_order')->default(0);
            $table->boolean('is_included')->default(true);
            $table->timestamps();

            $table->unique(['service_id', 'feature_name']);
        });

        Schema::create('service_packages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('service_id')->constrained()->cascadeOnDelete();
            $table->string('package_name');
            $table->decimal('price', 12, 2);
            $table->text('description')->nullable();
            $table->json('included_features')->nullable();
            $table->json('excluded_features')->nullable();
            $table->integer('delivery_days');
            $table->boolean('is_popular')->default(false);
            $table->integer('display_order')->default(0);
            $table->timestamps();

            $table->index('is_popular');
        });

        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->string('name');
            $table->string('email')->nullable();
            $table->string('phone', 20)->nullable();
            $table->string('business_name');
            $table->string('business_type'); // Enum in app logic
            $table->year('business_since')->nullable();
            $table->string('employee_count')->nullable();
            $table->text('testimonial');
            $table->unsignedTinyInteger('rating')->default(5);
            $table->string('project_type')->nullable();
            $table->string('website_url', 500)->nullable();
            $table->string('photo', 500)->nullable();
            $table->string('logo', 500)->nullable();
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_approved')->default(true);
            $table->integer('display_order')->default(0);
            $table->foreignId('service_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
            $table->date('testimonial_date')->nullable();
        });

         Schema::create('portfolios', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('client_name');
            $table->string('client_business');
            $table->string('category'); // Enum
            $table->string('industry'); // Enum
            $table->foreignId('service_id')->constrained()->cascadeOnDelete();
            $table->foreignId('client_id')->nullable()->constrained()->nullOnDelete();
            $table->text('description');
            $table->text('challenge')->nullable();
            $table->text('solution')->nullable();
            $table->text('results')->nullable();
            $table->json('tech_stack');
            $table->string('project_url', 500)->nullable();
            $table->string('github_url', 500)->nullable();
            $table->string('demo_url', 500)->nullable();
            $table->string('featured_image', 500);
            $table->string('video_url', 500)->nullable();
            $table->string('status')->default('completed'); // Enum
            $table->date('start_date')->nullable();
            $table->date('completion_date')->nullable();
            $table->date('launch_date')->nullable();
            $table->integer('views_count')->default(0);
            $table->integer('likes_count')->default(0);
            $table->integer('shares_count')->default(0);
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_published')->default(true);
            $table->boolean('show_in_showcase')->default(true);
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->text('meta_keywords')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
            $table->timestamp('published_at')->nullable();
            $table->softDeletes();
            
            $table->index('category');
            $table->index('industry');
            $table->index('status');
        });

        Schema::create('portfolio_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('portfolio_id')->constrained()->cascadeOnDelete();
            $table->string('image_url', 500);
            $table->string('alt_text')->nullable();
            $table->string('caption', 500)->nullable();
            $table->integer('display_order')->default(0);
            $table->boolean('is_featured')->default(false);
            $table->integer('file_size')->nullable();
            $table->string('mime_type', 100)->nullable();
            $table->string('dimensions', 50)->nullable();
            $table->timestamps();
        });
        
        // Add portfolio_id to clients table later or handle via standard separate migration due to circular key if not careful.
        // Or simply add column here if using ALTER, but since we are creating, we need to be careful with circular deps. 
        // Clients table already created above, but portfolio_id was not added. Adding it now via nullable.
        Schema::table('clients', function (Blueprint $table) {
            $table->foreignId('portfolio_id')->nullable()->constrained('portfolios')->nullOnDelete();
        });

        Schema::create('teams', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->string('name');
            $table->string('position');
            $table->text('bio')->nullable();
            $table->string('short_bio', 500)->nullable();
            $table->string('photo', 500)->nullable();
            $table->string('email')->nullable();
            $table->string('phone', 20)->nullable();
            $table->string('linkedin_url', 500)->nullable();
            $table->string('github_url', 500)->nullable();
            $table->string('portfolio_url', 500)->nullable();
            $table->string('twitter_url', 500)->nullable();
            $table->unsignedTinyInteger('experience_years')->default(0);
            $table->integer('display_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->date('join_date')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
        });

        Schema::create('team_expertise', function (Blueprint $table) {
            $table->id();
            $table->foreignId('team_id')->constrained()->cascadeOnDelete();
            $table->string('expertise_name', 100);
            $table->string('icon', 100)->nullable();
            $table->string('proficiency_level')->default('intermediate'); // Enum
            $table->integer('display_order')->default(0);
            $table->decimal('years_experience', 3, 1)->nullable();
            $table->timestamps();
        });

        Schema::create('contact_messages', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->string('name');
            $table->string('email');
            $table->string('phone', 20)->nullable();
            $table->string('company')->nullable();
            $table->string('job_title', 100)->nullable();
            $table->foreignId('service_id')->nullable()->constrained()->nullOnDelete();
            $table->string('budget_range')->nullable();
            $table->string('project_deadline', 100)->nullable();
            $table->text('project_description')->nullable();
            $table->text('message');
            $table->string('status')->default('new'); // enum
            $table->string('source')->default('website'); // enum
            $table->string('priority')->default('medium'); // enum
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->string('referrer_url', 500)->nullable();
            $table->string('page_url', 500)->nullable();
            $table->foreignId('assigned_to')->nullable()->constrained('users')->nullOnDelete();
            $table->text('response_note')->nullable();
            $table->timestamp('responded_at')->nullable();
            $table->string('response_channel')->nullable();
            $table->date('follow_up_date')->nullable();
            $table->text('follow_up_notes')->nullable();
            $table->timestamps();
        });

        Schema::create('contact_attachments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('contact_id')->constrained('contact_messages')->cascadeOnDelete();
            $table->string('file_path', 500);
            $table->string('file_name');
            $table->string('file_type', 100);
            $table->integer('file_size');
            $table->string('mime_type', 100);
            $table->text('description')->nullable();
            $table->integer('download_count')->default(0);
            $table->timestamps();
        });

        Schema::create('content_pages', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->string('title');
            $table->string('slug')->unique();
            $table->longText('content');
            $table->text('excerpt')->nullable();
            $table->string('page_type')->default('custom'); // enum
            $table->string('template', 100)->default('default');
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->text('meta_keywords')->nullable();
            $table->string('og_image', 500)->nullable();
            $table->boolean('is_published')->default(true);
            $table->boolean('is_in_menu')->default(false);
            $table->integer('menu_order')->default(0);
            $table->integer('view_count')->default(0);
            $table->foreignId('parent_id')->nullable();
            $table->foreign('parent_id')->references('id')->on('content_pages')->nullOnDelete();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
            $table->timestamp('published_at')->nullable();
        });

        Schema::create('faqs', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->text('question');
            $table->longText('answer');
            $table->string('category')->default('general');
            
            $table->foreignId('service_id')->nullable()->constrained()->nullOnDelete();
            $table->integer('display_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->integer('view_count')->default(0);
            $table->integer('helpful_yes')->default(0);
            $table->integer('helpful_no')->default(0);
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
        });

        Schema::create('site_settings', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->string('key')->unique();
            $table->longText('value')->nullable();
            $table->string('type')->default('string'); // enum
            $table->string('data_type', 50)->nullable();
            $table->string('group_name', 100);
            $table->string('subgroup', 100)->nullable();
            $table->string('label')->nullable();
            $table->text('description')->nullable();
            $table->string('placeholder')->nullable();
            $table->json('options')->nullable();
            $table->text('validation_rules')->nullable();
            $table->integer('display_order')->default(0);
            $table->boolean('is_public')->default(false);
            $table->boolean('is_required')->default(false);
            $table->boolean('is_encrypted')->default(false);
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
        });

        Schema::create('subscriptions', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->string('email')->unique();
            $table->string('name')->nullable();
            $table->string('phone', 20)->nullable();
            $table->json('preferences')->nullable();
            $table->json('interests')->nullable();
            $table->string('status')->default('active'); // enum
            $table->boolean('is_verified')->default(false);
            $table->string('source', 100)->default('website');
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->string('verification_token', 100)->nullable();
            $table->timestamp('verification_sent_at')->nullable();
            $table->timestamp('verified_at')->nullable();
            $table->string('unsubscribe_token', 100)->nullable();
            $table->integer('emails_sent')->default(0);
            $table->integer('emails_opened')->default(0);
            $table->integer('emails_clicked')->default(0);
            $table->timestamps();
            $table->timestamp('last_engaged_at')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('subscriptions');
        Schema::dropIfExists('site_settings');
        Schema::dropIfExists('faqs');
        Schema::dropIfExists('content_pages');
        Schema::dropIfExists('contact_attachments');
        Schema::dropIfExists('contact_messages');
        Schema::dropIfExists('team_expertise');
        Schema::dropIfExists('teams');
        Schema::table('clients', function (Blueprint $table) {
             $table->dropForeign(['portfolio_id']);
             $table->dropColumn('portfolio_id');
        });
        Schema::dropIfExists('portfolio_images');
        Schema::dropIfExists('portfolios');
        Schema::dropIfExists('clients');
        Schema::dropIfExists('service_packages');
        Schema::dropIfExists('service_features');
        Schema::dropIfExists('services');
    }
};
