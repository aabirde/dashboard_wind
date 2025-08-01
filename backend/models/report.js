module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define('Report', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    turbine_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Turbines',
        key: 'id'
      }
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        len: [1, 255]
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    report_type: {
      type: DataTypes.ENUM('maintenance', 'performance', 'incident', 'inspection', 'other'),
      allowNull: false,
      defaultValue: 'other'
    },
    priority: {
      type: DataTypes.ENUM('low', 'medium', 'high', 'critical'),
      allowNull: false,
      defaultValue: 'medium'
    },
    status: {
      type: DataTypes.ENUM('pending', 'in_progress', 'completed', 'cancelled'),
      allowNull: false,
      defaultValue: 'pending'
    },
    attachments: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: []
    },
    metadata: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: {}
    },
    completed_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'reports',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      { fields: ['user_id'] },
      { fields: ['turbine_id'] },
      { fields: ['report_type'] },
      { fields: ['status'] },
      { fields: ['priority'] },
      { fields: ['created_at'] }
    ]
  });

  Report.associate = (models) => {
    Report.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'author'
    });
    Report.belongsTo(models.Turbine, {
      foreignKey: 'turbine_id',
      as: 'turbine'
    });
  };

  return Report;
};

