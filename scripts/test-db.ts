import { testDatabaseConnection, syncDatabase } from '../lib/database';

async function main() {
  console.log('🔧 Testing database connection...');
  
  const isConnected = await testDatabaseConnection();
  
  if (isConnected) {
    console.log('🚀 Attempting to sync database...');
    const isSynced = await syncDatabase();
    
    if (isSynced) {
      console.log('✅ Database setup complete!');
      process.exit(0);
    } else {
      console.log('❌ Database sync failed');
      process.exit(1);
    }
  } else {
    console.log('❌ Database connection failed');
    process.exit(1);
  }
}

main().catch(console.error);
