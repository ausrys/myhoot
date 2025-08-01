import app from './app';
import sequelize from './config/database';
import './models/index';
const PORT = process.env.PORT || 5000;
const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Database connected');
        // Sync models (use { force: true } to reset tables)
        await sequelize.sync({ alter: true });
        console.log('📦 Models synced');
        app.listen(PORT, () => {
            console.log(`🚀 Server listening on http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error('❌ Unable to connect to the database:', error);
        process.exit(1);
    }
};
startServer();
