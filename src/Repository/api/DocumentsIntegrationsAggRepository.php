<?php
declare(strict_types=1);

namespace App\Repository\api;

use App\DTO\ParamsDTO;
use App\Repository\DefaultRepository;

class DocumentsIntegrationsAggRepository extends DefaultRepository
{
    final public function findByParamsDTO(ParamsDTO $dto): array
    {
        $sql = "SELECT  sd.`date`, 
                        se.se_id, 
                        se.search_engine, 
                        se.region_id,
                        GROUP_CONCAT(DISTINCT ic.title) as titles, 
                        GROUP_CONCAT(DISTINCT sd.document_id) as doc_ids, 
                        COUNT(DISTINCT ic.task_id) as cnt_int,
                        IF(se.is_mobile = 0, 'ПК', 'Смартфоны') as device,
                        IF(i.task_id = :taskId, 1, NULL) as integrated_group, AVG(sd.visits) as visits, AVG(sd.position_avg) as position_avg
                        FROM 
                            semantic_documents sd
                        JOIN 
                                documents d ON sd.document_id = d.document_id 
                        JOIN 
                                search_engines se ON sd.se_id = se.se_id 
                        JOIN 
                                projects p ON sd.project_id = p.project_id 
                        LEFT JOIN 
                                integrations i ON i.document_id = sd.document_id AND i.task_id = :taskId
                        LEFT JOIN 
                                integrations_counts ic ON ic.next_sunday = sd.date AND p.ws_project_id = ic.ws_project_id 
                        WHERE 
                            (sd.date BETWEEN DATE_SUB(:date, INTERVAL 45 DAY) AND CURDATE())
                        AND 
                            domain_id = :domainId
                        AND 
                            region_id = :regionId
                        AND 
                            se.is_mobile = :isMobile
                        GROUP BY sd.`date`, se.se_id, integrated_group
                        ORDER BY sd.`date`";
            $parameters = [
            'isMobile' => $dto->isMobile(),
            'regionId' => $dto->getRegionId(),
            'domainId' => $dto->getDomainId(),
            'taskId' => $dto->getTaskId(),
            'date' => $dto->getNextSunday()->format('Y-m-d'),
        ];
        $data = $this->executeQuery($sql, $parameters);
        return ['status' => 'success', 'data' => $data, 'code' => '200'];
    }


}