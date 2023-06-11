<?php

// A simple repository as defined with make:entity
namespace App\Repository;

use App\Entity\LinkUserTableEntity;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method LinkUserTableEntity|null find($id, $lockMode = null, $lockVersion = null)
 * @method LinkUserTableEntity|null findOneBy(array $criteria, array $orderBy = null)
 * @method LinkUserTableEntity[]    findAll()
 * @method LinkUserTableEntity[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class LinkUserTableRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, LinkUserTableEntity::class);
    }
}