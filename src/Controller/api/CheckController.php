<?php
declare(strict_types=1);

namespace App\Controller\api;

use App\Repository\api\DatesRepository;
use OpenApi\Attributes as OA;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/check', name: 'api_check_')]
class CheckController extends BaseController
{

    #[Route('', methods: ['GET'])]
    #[OA\Get(summary: "Чекушка для проверки заголовков", tags: ["Auth"])]

    final public function index(DatesRepository $repository, Request $request): JsonResponse
    {
        $query[] = $request->headers->get('referer');
        $query[] = $request->headers->get('origin');
        return $this->json($query, 200);
    }


}