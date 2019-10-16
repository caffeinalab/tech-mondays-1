# tech-mondays-1

In this issue we've tackled integration between Alexa and a web page.

Sporting a beautiful cube rendered in WebGL trough Three.js

## The gist of it

The idea is to call an API server from an Alexa Skill, collecting variables from the user via voice input.

We send these values over a WebSocket to the web page, which executes different actions depeding on the event.

Here's the diagram for the Alexa Skill: (made in [Voiceflow](https://www.voiceflow.com/))

![Voiceflow Diagram](/docs/voiceflow-diagram.png)

## How to run
### Setup Load Balancer
You need to have a load balancer up and running in order to resolve the hosts in docker.

Luckily for you [@blimpair](https://github.com/blimpair/) has [the one you need](https://github.com/blimpair/loadbalancer):

```
mkdir load-balancer
cd load-balancer

wget https://raw.githubusercontent.com/blimpair/loadbalancer/caffeina/docker-compose.yml
wget https://raw.githubusercontent.com/blimpair/loadbalancer/master/.env

docker-compose up --build
```

And there you go, hosts can now be resolved inside docker.

You need to add these lines to your hosts file tho:

```
sudo nano /etc/hosts
```

Then paste this in:

```
127.0.0.1       tech-mondays-1.test
127.0.0.1       api.tech-mondays-1.test
```

### Bring it up!
just run `./cmd/dev.sh` in the root of this repo, it will build the docker images then start them up.

Frontend is exposed as: [http://tech-mondays-1.test](http://tech-mondays-1.test)

API Calls can be made at: [http://api.tech-mondays-1.test](http://api.tech-mondays-1.test)

There's just one endpoint: `http://api.tech-mondays-1.test/rotate/{direction}`

Where `{direction}` can be either `right` or `left`.
