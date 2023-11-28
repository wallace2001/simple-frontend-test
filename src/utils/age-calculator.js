export const ageCalculator = (dataNascimento) => {
    const dataAtual = new Date();
    const anoAtual = dataAtual.getFullYear();
    const mesAtual = dataAtual.getMonth();
    const diaAtual = dataAtual.getDate();
  
    const dataNasc = new Date(dataNascimento);
    const anoNasc = dataNasc.getFullYear();
    const mesNasc = dataNasc.getMonth();
    const diaNasc = dataNasc.getDate();
  
    let idade = anoAtual - anoNasc;
  
    if (mesAtual < mesNasc || (mesAtual === mesNasc && diaAtual < diaNasc)) {
      idade--;
    }
  
    return idade;
  }