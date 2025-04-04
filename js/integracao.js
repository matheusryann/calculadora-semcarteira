async function enviarFormulario() {
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const whatsapp = document.getElementById('whats').value.trim();
  
    if (!nome || !email || !whatsapp) {
      alert('Por favor, preencha todos os dados: nome, email e WhatsApp.');
      return;
    }
  
    const salarioInput = document.getElementById('pay').value.replace(/\./g, '').replace(',', '.');
    const inicio = document.getElementById('startDate').value;
    const fim = document.getElementById('endDate').value;
    const ferias = document.getElementById('vacation').value;
    const decimo = document.getElementById('decimoTerceiro').value;
  
    const salario = parseFloat(salarioInput);
    if (isNaN(salario)) {
      alert('Salário inválido');
      return;
    }
  
    document.getElementById('loading').style.display = 'flex';
  
    const resultado = calcularRescisao(salario, inicio, fim, ferias, decimo);
  
    localStorage.setItem('resultado', JSON.stringify({
      nome,
      email,
      whatsapp,
      inicio,
      fim,
      saldoSalario: resultado.saldoSalario,
      feriasVencidas: resultado.feriasVencidas,
      feriasProporcionais: resultado.feriasProporcionais,
      decimoTerceiroAnual: resultado.decimoTerceiroAnual,
      decimoTerceiroProporcional: resultado.decimoTerceiroProporcional,
      avisoPrevio: resultado.avisoPrevio,
      fgts: resultado.fgts,
      multaFGTS: resultado.multaFGTS,
      periculosidade: resultado.periculosidade,
      valorCalculado: resultado.valorCalculado
    }));
  
    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("email", email);
    formData.append("whatsapp", whatsapp);
    formData.append("valorCalculado", resultado.valorCalculado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
  
    try {
      const resposta = await fetch('https://script.google.com/macros/s/AKfycbwRNP3Qra62fvEc4jOMV4tYld4nsg7HIhn6RNOcv7udSea7FiYm7ICvMYDNkrJSky7JgA/exec', {
        method: 'POST',
        body: formData
      });
  
      if (!resposta.ok) {
        throw new Error("Erro na resposta do servidor.");
      }
  
      window.location.href = 'resultado.html';
  
    } catch (err) {
      console.error('Erro ao enviar os dados:', err);
      alert('Ocorreu um erro ao enviar os dados. Tente novamente mais tarde.');
    } finally {
      document.getElementById('loading').style.display = 'none';
    }
  }
  