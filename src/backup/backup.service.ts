import { Injectable, Logger } from '@nestjs/common';
import * as Cron from 'node-cron';
import { exec, spawn } from 'child_process';
import { join } from 'path';
import { config } from 'dotenv';
import * as fs from 'fs';

config();

@Injectable()
export class BackupService {
  private readonly logger = new Logger(BackupService.name);

  constructor() {
    this.scheduleBackup();
  }

  private scheduleBackup() {
    // Schedule the backup to run at 2 AM every day
    Cron.schedule('48 16 * * *', () => {
      this.logger.log('Starting database backup...');
      this.createBackup();
    });
  }

  private createBackup() {
    const backupPath = join(__dirname, '..', 'backups');
    const backupFile = join(backupPath, `backup-${new Date().toISOString().split('T')[0]}.sql`);
    this.logger.log(`Backup path: ${backupPath}`);
    this.logger.log(`Backup file: ${backupFile}`);

    // Ensure the backup directory exists
    if (!fs.existsSync(backupPath)) {
      fs.mkdirSync(backupPath, { recursive: true });
    }

    // Use environment variables for database credentials
    const user = process.env.DB_USER;
    const password = process.env.DB_PASSWORD;
    const host = process.env.DB_HOST;
    const dbName = process.env.DB_NAME;
    const port = process.env.DB_PORT;

    this.logger.log(`Database user: ${user}`);
    this.logger.log(`Database host: ${host}`);
    this.logger.log(`Database name: ${dbName}`);
    this.logger.log(`Database port: ${port}`);

    const dumpCommand = `pg_dump -U ${user} -h ${host} -p ${port} -d ${dbName} -F c -b -v -f "${backupFile}"`;

    const child = spawn(dumpCommand, {
      shell: true,
      env: {
        ...process.env,
        PGPASSWORD: password,
      },
    });

    child.stdout.on('data', (data) => {
      this.logger.log(`stdout: ${data}`);
    });

    child.stderr.on('data', (data) => {
      this.logger.error(`stderr: ${data}`);
    });

    child.on('close', (code) => {
      if (code === 0) {
        this.logger.log('Database backup completed successfully.');
        // Verify the backup file size to ensure data was written
        if (fs.existsSync(backupFile)) {
          const stats = fs.statSync(backupFile);
          if (stats.size > 0) {
            this.logger.log(`Backup file created successfully: ${backupFile}`);
          } else {
            this.logger.error('Backup file is empty. Please check the pg_dump command and database contents.');
          }
        } else {
          this.logger.error('Backup file was not created. Please check the pg_dump command and directory permissions.');
        }
      } else {
        this.logger.error(`Backup process exited with code ${code}`);
      }
    });
  }
}
