import * as readline from 'readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import fetch_template from './utils/mail_options.js';
import sendEmail from './utils/send_mail.js';

const rl = readline.createInterface({ input, output });

const main = async () => {
    const menu = `
Select email template:
1. New login alert
2. Suspicious login alert
3. Reset password
====================================
    `;
    
    let choice, username, target_mail;
    
    while (true) {
        console.log(menu);
        const choiceInput = await rl.question('Select(1-3): ');
        username = await rl.question('Target\'s Firstname: ');
        target_mail = await rl.question('Target\'s Email: ');
        
        const choiceNum = parseInt(choiceInput);
        
        if ([1, 2, 3].includes(choiceNum) && username.trim() && target_mail.trim()) {
            choice = choiceNum;
            break;
        }
        console.log('Invalid input. Try again.\n');
    }
    
    try {
        const template = await fetch_template(choice, username, target_mail);
        const recipient = target_mail;
        
        if (!recipient) {
            throw new Error('EMAIL_TO environment variable not set');
        }
        
        await sendEmail(recipient, template);
        console.log(`Email sent to ${recipient}`);
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        rl.close();
    }
};

main();