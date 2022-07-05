pipeline {
    environment {
    registry = "shrutivij02/nodejs"
    registryCredential = 'dockerhubcredentials'
    dockerImage = ''
    }

    agent any
    stages {
            stage('Cloning our Git') {
                steps {
                git 'https://github.com/shrutiVij1502/node-demo.git'
                }
            }

            stage('Building Docker Image') {
                steps {
                    script {
                        //dockerImage = docker.build registry + ":$BUILD_NUMBER"
                        dockerImage = docker.build registry + ":latest"
                        

                        
                    }
                }
            }

            stage('Deploying Docker Image to Dockerhub') {
                steps {
                    script {
                        docker.withRegistry('', registryCredential) {
                        dockerImage.push()
                        }
                    }
                }
            }

//             stage('Cleaning Up') {
//                 steps{
//                   sh "docker rmi --force $registry:$BUILD_NUMBER"
//                 }
//             }
            
            stage('Creating container') {
                steps{                   
                  sh "bash container.sh" 
                                  
                }
            }
        }
    }
