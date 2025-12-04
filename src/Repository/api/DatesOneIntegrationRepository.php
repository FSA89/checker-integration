<?php
declare(strict_types=1);

namespace App\Repository\api;

use App\DTO\ParamsDTO;
use App\Repository\DefaultRepository;

class DatesOneIntegrationRepository extends DefaultRepository
{
    final public function findByParamsDTO(ParamsDTO $dto): array
    {
        $sql = "SELECT DISTINCT(sp.date), GROUP_CONCAT(DISTINCT ic.title) as titles, 
IF(COUNT(DISTINCT ic.task_id) = 0, NULL, COUNT(DISTINCT ic.task_id)) as cnt_integrations
FROM semantic_projects sp
JOIN projects p ON sp.project_id = p.project_id 
LEFT JOIN integrations_counts ic ON ic.next_sunday = sp.date AND ic.ws_project_id = p.ws_project_id
AND ic.task_id = :taskId
WHERE (sp.date BETWEEN DATE_SUB(:date, INTERVAL 45 DAY) AND CURDATE())
AND sp.domain_id = :domainId
GROUP BY sp.date";
        $parameters = [
            'date' => $dto->getDate()->format('Y-m-d'),
            'domainId' => $dto->getDomainId(),
            'taskId' => $dto->getTaskId()
        ];
        $data = $this->executeQuery($sql, $parameters);
        return ['status' => 'success', 'data' => $data,'code'=>'200'];
    }


}