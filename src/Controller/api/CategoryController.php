<?php
declare(strict_types=1);
namespace App\Controller\api;

use App\DTO\ParamsDTO;
use App\Repository\api\CategoriesRepository;
use OpenApi\Attributes as OA;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/category', name: 'api_category_')]
class CategoryController extends AbstractController
{

    #[Route('/categories', methods: ['GET'])]
    #[OA\Get(
        summary: "Получить документы",
        tags: ["Category"])]
    #[OA\Parameter(
        name: "query",
        description: 'Фильтр в формате JSON (пример: {
        "taskId":321654,
        "domainId":321654,
        "regionId":321654,
        "isMobile":321654,
        "categoryId":[10, 25, 37, 42, 59, 68, 75],
        "date":"2024-12-25"
        })',
        in: "query",
        required: true,
        schema: new OA\Schema(type: "string"))]
    #[OA\Response(
        response: 200,
        description: "Дата найдена",
        content: new OA\JsonContent(
            type: 'array',
            items: new OA\Items(
                properties: [new OA\Property(property: 'date', type: 'date'),
                    new OA\Property(property: 'title', type: 'date'),
                ]
            )))]
    #[OA\Response(response: 404, description: "Дата не найдена")]
    final public function index(CategoriesRepository $repository, Request $request): JsonResponse
    {
        $query = $request->get('query');
        $data = json_decode($query, true);
        if (is_null($data)) {return $this->json(['status' => 'error','message'=>'uncorrected json'],400);}
        $dto = (new ParamsDTO())
            ->setTaskId($data['taskId'])
            ->setDomainId($data['domainId'])
            ->setRegionId($data['regionId'])
            ->setIsMobile($data['isMobile'])
            ->setCategoryId($data['categoryId'])
            ->setDate(new \DateTime($data['date']));

        $answer = $repository->findByParamsDTO($dto);
        return $this->json($answer);
    }

    #[Route('/category-pos', methods: ['GET'])]
    #[OA\Get(
        summary: "Получить документы",
        tags: ["Category"])]
    #[OA\Parameter(
        name: "query",
        description: 'Фильтр в формате JSON (пример: {
        "domainId":321654,
        "regionId":321654,
        "isMobile":true,
        "title":"название категории",
        "date":"2024-12-25"
        })',
        in: "query",
        required: true,
        schema: new OA\Schema(type: "string"))]
    #[OA\Response(
        response: 200,
        description: "Дата найдена",
        content: new OA\JsonContent(
            type: 'array',
            items: new OA\Items(
                properties: [new OA\Property(property: 'date', type: 'date'),
                    new OA\Property(property: 'title', type: 'date'),
                ]
            )))]
    #[OA\Response(response: 404, description: "Дата не найдена")]
    public function pos(CategoriesRepository $repository, Request $request): JsonResponse
    {
        $query = $request->get('query');
        $data = json_decode($query, true);
        if (is_null($data)) {return $this->json(['status' => 'error','message'=>'uncorrected json'],400);}
        $dto = (new ParamsDTO())
           // ->setTaskId($data['taskId'])
            ->setDomainId($data['domainId'])
            ->setRegionId($data['regionId'])
            ->setIsMobile($data['isMobile'])
       //     ->setCategoryId($data['categoryId'])
            ->setDate(new \DateTime($data['date']))
            ->setTitle($data['title']);
        $answer = $repository->findByParamsDTOPos($dto);
        return $this->json($answer);
    }

    #[Route('/category-pos-copy', methods: ['GET'])]
    #[OA\Get(
        summary: "Получить документы",
        tags: ["Category"])]
    #[OA\Parameter(
        name: "query",
        description: 'Фильтр в формате JSON (пример: {
        "domainId":321654,
        "regionId":321654,
        "isMobile":true,
        "date":"2024-12-25"
        "title":"название категории",
        })',
        in: "query",
        required: true,
        schema: new OA\Schema(type: "string"))]
    #[OA\Response(
        response: 200,
        description: "Дата найдена",
        content: new OA\JsonContent(
            type: 'array',
            items: new OA\Items(
            properties: [new OA\Property(property: 'date', type: 'date'),
                new OA\Property(property: 'title', type: 'date'),
            ]
        )))]
    #[OA\Response(response: 404, description: "Дата не найдена")]
    public function posCopy(CategoriesRepository $repository, Request $request): JsonResponse
    {
        $query = $request->get('query');
        $data = json_decode($query, true);

        if (is_null($data)) {return $this->json(['status' => 'error','message'=>'uncorrected json'],400);}
        $dto = (new ParamsDTO())
           // ->setTaskId($data['taskId'])
            ->setDomainId($data['domainId'])
            ->setRegionId($data['regionId'])
            ->setIsMobile($data['isMobile'])
       //     ->setCategoryId($data['categoryId'])
            ->setDate(new \DateTime($data['date']))
            ->setTitle($data['title']);
        $answer = $repository->findByParamsDTOPosCopy($dto);
        return $this->json($answer);
    }


}