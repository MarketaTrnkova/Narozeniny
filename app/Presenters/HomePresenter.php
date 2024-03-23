<?php

declare(strict_types=1);

namespace App\Presenters;

use Nette;
use Nette\Http\Request;
use App\Model\ChatManager;


final class HomePresenter extends Nette\Application\UI\Presenter
{

    public function __construct(
        private ChatManager $chatManager,
        private Request $request
    ){}

    public function beforeRender()
    {
        if (!isset($this->template->aktualniStranka)) {
            $this->template->aktualniStranka = 'seznam-narozenin';
        }
    }

   public function renderSeznamNarozenin(){
    $this->template->aktualniStranka = 'seznam-narozenin';
   }

   public function renderPridatNarozeniny(){
    $this->template->aktualniStranka = 'pridat-narozeniny';
   }

   public function renderUpravitNarozeniny(){
    $this->template->aktualniStranka = 'upravit-narozeniny';
    $this->template->getParametry = $this->request->getQuery();
   }

   public function renderSmazatNarozeniny(){
    $this->template->aktualniStranka = 'smazat-narozeniny';
   }

    public function renderchat(){
        $this->template->vsechnyZpravy = $this->chatManager->zobrazVsechnyZpravy();
        $this->template->aktualniStranka = 'chat';
        //pokud je stranka generovana po tom, co byla odeslana odpoved na zpravu, odesilam id zpravy na kterou bylo odpovidano
        if ($this->request->getMethod()== "POST" &&$this->chatManager->aktivniZprava > 0){
            $this->template->aktivniZprava = $this->chatManager->aktivniZprava;
        }
    
    }


    public function createComponentOdeslatZpravu(): Nette\Application\UI\Form{
        $form = new Nette\Application\UI\Form;

        $form->addText('jmeno', 'Jméno')
             ->setRequired('Prosím, zadejte své jméno.');
    
        $form->addTextArea('zprava', 'Vaše zpráva')
             ->setRequired('Prosím, zadejte svou zprávu.');
    
        $form->addSubmit('odeslatZpravu', 'Odeslat zprávu');
        $form->onSuccess[] = $this->chatManager->ulozZpravu(...);
        return $form;

    }

    public function createComponentOdeslatOdpoved(){
        $form = new Nette\Application\UI\Form;

        $form->addText('jmeno', 'Jméno')
             ->setRequired('Prosím, zadejte své jméno.');
    
        $form->addTextArea('zprava', 'Vaše odpověď')
             ->setRequired('Prosím, zadejte vaši odpověď.');
    
        $form->addHidden('mainMessage')->setDefaultValue(1);
        $form->addSubmit('odeslatOdpoved', 'Odeslat odpověď');
        $form->onSuccess[] = $this->chatManager->ulozOdpoved(...);
        return $form;
    }
    

}
