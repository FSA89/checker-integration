<?php
declare(strict_types=1);

namespace App\Controller\api;


use App\DTO\ParamsDTO;
use App\Repository\api\WeeklyMetricsRepository;
use OpenApi\Attributes as OA;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/v1/weeklymetrics', name: 'api_weekly_metrics_')]
class WeeklyMetricsController extends AbstractController
{
    #[Route('', methods: ['GET'])]
    #[OA\Get(summary: "Получить метрику", tags: ["Недельные метрики"])]
    #[OA\Parameter(name: "query",
        description: 'Фильтр в формате JSON (пример: {
                "username":"user", 
                "department":"department",
                "tagvalue":"tagvalue",
                "startdate":"2015-04-14",
                "enddate":"2015-04-14"
        })', in: "query", required: true, schema: new OA\Schema(type: "string"))]
    #[OA\Response(response: 200, description: "Домены найдены")]
    #[OA\Response(response: 404, description: "Домены не найдены")]
    final public function index(WeeklyMetricsRepository $repository, Request $request): JsonResponse
    {
        $return = ['data' => 'empty query'];
        $status = 400;
        $query = $request->get('query');
        if (!is_null($query)) {
            $data = json_decode($query, true);
            if (is_null($data)) {
                return $this->json(['status' => 'error', 'message' => 'uncorrected json'], 400);
            } else {
                $dto = new ParamsDTO();
                $dto->setStartDate(new \DateTime($data['startdate']))
                    ->setEndDate(new \DateTime($data['enddate']));
                if (array_key_exists('username',$data) && !is_null($data['username']))
                    $dto->setUser($data['username']);
                if (array_key_exists('department',$data) &&!is_null($data['department']))
                    $dto->setDepartment($data['department']);
                if (array_key_exists('tagvalue',$data) &&!is_null($data['tagvalue']))
                    $dto->setTagvalue($data['tagvalue']);
                // var_dump($dto);die();
                $return = $repository->findByParams($dto);
            }
            $status = (!empty($return)) ? 200 : 400;
        }
        return $this->json($return, $status);
    }


}
