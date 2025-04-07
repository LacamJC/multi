const { Sequelize, QueryTypes } = require('sequelize');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuração da conexão
const sequelize = new Sequelize('PROTHEUS', 'protheus', '12345678', {
  dialect: 'mssql',
  host: 'localhost',
  port: 1433, // Porta padrão do MS SQL Server
  dialectOptions: {
    options: {
      encrypt: false, // Para conexões seguras
      trustServerCertificate: false, // Se estiver usando um certificado autoassinado
    },
  },
  logging: true // Removi o console.log para não poluir ao importar
});

// Consulta SQL
const consultaSQL = `
    SELECT ZAD_NUM, ZAD_CODUS,ZAD_NOME,ZAD_PROJET,ZAD_NUMTAR,ZAD_DESCR,ZAD_TIPO,ZAD_DTINI,ZAD_DTFIM, ZAD_ESFOR, ZAD_NOMCLI, ZAA_COD, ZAA_NOME, ZAA_VALHOR,A1_VALOR,A1_HRDEV, ZAC_FATURA,A1_PARCEIR
  FROM ZAD990 ZAD
  LEFT JOIN ZAA990 AS ZAA ON ZAD_CODUS = ZAA_COD AND ZAA.D_E_L_E_T_=''
  LEFT JOIN SA1990 AS SA1 ON A1_COD = ZAD_CLIENT AND SA1.D_E_L_E_T_=''
  LEFT JOIN ZAC990 AS ZAC ON ZAD_PROJET = ZAC_PROJET AND ZAD_NUMTAR = ZAC_TAREF AND ZAC.D_E_L_E_T_=''
  WHERE ZAD.D_E_L_E_T_=''
    AND ZAD_DTINI >= '20250401'
    AND ZAD_DTFIM <= '20250430'
    AND ZAD_CODUS BETWEEN '   ' AND  'ZZZZZZ'
  ORDER BY ZAD_NUM, ZAD_NOME,ZAD_PROJET
`;

// Função para executar a consulta
async function executarConsulta() {
  try {
    // Primeiro testa a conexão
    await sequelize.authenticate();
    console.log('Conexão com o MS SQL Server estabelecida com sucesso.');

    // Executa a consulta SQL
    const resultados = await sequelize.query(consultaSQL, {
      type: QueryTypes.SELECT
    });

    // Exibe o número de registros encontrados (mantive para feedback local)
    console.log(`Foram encontrados ${resultados.length} registros.`);

    // Salva os resultados em um arquivo
    const outputPath = path.join(__dirname, '..', 'data', 'resultados_consulta.json'); // Caminho relativo seguro
    fs.writeFileSync(outputPath, JSON.stringify(resultados, null, 2));
    console.log(`Resultados salvos em: ${outputPath}`);

    return resultados;
  } catch (erro) {
    console.error('Erro ao executar a consulta:', erro.message);
    throw erro;
  } finally {
    // Fecha a conexão ao terminar
    if (sequelize) {
      // await sequelize.close();
      console.log('Conexão fechada.');
    }
  }
}

// Exporta a função executarConsulta
module.exports = { executarConsulta };

// Bloco de execução principal (mantido para rodar o script diretamente)
if (require.main === module) {
  executarConsulta()
    .then(resultados => {
      // O que fazer com os resultados se o script for executado diretamente
      // console.log('Consulta executada com sucesso:', resultados);
      console.log("Consulta realizada com sucesso")
      console.log(Date())
      console.log("Registros: " + resultados.length)
    })
    .catch(erro => {
      console.error('Falha na execução:', erro);
      process.exit(1);
    });
}