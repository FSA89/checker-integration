<?php
declare(strict_types=1);

namespace App\Repository\api;

use App\DTO\ParamsDTO;
use App\Repository\DefaultRepository;

class TagsRepository extends DefaultRepository
{


    final public function findByParamsDTO(ParamsDTO $dto): array
    {
        $sql = "SELECT rdap.domain_id, t.tag_value
FROM seowork.integrations_counts ic 
JOIN antteam_v2.tags t ON ic.id_tag = t.id_tag
JOIN seowork.projects p ON ic.ws_project_id = p.ws_project_id
JOIN seowork.relation_domains_and_projects rdap ON rdap.project_id = p.project_id
WHERE rdap.domain_id = :domainId
GROUP BY rdap.domain_id, ic.id_tag
";
        $parameters = [
            'domainId'=>$dto->getDomainId(),
        ];

        $data = $this->executeQuery($sql,$parameters);
        return ['status' => 'success', 'data' => $data,'code'=>'200'];
    }


}