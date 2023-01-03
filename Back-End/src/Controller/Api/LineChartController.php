<?php

namespace App\Controller\Api;

use App\Entity\LandValue;
use App\Repository\LandValueRepository;
use DateTime;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Routing\Annotation\Route;

class LineChartController extends AbstractController
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
        $typeParam = $this->request->query->get('type');
        $rawResponse = $this->landValueRepository->lineChart($typeParam);

        $returned = [];
        $format = 'Y-m-d';
        foreach($rawResponse as $it){
            $date = DateTime::createFromFormat($format, $it['year'].'-'.$it['month'].'-1'); // First to avoid 30/02 => 01/03
            $toAdd['price'] = $it['price'];
            $toAdd['date'] = $date;
            $returned[] = $toAdd;
        }

        return $returned;
    }
}