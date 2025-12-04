<?php
declare(strict_types=1);
namespace App\Controller\api;

use App\DTO\ParamsDTO;
use App\Repository\api\DatesOneIntegrationRepository;
use OpenApi\Attributes as OA;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/datesoneintegration', name: 'api_datesoneintegration_')]
class DatesOneIntegrationController extends AbstractController
{

    #[Route('', methods: ['GET'])]
    #[OA\Get(summary: "Получить дату из хз откуда", tags: ["DatesOneIntegrations"])]
    #[OA\Parameter(name: "query",
        description: 'Фильтр в формате JSON (пример: {"date":"2025-05-18","domainId":123456,"taskId":321654})', in: "query", required: true, schema: new OA\Schema(type: "string"))]
    #[OA\Response(response: 200, description: "Дата найдена", content: new OA\JsonContent(
        type: 'array',
        items: new OA\Items(
            properties: [new OA\Property(property: 'date', type: 'date'),
                        new OA\Property(property: 'title', type: 'date'),
]
        )))]
    #[OA\Response(response: 404, description: "Дата не найдена")]
    final public function index(DatesOneIntegrationRepository $repository, Request $request): JsonResponse
    {
        $query = $request->get('query');
        $data = json_decode($query, true);
        if (is_null($data)) {return $this->json(['status' => 'error','message'=>'uncorrected json'],400);}
        $dto = (new ParamsDTO())
            ->setDate(new \DateTime($data['date']))
            ->setDomainId($data['domainId'])
            ->setTaskId($data['taskId']);
        $answer = $repository->findByParamsDTO($dto);
        return $this->json($answer);
    }


}