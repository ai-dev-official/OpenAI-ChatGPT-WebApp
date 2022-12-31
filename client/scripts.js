
import bot from './assets/bot.svg'
import user from './assets/user.svg'

const form = document.querySelector('#input');

function start() {
  const resMsg = document.createElement('div');
  resMsg.innerHTML = "Hi friend! How can I help you today?";
  resMsg.setAttribute("class", "left");
  document.getElementById('msg-area').appendChild(resMsg);
}


function loader(element) {
    element.textContent = ''

    loadInterval = setInterval(() => {
        // Update the text content of the loading indicator
        element.textContent += '.';

        // If the loading indicator has reached three dots, reset it
        if (element.textContent === '...') {
            element.textContent = '';
        }
    }, 300);
}

function chatStripe(isAi, value, uniqueId) {
  return (
      `
      <div class="wrapper ${isAi && 'ai'}">
          <div class="chat">
              <div class="profile">
                  <img 
                    src=${isAi ? bot : user} 
                    alt="${isAi ? 'bot' : 'user'}" 
                  />
              </div>
              <div class="message" id=${uniqueId}>${value}</div>
          </div>
      </div>
  `
  )
}


const handleSubmit =  async (e) => {
  e.preventDefault();

  const req = document.getElementById('text').value;
  if (req === undefined || req === "") {
    // For later
  } else {
  
    let res = "";

    const response = await fetch('http://localhost:5000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: req
      }),
    });
    
    const data = await response.json();
    res = JSON.stringify(data);

 

    const msgReq = document.createElement('div');
    const msgRes = document.createElement('div');

    const Con1 = document.createElement('div');
    const Con2 = document.createElement('div');

    Con1.setAttribute("class", "msgCon1");
    Con2.setAttribute("class", "msgCon2");

    msgReq.innerHTML = req;
    msgRes.innerHTML = res;

    msgReq.setAttribute("class", "right");
    msgRes.setAttribute("class", "left");

    const message = document.getElementById('msg-area');

    message.appendChild(Con1);
    message.appendChild(Con2);

    Con1.appendChild(msgReq);
    Con2.appendChild(msgRes);

    document.getElementById('text').value = "";

    function scroll() {
      const scrollMsg = document.getElementById('msg-area');
      scrollMsg.scrollTop = scrollMsg.scrollHeight;
    }
    scroll();
  }


};

const enterSend = (e)=>{
  if (e.code === "Enter"){
    handleSubmit(e);
  }
}

form.addEventListener('submit', handleSubmit)
form.addEventListener("keyup", enterSend);





