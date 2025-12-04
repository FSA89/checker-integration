<?php
// Controller/DefaultController.php
declare(strict_types=1);
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Request;
#[Route('', name: 'app_')]
final class DefaultController extends AbstractController
{
    // Главная страница Чекер
    #[Route('/', name: 'home')]
    public function home(): Response
    {
        
        if (!$this->getUser()) {
            return $this->redirectToRoute('connect_google_start');
        }

        $user = $this->getUser();

        return $this->render('home.html.twig', [
            'controller_name' => 'DefaultController',
            'user_roles' => $user ? $user->getRoles() : [],
            'user_authenticated' => (bool)$user,
        ]);
    }

    // Превью страница Чекер
    #[Route('/preview', name: 'preview')]
    public function preview(): Response
    {

        return $this->render('preview.html.twig', [
            'controller_name' => 'DefaultController',
        ]);
    }

    // Страница 2 Чекер
    #[Route('/checker', name: 'checker')]
    public function base(): Response
    {
        return $this->render('checker.html.twig', [
            'controller_name' => 'DefaultController',
        ]);
    }

    // Страница dc
    #[Route('/dc', name: 'dc')]
    public function dc(): Response
    {
        return $this->render('dc.html.twig', [
            'controller_name' => 'DefaultController',
            ]);
    }

    #[Route('/root', name: 'auch')]
    public function index(): Response
    {
        return $this->render('root/index.html.twig');
    }
}