<?php
declare(strict_types=1);

namespace App\Repository\api;

use App\Repository\DefaultRepository;

class DevicesRepository extends DefaultRepository
{
    final public function findByDomainId(int $domainId): array
    {
        $sql = "SELECT sp.domain_id, IF(se.is_mobile = 0, 'ПК', 'Смартфоны') as device, IF(se.is_mobile = 0, 0, 1) as is_mobile
                FROM semantic_projects sp 
                JOIN search_engines se ON sp.se_id = se.se_id 
                WHERE sp.domain_id = :domainId
                GROUP BY sp.domain_id, se.is_mobile";
        $parameters = [
            'domainId' => $domainId
        ];
        $data = $this->executeQuery($sql, $parameters);
        return ['status' => 'success', 'data' => $data,'code'=>'200'];
    }
}