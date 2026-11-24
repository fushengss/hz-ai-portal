/* =========================================================
   产业与场景赋能静态数据源（与后端接口字段同构）
   包含：区县 × 三次产业场景矩阵、场景卡片明细、AI 要素底座五要素
   stage: benchmark 已有标杆 | pilot POC 验证中 | trial 可试用 | plan 方案储备
   source: platform 实时 | target 2028目标
   ========================================================= */
window.__INDUSTRY_DATA__ = {
  sectors: [
    { key: 'primary', name: '一产 · 现代农业', short: '一产', desc: '种植养殖 · 生态价值转化' },
    { key: 'secondary', name: '二产 · 智改数转', short: '二产', desc: '质检 · 排产 · 工艺 · 运维' },
    { key: 'tertiary', name: '三产 · 文旅与治理', short: '三产', desc: '文旅消费 · 城市治理 · 数字内容' },
  ],

  stageMeta: {
    benchmark: { label: '已有标杆', order: 1, cls: 'accent' },
    pilot: { label: 'POC 验证中', order: 2, cls: 'pilot' },
    trial: { label: '可试用', order: 3, cls: '' },
    plan: { label: '方案储备', order: 4, cls: 'plan' },
  },

  matrix: {
    '吴兴区': {
      type: '市辖区',
      industries: ['童装', '美妆', '物流装备'],
      sectors: {
        primary: {
          count: 3,
          pills: ['白茶采摘期预测', '渔业水质调控', '菱湖数字鱼舱'],
          scenes: [
            { name: '白茶采摘期预测', icon: 'spark', desc: '结合微气象与积温模型预测春茶最佳采摘期，降低霜冻受损风险。', stage: 'pilot', agents: 2, agentId: 'CASE-MAN-018' },
            { name: '渔业水质调控（菱湖数字鱼舱）', icon: 'chart', desc: '溶氧、pH 与水温在线监测与增氧联动，高密度养殖成活率提升 12%。', stage: 'benchmark', agents: 2, agentId: 'CASE-MAN-001' },
            { name: '水产饲料精准投喂优化', icon: 'target', desc: '依据鱼群摄食声学与水温曲线动态调整投喂量，饵料系数降低 8%。', stage: 'plan', agents: 1, agentId: 'CASE-MAN-017' },
          ],
        },
        secondary: {
          count: 6,
          pills: ['童装花型设计', '面料 AI 质检', '电商客服', '物流排产'],
          scenes: [
            { name: '童装款式与花型设计', icon: 'spark', desc: '款式描述生成花型与配色，设计周期由 3 天缩短至 4 小时。', stage: 'benchmark', agents: 3, agentId: 'CASE-MAN-002' },
            { name: '面料与成衣 AI 质检', icon: 'target', desc: '疵点在线识别并分级，替代人工全检，漏检率可量化。', stage: 'pilot', agents: 2, agentId: 'CASE-MAN-004' },
            { name: '电商客服与售后', icon: 'users', desc: '多平台会话统一接入，退换货意图识别与自动建单。', stage: 'trial', agents: 2, agentId: 'CASE-OFF-004' },
            { name: '物流装备排产与调度', icon: 'layers', desc: '订单交期驱动的排产建议，异常插单自动重排。', stage: 'plan', agents: 1, agentId: 'CASE-MAN-013' },
            { name: '童装爆款趋势与备料预测', icon: 'chart', desc: '聚合电商热词与历史出货数据，提前 30 天预测面料采购量。', stage: 'trial', agents: 2, agentId: 'CASE-MAN-017' },
            { name: '织里童装外贸询盘转化', icon: 'language', desc: '多语种款式册自动生成与跨境客户询盘秒级应答。', stage: 'trial', agents: 2, agentId: 'CASE-OFF-014' },
          ],
        },
        tertiary: {
          count: 2,
          pills: ['美妆供应链风险', '城市防汛智能研判'],
          scenes: [
            { name: '美妆供应链风险监测', icon: 'shield', desc: '原料合规、供应商舆情与包材交期异常实时预警，降低断供风险。', stage: 'benchmark', agents: 2, agentId: 'CASE-MAN-005' },
            { name: '城市防汛与河道智能研判', icon: 'map', desc: '融合雨情水情与视频巡检，自动生成排涝调度建议。', stage: 'pilot', agents: 1, agentId: 'CASE-GOV-004' },
          ],
        },
      },
    },
    '南浔区': {
      type: '市辖区',
      industries: ['木业家居', '电梯', '智能电机'],
      sectors: {
        primary: {
          count: 2,
          pills: ['稻渔综合种养', '桑基鱼塘生态监测'],
          scenes: [
            { name: '稻渔综合种养智能管护', icon: 'spark', desc: '水位、水质与病虫害联动监测，实现稻鱼共生精准农事提醒。', stage: 'pilot', agents: 1, agentId: 'CASE-MAN-018' },
            { name: '桑基鱼塘生态碳汇核算', icon: 'chart', desc: '遥感与物联网数据融合，自动生成生态养殖环境评估报告。', stage: 'plan', agents: 1, agentId: 'CASE-MAN-001' },
          ],
        },
        secondary: {
          count: 5,
          pills: ['板材选型报价', '电梯预测性运维', '生产排程', 'BOM 报价'],
          scenes: [
            { name: '木业家居板材选型报价', icon: 'table', desc: '输入家装尺寸与环保等级，5 秒自动筛选基材并输出选型报价单。', stage: 'benchmark', agents: 2, agentId: 'CASE-MAN-006' },
            { name: '电梯设备预测性运维', icon: 'cpu', desc: '运行数据实时采集，AI 提前 14—30 天预警故障，非计划停机降 85%。', stage: 'benchmark', agents: 3, agentId: 'CASE-MAN-007' },
            { name: '智能电机车间生产排程', icon: 'layers', desc: '多工序设备负载自动平衡，排产周期由 3 小时压缩至 20 分钟。', stage: 'pilot', agents: 2, agentId: 'CASE-MAN-013' },
            { name: '整木定制 BOM 销售报价', icon: 'receipt', desc: '自然语言解析定制需求，逐层展开 BOM 并自动核对物料成本。', stage: 'trial', agents: 2, agentId: 'CASE-MAN-012' },
            { name: '电机硅钢片冲压视觉质检', icon: 'target', desc: '高速相机配合视觉小模型识别毛刺与尺寸偏差，替代人工抽检。', stage: 'plan', agents: 1, agentId: 'CASE-MAN-004' },
          ],
        },
        tertiary: {
          count: 3,
          pills: ['南浔古镇数字讲解', '文旅客流预测', '商户信用治理'],
          scenes: [
            { name: '南浔古镇多语种数字讲解', icon: 'mic', desc: '基于位置感知与古镇历史知识库，为游客提供个性化伴游解说。', stage: 'benchmark', agents: 2, agentId: 'CASE-OFF-004' },
            { name: '古镇景区客流疏导与预测', icon: 'chart', desc: '节假日客流热力预测与游船、接驳车动态排班调度。', stage: 'pilot', agents: 1, agentId: 'CASE-MAN-016' },
            { name: '文旅街区商户合规与口碑监测', icon: 'shield', desc: '多平台游客评价情感分析与投诉工单自动分派。', stage: 'trial', agents: 1, agentId: 'CASE-GOV-003' },
          ],
        },
      },
    },
    '德清县': {
      type: '县',
      industries: ['地理信息', '生物医药', '通航'],
      sectors: {
        primary: {
          count: 4,
          pills: ['测绘数据质检', '低空巡检', '农田遥感估产'],
          scenes: [
            { name: '时空测绘数据智能质检', icon: 'map', desc: '图层拓扑与属性合规自动校验，测绘内业质检效率提升 3 倍。', stage: 'benchmark', agents: 2, agentId: 'CASE-MAN-001' },
            { name: '无人机低空农林巡检', icon: 'compass', desc: '通航无人机巡航影像自动识别农田长势、违建与林区火情隐患。', stage: 'benchmark', agents: 2, agentId: 'CASE-MAN-004' },
            { name: '耕地保护遥感智能比对', icon: 'layers', desc: '多时相卫星影像自动提取疑似非农化图斑并生成外业核查单。', stage: 'pilot', agents: 1, agentId: 'CASE-GOV-004' },
            { name: '淡水珍珠养殖水体监测', icon: 'chart', desc: '养殖水域叶绿素与溶解氧智能预测，指导精准换水与增氧。', stage: 'plan', agents: 1, agentId: 'CASE-MAN-018' },
          ],
        },
        secondary: {
          count: 4,
          pills: ['生物医药合规审查', '厂区安全巡检', '实验文献洞察'],
          scenes: [
            { name: '生物医药 GMP 合规审查', icon: 'shield', desc: '自动比对药典与 GMP 条款，辅助审查批生产记录与申报文书。', stage: 'benchmark', agents: 2, agentId: 'CASE-MAN-002' },
            { name: '化工与医药厂区安全巡检', icon: 'factory', desc: 'CV 视觉识别未戴护具、跑冒滴漏与禁区闯入，分钟级闭环告警。', stage: 'pilot', agents: 2, agentId: 'CASE-MAN-004' },
            { name: '新药研发文献与专利洞察', icon: 'file', desc: '批量解析国内外靶点文献与专利，10 分钟生成结构化综述简报。', stage: 'trial', agents: 2, agentId: 'CASE-OFF-015' },
            { name: '具身智能训练数据集治理', icon: 'cpu', desc: '依托地理信息空间底座，提供多模态仿真与实采数据清洗标注。', stage: 'plan', agents: 1, agentId: 'CASE-IT-006' },
          ],
        },
        tertiary: {
          count: 5,
          pills: ['地理信息时空服务', '智能网联测试', '污染源 AI 监管'],
          scenes: [
            { name: '地理信息时空问数服务', icon: 'map', desc: '自然语言查询城市部件、规划地块与人口热力，秒级生成专题图。', stage: 'benchmark', agents: 3, agentId: 'CASE-MAN-001' },
            { name: '智能网联汽车路测分析', icon: 'cpu', desc: '车路协同感知数据自动标注极端 Corner Case，加速算法迭代。', stage: 'pilot', agents: 2, agentId: 'CASE-IT-001' },
            { name: '莫干山智慧文旅与民宿管家', icon: 'users', desc: '整合周边步道、房态与餐饮推荐，提供 24 小时多语种AI管家。', stage: 'trial', agents: 2, agentId: 'CASE-OFF-004' },
            { name: '生态环境污染源 AI 监管', icon: 'shield', desc: '排污口在线监测数据与用电量交叉核验，异常排污自动溯源。', stage: 'pilot', agents: 1, agentId: 'CASE-GOV-003' },
            { name: '园区政务事项材料智审', icon: 'file', desc: '企业申报材料预审与缺件提醒，一次办结率提升至 96%。', stage: 'trial', agents: 2, agentId: 'CASE-GOV-001' },
          ],
        },
      },
    },
    '长兴县': {
      type: '县',
      industries: ['新能源电池', '汽车零部件', '绿色建材'],
      sectors: {
        primary: {
          count: 2,
          pills: ['茶园与农事管理', '芦笋大棚环控'],
          scenes: [
            { name: '紫笋茶园微气象与农事管理', icon: 'spark', desc: '山地茶园温湿度与土壤墒情监测，自动推送施肥与防霜冻指令。', stage: 'pilot', agents: 1, agentId: 'CASE-MAN-018' },
            { name: '设施大棚智能温光水肥环控', icon: 'cpu', desc: '根据作物生长期自动调节遮阳与滴灌，节水节肥 20% 以上。', stage: 'plan', agents: 1, agentId: 'CASE-MAN-017' },
          ],
        },
        secondary: {
          count: 5,
          pills: ['电池工艺优化', '能耗预测管控', '零部件质检'],
          scenes: [
            { name: '新能源电池工艺参数优化', icon: 'cpu', desc: '分析历史实验与产线检测数据，推荐涂布与化成最优参数组合。', stage: 'benchmark', agents: 3, agentId: 'CASE-MAN-015' },
            { name: '高耗能产线能耗预测与管控', icon: 'chart', desc: '覆盖园区与车间负荷预测，日均 MAPE < 5%，辅助削峰填谷。', stage: 'benchmark', agents: 2, agentId: 'CASE-MAN-018' },
            { name: '汽车零部件表面缺陷视觉质检', icon: 'target', desc: '压铸件气孔、划痕与尺寸公差在线检测，单件耗时 < 0.3 秒。', stage: 'pilot', agents: 2, agentId: 'CASE-MAN-004' },
            { name: '正负极原材料消耗与备料预测', icon: 'layers', desc: '联动排产、BOM 与碳酸锂行情，提前识别供应缺口并优化安全库存。', stage: 'trial', agents: 2, agentId: 'CASE-MAN-017' },
            { name: '多基地汽配物流路径规划', icon: 'map', desc: '跨厂区循环取货（Milk-run）与满载率联合求解，运输成本降 10%。', stage: 'trial', agents: 2, agentId: 'CASE-MAN-016' },
          ],
        },
        tertiary: {
          count: 2,
          pills: ['太湖龙之梦导览', '危化品运输监管'],
          scenes: [
            { name: '太湖龙之梦演艺与酒店智能导览', icon: 'users', desc: '超大型度假区演艺场次、停车与接驳路线实时问答，分流高峰客群。', stage: 'pilot', agents: 2, agentId: 'CASE-OFF-004' },
            { name: '新能源危化运输车辆轨迹安全监管', icon: 'shield', desc: '偏航、疲劳驾驶与禁行区闯入实时预警，保障危化品物流安全。', stage: 'plan', agents: 1, agentId: 'CASE-MAN-005' },
          ],
        },
      },
    },
    '安吉县': {
      type: '县',
      industries: ['绿色家居', '竹产业', '白茶'],
      sectors: {
        primary: {
          count: 5,
          pills: ['白茶种植与溯源', '湖羊智慧养殖', '竹材分级'],
          scenes: [
            { name: '安吉白茶数字化种植与区块链溯源', icon: 'spark', desc: '一茶一码绑定茶园地块、采摘与炒制工单，守护原产地品牌溢价。', stage: 'benchmark', agents: 2, agentId: 'CASE-MAN-005' },
            { name: '湖羊智慧养殖与疫病早筛', icon: 'target', desc: '圈舍巡检机器人结合体况视觉识别，日均增重与妊娠分群自动化。', stage: 'pilot', agents: 2, agentId: 'CASE-MAN-004' },
            { name: '毛竹竹材视觉分级与出材率优化', icon: 'layers', desc: '按竹径、壁厚与竹节瑕疵自动分选切割方案，竹材综合利用率提 9%。', stage: 'pilot', agents: 1, agentId: 'CASE-MAN-006' },
            { name: '竹林碳汇遥感监测与交易测算', icon: 'chart', desc: '卫星遥感结合样地模型自动核算林区固碳量，支撑竹林碳汇交易。', stage: 'trial', agents: 1, agentId: 'CASE-MAN-001' },
            { name: '茶园病虫害图像识别助手', icon: 'search', desc: '茶农手机拍照即可识别茶小绿叶蝉等病虫害并获取绿色防控处方。', stage: 'plan', agents: 1, agentId: 'CASE-EDU-005' },
          ],
        },
        secondary: {
          count: 4,
          pills: ['椅业柔性生产', '外贸销售开单', '集装箱三维装箱'],
          scenes: [
            { name: '绿色家居（椅业）柔性排产', icon: 'factory', desc: '应对小批量多款式外贸插单，自动匹配缝纫、发泡与总装产线节拍。', stage: 'benchmark', agents: 2, agentId: 'CASE-MAN-013' },
            { name: '外贸家具多语种销售开单', icon: 'language', desc: '海外询盘邮件自动抽取SKU、数量与交期，草稿生成由 6 分钟缩至 90 秒。', stage: 'benchmark', agents: 2, agentId: 'CASE-MAN-011' },
            { name: '出口发货履约风控与三维装箱', icon: 'box', desc: '核验提货信用余额并优化高柜混装方案，单柜容积利用率提升 7%。', stage: 'trial', agents: 2, agentId: 'CASE-MAN-010' },
            { name: '办公椅人体工学坐感仿真辅助', icon: 'cpu', desc: '基于体压分布历史数据推荐网布张力与腰托曲率，缩短新品开模周期。', stage: 'plan', agents: 1, agentId: 'CASE-MAN-015' },
          ],
        },
        tertiary: {
          count: 3,
          pills: ['民宿运营与导览', '露营营地选址', '绿水青山生态巡护'],
          scenes: [
            { name: '乡村精品民宿智能运营与导览', icon: 'users', desc: '自动生成小红书/抖音种草文案，7×24 小时解答房型、交通与竹海玩法。', stage: 'benchmark', agents: 2, agentId: 'CASE-OFF-004' },
            { name: '文旅新业态（咖啡/露营）选址评估', icon: 'compass', desc: '融合客流POI、景观视线与路网可达性，5 分钟输出铺位与营地选址报告。', stage: 'trial', agents: 2, agentId: 'CASE-OFF-019' },
            { name: '“两山”生态河道与竹海智能巡护', icon: 'shield', desc: '视频与声学监测非法捕捞、乱倒垃圾及森林火险，守护绿水青山。', stage: 'pilot', agents: 1, agentId: 'CASE-GOV-004' },
          ],
        },
      },
    },
  },

  elements: [
    {
      key: 'compute',
      name: '算力',
      icon: 'cpu',
      value: 1000,
      unit: 'P',
      desc: '浙北 Token 运营平台统筹全市算力调度，已纳管 1000P、服务政企客户 30 余家。',
      foot: ['可调度 512P', '本月 +36P'],
      source: 'platform',
      period: '2026-11',
    },
    {
      key: 'data',
      name: '数据',
      icon: 'table',
      value: 1.6,
      decimals: 1,
      unit: '亿元',
      desc: '数据交易流通平台具备汇聚治理与合规流通能力，登记交易金额超 1.6 亿元。',
      foot: ['高质量数据集 32 个', '本月 +4'],
      source: 'platform',
      period: '2026-11',
    },
    {
      key: 'model',
      name: '模型',
      icon: 'layers',
      value: 300,
      unit: '+',
      desc: '通用大模型与垂类模型统一接入，支持私有化部署与微调。',
      foot: ['垂类模型 12 个', '本月 +3'],
      source: 'platform',
      period: '2026-11',
    },
    {
      key: 'agent',
      name: '智能体 / Skill',
      icon: 'bot',
      value: 78,
      unit: '个',
      desc: '按行业归档的智能体与常用 Skill，支持在线试用与定制交付。',
      foot: ['覆盖 9 类行业', '本月 +6'],
      source: 'platform',
      period: '2026-11',
    },
    {
      key: 'token',
      name: 'Token',
      icon: 'chart',
      value: 1.2,
      decimals: 1,
      unit: '亿 / 月',
      desc: '统一计量与计费，企业按实际调用付费，无需预付大额算力。',
      foot: ['均价 3.2 元 / 百万', '环比 +18%'],
      source: 'platform',
      period: '2026-11',
    },
  ],

  supplyChain: [
    '浙北 Token 运营平台',
    '算力调度',
    '模型与数据集',
    '智能体与 Skill',
    '区县 / 园区 / 企业场景',
  ],

  baseCaps: [
    { icon: 'box', title: '统一纳管', desc: '算力、模型、数据集统一编目，一处申请多处复用' },
    { icon: 'spark', title: '弹性供给', desc: '按场景峰值弹性扩容，闲时释放，降低冗余支出' },
    { icon: 'chart', title: '成效可计量', desc: '调用量、成本与业务成效同屏呈现，便于复盘' },
  ],
};
