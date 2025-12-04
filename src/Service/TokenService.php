<?php

// src/Security/Service/TokenService.php

declare(strict_types=1);
namespace App\Service;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Core\Exception\CustomUserMessageAuthenticationException;

class TokenService
{
    private string $secretKey;

    public function __construct()
    {
        $this->secretKey = '5ec88e31cbb3e6e8897311f1e9bd78fe973b757a449035c078159d11e292610e'; // секретный ключ, который должен быть в .env
    }

    public function validateToken(Request $request): string
    {
        // Извлекаем токен из заголовка Authorization
        $authorizationHeader = $request->headers->get('Authorization');

        if (!$authorizationHeader) {
            throw new CustomUserMessageAuthenticationException('Authorization header is missing');
        }

        // Извлекаем токен из заголовка (например, "Bearer <token>")
        if (preg_match('/^Bearer\s+(.+)$/', $authorizationHeader, $matches)) {
            $token = $matches[1];
        } else {
            throw new CustomUserMessageAuthenticationException('Invalid Authorization header');
        }

        // Разбираем токен на составляющие: userId:timestamp:signature
        list($userId, $timestamp, $clientSignature) = explode(':', $token);

        // Генерация подписи на основе данных в токене
        $message = "{$userId}:{$timestamp}";
        $serverSignature = base64_encode(hash_hmac('sha256', $message, $this->secretKey, true));

        // Сравниваем подписи
        if (!hash_equals($serverSignature, $clientSignature)) {
            throw new CustomUserMessageAuthenticationException('Invalid token signature');
        }

        // Проверка на срок действия токена (например, токен действителен 5 минут)
        if (abs(time() - (int)$timestamp) > 300) {
            throw new CustomUserMessageAuthenticationException('Token has expired');
        }

        // Если всё прошло успешно, возвращаем данные о пользователе (например, его ID)
        return $userId;
    }
}