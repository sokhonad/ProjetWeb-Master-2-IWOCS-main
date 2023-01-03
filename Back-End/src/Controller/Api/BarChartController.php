<?php

namespace App\Controller\Api;

use App\Entity\LandValue;
use App\Repository\LandValueRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Routing\Annotation\Route;

class BarChartController extends AbstractController
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
        $startParam = $this->request->query->get('start');
        $endParam = $this->request->query->get('end');
        $groupParam = $this->request->query->get('group');

        return $this->landValueRepository->barChart($startParam, $endParam, $groupParam);
    }
}