<?php
declare(strict_types=1);

namespace App\Repository\api;

use App\Repository\DefaultRepository;

class DatesIntegrationsRepository extends DefaultRepository
{

    final public function findByDate(\DateTimeInterface $integrationDate, int $domain): array
    {
        $date = $integrationDate->format('Y-m-d');
        $sql = "SELECT DISTINCT(sp.date), GROUP_CONCAT(DISTINCT ic.title) as titles, 
IF(COUNT(DISTINCT ic.task_id) = 0, NULL, 1) as cnt_integrations
FROM semantic_projects sp
JOIN projects p ON sp.project_id = p.project_id 
LEFT JOIN integrations_counts ic ON ic.next_sunday = sp.date AND ic.ws_project_id = p.ws_project_id 
WHERE (sp.date BETWEEN DATE_SUB(:date, INTERVAL 45 DAY) AND CURDATE())
AND sp.domain_id = :domainId
GROUP BY sp.date";
        $parameters = [
            'date' => $date,
            'domainId' => $domain
        ];
        $data = $this->executeQuery($sql, $parameters);
        return ['status' => 'success', 'data' => $data,'code'=>'200'];
    }


}