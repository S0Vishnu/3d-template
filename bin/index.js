#!/usr/bin/env node
import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const run = async () => {
  const { projectName, language, withPhysics, integrateGit } = await inquirer.prompt([
    {
      name: 'projectName',
      type: 'input',
      message: 'Enter your project name:',
      validate: input => !!input || 'Project name is required.',
    },
    {
      name: 'language',
      type: 'list',
      message: 'Choose the project language:',
      choices: [
        { name: 'JavaScript', value: 'js' },
        { name: 'TypeScript', value: 'ts' },
      ],
    },
    {
      name: 'withPhysics',
      type: 'confirm',
      message: 'Include physics (rapier)?',
      default: false,
    },
    {
      name: 'integrateGit',
      type: 'confirm',
      message: 'Do you want to initialize a Git repository?',
      default: false,
    },
  ]);

  // Determine the correct template folder
  const templatePath = path.resolve(
    __dirname,
    `../templates/${withPhysics ? 'physics' : 'basic'}-${language}`
  );

  // Target folder for the project
  const targetPath = path.resolve(process.cwd(), projectName);

  // Copy template to target folder
  try {
    console.log(`📂 Creating project folder: ${projectName}`);
    await fs.copy(templatePath, targetPath);

    console.log(`✅ Project created in ./${projectName}`);
    console.log(`👉 Run 'cd ${projectName} && npm install && npm run dev'`);

    if (integrateGit) {
      console.log('🔧 Initializing Git repository...');
      execSync('git init', { cwd: targetPath, stdio: 'inherit' });
      execSync('git add .', { cwd: targetPath, stdio: 'inherit' });
      execSync('git commit -m "Initial commit"', { cwd: targetPath, stdio: 'inherit' });

      // Ask for remote Git URL (optional)
      const { remoteUrl } = await inquirer.prompt([
        {
          name: 'remoteUrl',
          type: 'input',
          message: 'Enter the remote Git repository URL (leave blank to skip):',
          default: '',
        },
      ]);

      if (remoteUrl) {
        console.log(`🔗 Adding remote: ${remoteUrl}`);
        execSync(`git remote add origin ${remoteUrl}`, { cwd: targetPath, stdio: 'inherit' });
        console.log('✅ Remote repository added.');
      } else {
        console.log('⏭️ Skipping remote repository setup.');
      }
    }
  } catch (error) {
    console.error(`❌ Error creating project: ${error.message}`);
  }
};

run();
