IMAGE ?= crpi-l81pfihisxunrizo.cn-hangzhou.personal.cr.aliyuncs.com/zjhr/hz-ai-portal
TAG ?= latest
FULL_IMAGE := $(IMAGE):$(TAG)
NGINX_IMAGE ?= nginx:1.27-alpine
PLATFORM ?= linux/amd64
PORT ?= 8080
NAMESPACE ?= default

.PHONY: help build build-linux push run stop deploy deploy-ingress undeploy status

help:
	@echo "常用命令:"
	@echo "  make build          构建当前架构 Docker 镜像 ($(FULL_IMAGE))"
	@echo "  make build-linux    构建 $(PLATFORM) 镜像（适用于 Linux K8s 集群）"
	@echo "  make push           推送镜像到仓库 ($(FULL_IMAGE))"
	@echo "  make run            本地启动 Docker 容器并映射到 http://localhost:$(PORT)"
	@echo "  make stop           停止并移除本地容器"
	@echo "  make deploy         部署 Deployment + NodePort Service 到 K8s (namespace=$(NAMESPACE))"
	@echo "  make deploy-ingress 部署含 Ingress 在内的全部 K8s 资源"
	@echo "  make undeploy       从 K8s 删除部署资源"
	@echo "  make status         查看 K8s Pod / Service / Ingress 状态"

build:
	docker build --build-arg NGINX_IMAGE=$(NGINX_IMAGE) -t $(FULL_IMAGE) .

build-linux:
	docker build --platform $(PLATFORM) --build-arg NGINX_IMAGE=$(NGINX_IMAGE) -t $(FULL_IMAGE) .

push:
	docker push $(FULL_IMAGE)

run:
	PORT=$(PORT) NGINX_IMAGE=$(NGINX_IMAGE) docker compose up -d --build
	@echo "已启动，直接访问: http://localhost:$(PORT)"

stop:
	docker compose down

deploy:
	kubectl -n $(NAMESPACE) apply -f k8s/deployment.yaml -f k8s/service.yaml
	kubectl -n $(NAMESPACE) set image deployment/hz-ai-portal hz-ai-portal=$(FULL_IMAGE)

deploy-ingress: deploy
	kubectl -n $(NAMESPACE) apply -f k8s/ingress.yaml

undeploy:
	kubectl -n $(NAMESPACE) delete -f k8s/ --ignore-not-found

status:
	kubectl -n $(NAMESPACE) get deploy,pod,svc,ingress -l app=hz-ai-portal
