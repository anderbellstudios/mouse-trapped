# Mouse Trapped

Mouse Trapped was originally developed for the BAFTA Young Game Designers competition, in which coders, artists and story writers design their own video games. They may either focus on the concept or actually produce the game. As you can see, we have done the latter.

In the game, you navigate the mouse around a set of mazes of rapidly increasing difficulty which appear to have no end. You receive no sympathy from the scientist, who barely acknowledges that you are any more important than a glass beaker. After all, if you break, he can always get a new one.

## Getting Started

Although this is a javascript game, it requires a server to run it on so that the browser will load assets correctly. By default, the game expects a [Rails server](http://rubyonrails.org), which in turn requires [Ruby](https://www.ruby-lang.org/en/documentation/installation/).

You can bypass this requirement if necessary by editing the HTML files so that they do not expect eRuby (ERB) and by starting a [simple Python server](https://docs.python.org/2/library/simplehttpserver.html) instead, for example. However, this is not recommended.

## Setting up Postgres and Gmail

Although playing the game itself requires only a working server, certain features of the website, such as the subscription service, require additional configuration. If you have no intention of using these features, feel free to skip this section. However, this will likely result in errors if you try to access any part of the site related to email notifications. 

The mailing list requires access to a Postgres database running on localhost. To find out how to set this up, please google "postgress server [YOUR OPERATING SYSTEM]".

You will also need to put in place three environment variables: GMAIL\_USERNAME, GMAIL\_PASSWORD and SERVER\_DOMAIN. The first two are required to send emails to subscribed users. The server is configured to use a gmail account by default. Follow the link below to allow the app to log in. 

https://accounts.google.com/DisplayUnlockCaptcha

The third variable, SERVER\_DOMAIN, is the url to the home page of the website, including protocol and a slash at the end. For example, "https://www.mousetrapped.co.uk/" or "http://localhost:3000/". This is used in the automatic mailer to handle unsubscriptions. 

## Starting the Server

Once you have all the requirements in place, run `bundle install` in the root directory to install any missing gems. 

Before the server can be run in production, you will need to precompile the assets that are not already in the public directory. You also need to create the database and tables used to store email subscriptions. 

```
RAILS_ENV=production bin/rake assets:precompile
RAILS_ENV=production bin/rake db:migrate
```

You can now start the server using the custom rake task `server`. (Note that this is different to `rails server`, which will start the application in development mode by default.)

```
bin/rake server 
```

Assuming there are no errors, you should be able to access the server at http://localhost:3000/. You can change the port using the `-p` flag, although you will probably need to aquire root privileges in order to listen on port 80. 

## Acknowledgements

 - The voice of the scientist is portrayed by Paul Howlett.
 - The game is mostly written in Phaser, an HTML 5 game framework.
 - The website uses Bootstrap to make it look good and to minimise the amount of CSS I need to write.
 - The server is hosted by Ruby on Rails and its dependencies.
