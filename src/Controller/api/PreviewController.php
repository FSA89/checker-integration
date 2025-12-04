<?php
declare(strict_types=1);
namespace App\Controller\api;

use App\Repository\api\PreviewRepository;
use OpenApi\Attributes as OA;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/preview', name: 'api_preview_')]
class PreviewController extends AbstractController
{

    #[Route('', methods: ['GET'])]

    final public function index(PreviewRepository $PreviewRepository): JsonResponse
    {

        $preview = $PreviewRepository->findAll();
        $status = (!empty($preview)) ? 200 : 400;
        return $this->json($preview, $status);
    }



}
