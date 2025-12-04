<?php
declare(strict_types=1);

namespace App\Controller\api;

use App\DTO\ParamsDTO;
use App\Repository\api\TagsRepository;
use OpenApi\Attributes as OA;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/tags', name: 'api_category_')]
class TagsController extends AbstractController
{

    #[Route('/list', methods: ['GET'])]
    #[OA\Get(
        summary: "Получить список тегов",
        tags: ["Тэги"])]
    #[OA\Parameter(
        name: "query",
        description: 'Фильтр в формате JSON (пример: {
        "domainId":70476761
        })',
        in: "query",
        required: true,
        schema: new OA\Schema(type: "string"))]
    #[OA\Response(response: 404, description: "Тэги не найдены")]
    final public function index(TagsRepository $repository, Request $request): JsonResponse
    {
        $query = $request->get('query');
        $data = json_decode($query, true);
        if (is_null($data)) {
            return $this->json(['status' => 'error', 'message' => 'uncorrected json'], 400);
        }
        $dto = (new ParamsDTO())
            ->setDomainId($data['domainId']);
        $answer = $repository->findByParamsDTO($dto);
        return $this->json($answer);
    }


}