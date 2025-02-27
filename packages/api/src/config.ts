export const config = {
    env: process.env.NODE_ENV || 'dev',
    port: process.env.PORT || 4000,
    db: {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432'),
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'password',
        database: process.env.DB_NAME || 'bet_system',
    },
};
