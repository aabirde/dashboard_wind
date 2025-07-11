module.exports = (sequelize, DataTypes) => {
  const Turbine = sequelize.define('Turbine', {
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
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        len: [1, 255]
      }
    },
    model: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    manufacturer: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    serial_number: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    capacity: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      comment: 'Capacity in kW',
      validate: {
        min: 0
      }
    },
    hub_height: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: false,
      comment: 'Hub height in meters',
      validate: {
        min: 0
      }
    },
    rotor_diameter: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: false,
      comment: 'Rotor diameter in meters',
      validate: {
        min: 0
      }
    },
  location: {
    type: DataTypes.JSON,
    allowNull: false,
    comment: 'Contains latitude, longitude, address',
    validate: {
      isValidLocation(value) {
        if (!value || typeof value !== 'object') {
          throw new Error('Location must be an object');
        }
        if (typeof value.latitude !== 'number' || typeof value.longitude !== 'number') {
          throw new Error('Location must contain numeric latitude and longitude');
        }
        if (Math.abs(value.latitude) > 90 || Math.abs(value.longitude) > 180) {
          throw new Error('Invalid coordinates');
        }
      }
    }
  },
    status: {
      type: DataTypes.ENUM('operational', 'maintenance', 'offline', 'error', 'decommissioned'),
      allowNull: false,
      defaultValue: 'operational'
    },
    installation_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    last_maintenance_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    next_maintenance_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    current_power_output: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: 0.00,
      comment: 'Current power output in kW'
    },
    total_energy_generated: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: true,
      defaultValue: 0.00,
      comment: 'Total energy generated in kWh'
    },
    efficiency: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
      defaultValue: 0.00,
      comment: 'Efficiency percentage',
      validate: {
        min: 0,
        max: 100
      }
    },
    wind_speed: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: true,
      comment: 'Current wind speed in m/s'
    },
    wind_direction: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: 'Wind direction in degrees (0-360)',
      validate: {
        min: 0,
        max: 360
      }
    },
    rotor_speed: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: true,
      comment: 'Rotor speed in RPM'
    },
    temperature: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
      comment: 'Turbine temperature in Celsius'
    },
    vibration_level: {
      type: DataTypes.DECIMAL(8, 4),
      allowNull: true,
      comment: 'Vibration level measurement'
    },
    last_data_update: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: 'Last time sensor data was updated'
    },
    alarms: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
      comment: 'Current active alarms'
    },
    configuration: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: {},
      comment: 'Turbine configuration settings'
    },
    metadata: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: {},
      comment: 'Additional metadata'
    }
  }, 
  {
    tableName: 'turbines',
    timestamps: true,
    indexes: [
      { fields: ['user_id'] },
      { fields: ['status'] },
      { fields: ['serial_number'] },
      { fields: ['manufacturer'] },
      { fields: ['model'] },
      { fields: ['installation_date'] },
      { fields: ['last_maintenance_date'] },
      { fields: ['next_maintenance_date'] }
    ]
  });

  Turbine.associate = (models) => {
    Turbine.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'owner'
    });
    Turbine.hasMany(models.Report, {
      foreignKey: 'turbine_id',
      as: 'reports'
    });
  };

  // Instance methods
  Turbine.prototype.isOperational = function() {
    return this.status === 'operational';
  };

  Turbine.prototype.needsMaintenance = function() {
    if (!this.nextMaintenanceDate) return false;
    return new Date() >= this.nextMaintenanceDate;
  };

  Turbine.prototype.daysUntilMaintenance = function() {
    if (!this.nextMaintenanceDate) return null;
    const diffTime = this.nextMaintenanceDate.getTime() - new Date().getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  Turbine.prototype.calculateEfficiency = function() {
    if (!this.currentPowerOutput || !this.capacity) return 0;
    return (this.currentPowerOutput / this.capacity) * 100;
  };

  return Turbine;
};
