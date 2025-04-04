function formatDate(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length > 2) value = value.slice(0, 2) + '/' + value.slice(2);
    if (value.length > 5) value = value.slice(0, 5) + '/' + value.slice(5);
    input.value = value;
  }
  
  function formatCurrency(input) {
    let value = input.value.replace(/\D/g, '');
    value = (parseInt(value) / 100).toFixed(2);
    value = value.replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    input.value = value;
  }
  
  function calcularRescisao(salario, inicio, fim, ferias, decimo) {
    const salarioNum = salario;
    const dataInicio = new Date(inicio.split('/').reverse().join('-'));
    const dataFim = new Date(fim.split('/').reverse().join('-'));
  
    const tempoTrabalhado = (dataFim - dataInicio) / (1000 * 60 * 60 * 24 * 365.25);
    const anos = Math.floor(tempoTrabalhado);
    const meses = Math.floor((tempoTrabalhado % 1) * 12);
    const dias = dataFim.getDate();
  
    const saldoSalario = (salarioNum / 30) * dias;
  
    let feriasVencidas = 0, feriasProporcionais = 0;
    if (ferias === 'N') {
      feriasVencidas = salarioNum * anos + (salarioNum * anos) / 3;
    }
    feriasProporcionais = (salarioNum / 12) * meses;
    feriasProporcionais += feriasProporcionais / 3;
  
    let decimoAnual = 0, decimoProporcional = 0;
    if (decimo === 'N') {
      decimoAnual = salarioNum * anos;
    }
    decimoProporcional = (salarioNum / 12) * meses;
  
    const avisoPrevio = (salarioNum / 30) * (30 + anos * 3);
    const fgts = salarioNum * 0.08 * (anos * 12 + meses);
    const multaFGTS = fgts * 0.4;
  
    const total = saldoSalario + feriasVencidas + feriasProporcionais + decimoAnual + decimoProporcional + avisoPrevio + fgts + multaFGTS;
  
    return {
      saldoSalario,
      feriasVencidas,
      feriasProporcionais,
      decimoTerceiroAnual: decimoAnual,
      decimoTerceiroProporcional: decimoProporcional,
      avisoPrevio,
      fgts,
      multaFGTS,
      valorCalculado: total
    };
  }
  