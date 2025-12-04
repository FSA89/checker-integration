<?php
declare(strict_types=1);

namespace App\Repository\api;

use App\DTO\ParamsDTO;
use App\Repository\DefaultRepository;

class NanDocumentsRepository extends DefaultRepository
{
    final public function findByParamsDTO(ParamsDTO $dto): array
    {
        $sql = "SELECT CONVERT(jt.url USING utf8mb4) as url, 'Не отслеживается' as status
                FROM integrations_counts
                CROSS JOIN JSON_TABLE(
                    nan_documents,
                    '$[*]' COLUMNS(
                        url VARCHAR(255) PATH '$'
                    )
                ) AS jt
                WHERE task_id = :taskid
                UNION
                SELECT CONVERT(d.document USING utf8mb4) as url, 'Отслеживается' as status
                FROM integrations i
                JOIN documents d ON i.document_id = d.document_id
                WHERE i.task_id = :taskid";
        $parameters = [
            'taskid' => $dto->getTaskId()
        ];
        $data = $this->executeQuery($sql, $parameters);
        return ['status' => 'success', 'data' => $data, 'code' => '200'];
    }
}