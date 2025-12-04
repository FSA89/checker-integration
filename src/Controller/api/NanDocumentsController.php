<?php
declare(strict_types=1);

namespace App\Controller\api;

use App\DTO\ParamsDTO;
use App\Repository\api\NanDocumentsRepository;
use OpenApi\Attributes as OA;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/nandocuments', name: 'api_nandocuments_')]
class NanDocumentsController extends AbstractController
{
    #[Route('', methods: ['GET'])]
    #[OA\Get(summary: "Получить документы", tags: ["Documents"])]
    #[OA\Parameter(name: "query",
        description: 'Фильтр в формате JSON (пример: {"taskId":321654})', in: "query", required: true, schema: new OA\Schema(type: "string"))]
    #[OA\Response(response: 200, description: "Дата найдена")]
    #[OA\Response(response: 404, description: "Дата не найдена")]
    final public function index(NanDocumentsRepository $repository, Request $request): JsonResponse
    {
        $query = $request->get('query');
        $data = json_decode($query, true);
        if (is_null($data)) {return $this->json(['status' => 'error','message'=>'uncorrected json'],400);}
        $dto = (new ParamsDTO())
            ->setTaskId($data['taskId']);
        $answer = $repository->findByParamsDTO($dto);
        return $this->json($answer);
    }


}