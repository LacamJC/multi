const { Sequelize, QueryTypes } = require('sequelize');

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
  logging: console.log // Para ver os logs das queries (opcional)
});

// Consulta SQL
const consultaSQL = `
  SELECT ZAD_NUM, ZAD_CODUS, ZAD_NOME, ZAD_PROJET, ZAD_NUMTAR, ZAD_DESCR, ZAD_TIPO, 
         ZAD_DTINI, ZAD_DTFIM, ZAD_ESFOR, ZAD_NOMCLI, ZAA_COD, ZAA_NOME, ZAA_VALHOR,
         A1_VALOR, A1_HRDEV, ZAC_FATURA, A1_PARCEIR
  FROM ZAD990 ZAD
  LEFT JOIN ZAA990 AS ZAA ON ZAD_CODUS = ZAA_COD AND ZAA.D_E_L_E_T_=''
  LEFT JOIN SA1990 AS SA1 ON A1_COD = ZAD_CLIENT AND SA1.D_E_L_E_T_=''
  LEFT JOIN ZAC990 AS ZAC ON ZAD_PROJET = ZAC_PROJET AND ZAD_NUMTAR = ZAC_TAREF AND ZAC.D_E_L_E_T_=''
  WHERE ZAD.D_E_L_E_T_=''
    AND ZAD_DTINI >= '20240101'
    AND ZAD_DTFIM <= '20250331'
    AND ZAD_CODUS BETWEEN '      ' AND 'ZZZZZZ'
    AND ZAC_FATURA = '2'
  ORDER BY ZAD_NUM, ZAD_NOME, ZAD_PROJET
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
    
    // Exibe o número de registros encontrados
    console.log(`Foram encontrados ${resultados.length} registros.`);
    
    // Exibe os primeiros 5 registros como exemplo (se houver)
      /*if (resultados.length > 0) {
        console.log('Primeiros 5 registros:');
        resultados.slice(0, 5).forEach((registro, indice) => {
          console.log(`\nRegistro ${indice + 1}:`);
          console.log(registro);
        });
      }
      */
    // Opcional: salvar os resultados em um arquivo
    const fs = require('fs');
    fs.writeFileSync('resultados_consulta.json', JSON.stringify(resultados, null, 2));
    // console.log('Resultados salvos em resultados_consulta.json');
    
    return resultados;
  } catch (erro) {
    console.error('Erro ao executar a consulta:', erro.message);
    throw erro;
  } finally {
    // Fecha a conexão ao terminar
    await sequelize.close();
    console.log('Conexão fechada.');
  }
}

// Executa a função
executarConsulta()
  .then(resultados => {
    // Aqui você pode fazer qualquer processamento adicional com os resultados
    // Por exemplo, transformar os dados ou realizar cálculos
  })
  .catch(erro => {
    console.error('Falha na execução:', erro);
    process.exit(1);
  });