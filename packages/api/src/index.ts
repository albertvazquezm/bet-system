import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config as dotenvConfig } from 'dotenv';
import { errorHandler } from './middleware/errorHandler';
import sportEventRoutes from './modules/sport-event/sport-event.routes';
import { sequelizeService } from './modules/common/sequelize.service';
import { config } from './config';
import { LogLevel, logService } from './modules/common/log.service';
import { requestLogger } from './middleware/requestLogger';

// Load environment variables
dotenvConfig();

const app = express();
const port = config.port;

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(requestLogger); // Request logging with Winston
app.use(express.json()); // Parse JSON bodies

// Routes
app.use(sportEventRoutes);

// Error handling
app.use(errorHandler);

app.listen(port, async () => {
  // Application prerequisites
  try {
    await sequelizeService.checkConnection();
  } catch (error) {
    logService.log({
      level: LogLevel.ERROR,
      message: 'Could not resolve application prerequisites',
      error: error,
    });
    process.exit(1);
  }
  
  console.log(`Server is running on port ${port}`);
});



export default app; 