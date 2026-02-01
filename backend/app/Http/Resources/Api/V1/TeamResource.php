<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TeamResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'uuid' => $this->uuid,
            'name' => $this->name,
            'position' => $this->position,
            'short_bio' => $this->short_bio,
            'bio' => $this->bio,
            'photo_url' => $this->photo ?: $this->getFirstMediaUrl('team_photos'),
            'social' => [
                'linkedin' => $this->linkedin_url,
                'github' => $this->github_url,
                'twitter' => $this->twitter_url,
                'portfolio' => $this->portfolio_url,
            ],
            'expertises' => $this->expertises->map(fn($e) => [
                'name' => $e->expertise_name,
                'level' => $e->proficiency_level,
            ]),
        ];
    }
}
