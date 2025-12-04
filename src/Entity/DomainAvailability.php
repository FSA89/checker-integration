<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity]
#[ORM\Table(name: "domains_availability")]
class DomainAvailability
{
    #[ORM\Id]
    #[ORM\Column(type: "integer")]
    #[ORM\GeneratedValue]
    #[Groups(['domain_availability:read'])]
    private ?int $id = null;

    #[ORM\Column(type: "integer")]
    #[Groups(['domain_availability:read', 'domain_availability:write'])]
    private ?int $domainId = null;

    #[ORM\Column(type: "datetime", nullable: true)]
    #[Groups(['domain_availability:read', 'domain_availability:write'])]
    private ?\DateTimeInterface $dateTime = null;

    #[ORM\Column(type: "integer", nullable: true)]
    #[Groups(['domain_availability:read', 'domain_availability:write'])]
    private ?int $httpStatus = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(int $id): self
    {
        $this->id = $id;
        return $this;
    }

    public function getDomainId(): ?int
    {
        return $this->domainId;
    }

    public function setDomainId(int $domainId): self
    {
        $this->domainId = $domainId;
        return $this;
    }

    public function getDateTime(): ?\DateTimeInterface
    {
        return $this->dateTime;
    }

    public function setDateTime(?\DateTimeInterface $dateTime): self
    {
        $this->dateTime = $dateTime;
        return $this;
    }

    public function getHttpStatus(): ?int
    {
        return $this->httpStatus;
    }

    public function setHttpStatus(?int $httpStatus): self
    {
        $this->httpStatus = $httpStatus;
        return $this;
    }
}
