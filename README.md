# Instagram bot

Ready to work in a couple of minutes!!

This bot includes:
 - The callback endpoint for Instagram OAUTH
 - A small "in memory" resume of likes
 - Docker configuration

## Prerequisites 

This is the part that will take more time to configure, because the [instagram developer documentation](https://www.instagram.com/developer/authentication/) says that you will need to register a new Instagram application, but it's easy!! Just go [here](https://www.instagram.com/developer/clients/manage/)

  If you want to develop in `localhost` mode, create an application and set `http://localhost:3000/handleauth` as your `redirect_uri` in the instagram configuration page. For more information check [internet](http://stackoverflow.com/questions/10456174/oauth-how-to-test-with-local-urls)

Once you had done it, you will have your CLIENT_ID and CLIENT_SECRET and you are ready to go.

## Configuration

Edit the configuration file `config/default.json`. 

Please make sure to include: 
 - Client Secret
 - Client Id
 - Hashtags to like
 
You can also pass the enviroment variables listed in the Dockerfile if you want to configure it dinamically.

```
ENV PORT 3000
ENV CLIENT_ID ''
ENV CLIENT_SECRET ''
ENV REDIRECT_URI ''
```


## Pages

Visit `http://localhost:3000/authorize_user` for authenticating a user in instagram,
the app will redirect to `http://localhost:3000/handleauth`

Once the authentication is done, you can visit `http://localhost:3000/status`
to see the status of the application

## Launch

`npm start`

Or in docker `sudo docker run -d -p 3000:3000 --name="instagrambot" instagrambot`

### More docker tips.

If you have never used [Docker](https://www.docker.com/) the next commands will serve as a shortcut for you:

**First install docker... follow instructions in their webpage**

Build an image

`sudo docker build -t instagrambot .`

Run it 

`sudo docker run -d -p 3000:3000 --name="instagrambot" instagrambot`

Stop it

`sudo docker stop instagrambot`

Remove container

`sudo docker rm instagrambot`

Remove image

`sudo docker rmi instagrambot`

List containers running 

`sudo docker ps`

List all containers

`sudo docker ps -a`

Start container (previously started with run and stoped)

`sudo docker start instagrambot`
