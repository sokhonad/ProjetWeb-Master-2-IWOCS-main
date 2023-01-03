<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use App\Controller\Api\DonutChartController;
use App\Controller\Api\BarChartController;
use App\Controller\Api\LineChartController;
use App\Repository\LandValueRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=LandValueRepository::class)
 */
#[ApiResource(
    collectionOperations: [
        'get_line_chart' => [
            'method' => 'GET',
            'path' => '/land/linechart',
            'controller' => LineChartController::class,
            'openapi_context' => [
                'parameters' => [[
                    'name' => 'type',
                    'in' => 'query',
                    'schema' => [
                        'type' => 'string',
                        'enum' => ['maison', 'appartement', 'dependance', 'local']
                    ]
                ]]
            ]
        ],
        'get_donut_chart' => [
            'method' => 'GET',
            'path' => '/land/donutchart',
            'controller' => DonutChartController::class,
            'openapi_context' => [
                'parameters' => [[
                    'name' => 'date',
                    'in' => 'query',
                    'schema' => [
                        'type' => 'int',
                        'enum' => [2017, 2018, 2019, 2020, 2021, 2022]
                    ]
                ]]
            ]
        ],
        'get_bar_chart' => [
            'method' => 'GET',
            'path' => '/land/barchart',
            'controller' => BarChartController::class,
            'openapi_context' => [
                'parameters' => [
                    [
                        'name' => 'group',
                        'in' => 'query',
                        'schema' => [
                            'type' => 'string',
                            'enum' => ['day', 'month', 'year']
                        ]
                    ],
                    [
                        'name' => 'start',
                        'in' => 'query',
                        'schema' => [
                            'type' => 'date',
                        ]
                    ],
                    [
                        'name' => 'end',
                        'in' => 'query',
                        'schema' => [
                            'type' => 'date',
                        ]
                    ]
                ]
            ]
        ],
    ],itemOperations: []
)]
//#[ApiFilter(SearchFilter::class, properties: ['type' => 'exact'])]
class LandValue
{

    public function __construct()
    {
        $this->type = null;
        $this->amount = null;
        $this->date = null;
        $this->area = null;
        $this->region = null;
    }

    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $region;

    /**
     * @ORM\Column(type="date", nullable=true)
     */
    private $date;

    /**
     * @ORM\Column(type="float", nullable=true)
     */
    private $area;

    /**
     * @ORM\Column(type="float", nullable=true)
     */
    private $amount;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $type;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getRegion(): ?string
    {
        return $this->region;
    }

    public function setRegion(?string $region): self
    {
        $this->region = $region;

        return $this;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): self
    {
        $this->date = $date;

        return $this;
    }

    public function getArea(): ?float
    {
        return $this->area;
    }

    public function setArea(?float $area): self
    {
        $this->area = $area;

        return $this;
    }

    public function getAmount(): ?float
    {
        return $this->amount;
    }

    public function setAmount(?float $amount): self
    {
        $this->amount = $amount;

        return $this;
    }

    public function getType(): ?int
    {
        return $this->type;
    }

    public function setType(?int $type): self
    {
        $this->type = $type;

        return $this;
    }
}
