import { Model, DataTypes, Sequelize } from 'sequelize';

export enum UserRole {
  GDG_LEAD = 'gdg_lead',
  TECHNICAL_LEAD = 'technical_lead',
  MARKETING_LEAD = 'marketing_lead',
  TEAM_MANAGEMENT_LEAD = 'team_management_lead',
  EVENTS_EXTERNAL_LEAD = 'events_external_lead',
  MARKETING_MEMBER = 'marketing_member',
  TEAM_MANAGEMENT_MEMBER = 'team_management_member',
  EVENTS_EXTERNAL_MEMBER = 'events_external_member',
  CORE_TEAM = 'core_team'
}

export interface UserAttributes {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
  isActive: boolean;
  profileImage?: string;
  phoneNumber?: string;
  bio?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  emailVerified?: boolean;
  emailVerificationToken?: string;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  lastLoginAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export type UserCreationAttributes = Omit<UserAttributes, 'id' | 'createdAt' | 'updatedAt'>;

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public password!: string;
  public role!: UserRole;
  public isActive!: boolean;
  public profileImage?: string;
  public phoneNumber?: string;
  public bio?: string;
  public githubUrl?: string;
  public linkedinUrl?: string;
  public portfolioUrl?: string;
  public emailVerified?: boolean;
  public emailVerificationToken?: string;
  public passwordResetToken?: string;
  public passwordResetExpires?: Date;
  public lastLoginAt?: Date;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Helper methods
  public getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  public isLead(): boolean {
    return [
      UserRole.GDG_LEAD,
      UserRole.TECHNICAL_LEAD,
      UserRole.MARKETING_LEAD,
      UserRole.TEAM_MANAGEMENT_LEAD,
      UserRole.EVENTS_EXTERNAL_LEAD
    ].includes(this.role);
  }

  public isSuperAdmin(): boolean {
    return this.role === UserRole.GDG_LEAD;
  }

  public isAdmin(): boolean {
    return this.isLead();
  }

  public getCommittee(): string | null {
    switch (this.role) {
      case UserRole.MARKETING_LEAD:
      case UserRole.MARKETING_MEMBER:
        return 'Marketing';
      case UserRole.TEAM_MANAGEMENT_LEAD:
      case UserRole.TEAM_MANAGEMENT_MEMBER:
        return 'Team Management';
      case UserRole.EVENTS_EXTERNAL_LEAD:
      case UserRole.EVENTS_EXTERNAL_MEMBER:
        return 'Events & External Relations';
      case UserRole.TECHNICAL_LEAD:
        return 'Technical';
      case UserRole.GDG_LEAD:
        return 'Leadership';
      default:
        return null;
    }
  }

  public static associate(): void {
    // Define associations here when other models are created
    // User.hasMany(models.Application, { foreignKey: 'reviewerId', as: 'reviewedApplications' });
    // User.belongsToMany(models.Interview, { through: 'UserInterviews', foreignKey: 'userId' });
  }
}

const initUser = (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [2, 100],
        },
      },
      lastName: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [2, 100],
        },
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
          notEmpty: true,
        },
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [8, 255],
        },
      },
      role: {
        type: DataTypes.ENUM(...Object.values(UserRole)),
        allowNull: false,
        defaultValue: UserRole.CORE_TEAM,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      profileImage: {
        type: DataTypes.STRING(500),
        allowNull: true,
        validate: {
          isUrl: true,
        },
      },
      phoneNumber: {
        type: DataTypes.STRING(8),
        allowNull: true,
        validate: {
          is: /^[0-9]{8}$/,
        },
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
          len: [0, 1000],
        },
      },
      githubUrl: {
        type: DataTypes.STRING(255),
        allowNull: true,
        validate: {
          isUrl: true,
        },
      },
      linkedinUrl: {
        type: DataTypes.STRING(255),
        allowNull: true,
        validate: {
          isUrl: true,
        },
      },
      portfolioUrl: {
        type: DataTypes.STRING(255),
        allowNull: true,
        validate: {
          isUrl: true,
        },
      },
      emailVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      emailVerificationToken: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      passwordResetToken: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      passwordResetExpires: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      lastLoginAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      timestamps: true,
      indexes: [
        {
          fields: ['email'],
          unique: true,
        },
        {
          fields: ['role'],
        },
        {
          fields: ['isActive'],
        },
      ],
      hooks: {
        beforeValidate: (user: User) => {
          if (user.email) {
            user.email = user.email.toLowerCase().trim();
          }
        },
      },
    }
  );

  return User;
};

export default initUser;
