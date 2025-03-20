

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nome_do_banco', 'nome_do_usuario', 'senha', {
  dialect: 'mssql',
  host: 'endereco_do_servidor',
  port: 1433, // Porta padrão do MS SQL Server
  dialectOptions: {
    options: {
      encrypt: true, // Para conexões seguras (recomendado)
      trustServerCertificate: true, // Se estiver usando um certificado autoassinado
    },
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Conexão com o MS SQL Server estabelecida com sucesso.');
  })
  .catch((err) => {
    console.error('Erro ao conectar com o MS SQL Server:', err);
  });