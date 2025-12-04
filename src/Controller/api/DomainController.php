<?php
declare(strict_types=1);
namespace App\Controller\api;

use App\Repository\api\DomainRepository;
use OpenApi\Attributes as OA;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/domains', name: 'api_domains_')]
class DomainController extends AbstractController
{

    #[Route('', methods: ['GET'])]
    #[OA\Get(summary: "Получить все домены", tags: ["Domain"])]
    #[OA\Response(response: 200, description: "Домены найдены")]
    #[OA\Response(response: 404, description: "Домены не найдены")]
    final public function index(DomainRepository $domainRepository): JsonResponse
    {

        $domains = $domainRepository->findAll();
        $status = (!empty($domains)) ? 200 : 400;
        return $this->json($domains, $status);
    }



}
