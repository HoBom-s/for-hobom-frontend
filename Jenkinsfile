@Library('hobom-shared-lib') _
hobomPipeline(
  serviceName:    'dev-for-hobom-frontend',
  hostPort:       '3000',
  containerPort:  '80',
  memory:         '256m',
  cpus:           '0.5',
  submodules:     true,
  buildEnvCredId: 'frontend-build-env',
  smokeCheckPath: '/healthz'
)
