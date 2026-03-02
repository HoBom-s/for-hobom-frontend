@Library('hobom-shared-lib') _
hobomPipeline(
  serviceName:    'dev-for-hobom-frontend',
  hostPort:       '3000',
  containerPort:  '80',
  memory:         '256m',
  cpus:           '0.5',
  submodules:     true,
  preBuild:       { sh '''
    set -eux
    cp /etc/hobom-dev/dev-for-hobom-frontend/.env .env
    UID=$(id -u); GID=$(id -g)
    docker run --rm --user "$UID:$GID" -e HOME=/tmp \
      -v "$PWD":/app -w /app node:20 sh -lc 'yarn install --frozen-lockfile && yarn build'
    rm -f .env
  ''' },
  smokeCheckPath: '/healthz'
)
