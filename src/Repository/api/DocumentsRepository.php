<?php
declare(strict_types=1);

namespace App\Repository\api;

use App\DTO\ParamsDTO;
use App\Repository\DefaultRepository;

class DocumentsRepository extends DefaultRepository
{
    final public function findByParamsDTO(ParamsDTO $dto): array
    {
        $sql = "SELECT 
                    rqad.project_id, 
                    rdap.domain_id, 
	                c.category_id,
                    c.title, 
                    COUNT(DISTINCT rqad.document_id) as cnt_docs,
                    (SELECT COUNT(DISTINCT rqad2.document_id) FROM relation_queries_and_documents rqad2 WHERE rqad2.project_id = rqad.project_id AND rqad2.category_id = rqad.category_id) as total_document_id
                FROM 
                    relation_queries_and_documents rqad
                JOIN 
                    relation_domains_and_projects rdap ON rdap.project_id = rqad.project_id 
                JOIN 
                    documents d ON rqad.document_id = d.document_id 
                JOIN 
                    categories c ON rqad.category_id = c.category_id 
                JOIN 
                    integrations i ON rqad.document_id = i.document_id AND i.task_id = :taskId
                WHERE 
                    rdap.domain_id = :domainId
                GROUP BY 
                    rqad.project_id, rdap.domain_id, c.category_id";
        $parameters = [

            'domainId' => $dto->getDomainId(),
            'taskId' => $dto->getTaskId()
        ];
        $data = $this->executeQuery($sql, $parameters);
        return ['status' => 'success', 'data' => $data, 'code' => '200'];
    }


}