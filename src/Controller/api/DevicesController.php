<?php
declare(strict_types=1);
namespace App\Controller\api;

use App\Repository\api\DevicesRepository;
use OpenApi\Attributes as OA;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/devices', name: 'api_devices_')]
class DevicesController extends AbstractController
{

    #[Route('', methods: ['GET'])]
    #[OA\Get(summary: "Получить устройства по ID домена", tags: ["Devices"])]
    #[OA\Parameter(name: "query",
        description: 'Фильтр в формате JSON (пример: {"id":12})', in: "query", required: true, schema: new OA\Schema(type: "string"))]
    #[OA\Response(response: 200, description: "Интеграция найдена", content: new OA\JsonContent(
        type: 'array',
        items: new OA\Items(
            properties: [new OA\Property(property: 'domain_id', type: 'integer'),
                new OA\Property(property: 'device', type: 'string'),
                new OA\Property(property: 'is_mobile', type: 'boolean'),]
        )))]
    #[OA\Response(response: 404, description: "Регион не найден")]
    final public function index(DevicesRepository $repository, Request $request): JsonResponse
    {
        $query = $request->get('query');
        $data = json_decode($query, true);
        if (is_null($data)) {return $this->json(['status' => 'error','message'=>'uncorrected json'],400);}
        $answer = $repository->findByDomainId($data['id']);
        return $this->json($answer);
    }


}