<?php

namespace App\Command;

use App\Entity\LandValue;
use App\Repository\LandValueRepository;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use PDO;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\HttpKernel\KernelInterface;

#[AsCommand(
    name: 'app:landValue:populate',
    description: 'Add a short description for your command',
)]
class LandValuePopulateCommand extends Command
{

    private KernelInterface $kernel;

    public function __construct(KernelInterface $kernel)
    {
        parent::__construct();
        $this->kernel = $kernel;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $filename = $this->kernel->getProjectDir() . '/data/data.sql';
        $current = "truncate land_value; \n";
        file_put_contents($filename, $current);
        $cpt = 0;


        for($year = 2017; $year <= 2022; $year++){
            echo "loading data from the year $year to the base\n";

            $file = fopen($this->kernel->getProjectDir() . "/data/valeursfoncieres-$year.txt", 'r');

            // Parse file to create object

            $firstLine = true;
            if ($file) {
                $data = [];
                while (($line = fgets($file)) !== false) {
                    if (!$firstLine) {
                        $obj = explode("|",$line);

                        $date = DateTime::createFromFormat('d/m/Y', $obj[8]);
                        $amount = $obj[10];
                        $region = $obj[18];
                        $type = $obj[35];
                        $area = trim(preg_replace('/\s\s+/', ' ', $obj[42]));;
                        if ($type === '') {
                            $type = '0';
                        }
                        if ($area === '' || $area === ' ' || $area === null) {
                            $area = 'null';
                        }
                        if ($amount === '' || $amount === ' ' || $amount === null) {
                            $amount = '0';
                        }
                        $amount = str_replace(",", ".", $amount);
                        $timestamp = $date->getTimestamp();

                        if (isset($data[$timestamp][$region][$type])) {
                            $data[$timestamp][$region][$type]['amount'] += (float) $amount;
                            $data[$timestamp][$region][$type]['area'] += (float) $area;
                        } else {
                            $data[$timestamp][$region][$type]['amount'] = (float) $amount;
                            $data[$timestamp][$region][$type]['area'] = (float) $area;
                        }


                    }
                    $firstLine = false;
                }
                $cpt = self::writeDataInFile($filename, $data, $cpt);
            } else {
                echo 'error';
            }

        }
        return Command::SUCCESS;
    }

    private function writeDataInFile(string $filename, array $data, int $cpt): int {
        $first = true;
        $current = "INSERT INTO land_value (id, region, date, area, amount, type) VALUES \n";
        file_put_contents($filename, $current, FILE_APPEND);
        $current = "";

        foreach($data as $date => $sData) {
            foreach($sData as $region => $ssData) {
                foreach($ssData as $type => $sssData) {

                    $test = new DateTime();
                    $test->setTimestamp($date);

                    if (!$first)
                        $current .= ",";

                    $current .= "(".$cpt.", '".$region."', '".$test->format("Y-m-d")."', ".$sssData['area'].", ".$sssData['amount'].",".$type.") \n";

                    if ($cpt % 10 === 0) {
                        file_put_contents($filename, $current, FILE_APPEND);
                        $current = "";
                    }
                    $cpt++;
                    $first = false;
                }
            }
        }
        $current .= ";";
        file_put_contents($filename, $current, FILE_APPEND);
        return $cpt;
    }
}
