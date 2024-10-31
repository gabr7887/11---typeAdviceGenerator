interface advice{
  slip: {
    id: number,
    advice: string,
  }
}



export default class apiLogic{
  text;
  id;
  button;
  constructor(){
    this.text = document.querySelector('p');
    this.id = document.getElementById('adviceId');
    this.button = document.getElementById('generateButton');

    this.buttonAction = this.buttonAction.bind(this);
    
  }

   async apiRequest() {
    try{
      const response = await fetch('https://api.adviceslip.com/advice');
      const data: advice = await response.json();
      if(this.button instanceof HTMLButtonElement)
        this.button.disabled = false
      return data;
    } catch(e) {
      console.log(e);
    }
  }
  
  async buttonAction() {

    if(!(this.text instanceof HTMLParagraphElement) || !(this.id instanceof HTMLSpanElement) || !(this.button instanceof HTMLButtonElement)) return null
    this.button.disabled = true;
    const data = await this.apiRequest();
    if(!data) return null
    this.id.innerText = `#${data.slip.id}`;
    this.text.innerText = `"${data.slip.advice}"`;

  }


  
  async init() {
    if(!(this.text instanceof HTMLParagraphElement) || !(this.id instanceof HTMLSpanElement) || !(this.button instanceof HTMLButtonElement)) return null
    const data = await this.apiRequest();
    if(!data) return null
    this.id.innerText = `#${data.slip.id}`;
    this.text.innerText = `"${data.slip.advice}"`;
    this.button?.addEventListener('click', this.buttonAction);
  }


}




