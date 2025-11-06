/**
 * Validates that all required environment variables are set
 * Throws an error if any required variable is missing
 */
export function validateEnvironmentVariables(): void {
  const requiredEnvVars = [
    'DB_HOST',
    'DB_PORT',
    'DB_USER',
    'DB_PASSWORD',
    'DB_NAME',
    'JWT_SECRET',
  ];

  const missingVars: string[] = [];

  for (const varName of requiredEnvVars) {
    if (!process.env[varName]) {
      missingVars.push(varName);
    }
  }

  if (missingVars.length > 0) {
    console.error('❌ Missing required environment variables:');
    missingVars.forEach(varName => {
      console.error(`   - ${varName}`);
    });
    console.error('\nPlease set these variables in your .env file or environment configuration.');
    console.error('See .env.example for reference.\n');
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }

  // Warnings for optional but recommended variables
  const recommendedVars = ['EMAIL_USER', 'EMAIL_PASSWORD', 'FRONTEND_URL'];
  const missingRecommended: string[] = [];

  for (const varName of recommendedVars) {
    if (!process.env[varName]) {
      missingRecommended.push(varName);
    }
  }

  if (missingRecommended.length > 0) {
    console.warn('⚠️  Missing recommended environment variables:');
    missingRecommended.forEach(varName => {
      console.warn(`   - ${varName}`);
    });
    console.warn('Some features may not work correctly without these variables.\n');
  }

  console.log('✅ Environment variables validated successfully');
}

