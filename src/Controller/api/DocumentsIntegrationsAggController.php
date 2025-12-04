<?php
declare(strict_types=1);
namespace App\Controller\api;

use App\DTO\ParamsDTO;
use App\Repository\api\DocumentsIntegrationsAggRepository;
use OpenApi\Attributes as OA;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/documentsintegrations', name: 'api_documentsintegrations_')]
class DocumentsIntegrationsAggController extends AbstractController
{

    #[Route('', methods: ['GET'])]
    #[OA\Get(summary: "Получить документы", tags: ["Documents"])]
    #[OA\Parameter(name: "query",
        description: 'Фильтр в формате JSON (пример: {
                "taskId":321654, 
                "nextsunday":"2023-12-19",
                "domainid:123456,
                "regionId":321654,
                "isMobile":true
        })', in: "query", required: true, schema: new OA\Schema(type: "string"))]
    #[OA\Response(response: 200, description: "Дата найдена", content: new OA\JsonContent(
        type: 'array',
        items: new OA\Items(
            properties: [new OA\Property(property: 'date', type: 'date'),
                new OA\Property(property: 'title', type: 'date'),
            ]
        )))]
    #[OA\Response(response: 404, description: "Дата не найдена")]
    final public function index(DocumentsIntegrationsAggRepository $repository, Request $request): JsonResponse
    {
        $query = $request->get('query');
        $data = json_decode($query, true);
        if (is_null($data)) {return $this->json(['status' => 'error','message'=>'uncorrected json'],400);}
        $dto = (new ParamsDTO())
            ->setDomainId($data['domainid'])//НЕ ТРОГАТЬ
            ->setTaskId($data['taskId']) //НЕ ТРОГАТЬ
            ->setNextSunday(new \DateTime($data['nextsunday']))//НЕ ТРОГАТЬ
            ->setRegionId($data['regionId'])//НЕ ТРОГАТЬ
            ->setIsMobile($data['isMobile']);//НЕ ТРОГАТЬ
        $answer = $repository->findByParamsDTO($dto);
        return $this->json($answer);
    }


}