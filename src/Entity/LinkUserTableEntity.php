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
    protected $patient_id;

    /**
     * @ORM\Column(type="integer", name="doctor_id")
     */
    protected $doctor_id;

    public function __construct() {
    }

    public function setId($id) {
        $this->id = $id;
    }

    public function getId() {
        return $this->id;
    }

    public function setPatientId($patientId) {
        $this->patient_id = $patientId;
    }

    public function getPatientId() {
        return $this->patient_id;
    }

    public function setDoctorId($doctorId) {
        $this->doctor_id = $doctorId;
    }

    public function getDoctorId() {
        return $this->doctor_id;
    }
}
