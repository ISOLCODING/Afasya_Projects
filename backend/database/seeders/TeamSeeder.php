<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Team;
use App\Models\TeamExpertise;
use Illuminate\Support\Str;

class TeamSeeder extends Seeder
{
    public function run(): void
    {
        $members = [
            [
                'name' => 'Faishal Khalil',
                'position' => 'CEO & Fullstack Developer',
                'short_bio' => 'Visionary leader with a passion for building scalable digital solutions.',
                'bio' => 'Faishal has over 5 years of experience in the tech industry, specialized in Laravel and React ecosystem.',
                'email' => 'faishal@afasya.com',
                'expertises' => ['Laravel', 'React', 'Project Management', 'Cloud Architecture'],
            ],
            [
                'name' => 'Ahmad Riza',
                'position' => 'Senior UI/UX Designer',
                'short_bio' => 'Crafting beautiful and intuitive user experiences.',
                'bio' => 'Riza is an expert in Figma and design systems, ensuring every pixel has a purpose.',
                'email' => 'riza@afasya.com',
                'expertises' => ['Figma', 'User Research', 'Prototyping', 'Design System'],
            ],
            [
                'name' => 'Siti Aminah',
                'position' => 'Digital Marketing Specialist',
                'short_bio' => 'Helping brands grow their online presence through data-driven strategies.',
                'bio' => 'Siti has a proven track record of increasing engagement and conversion for local UMKMs.',
                'email' => 'siti@afasya.com',
                'expertises' => ['SEO', 'SEM', 'Content Strategy', 'Analytics'],
            ],
            [
                'name' => 'Budi Santoso',
                'position' => 'Backend Engineer',
                'short_bio' => 'Passionate about high-performance APIs and database optimization.',
                'bio' => 'Budi ensures the engine behind every application runs smoothly and securely.',
                'email' => 'budi@afasya.com',
                'expertises' => ['Node.js', 'PostgreSQL', 'Redis', 'Docker'],
            ],
            [
                'name' => 'Indah Permata',
                'position' => 'Frontend Developer',
                'short_bio' => 'Architecting fast and responsive web interfaces.',
                'bio' => 'Indah loves turning complex designs into interactive web applications using modern frameworks.',
                'email' => 'indah@afasya.com',
                'expertises' => ['Vue.js', 'Tailwind CSS', 'TypeScript', 'Next.js'],
            ],
        ];

        foreach ($members as $member) {
            $team = Team::create([
                'uuid' => Str::uuid(),
                'name' => $member['name'],
                'position' => $member['position'],
                'short_bio' => $member['short_bio'],
                'bio' => $member['bio'],
                'email' => $member['email'],
                'is_active' => true,
                'display_order' => rand(1, 10),
            ]);

            foreach ($member['expertises'] as $expertise) {
                TeamExpertise::create([
                    'team_id' => $team->id,
                    'expertise_name' => $expertise,
                    'proficiency_level' => 'expert',
                ]);
            }
        }
    }
}
