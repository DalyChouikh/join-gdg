"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      firstName: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      role: {
        type: Sequelize.ENUM(
          "gdg_lead",
          "technical_lead",
          "marketing_lead",
          "team_management_lead",
          "events_external_lead",
          "marketing_member",
          "team_management_member",
          "events_external_member",
          "core_team"
        ),
        allowNull: false,
        defaultValue: "core_team",
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      profileImage: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
      phoneNumber: {
        type: Sequelize.STRING(8),
        allowNull: true,
      },
      bio: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      githubUrl: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      linkedinUrl: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      portfolioUrl: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      emailVerified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      emailVerificationToken: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      passwordResetToken: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      passwordResetExpires: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      lastLoginAt: {
        type: Sequelize.DATE,
        allowNull: true,
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

    // Add indexes
    await queryInterface.addIndex("users", ["email"], {
      unique: true,
      name: "users_email_unique",
    });

    await queryInterface.addIndex("users", ["role"], {
      name: "users_role_index",
    });

    await queryInterface.addIndex("users", ["isActive"], {
      name: "users_isActive_index",
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("users");
  },
};
