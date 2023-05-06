<?php

// A simple repository as defined with make:entity
namespace App\Repository;

use App\Entity\PatientTableEntity;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method PatientTableEntity|null find($id, $lockMode = null, $lockVersion = null)
 * @method PatientTableEntity|null findOneBy(array $criteria, array $orderBy = null)
 * @method PatientTableEntity[]    findAll()
 * @method PatientTableEntity[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PatientTableRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, PatientTableEntity::class);
    }
}
