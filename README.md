# Mouse Trapped

Mouse Trapped is under development for the BAFTA Young Game Designers competition. Coders, artists and story writers design their own video games, whether they focus on the concept or actually produce the game. (We have done the latter.)

In the game, you navigate the mouse around a set of mazes of rapidly increasing difficulty which appear to have no end. You receive no sympathy from the scientist, who barely acknowledges that you are any more important than a glass beaker. After all, if you break, he can always get a new one.

This game was not intended as a protest against animal testing. The conditions portrayed in this game are (to my knowledge) inaccurate; most scientists are nothing like the one encountered here.

## Getting Started

Although this is a javascript game, it requires a server to run it on so that the browser will load assets correctly. By default, the game expects a [Sinatra server](http://sinatrarb.com), which in turn requires (Ruby)[https://www.ruby-lang.org/en/documentation/installation/].

You can bypass this requirement if necessary by editing the HTML files so that they do not expect eRuby (ERB) and by starting a [simple Python server](https://docs.python.org/2/library/simplehttpserver.html) instead, for example. However, this is not recommended.

## Starting the Server

There are two things you need to consider when starting the server: which port should it listen on and who should be able to make requests? If you want a game that only you can access on your computer, you can leave the server on the `development` environment, which listens on 127.0.0.1. If you want others on the network to be able to access the game, then set the environment to `production` to make it listen on 0.0.0.0. The default port is 9292, but you may wish to specify another one. You will probably need to use `sudo` if you want the server to listen on port 80, which is the default that browsers use for HTTP.

```
rackup -E ENVIRONMENT -p PORT
```

You can also use the `-D` flag to "daemonize" the process so that it runs in the background even after you close your terminal window. You may need to restart the server if you reboot the computer or log out if you do this.

## Acknowledgements

 - The game is mostly written in Phaser, an HTML 5 game framework.
 - The website uses Bootstrap to make it look good and to minimise the amount of CSS I need to write.
 - The server is hosted by Sinatra and its dependencies, which were elegant to work with and without the unnecessary complexity of a Rails server.
