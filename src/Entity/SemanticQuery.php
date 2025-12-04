<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity]
#[ORM\Table(name: "semantic_queries")]
class SemanticQuery
{
    #[ORM\Id]
    #[ORM\Column(type: "date")]
    #[Groups(['semantic_queries:read'])]
    private \DateTimeInterface $date;

    #[ORM\Id]
    #[ORM\Column(type: "integer")]
    #[Groups(['semantic_queries:read'])]
    private int $projectId;

    #[ORM\Id]
    #[ORM\Column(type: "integer")]
    #[Groups(['semantic_queries:read'])]
    private int $domainId;

    #[ORM\Id]
    #[ORM\Column(type: "integer")]
    #[Groups(['semantic_queries:read'])]
    private int $seId;

    #[ORM\Id]
    #[ORM\Column(type: "integer")]
    #[Groups(['semantic_queries:read'])]
    private int $id;

    #[ORM\Column(type: "integer", nullable: true)]
    #[Groups(['semantic_queries:read', 'semantic_queries:write'])]
    private ?int $documentId;

    #[ORM\Column(type: "text", nullable: true)]
    #[Groups(['semantic_queries:read', 'semantic_queries:write'])]
    private ?string $realDocument;

    #[ORM\Column(type: "float", nullable: true)]
    #[Groups(['semantic_queries:read', 'semantic_queries:write'])]
    private ?float $position;

    #[ORM\Column(type: "integer", nullable: true)]
    #[Groups(['semantic_queries:read', 'semantic_queries:write'])]
    private ?int $ws1;

    #[ORM\Column(type: "integer", nullable: true)]
    #[Groups(['semantic_queries:read', 'semantic_queries:write'])]
    private ?int $ws2;

    #[ORM\Column(type: "float", nullable: true)]
    #[Groups(['semantic_queries:read', 'semantic_queries:write'])]
    private ?float $pTraf;

    #[ORM\Column(type: "string", length: 50, nullable: true)]
    #[Groups(['semantic_queries:read', 'semantic_queries:write'])]
    private ?string $queryType;

    #[ORM\Column(type: "integer", nullable: true)]
    #[Groups(['semantic_queries:read', 'semantic_queries:write'])]
    private ?int $inSearchResults;

    #[ORM\Column(type: "integer", nullable: true)]
    #[Groups(['semantic_queries:read', 'semantic_queries:write'])]
    private ?int $top3;

    #[ORM\Column(type: "integer", nullable: true)]
    #[Groups(['semantic_queries:read', 'semantic_queries:write'])]
    private ?int $top5;

    #[ORM\Column(type: "integer", nullable: true)]
    #[Groups(['semantic_queries:read', 'semantic_queries:write'])]
    private ?int $top10;

    #[ORM\Column(type: "integer", nullable: true)]
    #[Groups(['semantic_queries:read', 'semantic_queries:write'])]
    private ?int $top30;

    #[ORM\Column(type: "integer", nullable: true)]
    #[Groups(['semantic_queries:read', 'semantic_queries:write'])]
    private ?int $top100;

    #[ORM\Column(type: "integer", nullable: true)]
    #[Groups(['semantic_queries:read', 'semantic_queries:write'])]
    private ?int $lqTop10;

    #[ORM\Column(type: "integer", nullable: true)]
    #[Groups(['semantic_queries:read', 'semantic_queries:write'])]
    private ?int $mqTop10;

    #[ORM\Column(type: "integer", nullable: true)]
    #[Groups(['semantic_queries:read', 'semantic_queries:write'])]
    private ?int $hqTop10;

    #[ORM\Column(type: "integer", nullable: true)]
    #[Groups(['semantic_queries:read', 'semantic_queries:write'])]
    private ?int $notMatch;

    // getters and setters...
}
