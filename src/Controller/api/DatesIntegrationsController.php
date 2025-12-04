<?php
declare(strict_types=1);

namespace App\Controller\api;

use App\Repository\api\DatesIntegrationsRepository;
use OpenApi\Attributes as OA;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/datesintegrations', name: 'api_datesintegrations_')]
class DatesIntegrationsController extends AbstractController
{

    #[Route('', methods: ['GET'])]
    #[OA\Get(summary: "Получить дату из хз откуда", tags: ["Dates"])]
    #[OA\Parameter(name: "query",
        description: 'Фильтр в формате JSON (пример: {"date":"2025-05-18","domainId":123456})', in: "query", required: true, schema: new OA\Schema(type: "string"))]
    #[OA\Response(response: 200, description: "Дата найдена", content: new OA\JsonContent(
        type: 'array',
        items: new OA\Items(
            properties: [new OA\Property(property: 'date', type: 'date'),
                        new OA\Property(property: 'title', type: 'date'),


               ]
        )))]
    #[OA\Response(response: 404, description: "Дата не найдена")]
    final public function index(DatesIntegrationsRepository $repository, Request $request): JsonResponse
    {
        $query = $request->get('query');
        $data = json_decode($query, true);
        if (is_null($data)) {return $this->json(['status' => 'error','message'=>'uncorrected json'],400);}
        $date = new \DateTime($data['date']);
        $domainId = $data['domainId'];
        $answer = $repository->findByDate($date,$domainId);
        return $this->json($answer);
    }


}