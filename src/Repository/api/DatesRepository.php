<?php
declare(strict_types=1);

namespace App\Repository\api;

use App\Repository\DefaultRepository;

class DatesRepository extends DefaultRepository
{
    final public function findByDate(\DateTimeInterface $date): array
    {
        $date = $date->format('Y-m-d');
        $sql = "SELECT DISTINCT(sp.date)
                FROM semantic_projects sp
                WHERE (sp.date BETWEEN DATE_SUB(:date, INTERVAL 45 DAY) AND CURDATE())
                GROUP BY sp.date";
        $parameters = [
            'date' => $date
        ];
        $data = $this->executeQuery($sql, $parameters);
        return ['status' => 'success', 'data' => $data,'code'=>'200'];
    }


}