<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PartieResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        // return parent::toArray($request);
        return [
            'pseudo' => $this->pseudo,
            'score' => $this->score,
            'date' => date_format($this->created_at, "d-m-Y"),
            'time' => date_format($this->created_at, "H:m"),
        ];
    }
}
