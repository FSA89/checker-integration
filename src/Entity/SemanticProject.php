<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity]
#[ORM\Table(name: "semantic_projects")]
class SemanticProject
{
    #[ORM\Id]
    #[ORM\Column(type: "date")]
    #[Groups(['semantic_projects:read'])]
    private \DateTimeInterface $date;

    #[ORM\Id]
    #[ORM\Column(type: "integer")]
    #[Groups(['semantic_projects:read'])]
    private int $projectId;

    #[ORM\Id]
    #[ORM\Column(type: "integer")]
    #[Groups(['semantic_projects:read'])]
    private int $domainId;

    #[ORM\Id]
    #[ORM\Column(type: "integer")]
    #[Groups(['semantic_projects:read'])]
    private int $seId;

    #[ORM\Column(type: "float", nullable: true)]
    #[Groups(['semantic_projects:read', 'semantic_projects:write'])]
    private ?float $position;

    #[ORM\Column(type: "float", nullable: true)]
    #[Groups(['semantic_projects:read', 'semantic_projects:write'])]
    private ?float $hq;

    #[ORM\Column(type: "float", nullable: true)]
    #[Groups(['semantic_projects:read', 'semantic_projects:write'])]
    private ?float $lq;

    #[ORM\Column(type: "float", nullable: true)]
    #[Groups(['semantic_projects:read', 'semantic_projects:write'])]
    private ?float $mq;

    #[ORM\Column(type: "integer", nullable: true)]
    #[Groups(['semantic_projects:read', 'semantic_projects:write'])]
    private ?int $queriesCount;

    #[ORM\Column(type: "integer", nullable: true)]
    #[Groups(['semantic_projects:read', 'semantic_projects:write'])]
    private ?int $documentCount;

    #[ORM\Column(type: "integer", nullable: true)]
    #[Groups(['semantic_projects:read', 'semantic_projects:write'])]
    private ?int $hqTop10;

    #[ORM\Column(type: "integer", nullable: true)]
    #[Groups(['semantic_projects:read', 'semantic_projects:write'])]
    private ?int $lqTop10;

    #[ORM\Column(type: "integer", nullable: true)]
    #[Groups(['semantic_projects:read', 'semantic_projects:write'])]
    private ?int $mqTop10;

    #[ORM\Column(type: "integer", nullable: true)]
    #[Groups(['semantic_projects:read', 'semantic_projects:write'])]
    private ?int $notMatch;

    #[ORM\Column(type: "float", nullable: true)]
    #[Groups(['semantic_projects:read', 'semantic_projects:write'])]
    private ?float $pTraf;

    #[ORM\Column(type: "integer", nullable: true)]
    #[Groups(['semantic_projects:read', 'semantic_projects:write'])]
    private ?int $top10;

    #[ORM\Column(type: "integer", nullable: true)]
    #[Groups(['semantic_projects:read', 'semantic_projects:write'])]
    private ?int $top100;

    #[ORM\Column(type: "integer", nullable: true)]
    #[Groups(['semantic_projects:read', 'semantic_projects:write'])]
    private ?int $top3;

    #[ORM\Column(type: "integer", nullable: true)]
    #[Groups(['semantic_projects:read', 'semantic_projects:write'])]
    private ?int $top30;

    #[ORM\Column(type: "integer", nullable: true)]
    #[Groups(['semantic_projects:read', 'semantic_projects:write'])]
    private ?int $top5;

    #[ORM\Column(type: "integer", nullable: true)]
    #[Groups(['semantic_projects:read', 'semantic_projects:write'])]
    private ?int $ws1;

    #[ORM\Column(type: "integer", nullable: true)]
    #[Groups(['semantic_projects:read', 'semantic_projects:write'])]
    private ?int $ws2;

    #[ORM\Column(type: "integer", nullable: true)]
    #[Groups(['semantic_projects:read', 'semantic_projects:write'])]
    private ?int $notInSearch;

    #[ORM\Column(type: "integer", nullable: true)]
    #[Groups(['semantic_projects:read', 'semantic_projects:write'])]
    private ?int $inSearch;

    #[ORM\Column(type: "integer", nullable: true)]
    #[Groups(['semantic_projects:read', 'semantic_projects:write'])]
    private ?int $urlInSearch;

    #[ORM\Column(type: "integer", nullable: true)]
    #[Groups(['semantic_projects:read', 'semantic_projects:write'])]
    private ?int $urlNotInSearch;

    #[ORM\Column(type: "integer", nullable: true)]
    #[Groups(['semantic_projects:read', 'semantic_projects:write'])]
    private ?int $visitsDesktop;

    #[ORM\Column(type: "integer", nullable: true)]
    #[Groups(['semantic_projects:read', 'semantic_projects:write'])]
    private ?int $visitsMobile;

    #[ORM\Column(type: "integer", nullable: true)]
    #[Groups(['semantic_projects:read', 'semantic_projects:write'])]
    private ?int $wrldVisitsDesktop;

    #[ORM\Column(type: "integer", nullable: true)]
    #[Groups(['semantic_projects:read', 'semantic_projects:write'])]
    private ?int $wrldVisitsMobile;

    // getters and setters...
}
