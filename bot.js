var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
function spongebobify (msgIn){
	var i = 0;
	var res = "";
	for (i = 0; i < msgIn.length; i++) { 
            if(i%2 == 1){
                res += msgIn.charAt(i).toLowerCase();
            }
            else{
                res += msgIn.charAt(i).toUpperCase();;
            }
	}
	return res;
}
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
        switch(cmd) {
            // !ping
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
					
                });
				break;
			case 'spongebob':
				args[0] = "";
				bot.sendMessage({
                    to: channelID,
                    message: spongebobify (args.join(" "))
				});
				break;
            break;
            // Just add any case commands if you want to..
         }
     }
});