<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\Api\V1\TeamResource;
use App\Models\Team;
use Illuminate\Http\JsonResponse;

class TeamController extends ApiController
{
    public function index(): JsonResponse
    {
        $limit = request('limit');

        $query = Team::where('is_active', true)
            ->with('expertises')
            ->orderBy('display_order');

        if ($limit) {
            $team = $query->limit($limit)->get();
        } else {
            $team = $query->get();
        }

        return $this->success(TeamResource::collection($team));
    }

    public function show(Team $team): JsonResponse
    {
        if (!$team->is_active) {
            return $this->error('Team member not found', 404);
        }

        $team->load('expertises');

        return $this->success(new TeamResource($team));
    }
}
