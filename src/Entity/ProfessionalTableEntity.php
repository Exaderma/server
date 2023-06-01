<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;

/**
 * @ORM\Entity
 * @ORM\Table(name="professional")
 */
class ProfessionalTableEntity implements UserInterface, PasswordAuthenticatedUserInterface
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer", name="id")
     * @ORM\GeneratedValue
     */
    protected $id;

    /**
     * @ORM\Column(type="string", length=255, name="firstName")
     */
    protected $firstName;
    
    /**
     * @ORM\Column(type="string", length=255, name="lastName")
     */
    protected $lastName;
    
    /**
     * @ORM\Column(type="string", length=255, name="email")
     */
    protected $email;

    /**
     * @ORM\Column(type="json", name="roles")
     */
    private array $roles = [];

    /**
     * @ORM\Column(type="string", length=255, name="password")
     */
    protected $password;

    /**
     * @ORM\Column(type="boolean", name="admin")
     */
    protected $admin;

    /**
     * @ORM\Column(type="datetime", name="created_at")
     */
    protected $created_at;

    public function __construct() {
    }

    public function setId($id) {
        $this->id = $id;
    }

    public function getId() {
        return $this->id;
    }

    public function setFirstName($firstName) {
        $this->firstName = $firstName;
    }

    public function getFirstName() {
        return $this->firstName;
    }

    public function setLastName($lastName) {
        $this->lastName = $lastName;
    }

    public function getLastName() {
        return $this->lastName;
    }

    public function setEmail($email) {
        $this->email = $email;
    }

    public function getEmail() {
        return $this->email;
    }

    public function setAdmin($admin) {
        $this->admin = $admin;
    }

    public function getAdmin() {
        return $this->admin;
    }

    public function setCreatedAt($created_at) {
        $this->created_at = $created_at;
    }

    public function getCreatedAt() {
        return $this->created_at;
    }

    public function getUserIdentifier(): string
    {
        return $this->email;
    }

    public function getUsername()
    {
        return $this->email;
    }

    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_PROFESSIONAL
        $roles[] = 'ROLE_PROFESSIONAL';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    public function getSalt()
    {
        // leave this method empty unless you're using a custom salt
        // hashing strategy.
    }

    public function eraseCredentials()
    {
        // if you store any temporary, sensitive data on the user, clear it here
    }
}
