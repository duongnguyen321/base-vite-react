def TELEGRAM_TOKEN = ''
def TELEGRAM_CHAT_ID = ''
def STAGE_STEP_ERROR = ''
def GIT_COMMIT_MESSAGE='', GIT_COMMIT_USERNAME = '', GIT_COMMIT_EMAIL='', GIT_COMMIT_SHA256='', GIT_PROJECT_NAME='', GIT_CURRENT_BRANCH=''

pipeline {
    agent any
    stages {
        stage('Clone project') {
            steps {
                git branch: 'main', credentialsId: '', url: ''
                script {
                    GIT_COMMIT_MESSAGE = sh(script: 'git log -1 --pretty=%B', returnStdout: true).trim()
                    GIT_COMMIT_USERNAME = sh(script: 'git log -1 --pretty=format:\'%an\'', returnStdout: true).trim()
                    GIT_COMMIT_EMAIL = sh(script: ' git show -s --format=\'%ae\'', returnStdout: true).trim()
                    GIT_COMMIT_SHA256 = sh(script: 'git log -1 --format="%H"', returnStdout: true).trim()
                    GIT_PROJECT_NAME = sh(script: 'git remote -v | head -n1 | awk \'{print $2}\' | sed \'s/.*\\///\' | sed \'s/\\.git//\'', returnStdout: true).trim()
                    GIT_CURRENT_BRANCH = sh(script: 'git rev-parse --abbrev-ref HEAD', returnStdout: true).trim()
                }
                sh """
                    curl    --location 'https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage' \
                            --form 'chat_id="${TELEGRAM_CHAT_ID}"' \
                            --form 'text="Bắt đầu CICD dự án ${GIT_PROJECT_NAME} (${GIT_CURRENT_BRANCH}) ☢️\n\nJob: ${env.JOB_NAME} (${env.BUILD_NUMBER})\nURL: ${env.BUILD_URL}\nCommit user: ${GIT_COMMIT_USERNAME} <${GIT_COMMIT_EMAIL}>\nCommit message: ${GIT_COMMIT_MESSAGE}\nCommit SHA256: ${GIT_COMMIT_SHA256}"'
                """
                sh 'ls'
            }
            post {
                failure {
                    script { STAGE_STEP_ERROR = 'Clone project' }
                }
            }
        }
        stage('Docker build image') {
            steps {
                sh 'docker-compose -f docker-compose.yml build'
            }
            post {
                failure {
                    script { STAGE_STEP_ERROR = 'Docker build image' }
                }
            }
        }
        stage('Docker build project') {
            steps {
                script {
                    def statusCode = sh(script: "docker-compose -f docker-compose.yml up", returnStatus: true).trim()
                    echo shOut;
                    if(shOut.indexOf("exited with code 0") == -1)
                        throw new Error("build error")
                }
                sh 'cd /var/app/base-react/dist && ls'
            }
            post {
                failure {
                    script { STAGE_STEP_ERROR = 'Docker build project' }
                }
            }
        }
        stage('Update project') {
            steps {
                sh '/bin/bash -O extglob -c \'rm -rf /var/app/base-react/!("dist")\''
                sh 'cp -a . /var/app/base-react'
            }
            post {
                failure {
                    script { STAGE_STEP_ERROR = 'Update project' }
                }
            }
        }
    }
    post {
        always {
            deleteDir()
        }
        success {
            sh """
                curl    --location 'https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage' \
                        --form 'chat_id="${TELEGRAM_CHAT_ID}"' \
                        --form 'text="CICD dự án ${GIT_PROJECT_NAME} (${GIT_CURRENT_BRANCH}) thành công ✅\n\nJob: ${env.JOB_NAME} (${env.BUILD_NUMBER})\nURL: ${env.BUILD_URL}\nCommit user: ${GIT_COMMIT_USERNAME} <${GIT_COMMIT_EMAIL}>\nCommit message: ${GIT_COMMIT_MESSAGE}\nCommit SHA256: ${GIT_COMMIT_SHA256}"'
            """

        }
        failure {
            sh """
                curl    --location 'https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage' \
                        --form 'chat_id="${TELEGRAM_CHAT_ID}"' \
                        --form 'text="CICD dự án ${GIT_PROJECT_NAME} (${GIT_CURRENT_BRANCH}) thất bại ❌\n\nJob: ${env.JOB_NAME} (${env.BUILD_NUMBER})\nURL: ${env.BUILD_URL}\nCommit user: ${GIT_COMMIT_USERNAME} <${GIT_COMMIT_EMAIL}>\nCommit message: ${GIT_COMMIT_MESSAGE}\nCommit SHA256: ${GIT_COMMIT_SHA256}"'
            """
            sh """cat ${JENKINS_HOME}/jobs/${JOB_NAME}/builds/${BUILD_NUMBER}/log >> ${JOB_NAME}-log-error.txt"""
            sh """
            curl    --location 'https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendDocument?chat_id=${TELEGRAM_CHAT_ID}' \
                    --form 'document=@"${JOB_NAME}-log-error.txt"'
            """
        }
    }
}
