<?php
declare(strict_types=1);

namespace App\Repository\api;

use App\Repository\DefaultRepository;

class DomainRepository extends DefaultRepository
{
    /**
     * Получение позиций копии категорий с условиями.
     */
    final public function findAll(): array
    {
        $sql = "SELECT 
                        d.domain_id, 
                        d.domain_name, 
                        p.ws_project_id  
                FROM 
                    domains d 
                JOIN 
                        relation_domains_and_projects rdap ON d.domain_id = rdap.domain_id 
                JOIN 
                        projects p ON rdap.project_id = p.project_id 
                WHERE 
                    status = 'active'
                GROUP BY d.domain_id ";
        $data = $this->executeQuery($sql);
        return ['status' => 'success', 'data' => $data];
    }
}
