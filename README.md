# Mouse Trapped

Mouse Trapped is under development for the BAFTA Young Game Designers competition. Coders, artists and story writers design their own video games, whether they focus on the concept or actually produce the game. (We have done the latter.)

In the game, you navigate the mouse around a set of mazes of rapidly increasing difficulty which appear to have no end. You receive no sympathy from the scientist, who barely acknowledges that you are any more important than a glass beaker. After all, if you break, he can always get a new one.

This game was not intended as a protest against animal testing. The conditions portrayed in this game are (to my knowledge) inaccurate; most scientists are nothing like the one encountered here.

## Getting Started

Although this is a javascript game, it requires a server to run it on so that the browser will load assets correctly. By default, the game expects a [Rails server](http://rubyonrails.org), which in turn requires [Ruby](https://www.ruby-lang.org/en/documentation/installation/).

You can bypass this requirement if necessary by editing the HTML files so that they do not expect eRuby (ERB) and by starting a [simple Python server](https://docs.python.org/2/library/simplehttpserver.html) instead, for example. However, this is not recommended.

## Starting the Server

Assuming you are using a rails server, you can start listening for requests to localhost using the command below. 

```
rails s -e production
```

Assuming there are no errors, you should be able to access the server at http://localhost:3000/. You can change the port using the `-p` flag, although you will probably need to aquire root privileges in order to listen on port 80. 

You can also use the `-d` flag to "daemonize" the process so that it runs in the background even after you close your terminal window. You may need to restart the server if you reboot the computer or log out if you do this.

## Acknowledgements

 - The game is mostly written in Phaser, an HTML 5 game framework.
 - The website uses Bootstrap to make it look good and to minimise the amount of CSS I need to write.
 - The server is hosted by Ruby on Rails and its dependencies.
