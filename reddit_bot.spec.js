//Reddit Bot spec file


/*
var bot = new Bot('1337') ;  		//create new instance of 1337 Bot
var response = bot.onNewPost ('joebob32','DVD player') 	//new variable response receives post and creates response
	if (response != null) { 		//if the response is not null
		reddit.post (response)		//post response to reddit
	}
*/
var Bot = require('./reddit_bot.js');
describe ('Bot', function() {

	it ('Responds to a post with text "DVD player"', function() {
		var DVDbot = new Bot ('DVD player', 'DVD_Crowner') //phrase and bot username
		var post = 'Check out my new DVD player'
		var userName = 'Chuck3Cheese'
		var response = DVDbot.onNewPost (userName, post)
		expect(response).toEqual('You are the DVD player King!');
	})

	xit ('Users can only be DVD player King once', function() {
		var DVDbot = new Bot ('DVD player', 'DVD_Crowner')
		var post = 'This is an expensive DVD player'
		var userName = 'IsaacDixson'
		var post2 = 'Don\'t talk shit about my expensive DVD player'
		DVDbot.onNewPost (userName, post)
		var response2 = DVDbot.onNewPost (userName, post2)
		expect(response2).toEqual('You can\'t be the King twice you selfish jerk')
	})

	xit ('DVDbot only responds if the phrase "DVD player" is in the post', function () {
		var DVDbot = new Bot ('DVD player', 'DVD_Crowner')
		var post = 'This is one fancy mini-disc player'
		var userName = 'BenFoldsPaper'
		var response = DVDbot.onNewPost (userName, post)
		expect (response).toEqual(null);
	})

	it ('DVDbot transfers the crown to the next DVD player King', function () {
		var DVDbot = new Bot ('DVD player', 'DVD_Crowner')
		var post = 'My DVD player also plays VHS'
		var userName = 'SlickSpider'
		var post2 = 'I\'ve never seen a man eat a DVD player'
		var userName2 = 'TeamAmerika'
		DVDbot.onNewPost (userName, post)
		var response = DVDbot.onNewPost (userName2, post2)
		expect(response).toEqual('You are the DVD player King!')
	})

	it ('DVDbot does not respond to itself', function () {
		var userName = 'DVD_King_Bot'
		var DVDbot = new Bot ('DVD player', 'DVD_King_Bot')
		var post = 'You are the DVD Player King!'
		var response = DVDbot.onNewPost (userName, post)
		expect (response).toEqual(null)
	})

	it ('Can match against "Walkman"', function () {
		var WalkmanBot = new Bot ('Walkman', 'ChristopherWalkman_Bot')
		var post = 'I have not seen a better deal on the Sony Walkman'
		var userName = 'VynlHippster'
		var response = WalkmanBot.onNewPost (userName, post)
		expect (response).toEqual('You are the Walkman King!')
	})

	it ('WalkmanBot Does not respond to itself', function() {
		var userName = 'ChristopherWalkman_Bot'
		var WalkmanBot = new Bot ('Walkman', userName)
		var post = 'You are the Walkman King!'
		var response = WalkmanBot.onNewPost (userName, post)
		expect (response).toEqual(null)
	})

	xit ('WalkmanBot bot does not respond to users who would become king, but diss on Michael Jackson', function() {
		var WalkmanBot = new Bot ('Walkman', 'ChristopherWalkman_Bot')
		var post = 'It was totally not cool when Michael Jackson held that Walkman out a window.'
		var userName = 'LatoyaJFan'
		WalkmanBot.blacklist (userName)
		var response = WalkmanBot.onNewPost (userName, post)
		expect (response).toEqual(null)
	})
	xit ('WalkmanBot does not respond to current Walkman Kings who diss on Michael Jackson', function() {
		var WalkmanBot = new Bot ('Walkman', 'ChristopherWalkman_Bot')
		var post = 'Look at MJ\'s sweet Walkman'
		var userName = 'BillyGean'
		WalkmanBot.onNewPost (userName, post)
		// something happens to earn BillyGean a BANHAMMER!
		WalkmanBot.blacklist (userName)
		var post2 = 'If only that Walkman didn\'t make him look like an alien'
		var response = WalkmanBot.onNewPost (userName, post2)
		expect (response).toEqual(null)
	})
}) 

