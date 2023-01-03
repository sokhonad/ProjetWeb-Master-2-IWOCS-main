<?php

use ApiPlatform\Core\Bridge\Symfony\Bundle\Test\ApiTestCase;



class ApiTest extends ApiTestCase
{


    public function testLineChart()
    {
        $client = static::createClient();

        $client->request('GET', 'land/linechart');

        $this->assertEquals(200, $client->getResponse()->getStatusCode());
    }

    public function testDonutChart()
    {
        $client = static::createClient();

        $client->request('GET', 'land/donutchart');

        $this->assertEquals(200, $client->getResponse()->getStatusCode());
    }

    public function testBarChart()
    {
        $client = static::createClient();

        $client->request('GET', 'land/barchart');

        $this->assertEquals(200, $client->getResponse()->getStatusCode());



    }





}