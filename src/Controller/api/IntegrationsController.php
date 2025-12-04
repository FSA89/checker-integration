<?php
declare(strict_types=1);
namespace App\Controller\api;

use App\DTO\ParamsDTO;
use App\Repository\api\IntegrationRepository;
use OpenApi\Attributes as OA;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/integrations', name: 'api_integrations_')]
class IntegrationsController extends AbstractController
{
    #[Route('', methods: ['GET'])]
    #[OA\Get(summary: "Получить интеграцию по ID домена", tags: ["Integrations"])]
    #[OA\Parameter(name: "query",
        description: 'Фильтр в формате JSON (пример: {"id":12})', in: "query", required: true, schema: new OA\Schema(type: "string"))]

    #[OA\Response(response: 404, description: "Интеграция не найдена")]
    final public function index(IntegrationRepository $integrationRepository, Request $request): JsonResponse
    {
        $query = $request->get('query');
        $data = json_decode($query, true);
        if (is_null($data)) {return $this->json(['status' => 'error','message'=>'uncorrected json'],400);}
        $answer = $integrationRepository->findByDomainId($data['id']);
        return $this->json($answer);
    }

    #[Route('/zerocount', methods: ['GET'])]
    #[OA\Get(summary: "Получить количество неотслеживаемых интеграций", tags: ["Integrations"])]
    #[OA\Response(response: 404, description: "Нет интеграций")]
    final public function zeroCount(IntegrationRepository $integrationRepository): JsonResponse
    {
        $answer = $integrationRepository->findZero();
        return $this->json($answer);
    }


    #[Route('/tagsfilter', methods: ['GET'])]
    #[OA\Get(summary: "Запрос для списка внедрений с фильтром тега", tags: ["Integrations"])]
    #[OA\Parameter(name: "query",
        description: 'Фильтр в формате JSON (пример: {"domainId":70476761,"tagValue:"Текстовая доработка"})', in: "query", required: true, schema: new OA\Schema(type: "string"))]

    final public function tagsFilter(IntegrationRepository $integrationRepository, Request $request): JsonResponse
    {
        $query = $request->get('query');
        $data = json_decode($query, true);
        if (is_null($data)) {return $this->json(['status' => 'error','message'=>'uncorrected json'],400);}
        $dto = (new ParamsDTO())->setTagvalue($data['tagValue'])->setDomainId($data['domainId']);
        $answer = $integrationRepository->findByFilterTag($dto);
        return $this->json($answer);
    }


}