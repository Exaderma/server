<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="link")
 */
class LinkUserTableEntity
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer", name="id")
     * @ORM\GeneratedValue
     */
    protected $id;

    /**
     * @ORM\Column(type="integer", name="patient_id")
     */
    protected $patientId;

    /**
     * @ORM\Column(type="integer", name="doctor_id")
     */
    protected $doctorId;

    public function __construct() {
    }

    public function setId($id) {
        $this->id = $id;
    }

    public function getId() {
        return $this->id;
    }

    public function setPatientId($patientId) {
        $this->patientId = $patientId;
    }

    public function getPatientId() {
        return $this->patientId;
    }

    public function setDoctorId($doctorId) {
        $this->doctorId = $doctorId;
    }

    public function getDoctorId() {
        return $this->doctorId;
    }
}
