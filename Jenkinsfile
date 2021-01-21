def dockerhub = "atiakhairunican/jenkinsback"
def image_name = "${dockerhub}:${BRANCH_NAME}"
def builder

pipeline {
    agent any

    parameters {
        choice(
            choices: ['master', 'main'],
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

        stage("Deployment") {
            when {
                expression {
                    params.REQUESTED_ACTION == 'main'
                }
            }
            steps {
                script {
                    sshPublisher {
                        publishers: [
                            sshPublisherDesc(
                                configName: "devserver",
                                verbose: false,
                                transfers: [
                                    sshTransfer (
                                        execCommand: "docker pull ${image_name}: docker kill jenkinsback : docker run -d --rm --name jenkinsback -p 9090:9000 ${image_name}",
                                        execTimeout: 1500000
                                    )
                                ]
                            )
                        ]
                    }
                }
            }
        }
    }
}