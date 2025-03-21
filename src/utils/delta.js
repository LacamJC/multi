exports.converterHoras = (totalHorasDecimal) => {
    const horas = Math.floor(totalHorasDecimal);
    const minutosDecimais = (totalHorasDecimal - horas) * 60;
    const minutos = Math.round(minutosDecimais); // Arredonda para o minuto inteiro mais próximo
  
    // Formata a saída com zero à esquerda se necessário
    const horasFormatadas = String(horas).padStart(2, '0');
    const minutosFormatados = String(minutos).padStart(2, '0');
  
    return `${horasFormatadas}:${minutosFormatados}`;
  };
  