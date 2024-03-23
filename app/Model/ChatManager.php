<?php

namespace App\Model;

use Exception;
use Nette;
use Nette\Database\Explorer;
use Nette\Http\Request;
use Nette\Application\UI\Form;
use Nette\Utils\DateTime;  //jedna se o tridu se statickymi metodami, tak ji nemusim vstrikovat do konstruktoru pomoci DI, dedi z PHP tridy DateTime

class ChatManager{

    public function __construct(
        private Explorer $explorer,
        private Request $request,
        public int $aktivniZprava = 0
    )
    {}

   public function zobrazVsechnyZpravy(){
   $vsechnyZpravy = $this->explorer->table('chat_narozeniny')->where('mainMessage ?', null)->order('messageId DESC')->fetchAll();
   return $vsechnyZpravy;
   }


   public function ulozZpravu(Form $form, \stdClass $dataFomulare){
        try{
            $vlozenyRadek = $this->explorer->table('chat_narozeniny')->insert([
                'name'=> $dataFomulare->jmeno,
                'message'=> $dataFomulare->zprava
            ]);
            if ($vlozenyRadek instanceof \Nette\Database\Table\ActiveRow){
                return "Zpráva byla uložena";
            }
        } catch(Nette\Database\UniqueConstraintViolationException $e){
            $form->addError('Nesprávné údaje.');
        }
    }

    
    public function ulozOdpoved(Form $form, \stdClass $dataFomulare){
        try{
            $vlozenyRadek = $this->explorer->table('chat_narozeniny')->insert([
                'name'=> $dataFomulare->jmeno,
                'message'=> $dataFomulare->zprava,
                'mainMessage'=> $dataFomulare->mainMessage
            ]);
            if ($vlozenyRadek instanceof \Nette\Database\Table\ActiveRow){
                $this->aktivniZprava = (integer)$dataFomulare->mainMessage;
                return "Zpráva byla uložena";
            }
        } catch(Nette\Database\UniqueConstraintViolationException $e){
            $form->addError('Nesprávné údaje.');
        }
    }
    
}
