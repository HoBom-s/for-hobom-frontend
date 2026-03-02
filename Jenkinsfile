pipeline {
  agent any

  options {
    timestamps()
    disableConcurrentBuilds()
    skipDefaultCheckout(true)
  }

  environment {
    WORKDIR        = '/var/lib/jenkins/workspace-clean/dev-for-hobom-frontend'

    // Docker Hub
    REGISTRY       = 'docker.io'
    IMAGE_REPO     = 'jjockrod/hobom-system'
    SERVICE_NAME   = 'dev-for-hobom-frontend'
    IMAGE_TAG      = "${REGISTRY}/${IMAGE_REPO}:${SERVICE_NAME}-${env.BUILD_NUMBER}"
    IMAGE_LATEST   = "${REGISTRY}/${IMAGE_REPO}:${SERVICE_NAME}-latest"
    REGISTRY_CRED  = 'dockerhub-cred'
    READ_CRED_ID   = 'dockerhub-readonly'

    // 빌드 타임 .env (Jenkins 서버 파일시스템)
    BUILD_ENV_PATH = '/etc/hobom-dev/dev-for-hobom-frontend/.env'

    // Remote server
    APP_NAME       = 'dev-for-hobom-frontend'
    DEPLOY_HOST    = 'ishisha.iptime.org'
    DEPLOY_PORT    = '22223'
    DEPLOY_USER    = 'infra-admin'
    SSH_CRED_ID    = 'deploy-ssh-key'

    // Runtime
    HOST_PORT      = '3000'
    CONTAINER_PORT = '80'
  }

  stages {
    stage('Checkout') {
      steps {
        dir(env.WORKDIR) {
          deleteDir()
          checkout scm
          sh '''
            set -eux
            git config --global --add safe.directory "$WORKSPACE" || true
            git submodule sync --recursive
            git submodule update --init --recursive
          '''
        }
      }
    }

    stage('Build (Node)') {
      steps {
        dir(env.WORKDIR) {
          sh '''
            set -eux

            # .env 존재 확인
            if [ ! -f "$BUILD_ENV_PATH" ]; then
              echo "[ERROR] $BUILD_ENV_PATH not found. Create it first."
              exit 1
            fi

            # Vite 빌드 타임에 VITE_* 환경변수를 번들에 포함
            cp "$BUILD_ENV_PATH" .env

            UID=$(id -u)
            GID=$(id -g)

            docker run --rm \
              --user "$UID:$GID" \
              -e HOME=/tmp \
              -v "$PWD":/app \
              -w /app \
              node:20 sh -lc '
                set -eux
                yarn install --frozen-lockfile
                yarn build
              '

            rm -f .env
          '''
        }
      }
    }

    stage('Build & Push Image (Docker)') {
      steps {
        dir(env.WORKDIR) {
          withCredentials([usernamePassword(credentialsId: env.REGISTRY_CRED, usernameVariable: 'REG_USER', passwordVariable: 'REG_PASS')]) {
            sh '''
              set -eu
              export DOCKER_BUILDKIT=1
              set +x
              echo "$REG_PASS" | docker login "$REGISTRY" -u "$REG_USER" --password-stdin
              set -x

              docker build -t "${IMAGE_TAG}" -t "${IMAGE_LATEST}" .
              docker push "${IMAGE_TAG}"
              docker push "${IMAGE_LATEST}"
            '''
          }
        }
      }
    }

    stage('Deploy container to server') {
      when { anyOf { branch 'develop'; branch 'main' } }
      steps {
        sshagent (credentials: [env.SSH_CRED_ID]) {
          withCredentials([usernamePassword(credentialsId: env.READ_CRED_ID, usernameVariable: 'PULL_USER', passwordVariable: 'PULL_PASS')]) {
            sh '''
set -eux

ssh -o StrictHostKeyChecking=no -p "$DEPLOY_PORT" "$DEPLOY_USER@$DEPLOY_HOST" \
  APP_NAME="$APP_NAME" \
  IMAGE="$IMAGE_LATEST" \
  CONTAINER="$APP_NAME" \
  HOST_PORT="$HOST_PORT" \
  CONTAINER_PORT="$CONTAINER_PORT" \
  PULL_USER="$PULL_USER" \
  PULL_PASS="$PULL_PASS" \
  bash -s <<'EOS'
set -euo pipefail
echo "[REMOTE] Deploying $APP_NAME with image $IMAGE"

if ! command -v docker >/dev/null 2>&1; then
  echo "[REMOTE][ERROR] docker not found."
  exit 1
fi

echo "$PULL_PASS" | docker login docker.io -u "$PULL_USER" --password-stdin

docker pull "$IMAGE" || (echo "[REMOTE][ERROR] docker pull failed" && exit 1)

if docker ps -a --format '{{.Names}}' | grep -w "$CONTAINER" >/dev/null 2>&1; then
  docker stop "$CONTAINER" || true
  docker rm "$CONTAINER" || true
fi

docker network create hobom-net || true
docker run -d --name "$CONTAINER" \
  --network hobom-net \
  --restart unless-stopped \
  -p "${HOST_PORT}:${CONTAINER_PORT}" \
  "$IMAGE"

docker ps --filter "name=$CONTAINER" --format "table {{.Names}}\\t{{.Image}}\\t{{.Status}}\\t{{.Ports}}"
EOS
            '''
          }
        }
      }
    }

    stage('Smoke check') {
      when { anyOf { branch 'develop'; branch 'main' } }
      steps {
        sshagent (credentials: [env.SSH_CRED_ID]) {
          sh """
            ssh -o StrictHostKeyChecking=no -p ${env.DEPLOY_PORT} ${env.DEPLOY_USER}@${env.DEPLOY_HOST} '
              curl -fsS http://localhost:${env.HOST_PORT}/healthz || true
            '
          """
        }
      }
    }
  }

  post {
    success {
      echo "✅ Build #${env.BUILD_NUMBER} → pushed ${env.IMAGE_TAG} & deployed on ${env.DEPLOY_HOST}"
    }
    failure {
      echo "❌ Build failed (${env.BRANCH_NAME})"
    }
  }
}
