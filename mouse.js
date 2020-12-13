    'use strict'


    const canvas = document.getElementById('canvas');
    const para = document.querySelector('p');
    const ctx = canvas.getContext('2d');
    const textarea = document.getElementById('code');
    const reset = document.getElementById('reset');
    const edit = document.getElementById('edit');
    const start = document.querySelector('#start');
    let code = textarea.value;

    function drawCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      eval(textarea.value);
      para.textContent = 'The rectangle is ' + x + 'px wide and ' + y + 'px high.';
      
    }

    reset.addEventListener('click', function() {
      textarea.value = code; drawCanvas();
    });

    

    start.addEventListener('click', drawCanvas);
    window.addEventListener('load', ()=>{
      textarea.value =`
let x =50;
let y =50;
ctx.fillStyle ="green";
ctx.fillRect(10,10,x,y);`;
    });

    // stop tab key tabbing out of textarea and
    // make it write a tab at the caret position instead

    textarea.onkeydown = function(e){
      if (e.keyCode === 9) {
        e.preventDefault();
        insertAtCaret('\t');
      }

      if (e.keyCode === 27) {
        textarea.blur();
      }
    };

    function insertAtCaret(text) {
      const scrollPos = textarea.scrollTop;
      const caretPos = textarea.selectionStart;
      const front = (textarea.value).substring(0, caretPos);
      const back = (textarea.value).substring(textarea.selectionEnd, textarea.value.length);

      textarea.value = front + text + back;
      caretPos = caretPos + text.length;
      textarea.selectionStart = caretPos;
      textarea.selectionEnd = caretPos;
      textarea.focus();
      textarea.scrollTop = scrollPos;
    }