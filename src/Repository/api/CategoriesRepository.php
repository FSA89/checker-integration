<?php
declare(strict_types=1);

namespace App\Repository\api;

use App\DTO\ParamsDTO;
use App\Repository\DefaultRepository;

class CategoriesRepository extends DefaultRepository
{


    final public function findByParamsDTO(ParamsDTO $dto): array
    {


        $sql = "SELECT sd.date, c.title, 
AVG(sd.visits) as visits, 
AVG(sd.position_avg) as position_avg 
FROM semantic_documents sd 
JOIN search_engines se ON sd.se_id = se.se_id 
JOIN relation_queries_and_documents rqad ON rqad.project_id = sd.project_id AND rqad.document_id = sd.document_id JOIN categories c ON rqad.category_id = c.category_id 
WHERE (sd.date BETWEEN DATE_SUB(:date, INTERVAL 45 DAY) AND CURDATE()) 
AND domain_id = :domainId
AND region_id = :regionId
AND se.is_mobile = :isMobile
AND c.category_id IN (:categories)
GROUP BY sd.date, c.title 
ORDER BY sd.date";
        $parameters = [
           'taskId' => $dto->getTaskId(),
            'categories' => implode(',',$dto->getCategoryId()),
            'isMobile'=>$dto->isMobile(),
            'regionId'=>$dto->getRegionId(),
            'domainId'=>$dto->getDomainId(),
            'date'=>$dto->getDate()->format('Y-m-d')

        ];

        $data = $this->executeQuery($sql,$parameters);
        return ['status' => 'success', 'data' => $data,'code'=>'200'];
    }

    final public function findByParamsDTOPos(ParamsDTO $dto): array
    {

        $sql = "SELECT 
    agg.title,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'label', agg.date,
            'value', agg.position_avg
        )
    ) AS data
FROM (
    SELECT 
        sd.`date`, 
        c.title, 
        AVG(sd.position_avg) AS position_avg
    FROM 
        semantic_documents sd
    JOIN 
        search_engines se ON sd.se_id = se.se_id 
    JOIN 
        relation_queries_and_documents rqad ON rqad.project_id = sd.project_id AND rqad.document_id = sd.document_id 
    JOIN 
        categories c ON rqad.category_id = c.category_id 
 WHERE 
        (sd.date BETWEEN DATE_SUB(:date, INTERVAL 45 DAY) AND CURDATE())
        AND sd.domain_id = :domainId
        AND se.region_id = :regionId
        AND se.is_mobile = :isMobile
				AND c.title = :title 

    GROUP BY 
        sd.`date`, c.title
				ORDER BY sd.date
) AS agg
GROUP BY 
    agg.title
ORDER BY 
    agg.title;";
        $parameters = [
            'isMobile'=>$dto->isMobile(),
            'regionId'=>$dto->getRegionId(),
            'domainId'=>$dto->getDomainId(),
            'date'=>$dto->getDate()->format('Y-m-d'),
            'title'=>$dto->getTitle()
        ];
        $data  = $this->executeQuery($sql,$parameters);
        return ['status' => 'success', 'data' => $data,'code'=>'200'];
    }
    final public function findByParamsDTOPosCopy(ParamsDTO $dto): array
    {
        $sql = "SELECT sd.`date`, c.title, se.search_engine, AVG(sd.position_avg) AS position_avg, AVG(sd.visits) as visits
FROM semantic_documents sd
JOIN search_engines se ON sd.se_id = se.se_id 
JOIN relation_queries_and_documents rqad ON rqad.project_id = sd.project_id AND rqad.document_id = sd.document_id 
JOIN categories c ON rqad.category_id = c.category_id 
WHERE (sd.date BETWEEN DATE_SUB(:date, INTERVAL 45 DAY) AND CURDATE())
AND sd.domain_id = :domainId
AND se.region_id = :regionId
AND se.is_mobile = :isMobile
AND c.title = :title
GROUP BY sd.`date`, c.title, se.search_engine
ORDER BY sd.date";
        $parameters = [
            'isMobile'=>$dto->isMobile(),
            'regionId'=>$dto->getRegionId(),
            'domainId'=>$dto->getDomainId(),
            'date'=>$dto->getDate()->format('Y-m-d'),
            'title'=>$dto->getTitle()

        ];
        $data = $this->executeQuery($sql,$parameters);
        return ['status' => 'success', 'data' => $data,'code'=>200];
    }

}