import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelizeService } from '../common/sequelize.service';

export const SportEventTableName = 'sport_events';

export interface SportEventAttributes {
    event_name: string;
    odds: number;
}

export class SportEvent extends Model<InferAttributes<SportEvent>, InferCreationAttributes<SportEvent>> implements SportEventAttributes {
    declare event_id: CreationOptional<number>;
    declare event_name: string;
    declare odds: number;
}

SportEvent.init({
    event_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    event_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    odds: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    tableName: SportEventTableName,
    sequelize: sequelizeService.getInstance(),
    timestamps: true,
    underscored: true,
    paranoid: true,
});