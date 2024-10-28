const { execSync } = require('child_process');

const migrationName = process.argv[2];
if (!migrationName) {
    console.error('Por favor, forneça um nome para a migration');
    process.exit(1);
}

const command = `ts-node ./node_modules/typeorm/cli.js migration:generate src/migrations/${migrationName} -d data-source-cli.ts`;

try {
    execSync(command, { stdio: 'inherit' });
} catch (error) {
    console.error('Erro ao gerar migration:', error);
    process.exit(1);
}