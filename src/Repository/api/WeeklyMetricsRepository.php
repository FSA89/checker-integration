<?php
declare(strict_types=1);

namespace App\Repository\api;

use App\DTO\ParamsDTO;
use App\Repository\DefaultRepository;

class WeeklyMetricsRepository extends DefaultRepository
{
    /**
     * Получение позиций копии категорий с условиями.
     */
    final public function findByParams(ParamsDTO $dto): array
    {
        $sql = "SELECT *
FROM vw_weekly_metrics_by_integration
WHERE integration_date BETWEEN :start_date AND :end_date
AND (:user_name IS NULL OR user_name = :user_name)
AND (:department IS NULL OR department = :department)
AND (:tag_value IS NULL OR tag_value = :tag_value OR tag_value IS NULL) ";

        $params = [
            'user_name' => $dto->getUser(),
            'department' => $dto->getDepartment(),
            'tag_value' => $dto->getTagvalue(),
            'start_date' => ($dto->getStartDate())->format('Y-m-d'),
            'end_date' => ($dto->getEndDate())->format('Y-m-d')
        ];
        $data = $this->executeQuery($sql, $params);
        return ['status' => 'success', 'data' => $data];
    }
}
