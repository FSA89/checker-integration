<?php
declare(strict_types=1);

namespace App\Repository\api;

use App\Repository\DefaultRepository;

class IntegrationRepository extends DefaultRepository
{
    final public function findByDomainId(int $domainId): array
    {
        $sql = "SELECT 
                    d.domain_id, 
                    d.domain_name, 
                    ic.title, 
                    ic.integration_date, 
                    ic.next_sunday, 
                    ic.task_id, 
                    p.status, 
                    ic.not_nan_id, 
                    ic.nan_id,
	                ic.nan_documents,
	                ic.not_nan_id/(ic.not_nan_id + ic.nan_id)*100 as progress
                FROM 
                    integrations_counts ic
                JOIN 
                    projects p ON ic.ws_project_id = p.ws_project_id 
                JOIN 
                    relation_domains_and_projects rdap ON p.project_id = rdap.project_id 
                JOIN 
                    domains d ON rdap.domain_id = d.domain_id 
                WHERE d.domain_id = :domainId
                GROUP BY ic.task_id";
        $parameters = [
            'domainId' => $domainId
        ];
        $data = $this->executeQuery($sql, $parameters);
        return ['status' => 'success', 'data' => $data, 'code' => '200'];
    }

    final public function findZero(): array
    {
        $sql = "SELECT
    ic.task_id,
    ic.integration_date,
    -- ic.next_sunday,
    ic.title,
    ic.task_url,
    ic.ws_project_id,
    -- p.project_id,
    p.name AS project_name,
    -- rdap.domain_id,
    -- ic.all_site,
    -- ic.nan_id,
    -- ic.not_nan_id,
    -- ic.nan_documents,
    ((ic.not_nan_id / NULLIF(ic.not_nan_id + ic.nan_id, 0)) * 100) AS progress,
    t.tag_value
FROM seowork.integrations_counts ic
LEFT JOIN seowork.integrations i ON ic.task_id = i.task_id
LEFT JOIN seowork.projects p ON ic.ws_project_id = p.ws_project_id
LEFT JOIN seowork.relation_domains_and_projects rdap ON p.project_id = rdap.project_id 
LEFT JOIN antteam_v2.tags t ON ic.id_tag = t.id_tag
WHERE i.task_id IS NULL
";
        $parameters = [
        ];
        $data = $this->executeQuery($sql, $parameters);
        return ['status' => 'success', 'data' => $data, 'code' => '200'];
    }

    public function findByFilterTag(\App\DTO\ParamsDTO $dto): array
    {
        $sql = "SELECT 
  d.domain_id, 
  d.domain_name, 
  ic.id_tag,
  ic.title, 
  ic.integration_date, 
  ic.next_sunday, 
  ic.task_id, 
  p.status, 
  ic.not_nan_id, 
  ic.nan_id,
	ic.nan_documents,
	ic.not_nan_id/(ic.not_nan_id + ic.nan_id)*100 as progress
FROM 
  integrations_counts ic
JOIN 
  projects p ON ic.ws_project_id = p.ws_project_id 
JOIN 
  relation_domains_and_projects rdap ON p.project_id = rdap.project_id 
JOIN 
  domains d ON rdap.domain_id = d.domain_id 
WHERE d.domain_id = :domainId
AND (:id_tag IS NULL OR ic.id_tag = :id_tag OR id_tag IS NULL)
GROUP BY ic.task_id

";
        $parameters = [
            'domainId'=>$dto->getDomainId(),
            'id_tag'=>$dto->getTagvalue()
        ];
        $data = $this->executeQuery($sql, $parameters);
        return ['status' => 'success', 'data' => $data, 'code' => '200'];
    }

}