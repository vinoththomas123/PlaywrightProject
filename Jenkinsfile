pipeline {

    agent any

    environment {
        CI = 'true'
        BASE_URL = 'https://rahulshettyacademy.com/AutomationPractice'
    }

    stages {

        // stage('Checkout') {
        //     steps {
        //         checkout scm
        //     }
        // }        //not requiered since from jenkins pipeline git checkout is done

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Install Browser') {
            steps {
                bat 'npx playwright install chromium'
            }
        }

        stage('Run Tests') {
            steps {
                bat 'npx playwright test --project=chromium'
            }
        }
    }

    post {

        always {
            publishHTML([
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report'
            ])
        }
    }
}