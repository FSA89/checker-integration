<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity]
#[ORM\Table(name: "semantic_documents")]
class SemanticDocument
{
    #[ORM\Id]
    #[ORM\Column(type: "date")]
    #[Groups(['semantic_documents:read'])]
    private \DateTimeInterface $date;

    #[ORM\Id]
    #[ORM\Column(type: "integer")]
    #[Groups(['semantic_documents:read'])]
    private int $projectId;

    #[ORM\Id]
    #[ORM\Column(type: "integer")]
    #[Groups(['semantic_documents:read'])]
    private int $domainId;

    #[ORM\Id]
    #[ORM\Column(type: "integer")]
    #[Groups(['semantic_documents:read'])]
    private int $seId;

    #[ORM\Id]
    #[ORM\Column(type: "integer")]
    #[Groups(['semantic_documents:read'])]
    private int $documentId;

    #[ORM\Column(type: "float", nullable: true)]
    #[Groups(['semantic_documents:read', 'semantic_documents:write'])]
    private ?float $positionAvg;

    #[ORM\Column(type: "integer", nullable: true)]
    #[Groups(['semantic_documents:read', 'semantic_documents:write'])]
    private ?int $hq;

    #[ORM\Column(type: "integer", nullable: true)]
    #[Groups(['semantic_documents:read', 'semantic_documents:write'])]
    private ?int $lq;

    #[ORM\Column(type: "integer", nullable: true)]
    #[Groups(['semantic_documents:read', 'semantic_documents:write'])]
    private ?int $mq;

    #[ORM\Column(type: "integer", nullable: true)]
    #[Groups(['semantic_documents:read', 'semantic_documents:write'])]
    private ?int $queriesCount;

    #[ORM\Column(type: "integer", nullable: true)]
    #[Groups(['semantic_documents:read', 'semantic_documents:write'])]
    private ?int $hqTop10;

    #[ORM\Column(type: "integer", nullable: true)]
    #[Groups(['semantic_documents:read', 'semantic_documents:write'])]
    private ?int $lqTop10;

    #[ORM\Column(type: "integer", nullable: true)]
    #[Groups(['semantic_documents:read', 'semantic_documents:write'])]
    private ?int $mqTop10;

    #[ORM\Column(type: "integer", nullable: true)]
    #[Groups(['semantic_documents:read', 'semantic_documents:write'])]
    private ?int $notMatch;

    #[ORM\Column(type: "float", nullable: true)]
    #[Groups(['semantic_documents:read', 'semantic_documents:write'])]
    private ?float $pTraf;

    #[ORM\Column(type: "integer", nullable: true)]
    #[Groups(['semantic_documents:read', 'semantic_documents:write'])]
    private ?int $top10;

    #[ORM\Column(type: "integer", nullable: true)]
    #[Groups(['semantic_documents:read', 'semantic_documents:write'])]
    private ?int $top100;

    #[ORM\Column(type: "integer", nullable: true)]
    #[Groups(['semantic_documents:read', 'semantic_documents:write'])]
    private ?int $top3;

    #[ORM\Column(type: "integer", nullable: true)]
    #[Groups(['semantic_documents:read', 'semantic_documents:write'])]
    private ?int $top30;

    #[ORM\Column(type: "integer", nullable: true)]
    #[Groups(['semantic_documents:read', 'semantic_documents:write'])]
    private ?int $top5;

    #[ORM\Column(type: "integer", nullable: true)]
    #[Groups(['semantic_documents:read', 'semantic_documents:write'])]
    private ?int $ws1;

    #[ORM\Column(type: "integer", nullable: true)]
    #[Groups(['semantic_documents:read', 'semantic_documents:write'])]
    private ?int $ws2;

    #[ORM\Column(type: "integer", nullable: true)]
    #[Groups(['semantic_documents:read', 'semantic_documents:write'])]
    private ?int $notInSearch;

    #[ORM\Column(type: "integer", nullable: true)]
    #[Groups(['semantic_documents:read', 'semantic_documents:write'])]
    private ?int $inSearch;

    #[ORM\Column(type: "integer", nullable: true)]
    #[Groups(['semantic_documents:read', 'semantic_documents:write'])]
    private ?int $visits;

    // getters and setters...
}
