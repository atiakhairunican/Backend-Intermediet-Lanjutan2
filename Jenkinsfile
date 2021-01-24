def dockerhub = "atiakhairunican/jenkinsback"
def image_name = "${dockerhub}:${BRANCH_NAME}"
def remote_dir_path_dev = "/home/develop/app"
def remote_dir_path_prod = "/home/production/production"
def builder

pipeline {
    agent any

    parameters {
        choice(
            choices: ['dev', 'prod'],
            description: '',
            name: 'REQUESTED_ACTION')
    }

    stages {
        stage("Install dependencies") {
            steps {
                nodejs("node14") {
                    sh "npm install"
                }
            }
        }

        stage("Build docker") {
            steps {
                script {
                    builder = docker.build("${dockerhub}:${BRANCH_NAME}")
                }
            }
        }

        stage("Testing image") {
            steps {
                script {
                    builder.inside {
                        sh "echo passed"
                    }
                }
            }
        }

        stage("Push image") {
            steps {
                script {
                    builder.push()
                }
            }
        }

        stage("Production") {
            when {
                expression {
                    params.REQUESTED_ACTION == 'prod'
                }
            }
            steps {
                script {
                    sshPublisher(
                        publishers: [
                            sshPublisherDesc(
                                configName: "prodserver",
                                verbose: false,
                                transfers: [
                                    sshTransfer(
                                        execCommand: "docker pull postgres:latest : docker pull redis:latest : docker pull ${image_name} : docker kill postgres:latest : docker kill redis:latest : docker kill jenkinsback : docker run -d --rm --name jenkinspostgres -p 5151:5432 postgres:latest : docker run -d --rm --name jenkinsredis -p 6161:6379 redis:latest :  docker run -d --rm --name jenkinsback -p 9090:9000 ${image_name}",
                                        remoteDirectory: "${remote_dir_path_prod}",
                                        execTimeout: 1500000
                                    )
                                ]
                            )
                        ]
                    )
                }
            }
        }

        stage("Deployment") {
            when {
                expression {
                    params.REQUESTED_ACTION == 'dev'
                }
            }
            steps {
                script {
                    sshPublisher(
                        publishers: [
                            sshPublisherDesc(
                                configName: "devserver",
                                verbose: false,
                                transfers: [
                                    sshTransfer(
                                        execCommand: "docker pull postgres:latest : docker pull redis:latest : docker pull ${image_name} : docker kill postgres:latest : docker kill redis:latest : docker kill jenkinsback : docker run -d --rm --name jenkinspostgres -p 5151:5432 postgres:latest : docker run -d --rm --name jenkinsredis -p 6161:6379 redis:latest :  docker run -d --rm --name jenkinsback -p 9090:9000 ${image_name}",
                                        remoteDirectory: "${remote_dir_path_dev}",
                                        execTimeout: 1500000
                                    )
                                ]
                            )
                        ]
                    )
                }
            }
        }
    }
}