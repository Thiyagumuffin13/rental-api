import { Injectable, Logger } from '@nestjs/common';
import * as Cron from 'node-cron';
import { exec } from 'child_process';
import { join } from 'path';
import { config } from 'dotenv';

config();

@Injectable()
export class BackupService {
  private readonly logger = new Logger(BackupService.name);

  constructor() {
    this.scheduleBackup();
  }

  private scheduleBackup() {
    // Schedule the backup to run at 2 AM every day
    Cron.schedule('51 17 * * *', () => {
      this.logger.log('Starting database backup...');
      this.createBackup();
    });
  }

  private createBackup() {
    const backupPath = join(__dirname, '..', 'backups');
    const backupFile = join(backupPath, `backup-${new Date().toISOString().split('T')[0]}.sql`);
    this.logger.log(backupPath,'---create backup---',backupFile);

    // Create the backups directory if it doesn't exist
    exec(`mkdir -p ${backupPath}`, (err) => {
      if (err) {
        this.logger.error('Error creating backup directory:', err);
        return;
      }

      // Use environment variables for database credentials
      const user = process.env.DB_USER;
      const host = process.env.DB_HOST;
      const dbName = process.env.DB_NAME;
      const dumpCommand = `pg_dump -U ${user} -h ${host} -d ${dbName} -F c -b -v -f ${backupFile}`;

      exec(dumpCommand, (error, stdout, stderr) => {
        if (error) {
          this.logger.error('Error creating database backup:', error);
          return;
        }
        this.logger.log('Database backup completed successfully:', stdout);
      });
    });
  }
}
