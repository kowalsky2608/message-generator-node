A simple script that generates a message based on data provided by the user. Written for my own use, to submit instructions for work schedules.

CONFIG

If you want to config your e-mail account, create .env file and type:
SMTP_HOST= Your mail host (for example smtp.wp.pl)
SMTP_USERNAME= Your e-mail adress
SMTP_PASSWORD= Your password
SMTP_PORT= SMTP Port (for example 465)

HOW IT WORKS

1. Choose a time period. It should be 7 days from Friday to Thursday.
2. Choose a shift you want to get in concrete day. Choosen position will be put in array.
3. Script will generate a message that you can send to your supervisor.
4. Use a send button to send mail.

   
