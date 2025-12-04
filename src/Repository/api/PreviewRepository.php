<?php
declare(strict_types=1);

namespace App\Repository\api;

use App\Repository\DefaultRepository;

class PreviewRepository extends DefaultRepository
{
    /**
     * Получение позиций копии категорий с условиями.
     */
    final public function findAll(): array
    {
        $sql = "WITH integration_data AS (
  SELECT 
    ic.task_id, 
    ic.integration_date, 
    ic.next_sunday,
    ic.title,
    ic.task_url,
    ic.all_site,
    ic.nan_documents,
    ic.nan_id,
    ic.not_nan_id,
    ic.not_nan_id / (ic.not_nan_id + ic.nan_id) * 100 AS progress,
    t.tag_value
  FROM seowork.integrations_counts ic
  LEFT JOIN antteam_v2.tags t ON ic.id_tag = t.id_tag
),
document_data AS (
  SELECT 
    sd.date,
    sd.se_id,
    sd.position_avg,
    sd.visits,
    i.task_id,
    ic.integration_date
  FROM seowork.semantic_documents sd
  JOIN seowork.integrations i ON sd.document_id = i.document_id
  JOIN seowork.integrations_counts ic ON i.task_id = ic.task_id
  WHERE sd.date BETWEEN DATE_SUB(ic.integration_date, INTERVAL 6 WEEK)
                    AND DATE_ADD(ic.integration_date, INTERVAL 6 WEEK)
),
aggregated_weekly_metrics AS (
  SELECT 
    task_id,
    se_id,
    date,
    AVG(position_avg) AS avg_position,
    AVG(visits) AS avg_visits
  FROM document_data
  GROUP BY task_id, se_id, date
)
SELECT 
  id.task_id,
  id.integration_date,
  id.next_sunday,
  id.title,
  id.task_url,
  id.all_site,
  id.nan_documents,
  id.nan_id,
  id.not_nan_id,
  id.progress,
  id.tag_value,
  awm.date,
  awm.se_id,
  se.search_engine,
  se.region_name,
  se.is_mobile,
  awm.avg_position,
  awm.avg_visits
FROM aggregated_weekly_metrics awm
JOIN integration_data id ON awm.task_id = id.task_id
LEFT JOIN search_engines se ON awm.se_id = se.se_id
ORDER BY id.task_id, awm.se_id, awm.date
";
        $data = $this->executeQuery($sql);
        return ['status' => 'success', 'data' => $data];
    }
}
