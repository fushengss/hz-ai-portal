# 湖州市人工智能赋能平台（Huzhou AI City Mall） · 前端项目

纯静态前端（已容器化，基于 Nginx 提供 HTTP 服务），可直接构建 Docker 镜像并在 Kubernetes 中部署访问；同时也仍支持本地双击 `index.html` 或静态服务器打开（哈希路由）。

## 快速开始：Docker 构建与本地运行

### 1. Docker Compose 一键启动（推荐本地预览）

```bash
docker compose up -d --build
# 浏览器访问 http://localhost:8080
# 如需更换端口：PORT=8888 docker compose up -d --build
```

停止服务：

```bash
docker compose down
```

### 2. 手动构建并运行 Docker 镜像

```bash
# 构建镜像（国内网络可追加 --build-arg NGINX_IMAGE=<私有仓库>/nginx:1.27-alpine）
docker build -t hz-ai-portal:latest .

# 运行容器
docker run -d --name hz-ai-portal -p 8080:80 hz-ai-portal:latest

# 验证健康检查与页面
curl -i http://127.0.0.1:8080/healthz
```

> 当前项目默认 ACR 镜像地址：`crpi-l81pfihisxunrizo.cn-hangzhou.personal.cr.aliyuncs.com/zjhr/hz-ai-portal:latest`（架构 `linux/amd64`）。
>
> 如在 Apple Silicon (ARM64) Mac 上构建并推送用于 Linux x86_64 K8s 节点的镜像：
> ```bash
> docker build --platform linux/amd64 -t crpi-l81pfihisxunrizo.cn-hangzhou.personal.cr.aliyuncs.com/zjhr/hz-ai-portal:latest .
> docker push crpi-l81pfihisxunrizo.cn-hangzhou.personal.cr.aliyuncs.com/zjhr/hz-ai-portal:latest
> ```

## Kubernetes 部署与直接 HTTP 访问

项目内置标准 K8s 清单（位于 `k8s/` 目录）：

- `k8s/deployment.yaml`：2 副本无宕机滚动更新，内置 `/healthz` 就绪与存活探针及资源配额
- `k8s/service.yaml`：默认 `NodePort`（服务端口 `80`，节点端口 `30080`），部署后可直接 HTTP 访问
- `k8s/ingress.yaml`：可选 HTTP 域名入口（`ingressClassName: nginx`）

### 方式一：NodePort 直接 HTTP 访问（无需配置域名 / Ingress）

1. `k8s/deployment.yaml` 已默认配置为 ACR 镜像 `crpi-l81pfihisxunrizo.cn-hangzhou.personal.cr.aliyuncs.com/zjhr/hz-ai-portal:latest`。若该 ACR 仓库为**私有仓库**，请先在目标命名空间创建拉取凭证并取消 `k8s/deployment.yaml` 中 `imagePullSecrets` 注释：

```bash
kubectl create secret docker-registry acr-secret \
  --docker-server=crpi-l81pfihisxunrizo.cn-hangzhou.personal.cr.aliyuncs.com \
  --docker-username=<ACR用户名> \
  --docker-password=<ACR密码>
```

2. 执行部署：

```bash
kubectl apply -f k8s/deployment.yaml -f k8s/service.yaml
kubectl get pod,svc -l app=hz-ai-portal
```

3. 浏览器直接访问：

```text
http://<任意K8s节点IP>:30080
```

### 方式二：通过 Ingress 域名直接 HTTP 访问

1. 将 `k8s/ingress.yaml` 中的 `host: hz-ai-portal.local` 替换为你的实际域名（并按需调整 `ingressClassName`）。
2. 执行部署：

```bash
kubectl apply -f k8s/
```

3. 浏览器直接访问 `http://<你的域名>`。

### 使用 Makefile 快捷命令

```bash
make build                                                   # 构建本地镜像
make build-linux IMAGE=registry.example.com/hz-ai-portal TAG=v2.0  # 构建 linux/amd64 镜像
make push IMAGE=registry.example.com/hz-ai-portal TAG=v2.0         # 推送镜像
make run PORT=8080                                           # 本地 Docker 启动
make deploy IMAGE=registry.example.com/hz-ai-portal TAG=v2.0 NAMESPACE=default
make status                                                  # 查看 K8s 部署状态
make undeploy                                                # 清理 K8s 资源
```

### 本地免 Docker 预览

```bash
python3 -m http.server 8788   # 然后访问 http://localhost:8788
```

## 页面与路由（v3.0 六大核心模块版）

| 导航顺序 | 顶部模块 | 二级模块 / 路由 | 页面 / 数据文件 | 说明 |
|---|---|---|---|---|
| 1 | 首页 | `#/` | `js/pages/home.js` | 态势数据、核心价值、六大服务矩阵、“1+2+3+N”总体架构、热门智能体、平台优势 |
| 2 | 智能体库 | `#/agents/train` `#/agents/deploy` | `js/pages/agents.js` `data/agents.js` | 开发训练（三大开发训练平台、流水线、Skill 能力包） / 场景落地（78 个智能体应用与实测成效） |
| 3 | 数据要素 | `#/data/governance` `#/data/sharing` | `js/pages/data.js` `data/portal-v3.js` | 汇聚治理（四步流水线、高质量行业数据集目录、安全合规底座） / 开放共享（授权运营、开放 API 目录与流通闭环） |
| 4 | 人才培育 | `#/talent/training` `#/talent/certification` | `js/pages/talent.js` `data/portal-v3.js` | 实训培养（三层实训体系、开班计划、产教载体） / 认证评价（L1-L3 分级认证、四步流程与证书核验） |
| 5 | 标杆案例 | `#/cases/release` `#/cases/transform` | `js/pages/cases.js` `data/portal-v3.js` `data/huzhou-map.js` | 定期发布（三县两区互动地图与季度标杆榜单） / 成果转化（四步转化路径、区县承接单位与标准方案包） |
| 6 | 政策服务 | `#/policy/events` `#/policy/direct` | `js/pages/policy.js` `data/portal-v3.js` | 重大事项（专项行动、揭榜挂帅、基础设施与生态大会） / 政策直通（算力券、场景补助与智能匹配器） |
| 7 | 知识底座 | `#/knowledge/qa` `#/knowledge/diagnosis` | `js/pages/knowledge.js` `data/portal-v3.js` | 智能问答（跨全库检索问答与引用跳转） / 政企诊断（企业/政务双模式 5 维成熟度评估与路径规划） |

## 常改的内容在哪

- 平台名称与统一口号：`js/ui.js` 顶部 `SITE`
- 首页“1+2+3+N”架构数据：`js/pages/home.js` 顶部 `ARCH`
- 供需大厅（能力货架 / 脱敏需求 / 撮合看板 / 账单）：`data/market.js`
- 产业页“区县 × 三次产业”场景矩阵与 AI 要素底座：`data/industry.js`
- 安全可信专题页文案：`js/pages/security.js` 顶部 `SECURITY_DATA`
- 生态联盟四级流程、区县承接单位、三级技术服务表：`js/pages/alliance.js`
- 智能体数据（78 条）：`data/agents.js`，图片在 `assets/agents/`
- 主题色与可读性对比度变量：`css/style.css` 顶部 `:root`
- Nginx 缓存与路由配置：`nginx/default.conf`
- K8s 部署与访问配置：`k8s/deployment.yaml`、`k8s/service.yaml`、`k8s/ingress.yaml`
