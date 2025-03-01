import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelizeService } from '../common/sequelize.service';

export const SportEventBetTableName = 'sport_event_bets';

export interface SportEventBetAttributes {
    sport_event_bet_id: number;
    sport_event_id: number;
    bet_amount: number;
}

export class SportEventBet extends Model<InferAttributes<SportEventBet>, InferCreationAttributes<SportEventBet>> implements SportEventBetAttributes {
    declare sport_event_bet_id: CreationOptional<number>;
    declare sport_event_id: number;
    declare bet_amount: number;
}

SportEventBet.init({
    sport_event_bet_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    sport_event_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    bet_amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    tableName: SportEventBetTableName,
    sequelize: sequelizeService.getInstance(),
    timestamps: true,
    underscored: true,
    paranoid: true,
});