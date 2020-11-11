module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      categoryId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      authorId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      descriptors: {
        type: Sequelize.TEXT,
      },
      publisher: {
        type: Sequelize.STRING,
      },
      rentPrice: {
        type: Sequelize.FLOAT,
      },
      buyPrice: {
        type: Sequelize.FLOAT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Books');
  },
};
