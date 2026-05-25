'use strict';

module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM(
        'NEW_APPLICATION',
        'APPLICATION_STATUS_UPDATED',
        'EVENT_UPDATED',
        'EVENT_DELETED',
        'NEW_REGISTRATION',      // add
        'PROFILE_UPDATED',       // add
        'PASSWORD_CHANGED',      // add
        'ACCOUNT_DELETED'
      ),
      allowNull: false
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    data: {
      type: DataTypes.JSON,
      allowNull: true
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  return Notification;
};