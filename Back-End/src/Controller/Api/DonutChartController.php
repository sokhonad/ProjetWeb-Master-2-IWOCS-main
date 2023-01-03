<?php

namespace App\Controller\Api;

use App\Entity\LandValue;
use App\Repository\LandValueRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Routing\Annotation\Route;

class DonutChartController extends AbstractController
{
    private LandValueRepository $landValueRepository;
    private Request $request;


    public function __construct(LandValueRepository $landValueRepository, RequestStack $request)
    {
        $this->landValueRepository = $landValueRepository;
        $this->request = $request->getCurrentRequest();
    }

    public function __invoke(): array
    {
        $year = $this->request->query->get('year');

        if ($year === null) {
            $year = '2022';
        }

        return $this->landValueRepository->donutChart($year);
    }
}
