<?php

/**
 * @Entity @Table(name="correos")
 */
class Correo
{
    /**
     * @Id @Column(type="integer") @GeneratedValue
     * @var int
     */
    protected $id;
    
    /**
     * @Column(type="string")
     * @var string
     */
    protected $mail;
    
    /**
     * @Column(type="datetime")
     * @var DateTime
     */
    protected $fecha;
    
    public function getId(){
        return $this->id;
    }
    
    public function getMail(){
        return $this->mail;
    }
    
    public function setMail($mail){
        $this->mail = $mail;
    }
    
    public function getFecha(){
        return $this->fecha;
    }
    
    public function setFecha($fecha){
        $this->fecha = $fecha;
    }
}