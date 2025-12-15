document.addEventListener('DOMContentLoaded', function() {
  
  const form = document.querySelector('form');
  const feedback = document.querySelector('#feedback');
  
  if (form) {
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      
      feedback.textContent = '';
      feedback.className = '';
      
      const nome = document.querySelector('#name').value.trim();
      const email = document.querySelector('#email').value.trim();
      const mensagem = document.querySelector('#mensagem').value.trim();
      
      if (nome === '') {
        exibirErro('O nome é obrigatório.', 'name');
        return;
      }
      
      if (nome.length < 2) {
        exibirErro('O nome deve ter pelo menos 2 caracteres.', 'name');
        return;
      }
      
      if (email === '') {
        exibirErro('O e-mail é obrigatório.', 'email');
        return;
      }
      
      if (!validarEmail(email)) {
        exibirErro('Por favor, insira um e-mail válido.', 'email');
        return;
      }
      
      if (mensagem === '') {
        exibirErro('A mensagem é obrigatória.', 'mensagem');
        return;
      }
      
      if (mensagem.length < 10) {
        exibirErro('A mensagem deve ter pelo menos 10 caracteres.', 'mensagem');
        return;
      }
      
      feedback.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
      feedback.classList.add('success');
      
      setTimeout(() => {
        feedback.textContent = '';
        feedback.className = '';
        form.reset();
      }, 5000);
    });
  }
  
  const botoesComprar = document.querySelectorAll('button[type="button"]');
  
  botoesComprar.forEach(botao => {
    botao.addEventListener('click', function(event) {
      event.preventDefault();
      
      const produto = this.closest('article');
      const nomeProduto = produto.querySelector('h3').textContent;
      const preco = produto.querySelector('.promocao').textContent;
      
      const modal = document.createElement('div');
      modal.className = 'modal-compra';
      modal.innerHTML = `
        <div class="modal-conteudo">
          <h3>Confirmar Compra</h3>
          <p>Tem certeza que deseja comprar:</p>
          <p><strong>${nomeProduto}</strong> por <strong>${preco}</strong>?</p>
          <div class="modal-botoes">
            <button class="btn-cancelar">Cancelar</button>
            <button class="btn-confirmar">Confirmar Compra</button>
          </div>
        </div>
      `;
      
      document.body.appendChild(modal);
      
      modal.querySelector('.btn-cancelar').addEventListener('click', function() {
        document.body.removeChild(modal);
      });
      
      modal.querySelector('.btn-confirmar').addEventListener('click', function() {
        const whatsappURL = `https://wa.me/5514910041539?text=Olá! Gostaria de comprar o produto: ${encodeURIComponent(nomeProduto)} por ${encodeURIComponent(preco)}`;
        window.open(whatsappURL, '_blank');
        document.body.removeChild(modal);
      });
      
      modal.addEventListener('click', function(e) {
        if (e.target === modal) {
          document.body.removeChild(modal);
        }
      });
    });
  });
  
  const linksWhatsapp = document.querySelectorAll('.lista-servicos a');
  
  linksWhatsapp.forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      
      const servico = this.closest('article');
      const nomeServico = servico.querySelector('h3').textContent;
      const textoWhatsapp = `Olá! Vi que vocês oferecem o serviço de ${nomeServico}. Gostaria de mais informações.`;
      const whatsappURL = `https://wa.me/5514910041539?text=${encodeURIComponent(textoWhatsapp)}`;
      
      window.open(whatsappURL, '_blank');
    });
  });
  
  const navLinks = document.querySelectorAll('nav a');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  function exibirErro(mensagem, campoId) {
    feedback.textContent = mensagem;
    feedback.classList.add('error');
    
    const campo = document.querySelector(`#${campoId}`);
    campo.focus();
    campo.classList.add('campo-error');
    
    campo.addEventListener('input', function() {
      this.classList.remove('campo-error');
    }, { once: true });
  }
  
  function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  
  const style = document.createElement('style');
  style.textContent = `
    .modal-compra {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }
    
    .modal-conteudo {
      background: white;
      padding: 30px;
      border-radius: 10px;
      max-width: 400px;
      width: 90%;
      text-align: center;
      box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    }
    
    .modal-conteudo h3 {
      color: #2c3e50;
      margin-bottom: 15px;
    }
    
    .modal-conteudo p {
      margin: 10px 0;
    }
    
    .modal-botoes {
      display: flex;
      gap: 15px;
      margin-top: 20px;
      justify-content: center;
    }
    
    .btn-cancelar, .btn-confirmar {
      padding: 12px 25px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-weight: bold;
      transition: all 0.3s;
    }
    
    .btn-cancelar {
      background-color: #e74c3c;
      color: white;
    }
    
    .btn-cancelar:hover {
      background-color: #c0392b;
    }
    
    .btn-confirmar {
      background-color: #2ecc71;
      color: white;
    }
    
    .btn-confirmar:hover {
      background-color: #27ae60;
    }
    
    #feedback.error {
      color: #e74c3c;
      background-color: #ffe6e6;
      padding: 10px;
      border-radius: 5px;
      margin: 10px 0;
      border: 1px solid #e74c3c;
    }
    
    #feedback.success {
      color: #27ae60;
      background-color: #e6ffe6;
      padding: 10px;
      border-radius: 5px;
      margin: 10px 0;
      border: 1px solid #27ae60;
    }
    
    .campo-error {
      border: 2px solid #e74c3c !important;
    }
    
    button:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }
    
    button:active {
      transform: translateY(0);
    }
  `;
  
  document.head.appendChild(style);
});