def dockerhub = "atiakhairunican/jenkinsback"
def image_name = "${dockerhub}:${BRANCH_NAME}"
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
                    builder = docker.build("${image_name}")
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
                                verbose: true,
                                transfers: [
                                    sshTransfer(
                                        execCommand: "docker rmi ${image_name}; docker pull ${image_name}; docker kill jenkinspostgres; docker kill jenkinsredis; docker kill jenkinsback; docker run -d --name jenkinspostgres -e POSTGRES_PASSWORD=postgres -p 5151:5432 postgres:latest; docker run -d --name jenkinsredis -p 6161:6379 redis:latest; docker run -d --name jenkinsback -p 9090:9000 ${image_name}",
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
                                verbose: true,
                                transfers: [
                                    sshTransfer(
                                        execCommand: "docker rmi ${image_name}; docker pull ${image_name}; docker kill jenkinspostgres; docker kill jenkinsredis; docker kill jenkinsback; docker run --rm -d --name jenkinspostgres -p 5151:5432 postgres:latest; docker run --rm -d --name jenkinsredis -p 6161:6379 redis:latest; docker run --rm -d --name jenkinsback -p 9090:9000 ${image_name}",
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