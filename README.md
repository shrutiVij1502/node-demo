## Create a GitHub repo that stores node js code.
## Create a pipeline using Jenkins to deploy a nodejs code on docker container
## The pipeline should automatically trigger when any change will occur in the git repo.
## Attach the SSL to it.

The Very first step is to install Docker in your EC2 instance
```
sudo yum update
sudo yum install docker
```
Now, will create a folder for our project
```
mkdir nodeApp
cd nodeApp
nano Dockerfile
```
Add the below given code in Dockerfile

```
FROM node
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "app.js"]
```

To build our Docker image, run the following command:

```docker build -t username/nodeApp:v1 .```

Now, for all the file and folders you can go through the repo and get it into your repo or you can create it into your system and push into the repo using the git commands

```git remote add origin https://github.com/username/repository_name```

In order to integrate your Github repository to your Jenkins Project, you need to set up a web-hook. Web-hooks can only work over a public IP, therefore, we require a reverse proxy to create a secure tunnel from a public endpoint (Github) to our locally running web service (Jenkins).

for configuring the Jenkins into your system use following commands 

```
sudo yum update –y 
sudo wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo 
sudo rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io.key 
sudo yum upgrade 
sudo amazon-linux-extras install java-openjdk11 -y 
sudo yum install jenkins -y 
sudo systemctl enable jenkins 
sudo systemctl start jenkins 
sudo systemctl status jenkins 
```

After running all the command 
Now connect to Jenkins webUI with public IP forwarded by :8080 port. 
(http://<your_server_public_DNS>:8080)

Install following Plugins while installing the Jenkins

Blue Ocean
Credentials Plugin
Docker Plugin
Github Plugin
NodeJS Plugin
Oracle Java SE Development Kit Installer Plugin
Pipeline Plugin
Timestamper

### Creating a Continuous Integration Build

Navigate back to the home page and create a new build by clicking on New Item.
Enter your project name and select Freestyle project and click OK:

![image](https://user-images.githubusercontent.com/67600604/177474841-a2b14cd0-a8b7-4a44-84c9-79080b367cb4.png)

In the Build Triggers section, select Github hook trigger for GITScm polling.

NOTE : If the NodeJS plugin has not been activated, Save and Apply changes, then navigate to Manage Jenkins > Global Tool Configuration and look for the NodeJS heading. Install whatever version of NodeJS you require and click save

![image](https://user-images.githubusercontent.com/67600604/177475003-32b17177-d6f1-40af-afc5-9e5a159d0872.png)

Navigate back to our freestyle job and in the Build section, click Add build step > Execute Shell and type in the following commands:
```
npm install 
npm test
```

Before we create a new build, we require two elements:

Name of the Docker Repository
Dockerhub credentials on Jenkins
Open up a new tab and login to your Dockerhub account. Click on Create Repository, enter a name and click Create. This will indicate to Jenkins where the Docker Image will be pushed.

![image](https://user-images.githubusercontent.com/67600604/177475298-a0f8afbc-5570-4993-8657-9a53b31b77f2.png)

Once saved, navigate back to the home page and click on New Item.

Enter your project name and select Pipeline and click OK:

![image](https://user-images.githubusercontent.com/67600604/177476370-78288f4d-b22f-43ec-a665-b5e9048f2783.png)

In the General Section, enter the same project url as the previous Jenkins build we configured earlier.
![image](https://user-images.githubusercontent.com/67600604/177476406-b1963176-cf7f-41e0-a094-a9c7e9f3a21d.png)

In the Pipeline section, we will be creating a script to tell Jenkins to create a Docker Image and deploy onto Dockerhub. The pipeline script is based on the Apache Groovy programming language.

![image](https://user-images.githubusercontent.com/67600604/177476475-22abba74-59e7-41e7-8e2c-8b89bf0b9009.png)

Click on Save and Apply

We can now check our Dockerhub to see if our image has been pushed automatically to the repository.

![image](https://user-images.githubusercontent.com/67600604/177476573-ee3b5a4a-4801-41f4-8d9e-779c05c6a4c8.png)

For more detailed description - https://medium.com/@naistangz/building-a-ci-cd-pipeline-for-a-node-js-app-with-docker-and-jenkins-ee6db6e70d25

## For the SSL part - 

Prerequisite - Having Nginx Installed using - yum install nginx

Installing the certbot for the SSL using Letsencrypt

sudo apt install certbot python3-certbot-nginx
sudo vim /etc/nginx/nginx.conf

in the nginx.conf file , add your omain in the server name , Here, I have taken the domain from Freenom.com and configured it using the Hosted zone in Route 53 using the nameservers 

![image](https://user-images.githubusercontent.com/67600604/177494964-a3d834c6-077e-449f-9b42-9a91db2d75d9.png)

Find the existing server_name line. It should look like this:

If it doesn’t, update it to match. Then save the file, quit your editor, and verify the syntax of your configuration edits:

```
nginx -t
sudo systemctl reload nginx
```

## Obtaining an SSL Certificate

![image](https://user-images.githubusercontent.com/67600604/177708786-5423f9b9-2fc5-4fa4-bd05-796d5490f7f8.png)
nginx.conf file

![image](https://user-images.githubusercontent.com/67600604/177708451-e7feb562-88b5-4374-93d9-077d0dc7f4c7.png)

proxy setup to redirect it to the nginx port 80

for more - https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-20-04

``` sudo certbot --nginx -d django1.tk -d www.django1.tk ```

![image](https://user-images.githubusercontent.com/67600604/177499645-d346eccd-5da4-4123-9046-6258d92f587b.png)








