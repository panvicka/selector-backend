/* groovylint-disable-next-line LineLength */
/* groovylint-disable CompileStatic, DuplicateStringLiteral, NoDef, UnusedVariable, VariableName, VariableTypeRequired */
@Library('bitgrip-jenkins-library@v1.18.4') _
pipeline {
    agent {
        label 'docker'
    }
    options {
        ansiColor('xterm')
        buildDiscarder(
            logRotator(
                artifactDaysToKeepStr: '',
                artifactNumToKeepStr: '',
                daysToKeepStr: '1',
                numToKeepStr: '10'
            )
        )
        disableConcurrentBuilds()
    }
    environment {
        // https://bitbucket.org/bitgrip/bitgrip-pipeline-global/src/master/#markdown-header-bitgripgetuserid
        DOCKER_USER = bitgripGetUserId(this)
        // https://bitbucket.org/bitgrip/bitgrip-pipeline-global/src/master/#markdown-header-bitgripgetgroupid
        DOCKER_GROUP = bitgripGetGroupId(this, [groupname: 'docker'])
        SELECTOR_BACKEND_IMAGE = 'bitgrip/selector-backend'
        SELECTOR_BACKEND_VERSION = '1.0.0'
        ANSIBLE_FORCE_COLOR = true
        DOCKER_IMAGE_BUILD_NAME = 'docker:20.10.17-cli-alpine3.16'
    }
    stages {
        stage('Build image') {
            agent {
                docker {
                    image DOCKER_IMAGE_BUILD_NAME
                    args "-u ${DOCKER_USER}:${DOCKER_GROUP} -v /var/run/docker.sock:/var/run/docker.sock"
                    reuseNode true
                }
            }
            steps {
                script {
                    bitgripBuildDockerImage(this, [
                        imageName: "${env.SELECTOR_BACKEND_IMAGE}",
                        imageVersion: "${env.SELECTOR_BACKEND_VERSION}"
                    ])
                }
            }
        }
        stage('Deploy') {
            steps {
                build(
                    quietPeriod: 0,
                    job: 'bitgrip/bitgrip-operations/main',
                    parameters: [
                        string(name: 'PLAYBOOK', value: 'deploy-selector'),
                        string(name: 'EXTRA_VARS', value: '')
                    ]
                )
            }
        }
    }
}
