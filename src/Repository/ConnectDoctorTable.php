<?php

// A simple repository as defined with make:entity
namespace App\Repository;

use App\Entity\DoctorTableEntity;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method DoctorTableEntity|null find($id, $lockMode = null, $lockVersion = null)
 * @method DoctorTableEntity|null findOneBy(array $criteria, array $orderBy = null)
 * @method DoctorTableEntity[]    findAll()
 * @method DoctorTableEntity[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class DoctorTableRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, DoctorTableEntity::class);
    }
}