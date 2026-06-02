import * as echarts from "echarts";

const DESIGN_WIDTH = 1672;
const DESIGN_HEIGHT = 941;

const fallbackData = {
metrics: [
  { label: "AI识别风险", value: "238", note: "较昨日", delta: "▲ 18%", tone: "blue" },
  { label: "高风险事件", value: "23", note: "较昨日", delta: "▲ 9%", tone: "orange" },
  { label: "图谱命中", value: "156", note: "风险链路", delta: "命中", tone: "green" },
  { label: "待复核", value: "18", note: "AI低置信", delta: "需确认", tone: "orange" },
  { label: "案例匹配", value: "42", note: "历史案例", delta: "可复用", tone: "blue" },
  { label: "闭环率", value: "92.6%", note: "较昨日", delta: "▲ 3.2%", tone: "green" },
],

typeData: [
  { name: "包装破损", value: 86, percent: "36.1%", color: "#1d83ff" },
  { name: "风味异常", value: 62, percent: "26.1%", color: "#24d7cb" },
  { name: "漏液", value: 38, percent: "16.0%", color: "#725cff" },
  { name: "变质", value: 28, percent: "11.8%", color: "#ff9b22" },
  { name: "异物", value: 24, percent: "10.1%", color: "#28c79b" },
],

focusEvents: [
  {
    level: "高风险",
    title: "酸角美式风味异常反馈上升",
    meta: ["AI判断：原料风味波动 / 门店操作污染", "置信度：82%｜关联节点：产品、批次、供应商", "相似案例：3条｜建议：冻结同批次原浆并抽检"],
    state: ["处理中", "中高风险"],
    tone: "high",
    icon: "AI",
  },
  {
    level: "较高风险",
    title: "华东仓包装破损与漏液异常",
    meta: ["AI判断：运输挤压 / 包装密封强度不足", "置信度：76%｜关联节点：仓库、物流、批次", "相似案例：2条｜建议：复核近7日破损与温控记录"],
    state: ["待复核", "较高风险"],
    tone: "orange",
    icon: "KG",
  },
  {
    level: "中风险",
    title: "果酸类饮品涩感负评集中",
    meta: ["AI判断：原料成熟度 / 配方稳定性相关", "置信度：71%｜关联节点：配方、原料、门店", "相似案例：4条｜建议：横向比对同供应商批次"],
    state: ["分析中", "中风险"],
    tone: "cyan",
    icon: "QA",
  },
  {
    level: "低风险",
    title: "门店SOP执行偏差造成出品不一致",
    meta: ["AI判断：人员操作偏差 / 培训覆盖不足", "置信度：68%｜关联节点：门店、SOP、稽核", "相似案例：1条｜建议：推送稽核复训任务"],
    state: ["已闭环", "100%"],
    tone: "cyan",
    icon: "OK",
  },
],

taskRows: [
  ["复核酸角原浆批次", "风味异常", "质量审核部", "高", "处理中"],
  ["检查华东仓冷链记录", "温控异常", "仓储物流", "中", "待处理"],
  ["复盘果酸类饮品案例", "负评上升", "质量管理部", "中", "已生成"],
  ["抽检同供应商近30日批次", "供应商链路", "供应商质量", "高", "处理中"],
  ["推送高反馈城市门店稽核", "门店操作", "区域运营", "中", "待处理"],
  ["生成本周质量风险简报", "多源信号", "质量管理部", "低", "已生成"],
],

bottomCards: [
  { title: "大模型服务", value: "99.2%", base: "在线率", delta: "稳定", good: true, data: [88, 91, 93, 95, 94, 96, 95, 97, 96, 99] },
  { title: "图谱节点", value: "12.8万", base: "产品/原料/批次", delta: "▲ 426", good: true, data: [38, 42, 49, 55, 58, 64, 70, 82, 86, 91] },
  { title: "数据源接入", value: "9/12", base: "待接入", delta: "质检/舆情", good: false, data: [20, 22, 35, 40, 42, 45, 60, 62, 70, 75] },
  { title: "人工复核一致率", value: "88.4%", base: "近7日", delta: "▲ 2.1%", good: true, data: [70, 72, 71, 78, 80, 77, 84, 85, 87, 88] },
  { title: "知识追溯耗时", value: "18s", base: "平均", delta: "▼ 6s", good: true, data: [55, 48, 45, 42, 38, 34, 31, 27, 24, 18] },
],
mapPoints: [
  { name: "北京", value: [116.4074, 39.9042, 86], level: "high" },
  { name: "上海", value: [121.4737, 31.2304, 78], level: "higher" },
  { name: "广州", value: [113.2644, 23.1291, 64], level: "higher" },
  { name: "深圳", value: [114.0579, 22.5431, 58], level: "high" },
  { name: "成都", value: [104.0665, 30.5723, 52], level: "mid" },
  { name: "武汉", value: [114.3054, 30.5931, 46], level: "mid" },
  { name: "郑州", value: [113.6254, 34.7466, 38], level: "mid" },
  { name: "西安", value: [108.9398, 34.3416, 32], level: "low" },
  { name: "杭州", value: [120.1551, 30.2741, 42], level: "low" },
  { name: "沈阳", value: [123.4315, 41.8057, 28], level: "low" },
  { name: "昆明", value: [102.8329, 24.8801, 24], level: "low" },
],
aiJudgement: {
  title: "酸角美式风味异常",
  level: "中高风险",
  confidence: "82%",
  reasons: ["近7日消费者负面反馈上升明显", "异常关键词集中在“酸涩”“发酵味”“不新鲜”", "PQNC存在同类异常风味记录", "图谱显示与果酸类原料风味波动案例相似"],
  actions: ["抽检当前批次酸角原浆", "排查高反馈城市门店操作记录", "提高该原料批次监测频率", "横向比对同供应商近30日供货批次"],
},
cases: [
  { name: "生椰果肉变紫案例", score: "86%", reason: "原料氧化、颜色异常、反馈集中", result: "调整储存条件" },
  { name: "柿子饮品涩感案例", score: "79%", reason: "风味负反馈集中、原料成熟度相关", result: "更换供应商批次" },
  { name: "苹果鲜奶絮状物案例", score: "72%", reason: "配方稳定性、酸奶/果汁体系相关", result: "优化配方比例" },
],
signals: [
  { name: "消费者反馈", state: "异常上升", tone: "high", value: "+18%" },
  { name: "PQNC", state: "同类记录", tone: "orange", value: "7条" },
  { name: "质检数据", state: "待接入", tone: "mid", value: "2项" },
  { name: "门店稽核", state: "局部偏差", tone: "orange", value: "12店" },
  { name: "仓储物流", state: "包装破损上升", tone: "high", value: "+9%" },
  { name: "供应商数据", state: "中等风险", tone: "mid", value: "3家" },
],
riskRanks: [
  { name: "酸角美式", type: "产品", score: 92, desc: "风味负评 + 图谱链路命中" },
  { name: "酸角原浆供应商A", type: "供应商", score: 87, desc: "历史案例相似 + 批次集中" },
  { name: "华东仓", type: "仓库", score: 76, desc: "破损与温控信号叠加" },
  { name: "果酸类饮品", type: "品类", score: 72, desc: "涩感反馈持续出现" },
],
knowledgeNode: {
  name: "酸角原浆 20250518批次",
  type: "批次节点",
  risks: "风味异常、负评上升、PQNC命中",
  history: "历史问题 4 次",
  explanation: "该批次连接酸角美式、华东仓和高反馈城市门店，且与果酸类原料风味波动案例存在相似路径。",
  action: "建议冻结该批次待检，并回溯同供应商近30日批次。",
},
};

const overviewProducts = [
  {
    id: "brand",
    name: "品牌总览",
    short: "全品牌风险态势",
    data: {
      ...fallbackData,
      aiJudgement: {
        title: "全品牌质量风险态势",
        level: "中高风险",
        confidence: "87%",
        reasons: ["果味涩感、椰肉氧化、酸角风味与酒精版包装风险同时进入监测", "消费者反馈与供应商批次数据形成多条风险链路", "知识图谱已命中原料、供应商、批次、仓储和门店节点"],
        actions: ["优先处理高风险产品链路", "按产品切换查看细分证据", "同步生成供应商与门店复核任务", "持续监控新品发布与舆情反馈"],
      },
      focusEvents: [
        { level: "中高风险", title: "好柿成双果味涩追溯到供应商B成熟度不足", meta: ["AI判断：两家供应商中供应商B成熟度偏低", "置信度：86%｜关联节点：原料、供应商、批次", "建议：冻结疑似批次并复核糖酸比"], state: ["处理中", "中高风险"], tone: "high", icon: "柿" },
        { level: "中风险", title: "一整颗生椰果肉不成熟反馈疑似氧化误判", meta: ["AI判断：椰肉氧化造成颜色和口感感知差异", "置信度：91%｜关联节点：椰肉、包装、货架期", "建议：发布前提前告知天然感官差异"], state: ["预警中", "中风险"], tone: "orange", icon: "椰" },
        { level: "中高风险", title: "酸角美式风味异常反馈上升", meta: ["AI判断：酸角原浆批次风味波动", "置信度：82%｜关联节点：原浆、批次、仓库", "建议：抽检20250518批次并排查门店操作"], state: ["处理中", "中高风险"], tone: "high", icon: "酸" },
        { level: "高风险", title: "绯色月光（酒精版）未成年人及玻璃破碎风险", meta: ["AI判断：酒精版提示不足 / 玻璃包装破损", "置信度：84%｜关联节点：产品、包装、门店宣导", "建议：强化购买提示与包装破损监控"], state: ["待复核", "高风险"], tone: "high", icon: "酒" },
      ],
      mapPoints: [
        { name: "上海", value: [121.4737, 31.2304, 88], level: "high" },
        { name: "杭州", value: [120.1551, 30.2741, 76], level: "higher" },
        { name: "广州", value: [113.2644, 23.1291, 72], level: "higher" },
        { name: "深圳", value: [114.0579, 22.5431, 68], level: "higher" },
        { name: "北京", value: [116.4074, 39.9042, 64], level: "mid" },
        { name: "成都", value: [104.0665, 30.5723, 58], level: "mid" },
        { name: "武汉", value: [114.3054, 30.5931, 52], level: "mid" },
        { name: "南京", value: [118.7969, 32.0603, 46], level: "low" },
      ],
      riskRanks: [
        { name: "好柿成双", type: "产品", score: 91, desc: "柿子成熟度不足链路命中" },
        { name: "绯色月光（酒精版）", type: "新品", score: 88, desc: "未成年人提示 + 玻璃破损风险" },
        { name: "一整颗生椰", type: "产品", score: 84, desc: "椰肉氧化感官误判预警" },
        { name: "酸角美式", type: "产品", score: 82, desc: "酸角原浆风味批次波动" },
      ],
      graphNodes: [
        { name: "品牌质量风险", x: 80, y: 180, symbolSize: 72, category: 0 },
        { name: "好柿成双", x: 240, y: 100, symbolSize: 56, category: 1 },
        { name: "一整颗生椰", x: 240, y: 190, symbolSize: 56, category: 1 },
        { name: "酸角美式", x: 240, y: 280, symbolSize: 54, category: 1 },
        { name: "绯色月光酒精版", x: 240, y: 370, symbolSize: 58, category: 1 },
        { name: "成熟度不足", x: 470, y: 100, symbolSize: 58, category: 2 },
        { name: "椰肉氧化", x: 470, y: 190, symbolSize: 60, category: 2 },
        { name: "酸角原浆批次", x: 470, y: 280, symbolSize: 56, category: 4 },
        { name: "未成年人/玻璃风险", x: 470, y: 370, symbolSize: 62, category: 7 },
        { name: "管控任务流", x: 720, y: 235, symbolSize: 66, category: 8 },
      ],
      graphLinks: [["品牌质量风险", "好柿成双"], ["品牌质量风险", "一整颗生椰"], ["品牌质量风险", "酸角美式"], ["品牌质量风险", "绯色月光酒精版"], ["好柿成双", "成熟度不足"], ["一整颗生椰", "椰肉氧化"], ["酸角美式", "酸角原浆批次"], ["绯色月光酒精版", "未成年人/玻璃风险"], ["成熟度不足", "管控任务流"], ["椰肉氧化", "管控任务流"], ["酸角原浆批次", "管控任务流"], ["未成年人/玻璃风险", "管控任务流"]],
    },
  },
  {
    id: "persimmon",
    name: "好柿成双",
    short: "柿子成熟度",
    data: {
      ...fallbackData,
      metrics: [
        { label: "AI识别风险", value: "46", note: "柿子链路", delta: "▲ 12%", tone: "blue" },
        { label: "高风险事件", value: "7", note: "成熟度", delta: "中高", tone: "orange" },
        { label: "图谱命中", value: "21", note: "节点", delta: "命中", tone: "green" },
        { label: "待复核", value: "5", note: "供应商B", delta: "需确认", tone: "orange" },
        { label: "案例匹配", value: "4", note: "涩感案例", delta: "可复用", tone: "blue" },
        { label: "闭环率", value: "78.5%", note: "处理中", delta: "推进", tone: "green" },
      ],
      focusEvents: [
        { level: "中高风险", title: "好柿成双果味涩集中反馈", meta: ["AI判断：供应商B柿子成熟度不足", "置信度：86%｜关联节点：供应商B、PS20250518批次", "建议：复核成熟度、糖酸比和到货感官记录"], state: ["处理中", "中高风险"], tone: "high", icon: "柿" },
        { level: "较高风险", title: "两家供应商批次表现分化", meta: ["AI判断：供应商A稳定，供应商B偏离目标线", "置信度：83%｜关联节点：供应商、批次", "建议：横向比对近30日到货指标"], state: ["待复核", "较高风险"], tone: "orange", icon: "KG" },
      ],
      mapPoints: [{ name: "上海", value: [121.4737, 31.2304, 86], level: "high" }, { name: "杭州", value: [120.1551, 30.2741, 78], level: "higher" }, { name: "广州", value: [113.2644, 23.1291, 62], level: "mid" }],
      aiJudgement: { title: "好柿成双果味涩", level: "中高风险", confidence: "86%", reasons: ["涩感反馈集中于供应商B批次覆盖门店", "成熟度检测显示供应商B柿子成熟度偏低", "历史柿子成熟度波动案例相似度高"], actions: ["冻结供应商B疑似批次", "复核糖酸比与感官指标", "抽检反馈门店使用批次", "更新柿子成熟度验收规则"] },
      cases: [{ name: "柿子饮品涩感案例", score: "86%", reason: "成熟度不足、涩感反馈集中", result: "复核供应商成熟度" }, { name: "供应商批次差异案例", score: "76%", reason: "两家供应商表现分化", result: "供应商批次分级" }],
      signals: [{ name: "消费者反馈", state: "涩感上升", tone: "high", value: "+22%" }, { name: "供应商数据", state: "B偏低", tone: "high", value: "2批" }, { name: "PQNC", state: "门店上报", tone: "orange", value: "9条" }, { name: "质检数据", state: "待复核", tone: "mid", value: "3项" }, { name: "仓储周转", state: "局部延长", tone: "orange", value: "18店" }, { name: "历史案例", state: "高相似", tone: "high", value: "4条" }],
      riskRanks: [{ name: "供应商B柿子原料", type: "供应商", score: 91, desc: "成熟度偏低" }, { name: "PS20250518批次", type: "批次", score: 88, desc: "涩感反馈集中" }, { name: "上海门店组", type: "区域", score: 78, desc: "反馈高发" }],
      knowledgeNode: { name: "供应商B柿子原料", type: "供应商 / 原料", risks: "成熟度不足、涩感集中", history: "历史问题 6 次", explanation: "该节点连接好柿成双、PS20250518批次和门店涩感反馈，是当前最关键疑似源头。", action: "冻结疑似批次并复核成熟度、糖酸比。" },
      graphNodes: [{ name: "好柿成双果味涩", x: 70, y: 180, symbolSize: 72, category: 0 }, { name: "好柿成双", x: 220, y: 150, symbolSize: 58, category: 1 }, { name: "柿子果浆", x: 360, y: 150, symbolSize: 56, category: 2 }, { name: "供应商A", x: 520, y: 90, symbolSize: 50, category: 3 }, { name: "供应商B成熟度不足", x: 520, y: 205, symbolSize: 66, category: 7 }, { name: "PS20250518批次", x: 700, y: 205, symbolSize: 60, category: 4 }, { name: "门店涩感反馈", x: 860, y: 160, symbolSize: 56, category: 7 }, { name: "成熟度波动案例", x: 700, y: 300, symbolSize: 56, category: 8 }],
      graphLinks: [["好柿成双果味涩", "好柿成双"], ["好柿成双", "柿子果浆"], ["柿子果浆", "供应商A"], ["柿子果浆", "供应商B成熟度不足"], ["供应商B成熟度不足", "PS20250518批次"], ["PS20250518批次", "门店涩感反馈"], ["供应商B成熟度不足", "成熟度波动案例"]],
    },
  },
  {
    id: "coconut",
    name: "一整颗生椰",
    short: "椰肉氧化",
    data: {
      ...fallbackData,
      metrics: [
        { label: "AI识别风险", value: "38", note: "氧化误判", delta: "预警", tone: "blue" },
        { label: "高风险事件", value: "3", note: "舆情", delta: "中", tone: "orange" },
        { label: "图谱命中", value: "19", note: "节点", delta: "命中", tone: "green" },
        { label: "待复核", value: "4", note: "氧化指标", delta: "需确认", tone: "orange" },
        { label: "案例匹配", value: "5", note: "生椰案例", delta: "高相似", tone: "blue" },
        { label: "闭环率", value: "84.0%", note: "预警", delta: "提升", tone: "green" },
      ],
      focusEvents: [{ level: "中风险", title: "一整颗生椰果肉不成熟反馈", meta: ["AI判断：更可能是椰肉氧化造成感官误判", "置信度：91%｜关联节点：椰肉、包装、货架期", "建议：发布前同步天然色差与氧化风险说明"], state: ["预警中", "中风险"], tone: "orange", icon: "椰" }],
      mapPoints: [{ name: "北京", value: [116.4074, 39.9042, 72], level: "higher" }, { name: "上海", value: [121.4737, 31.2304, 68], level: "higher" }, { name: "南京", value: [118.7969, 32.0603, 48], level: "mid" }],
      aiJudgement: { title: "一整颗生椰果肉反馈", level: "中风险", confidence: "91%", reasons: ["消费者将颜色和口感差异描述为不成熟", "历史生椰果肉氧化案例高度相似", "质检未见明显成熟度异常但有轻微氧化迹象"], actions: ["复核椰肉氧化指标", "确认包装与储存条件", "准备发布前消费者告知话术", "同步客服与门店解释口径"] },
      cases: [{ name: "生椰果肉变紫案例", score: "91%", reason: "椰肉氧化、感官误判", result: "调整储存并提前解释" }, { name: "新品感官预期管理案例", score: "78%", reason: "上市初期认知差异", result: "提前告知产品特点" }],
      signals: [{ name: "消费者反馈", state: "不成熟集中", tone: "orange", value: "+15%" }, { name: "历史案例", state: "高相似", tone: "high", value: "5条" }, { name: "感官复核", state: "轻微氧化", tone: "orange", value: "2批" }, { name: "包装储存", state: "需确认", tone: "mid", value: "3项" }, { name: "客服话术", state: "待同步", tone: "mid", value: "1版" }, { name: "舆情模拟", state: "可缓释", tone: "low", value: "-28%" }],
      riskRanks: [{ name: "椰子果肉氧化风险", type: "机理", score: 91, desc: "感官误判高相似" }, { name: "CO20250518批次", type: "批次", score: 72, desc: "轻微氧化迹象" }, { name: "发布前告知", type: "管控", score: 87, desc: "降低市场误解" }],
      knowledgeNode: { name: "椰子果肉氧化风险", type: "风险机理", risks: "颜色变深、口感差异、感官误判", history: "历史问题 5 次", explanation: "客户反馈的不成熟与椰肉氧化案例高度相似，应提前管理市场预期。", action: "复核氧化指标并同步上市前风险告知。" },
      graphNodes: [{ name: "生椰果肉反馈", x: 70, y: 180, symbolSize: 72, category: 0 }, { name: "一整颗生椰", x: 220, y: 150, symbolSize: 58, category: 1 }, { name: "椰子果肉", x: 360, y: 150, symbolSize: 56, category: 2 }, { name: "椰肉氧化风险", x: 520, y: 205, symbolSize: 66, category: 7 }, { name: "包装/储存/货架期", x: 700, y: 160, symbolSize: 58, category: 5 }, { name: "客户误判不成熟", x: 860, y: 160, symbolSize: 56, category: 7 }, { name: "发布前风险告知", x: 700, y: 300, symbolSize: 58, category: 8 }],
      graphLinks: [["生椰果肉反馈", "一整颗生椰"], ["一整颗生椰", "椰子果肉"], ["椰子果肉", "椰肉氧化风险"], ["椰肉氧化风险", "包装/储存/货架期"], ["包装/储存/货架期", "客户误判不成熟"], ["椰肉氧化风险", "发布前风险告知"]],
    },
  },
  {
    id: "tamarind",
    name: "酸角美式",
    short: "原浆风味",
    data: fallbackData,
  },
  {
    id: "moonlight",
    name: "绯色月光（酒精版）",
    short: "酒精/玻璃风险",
    data: {
      ...fallbackData,
      metrics: [
        { label: "AI识别风险", value: "52", note: "新品风险", delta: "▲ 16%", tone: "blue" },
        { label: "高风险事件", value: "9", note: "酒精/玻璃", delta: "高", tone: "orange" },
        { label: "图谱命中", value: "24", note: "节点", delta: "命中", tone: "green" },
        { label: "待复核", value: "8", note: "门店宣导", delta: "需确认", tone: "orange" },
        { label: "案例匹配", value: "6", note: "新品案例", delta: "可复用", tone: "blue" },
        { label: "闭环率", value: "69.8%", note: "预防中", delta: "推进", tone: "green" },
      ],
      focusEvents: [
        { level: "高风险", title: "绯色月光（酒精版）未成年人误触风险", meta: ["AI判断：酒精版标签与门店提示需强化", "置信度：84%｜关联节点：产品、门店、消费者沟通", "建议：增加年龄提示与购买确认流程"], state: ["待复核", "高风险"], tone: "high", icon: "18" },
        { level: "较高风险", title: "玻璃包装破碎与割伤/漏液风险", meta: ["AI判断：运输挤压与玻璃瓶强度风险叠加", "置信度：81%｜关联节点：包装、仓库、物流", "建议：抽检包装强度并复核破损记录"], state: ["处理中", "较高风险"], tone: "orange", icon: "玻" },
      ],
      mapPoints: [{ name: "上海", value: [121.4737, 31.2304, 82], level: "high" }, { name: "深圳", value: [114.0579, 22.5431, 74], level: "higher" }, { name: "成都", value: [104.0665, 30.5723, 58], level: "mid" }, { name: "北京", value: [116.4074, 39.9042, 54], level: "mid" }],
      aiJudgement: { title: "绯色月光（酒精版）风险", level: "高风险", confidence: "84%", reasons: ["酒精版产品存在未成年人误触或误购风险", "玻璃包装在运输与门店搬运中存在破碎风险", "新品发布阶段消费者认知和门店提示尚需统一"], actions: ["强化酒精版年龄提示", "配置门店购买确认与话术", "抽检玻璃包装强度", "复核物流破损与漏液记录"] },
      cases: [{ name: "酒精版新品提示不足案例", score: "84%", reason: "消费者认知与门店提示不足", result: "增加年龄提示" }, { name: "玻璃瓶运输破损案例", score: "81%", reason: "包装强度与运输挤压相关", result: "调整外箱防护" }],
      signals: [{ name: "门店宣导", state: "待强化", tone: "high", value: "42店" }, { name: "包装破损", state: "局部上升", tone: "orange", value: "+11%" }, { name: "年龄提示", state: "待确认", tone: "high", value: "1项" }, { name: "物流记录", state: "破损命中", tone: "orange", value: "6条" }, { name: "舆情风险", state: "需监控", tone: "mid", value: "中" }, { name: "管控措施", state: "生成中", tone: "low", value: "5项" }],
      riskRanks: [{ name: "未成年人误触风险", type: "合规", score: 92, desc: "酒精版提示不足" }, { name: "玻璃瓶包装", type: "包装", score: 86, desc: "破碎与漏液风险" }, { name: "门店购买确认", type: "流程", score: 79, desc: "宣导执行待复核" }],
      knowledgeNode: { name: "酒精版年龄提示与玻璃包装", type: "合规 / 包装节点", risks: "未成年人误触、玻璃破碎、漏液割伤", history: "历史问题 3 次", explanation: "该节点连接新品发布、门店宣导、包装运输和消费者沟通，是绯色月光酒精版的关键前置管控点。", action: "发布前强化年龄提示、购买确认与玻璃包装强度抽检。" },
      graphNodes: [{ name: "绯色月光酒精版风险", x: 70, y: 180, symbolSize: 72, category: 0 }, { name: "绯色月光酒精版", x: 240, y: 150, symbolSize: 58, category: 1 }, { name: "酒精版提示", x: 420, y: 110, symbolSize: 62, category: 7 }, { name: "未成年人误触", x: 620, y: 110, symbolSize: 62, category: 7 }, { name: "玻璃包装", x: 420, y: 245, symbolSize: 58, category: 4 }, { name: "破碎/漏液记录", x: 620, y: 245, symbolSize: 56, category: 7 }, { name: "门店宣导管控", x: 810, y: 175, symbolSize: 60, category: 8 }],
      graphLinks: [["绯色月光酒精版风险", "绯色月光酒精版"], ["绯色月光酒精版", "酒精版提示"], ["酒精版提示", "未成年人误触"], ["绯色月光酒精版", "玻璃包装"], ["玻璃包装", "破碎/漏液记录"], ["未成年人误触", "门店宣导管控"], ["破碎/漏液记录", "门店宣导管控"]],
    },
  },
];

const traceCases = [
  {
    id: "persimmon",
    name: "好柿成双果味涩",
    short: "柿子成熟度追溯",
    defaultSelectedNodeId: "persimmonSupplierB",
    eventInfo: {
      name: "好柿成双果味涩",
      level: "中高风险",
      code: "QR-20250520-101",
      time: "2025-05-20 10:32",
      regions: "华东、华南",
      products: "好柿成双、柿子拿铁",
      status: "处理中",
      confidence: "86%",
      hitNodes: "21",
    },
    linkSummary: {
      chain: ["好柿成双果味涩", "柿子果浆 / 柿子原料", "供应商A / 供应商B", "供应商B成熟度不足", "门店反馈涩感", "消费者负评集中", "历史成熟度波动案例"],
      hotNodes: ["供应商B成熟度不足", "门店反馈涩感"],
      source: "供应商B柿子成熟度不足",
      scope: "2 个区域 / 18 家门店 / 4 个批次",
      evidence: "消费者反馈、门店上报、成熟度检测、历史案例",
      action: "优先复核供应商B近两批柿子成熟度与到货感官记录",
    },
    hitStats: [
      ["命中节点数", "21"],
      ["历史案例", "4"],
      ["涉及产品", "2"],
      ["供应商", "2"],
      ["涉及批次", "4"],
      ["证据数据", "39"],
    ],
    nodeDetails: {
      persimmonSupplierB: {
        name: "供应商B柿子原料",
        type: "供应商 / 原料",
        products: "好柿成双、柿子拿铁",
        supplier: "供应商B",
        batches: "PS20250518、PS20250519",
        abnormal: "14",
        history: "6",
        level: "中高",
        tags: ["果味涩", "成熟度不足", "糖酸比偏低"],
        explanation: "该供应商批次与门店涩感反馈、成熟度检测偏低和历史成熟度波动案例同时命中，是当前链路中最关键的疑似源头节点。",
      },
      persimmonBatch: {
        name: "PS20250518 批次",
        type: "批次",
        products: "好柿成双",
        supplier: "供应商B",
        batches: "PS20250518",
        abnormal: "9",
        history: "2",
        level: "中高",
        tags: ["到货成熟度低", "涩感集中", "华东仓"],
        explanation: "该批次覆盖上海、杭州部分门店，反馈时间与到货后使用窗口高度重合，建议冻结同批次库存并做感官复测。",
      },
      persimmonFeedback: {
        name: "消费者涩感反馈",
        type: "消费者反馈",
        products: "好柿成双",
        supplier: "供应商B",
        batches: "PS20250518",
        abnormal: "23",
        history: "4",
        level: "中",
        tags: ["涩", "不甜", "果味生"],
        explanation: "反馈关键词集中在涩感和果味生，和成熟度不足的风险特征一致，可作为辅助证据但需要结合原料检测确认。",
      },
    },
    graphNodes: [
      { id: "persimmonEvent", name: "好柿成双果味涩", type: "event", x: 70, y: 220, score: 92 },
      { id: "persimmonProduct", name: "好柿成双", type: "product", x: 210, y: 170, score: 78 },
      { id: "persimmonFormula", name: "柿子果味配方", type: "formula", x: 350, y: 120, score: 65 },
      { id: "persimmonPulp", name: "柿子果浆", type: "ingredient", x: 350, y: 235, score: 74 },
      { id: "persimmonSupplierA", name: "供应商A", type: "supplier", x: 520, y: 92, score: 42 },
      { id: "persimmonSupplierB", name: "供应商B柿子原料", type: "supplier", x: 520, y: 235, score: 91 },
      { id: "persimmonBatch", name: "PS20250518批次", type: "batch", x: 680, y: 235, score: 88 },
      { id: "eastWarehouse", name: "华东仓", type: "warehouse", x: 830, y: 185, score: 63 },
      { id: "storeFeedback", name: "门店涩感上报", type: "pqnc", x: 980, y: 136, score: 82 },
      { id: "persimmonFeedback", name: "消费者负评集中", type: "feedback", x: 980, y: 252, score: 86 },
      { id: "persimmonCase", name: "成熟度波动案例", type: "case", x: 680, y: 360, score: 79 },
      { id: "persimmonControl", name: "冻结供应商B批次", type: "control", x: 830, y: 360, score: 90 },
    ],
    graphLinks: [
      ["persimmonEvent", "persimmonProduct", "normal"],
      ["persimmonProduct", "persimmonFormula", "normal"],
      ["persimmonProduct", "persimmonPulp", "normal"],
      ["persimmonPulp", "persimmonSupplierA", "normal"],
      ["persimmonPulp", "persimmonSupplierB", "risk"],
      ["persimmonSupplierB", "persimmonBatch", "risk"],
      ["persimmonBatch", "eastWarehouse", "risk"],
      ["eastWarehouse", "storeFeedback", "risk"],
      ["eastWarehouse", "persimmonFeedback", "risk"],
      ["persimmonSupplierB", "persimmonCase", "normal"],
      ["persimmonBatch", "persimmonControl", "risk"],
    ],
    evidenceRows: [
      ["门店反馈", "门店上报", "果味涩感明显，集中在好柿成双出品", "好柿成双", "05-20", 86],
      ["供应商数据", "成熟度检测", "供应商B柿子成熟度偏低，糖酸比低于目标线", "供应商B柿子原料", "05-18", 88],
      ["PQNC", "门店异常单", "同批次门店连续上报涩感与果味生", "PS20250518批次", "05-19", 82],
      ["仓储记录", "华东仓", "该批次集中发往上海、杭州门店", "华东仓", "05-18", 74],
      ["历史案例", "案例库", "柿子类原料成熟度波动导致涩感反馈", "成熟度波动案例", "2024-11", 79],
    ],
  },
  {
    id: "coconut",
    name: "一整颗生椰果肉不成熟反馈",
    short: "椰肉氧化预警",
    defaultSelectedNodeId: "coconutOxidation",
    eventInfo: {
      name: "一整颗生椰果肉不成熟反馈",
      level: "中风险",
      code: "QR-20250520-102",
      time: "2025-05-20 09:48",
      regions: "华东、华北",
      products: "一整颗生椰",
      status: "预警中",
      confidence: "91%",
      hitNodes: "19",
    },
    linkSummary: {
      chain: ["一整颗生椰果肉反馈", "椰子果肉", "氧化敏感物料", "包装 / 储存 / 货架期", "客户误判“不成熟”", "历史生椰果肉氧化案例", "新品发布前风险告知"],
      hotNodes: ["氧化敏感物料", "新品发布前风险告知"],
      source: "椰子果肉氧化造成感官误判",
      scope: "2 个区域 / 12 家门店 / 2 个批次",
      evidence: "历史案例、客服反馈、感官记录、发布策略",
      action: "新品发布前提前告知果肉氧化造成的颜色与口感差异",
    },
    hitStats: [
      ["命中节点数", "19"],
      ["历史案例", "5"],
      ["涉及产品", "1"],
      ["供应商", "2"],
      ["涉及批次", "2"],
      ["证据数据", "36"],
    ],
    nodeDetails: {
      coconutOxidation: {
        name: "椰子果肉氧化风险",
        type: "风险机理",
        products: "一整颗生椰",
        supplier: "椰肉供应商A、供应商C",
        batches: "CO20250516、CO20250518",
        abnormal: "8",
        history: "5",
        level: "中",
        tags: ["氧化", "颜色变深", "感官误判"],
        explanation: "客户反馈中的“不成熟”与历史生椰果肉氧化案例高度相似。模型判断更可能是氧化导致颜色和口感变化，建议发布前进行风险说明，降低市场误解。",
      },
      coconutNotice: {
        name: "新品发布前风险告知",
        type: "管控措施",
        products: "一整颗生椰",
        supplier: "质量管理部 / 市场部",
        batches: "上市策略",
        abnormal: "0",
        history: "3",
        level: "低",
        tags: ["提前告知", "市场沟通", "舆情缓释"],
        explanation: "在新品发布内容中增加果肉氧化与天然感官差异说明，可提前建立消费者预期，避免将氧化误认为原料不成熟。",
      },
      coconutFeedback: {
        name: "客户不成熟反馈",
        type: "消费者反馈",
        products: "一整颗生椰",
        supplier: "椰肉供应商A",
        batches: "CO20250518",
        abnormal: "17",
        history: "4",
        level: "中",
        tags: ["不成熟", "颜色偏深", "口感差异"],
        explanation: "反馈关键词与历史氧化案例存在强关联，但不能单独证明原料不成熟，应结合感官检测和货架期记录判断。",
      },
    },
    graphNodes: [
      { id: "coconutEvent", name: "一整颗生椰果肉反馈", type: "event", x: 70, y: 220, score: 82 },
      { id: "coconutProduct", name: "一整颗生椰", type: "product", x: 220, y: 168, score: 72 },
      { id: "coconutFormula", name: "生椰配方", type: "formula", x: 365, y: 115, score: 58 },
      { id: "coconutMeat", name: "椰子果肉", type: "ingredient", x: 365, y: 235, score: 76 },
      { id: "coconutSupplierA", name: "椰肉供应商A", type: "supplier", x: 530, y: 122, score: 64 },
      { id: "coconutOxidation", name: "椰子果肉氧化风险", type: "ingredient", x: 530, y: 258, score: 91 },
      { id: "coconutBatch", name: "CO20250518批次", type: "batch", x: 690, y: 258, score: 68 },
      { id: "coconutStorage", name: "包装 / 储存 / 货架期", type: "warehouse", x: 830, y: 190, score: 72 },
      { id: "coconutFeedback", name: "客户误判不成熟", type: "feedback", x: 980, y: 146, score: 82 },
      { id: "coconutCase", name: "生椰果肉氧化案例", type: "case", x: 690, y: 362, score: 91 },
      { id: "coconutNotice", name: "新品发布前风险告知", type: "control", x: 850, y: 362, score: 87 },
      { id: "coconutQuality", name: "感官复核记录", type: "quality", x: 980, y: 262, score: 76 },
    ],
    graphLinks: [
      ["coconutEvent", "coconutProduct", "normal"],
      ["coconutProduct", "coconutFormula", "normal"],
      ["coconutProduct", "coconutMeat", "normal"],
      ["coconutMeat", "coconutSupplierA", "normal"],
      ["coconutMeat", "coconutOxidation", "risk"],
      ["coconutOxidation", "coconutBatch", "risk"],
      ["coconutBatch", "coconutStorage", "normal"],
      ["coconutStorage", "coconutFeedback", "risk"],
      ["coconutOxidation", "coconutCase", "risk"],
      ["coconutCase", "coconutNotice", "risk"],
      ["coconutStorage", "coconutQuality", "normal"],
    ],
    evidenceRows: [
      ["消费者反馈", "客服与社媒", "椰子果肉不成熟、颜色偏深、口感有差异", "一整颗生椰", "05-20", 82],
      ["历史案例", "案例库", "生椰果肉氧化导致颜色与口感误判", "椰子果肉", "2024-09", 91],
      ["管控措施", "上市提示", "新品发布前提示果肉氧化风险和感官差异", "发布策略", "预发布", 87],
      ["感官记录", "质检复核", "批次未见明显成熟度异常，存在轻微氧化迹象", "CO20250518批次", "05-18", 78],
      ["舆情模拟", "模型预测", "提前说明后负面扩散风险预计下降", "新品发布前风险告知", "预发布", 84],
    ],
  },
  {
    id: "tamarind",
    name: "酸角美式风味异常",
    short: "酸角原浆批次波动",
    defaultSelectedNodeId: "tamarindPulpBatch",
    eventInfo: {
      name: "酸角美式风味异常",
      level: "中高风险",
      code: "QR-20250520-201",
      time: "2025-05-20 11:06",
      regions: "华东、华南",
      products: "酸角美式、酸角冰茶",
      status: "处理中",
      confidence: "82%",
      hitNodes: "18",
    },
    linkSummary: {
      chain: ["酸角美式风味异常", "酸角原浆", "20250518 批次", "华东仓", "上海、杭州门店", "酸涩 / 发酵味反馈", "果酸类原料风味波动案例"],
      hotNodes: ["20250518 批次", "酸涩 / 发酵味反馈"],
      source: "酸角原浆近期批次风味波动",
      scope: "2 个区域 / 14 家门店 / 3 个批次",
      evidence: "消费者反馈、PQNC、仓储记录、历史案例",
      action: "抽检 20250518 批次酸角原浆并排查高反馈门店操作记录",
    },
    hitStats: [["命中节点数", "18"], ["历史案例", "5"], ["涉及产品", "2"], ["供应商", "1"], ["涉及批次", "3"], ["证据数据", "36"]],
    nodeDetails: {
      tamarindPulpBatch: {
        name: "酸角原浆 20250518 批次",
        type: "批次 / 原料",
        products: "酸角美式、酸角冰茶",
        supplier: "酸角原浆供应商A",
        batches: "20250518、20250519",
        abnormal: "12",
        history: "4",
        level: "中高",
        tags: ["酸涩", "发酵味", "风味波动"],
        explanation: "该批次连接酸角美式、华东仓和高反馈门店，且与果酸类原料风味波动案例高度相似，建议优先抽检感官与理化指标。",
      },
      tamarindFeedback: {
        name: "酸涩 / 发酵味反馈",
        type: "消费者反馈",
        products: "酸角美式",
        supplier: "酸角原浆供应商A",
        batches: "20250518",
        abnormal: "26",
        history: "5",
        level: "中高",
        tags: ["酸涩", "发酵味", "不新鲜"],
        explanation: "反馈关键词在近7日上升，并与PQNC异常风味记录重合，是当前风险研判的重要证据节点。",
      },
    },
    graphNodes: [
      { id: "tamarindEvent", name: "酸角美式风味异常", type: "event", x: 70, y: 220, score: 90 },
      { id: "tamarindProduct", name: "酸角美式", type: "product", x: 220, y: 160, score: 78 },
      { id: "tamarindPulp", name: "酸角原浆", type: "ingredient", x: 380, y: 200, score: 82 },
      { id: "tamarindSupplier", name: "原浆供应商A", type: "supplier", x: 540, y: 130, score: 72 },
      { id: "tamarindPulpBatch", name: "20250518批次", type: "batch", x: 540, y: 260, score: 88 },
      { id: "tamarindWarehouse", name: "华东仓", type: "warehouse", x: 700, y: 210, score: 70 },
      { id: "tamarindStores", name: "上海/杭州门店", type: "warehouse", x: 860, y: 155, score: 76 },
      { id: "tamarindFeedback", name: "酸涩发酵味反馈", type: "feedback", x: 1010, y: 155, score: 86 },
      { id: "tamarindPqnc", name: "PQNC异常风味", type: "pqnc", x: 860, y: 285, score: 82 },
      { id: "tamarindCase", name: "果酸原料波动案例", type: "case", x: 700, y: 360, score: 79 },
      { id: "tamarindControl", name: "抽检并隔离批次", type: "control", x: 1010, y: 285, score: 88 },
    ],
    graphLinks: [["tamarindEvent", "tamarindProduct", "normal"], ["tamarindProduct", "tamarindPulp", "normal"], ["tamarindPulp", "tamarindSupplier", "normal"], ["tamarindPulp", "tamarindPulpBatch", "risk"], ["tamarindPulpBatch", "tamarindWarehouse", "risk"], ["tamarindWarehouse", "tamarindStores", "normal"], ["tamarindStores", "tamarindFeedback", "risk"], ["tamarindWarehouse", "tamarindPqnc", "risk"], ["tamarindPulpBatch", "tamarindCase", "normal"], ["tamarindPqnc", "tamarindControl", "risk"]],
    evidenceRows: [
      ["消费者反馈", "社媒/客服", "酸涩、发酵味、不新鲜关键词上升", "酸角美式", "05-20", 86],
      ["PQNC", "门店上报", "酸角类饮品出现异常风味", "酸角原浆", "05-19", 82],
      ["仓储记录", "华东仓", "该批次覆盖上海、杭州门店", "20250518批次", "05-18", 74],
      ["历史案例", "案例库", "果酸类原料风味波动案例", "酸角原浆", "2024-09", 79],
      ["管控措施", "质量审核", "建议抽检并临时隔离疑似批次", "抽检并隔离批次", "05-20", 88],
    ],
  },
  {
    id: "moonlight",
    name: "绯色月光（酒精版）风险追溯",
    short: "未成年人 / 玻璃破碎",
    defaultSelectedNodeId: "moonlightAlcoholNotice",
    eventInfo: {
      name: "绯色月光（酒精版）风险追溯",
      level: "高风险",
      code: "QR-20250520-301",
      time: "2025-05-20 14:18",
      regions: "华东、华南、华北",
      products: "绯色月光（酒精版）",
      status: "待复核",
      confidence: "84%",
      hitNodes: "24",
    },
    linkSummary: {
      chain: ["绯色月光（酒精版）", "酒精版标签 / 购买提示", "门店宣导", "未成年人误触风险", "玻璃瓶包装", "物流破损 / 漏液记录", "上市前管控措施"],
      hotNodes: ["未成年人误触风险", "物流破损 / 漏液记录"],
      source: "酒精版提示不足与玻璃包装破损风险叠加",
      scope: "3 个区域 / 42 家门店 / 2 类风险节点",
      evidence: "门店宣导记录、包装检测、物流破损、历史新品合规案例",
      action: "强化年龄提示、购买确认和玻璃包装强度抽检",
    },
    hitStats: [["命中节点数", "24"], ["历史案例", "6"], ["涉及产品", "1"], ["供应商", "2"], ["涉及批次", "5"], ["证据数据", "41"]],
    nodeDetails: {
      moonlightAlcoholNotice: {
        name: "酒精版年龄提示",
        type: "合规 / 门店宣导",
        products: "绯色月光（酒精版）",
        supplier: "市场沟通 / 区域运营",
        batches: "上市宣导包",
        abnormal: "8",
        history: "3",
        level: "高",
        tags: ["未成年人", "酒精提示", "购买确认"],
        explanation: "酒精版产品需要在页面、物料和门店话术中明确年龄提示及购买确认。该节点是避免未成年人误触或误购的关键前置管控点。",
      },
      moonlightGlass: {
        name: "玻璃瓶包装破损风险",
        type: "包装 / 物流",
        products: "绯色月光（酒精版）",
        supplier: "玻璃瓶供应商、物流承运商",
        batches: "GL20250516、GL20250518",
        abnormal: "11",
        history: "4",
        level: "中高",
        tags: ["玻璃破碎", "漏液", "割伤"],
        explanation: "物流破损与玻璃瓶强度记录共同命中，建议复核外箱防护、瓶体强度和门店开箱检查流程。",
      },
    },
    graphNodes: [
      { id: "moonlightEvent", name: "绯色月光酒精版风险", type: "event", x: 70, y: 220, score: 94 },
      { id: "moonlightProduct", name: "绯色月光（酒精版）", type: "product", x: 235, y: 170, score: 84 },
      { id: "moonlightAlcoholNotice", name: "酒精版年龄提示", type: "control", x: 435, y: 115, score: 92 },
      { id: "moonlightStore", name: "门店宣导", type: "warehouse", x: 635, y: 115, score: 80 },
      { id: "moonlightMinor", name: "未成年人误触风险", type: "feedback", x: 835, y: 115, score: 90 },
      { id: "moonlightBottle", name: "玻璃瓶包装", type: "batch", x: 435, y: 280, score: 82 },
      { id: "moonlightGlass", name: "玻璃破碎/漏液记录", type: "pqnc", x: 635, y: 280, score: 86 },
      { id: "moonlightCase", name: "新品合规提示案例", type: "case", x: 835, y: 280, score: 78 },
      { id: "moonlightControl", name: "上市前管控措施", type: "control", x: 1010, y: 200, score: 91 },
    ],
    graphLinks: [["moonlightEvent", "moonlightProduct", "normal"], ["moonlightProduct", "moonlightAlcoholNotice", "risk"], ["moonlightAlcoholNotice", "moonlightStore", "risk"], ["moonlightStore", "moonlightMinor", "risk"], ["moonlightProduct", "moonlightBottle", "normal"], ["moonlightBottle", "moonlightGlass", "risk"], ["moonlightMinor", "moonlightControl", "risk"], ["moonlightGlass", "moonlightControl", "risk"], ["moonlightCase", "moonlightControl", "normal"]],
    evidenceRows: [
      ["合规风险", "新品评审", "酒精版产品需强化年龄提示与购买确认", "酒精版年龄提示", "预发布", 84],
      ["门店稽核", "区域运营", "部分门店宣导物料尚未完成铺设", "门店宣导", "05-20", 76],
      ["包装记录", "包装检测", "玻璃瓶抗压与外箱防护需复核", "玻璃瓶包装", "05-18", 81],
      ["物流记录", "仓储物流", "局部破损、漏液记录上升", "玻璃破碎/漏液记录", "05-19", 86],
      ["历史案例", "案例库", "酒精版新品提示不足与包装破损处置案例", "新品合规提示案例", "2024-12", 78],
    ],
  },
];

const analysisCases = [
  {
    id: "persimmon",
    name: "好柿成双果味涩",
    short: "供应商成熟度研判",
    eventInfo: {
      name: "好柿成双果味涩",
      level: "中高风险",
      code: "QR-20250520-101",
      confidence: "86%",
      graphHits: "21",
      historyCases: "4",
      products: "2",
      suppliers: "2",
      status: "处理中",
    },
    judgement: {
      level: "中高风险",
      primaryCause: "供应商B柿子成熟度不足",
      secondaryCause: "仓储周转差异、门店出品波动",
      priority: "高",
      confidence: "86%",
      text: "当前“好柿成双果味涩”事件综合风险等级为中高。结合门店反馈、供应商成熟度检测、PQNC 与历史涩感案例，当前风险更可能与供应商B近批次柿子成熟度不足有关。建议优先复核供应商B相关批次成熟度、糖酸比与到货感官记录，并对反馈集中门店进行抽检确认。",
    },
    reasonCards: [
      ["原料成熟度", "存在成熟度不足可能", "供应商B批次反馈集中出现“涩”“果味生”“不甜”", "高", 88],
      ["配方稳定性", "暂未发现明显配方变更", "好柿成双当前配方版本稳定，近期未发现调整记录", "低", 66],
      ["供应商批次", "需优先复核供应商B", "两家供应商中供应商B成熟度检测低于目标线", "高", 86],
      ["仓储周转", "存在放大感官差异可能", "部分区域周转窗口更长，可能放大涩感体验", "中", 71],
      ["门店出品", "部分门店出品差异可能存在", "负面反馈集中于上海、杭州部分门店", "中", 69],
      ["消费者涩感反馈", "负面反馈阶段性上升", "近7日涩感、不甜、果味生关键词明显上升", "高", 89],
    ],
    similarCases: [
      ["柿子饮品涩感案例", 86, "风味负评集中、原料成熟度相关", "复核供应商成熟度", "复查供应商B柿子成熟度和糖酸比"],
      ["果酸类原料成熟度波动案例", 79, "酸味原料批次差异、区域反馈集中", "批次隔离与抽检", "横向对比同供应商批次"],
      ["供应商成熟度批次差异案例", 76, "两家供应商表现分化明显", "供应商批次分级", "标记供应商B疑似批次"],
      ["柿子果浆涩感投诉案例", 72, "消费者涩感描述相近", "优化到货验收标准", "补充成熟度验收阈值"],
    ],
    actionAdvice: {
      immediate: ["冻结/标记供应商B疑似批次", "复核柿子成熟度与糖酸比", "抽检反馈门店使用批次", "提高涩感关键词监测频率"],
      shortTerm: ["未来7天持续监测好柿成双反馈", "对供应商A/B批次进行横向比对", "复查华东仓周转与到货记录", "对高反馈城市门店做出品复核"],
      longTerm: ["沉淀柿子成熟度风险案例", "更新柿子原料成熟度预警规则", "补充供应商批次波动标签", "完善季节性水果验收标准"],
    },
    taskRows: [
      ["抽检供应商B柿子批次", "好柿成双果味涩", "复核成熟度、糖酸比与感官指标", "质量审核部", "高", "今日", "待处理"],
      ["核查两家供应商批次差异", "好柿成双果味涩", "对比供应商A/B近期到货指标", "供应商质量", "高", "明日", "处理中"],
      ["汇总门店涩感反馈", "好柿成双果味涩", "提取涩、果味生、不甜关键词", "舆情分析", "中", "今日", "已生成"],
      ["复盘柿子成熟度历史案例", "好柿成双果味涩", "对比历史涩感案例处置路径", "质量管理部", "中", "本周", "待处理"],
    ],
    assistantPrompts: ["为什么怀疑供应商B？", "成熟度证据有哪些？", "下一步优先抽检什么？", "两家供应商差异在哪里？", "帮我生成领导汇报摘要。"],
    reportSummary: "本次好柿成双果味涩事件主要集中在华东、华南部分门店。AI 结合门店反馈、供应商成熟度检测与历史案例判断，风险更可能来自供应商B柿子成熟度不足。建议优先冻结疑似批次，复核成熟度与糖酸比，并同步排查反馈集中门店的使用批次。",
  },
  {
    id: "coconut",
    name: "一整颗生椰果肉不成熟反馈",
    short: "氧化感官误判研判",
    eventInfo: {
      name: "一整颗生椰果肉不成熟反馈",
      level: "中风险",
      code: "QR-20250520-102",
      confidence: "91%",
      graphHits: "19",
      historyCases: "5",
      products: "1",
      suppliers: "2",
      status: "预警中",
    },
    judgement: {
      level: "中风险",
      primaryCause: "椰子果肉氧化造成感官误判",
      secondaryCause: "包装储存、上市沟通不足",
      priority: "中高",
      confidence: "91%",
      text: "当前“一整颗生椰果肉不成熟反馈”综合风险等级为中。结合消费者表达、历史生椰果肉氧化案例、感官复核与货架期信息，AI 判断消费者反馈中的“不成熟”更可能与椰子果肉氧化造成的颜色、口感感知差异有关。建议新品发布前同步风险说明与感官预期管理，降低市场误解和舆情反应。",
    },
    reasonCards: [
      ["椰肉氧化", "氧化导致感官误判可能高", "历史生椰果肉变色案例与本次反馈高度相似", "高", 91],
      ["配方稳定性", "暂未发现配方异常", "当前配方体系稳定，未见明显兼容性异常", "低", 68],
      ["供应商批次", "需复核近期批次一致性", "两家椰肉供应商批次感官差异需继续比对", "中", 73],
      ["包装储存", "可能影响氧化速度", "包装与储存窗口可能影响颜色和口感表现", "中", 78],
      ["门店宣导", "上市前说明不足", "门店侧对天然果肉色差和氧化解释不足", "中", 75],
      ["消费者感官误判", "不成熟反馈阶段性上升", "不成熟、颜色偏深、口感差异关键词集中出现", "高", 88],
    ],
    similarCases: [
      ["生椰果肉变紫案例", 91, "椰肉氧化、颜色变化、消费者误解", "调整储存条件并解释天然差异", "发布前提示氧化与感官差异"],
      ["椰肉氧化感官误判案例", 84, "不成熟反馈与氧化表现相似", "增加质检复核和门店话术", "提前准备解释话术"],
      ["新品上市感官预期管理案例", 78, "上市初期反馈波动与认知差异相关", "提前告知产品特点", "同步发布前风险提示"],
      ["果肉颜色差异反馈案例", 74, "天然原料色差被误判为质量问题", "补充消费者说明", "加强包装和页面说明"],
    ],
    actionAdvice: {
      immediate: ["复核椰肉氧化指标", "确认包装与储存条件", "准备上市前消费者告知话术", "同步客服和门店解释口径"],
      shortTerm: ["监测不成熟、变色等关键词", "对两家椰肉供应商批次横向比对", "复查货架期内感官变化", "追踪发布后前7天舆情反馈"],
      longTerm: ["沉淀生椰氧化风险案例", "更新天然果肉色差说明规则", "补充新品上市预警模板", "完善原料氧化风险标签"],
    },
    taskRows: [
      ["复核椰肉氧化指标", "一整颗生椰反馈", "验证颜色、口感与氧化关联", "质量审核部", "高", "今日", "处理中"],
      ["准备上市风险说明", "一整颗生椰反馈", "提前告知果肉氧化和天然色差", "市场沟通", "高", "今日", "待处理"],
      ["统一客服与门店话术", "一整颗生椰反馈", "解释不成熟与氧化感官差异", "客户体验", "中", "明日", "已生成"],
      ["复盘生椰氧化历史案例", "一整颗生椰反馈", "整理类似案例和处置建议", "质量管理部", "中", "本周", "待处理"],
    ],
    assistantPrompts: ["为什么判断为氧化？", "如何提前告知消费者？", "如何避免舆情过激？", "需要复核哪些质检指标？", "帮我生成上市风险提示。"],
    reportSummary: "本次一整颗生椰果肉不成熟反馈更可能与椰子果肉氧化造成的颜色和口感感知差异有关。AI 建议在新品发布前完成氧化指标复核，并同步消费者告知、客服话术和门店说明，提前管理市场预期，降低误解和舆情放大风险。",
  },
];

const chartText = "#cfe6ff";
const axisColor = "rgba(166, 171, 189, 0.52)";
const gridLine = "rgba(166, 171, 189, 0.18)";
const charts = [];
let traceChart = null;
let activeOverviewProductId = "brand";
let overviewFilterOpen = false;
let activeTraceCaseId = "persimmon";
let selectedTraceNodeId = "persimmonSupplierB";
let activeAnalysisCaseId = "persimmon";
let dashboardData = fallbackData;
let overviewChartsInitialized = false;
let overviewMapInitialized = false;
let chinaMapReady = false;

function getOverviewProduct(productId = activeOverviewProductId) {
  return overviewProducts.find((item) => item.id === productId) || overviewProducts[0];
}

function setDashboardDataForProduct(productId = activeOverviewProductId) {
  const product = getOverviewProduct(productId);
  activeOverviewProductId = product.id;
  dashboardData = product.data;
  const label = document.querySelector("#settingsProductView");
  if (label) label.textContent = product.name;
}

function fitStage() {
  const dashboard = document.querySelector("#dashboard");
  const scale = Math.min(window.innerWidth / DESIGN_WIDTH, window.innerHeight / DESIGN_HEIGHT);
  const left = (window.innerWidth - DESIGN_WIDTH * scale) / 2;
  const top = (window.innerHeight - DESIGN_HEIGHT * scale) / 2;
  dashboard.style.transform = `translate(${left}px, ${top}px) scale(${scale})`;
}

async function loadDashboardData() {
  try {
    const response = await fetch("/data/dashboard.json");
    if (!response.ok) return fallbackData;
    return { ...fallbackData, ...(await response.json()) };
  } catch {
    return fallbackData;
  }
}

async function loadChinaGeoJson() {
  const response = await fetch("/data/china.json");
  if (!response.ok) throw new Error("China map geojson failed to load");
  return response.json();
}

function renderMetrics() {
  const root = document.querySelector("#metricCards");
  root.innerHTML = dashboardData.metrics
    .map(
      (item) => `
        <article class="metric-card ${item.tone}">
          <span>${item.label}</span>
          <strong>${item.value}</strong>
          <em>${item.note} <b class="${item.tone === "green" ? "up" : ""}">${item.delta}</b></em>
        </article>
      `,
    )
    .join("");
}

function renderOverviewProductFilter() {
  const card = document.querySelector("#overviewProductFilter");
  const current = document.querySelector("#overviewProductCurrent");
  const trigger = document.querySelector("[data-overview-filter-toggle]");
  const options = document.querySelector("#overviewProductOptions");
  if (!card || !current || !trigger || !options) return;

  const activeProduct = getOverviewProduct();
  current.textContent = activeProduct.name;
  card.classList.toggle("open", overviewFilterOpen);
  trigger.setAttribute("aria-expanded", String(overviewFilterOpen));
  options.innerHTML = overviewProducts
    .map(
      (item) => `
        <button type="button" class="overview-filter-option ${item.id === activeOverviewProductId ? "active" : ""}" data-overview-filter-option="${item.id}">
          <strong>${item.name}</strong>
          <span>${item.short}</span>
        </button>
      `,
    )
    .join("");
}

function closeOverviewProductFilter() {
  if (!overviewFilterOpen) return;
  overviewFilterOpen = false;
  renderOverviewProductFilter();
}

function toggleOverviewProductFilter() {
  overviewFilterOpen = !overviewFilterOpen;
  renderOverviewProductFilter();
}

function selectOverviewProduct(productId) {
  setDashboardDataForProduct(productId);
  overviewFilterOpen = false;
  refreshOverviewView();
  renderAssistantDialog();
}

function renderOverviewModules() {
  renderOverviewProductFilter();
  renderMetrics();
  renderAiJudgement();
  renderCases();
  renderFocusEvents();
  renderSignals();
  renderRiskRank();
  renderTypeLegend();
  renderTaskTable();
  renderBottomCards();
  renderNodeCard();
}

function refreshOverviewView() {
  renderOverviewModules();
  ensureOverviewCharts();
  afterOverviewLayoutUpdate();
}

function enableDragScroll(selector) {
  document.querySelectorAll(selector).forEach((element) => {
    if (element.dataset.dragScrollReady === "true") return;
    element.dataset.dragScrollReady = "true";
    element.classList.add("drag-scroll");

    let active = false;
    let moved = false;
    let startX = 0;
    let startY = 0;
    let scrollLeft = 0;
    let scrollTop = 0;

    element.addEventListener("pointerdown", (event) => {
      if (event.button !== 0) return;
      if (event.target.closest("button, select, input, textarea, a, [data-no-drag]")) return;
      active = true;
      moved = false;
      startX = event.clientX;
      startY = event.clientY;
      scrollLeft = element.scrollLeft;
      scrollTop = element.scrollTop;
      element.classList.add("dragging");
      element.setPointerCapture(event.pointerId);
    });

    element.addEventListener("pointermove", (event) => {
      if (!active) return;
      const deltaX = event.clientX - startX;
      const deltaY = event.clientY - startY;
      if (Math.abs(deltaX) > 4 || Math.abs(deltaY) > 4) moved = true;
      element.scrollLeft = scrollLeft - deltaX;
      element.scrollTop = scrollTop - deltaY;
    });

    const stopDrag = (event) => {
      if (!active) return;
      active = false;
      element.classList.remove("dragging");
      element.dataset.dragMoved = moved ? "true" : "false";
      if (element.hasPointerCapture(event.pointerId)) element.releasePointerCapture(event.pointerId);
      window.setTimeout(() => {
        element.dataset.dragMoved = "false";
      }, 0);
    };

    element.addEventListener("pointerup", stopDrag);
    element.addEventListener("pointercancel", stopDrag);
    element.addEventListener(
      "click",
      (event) => {
        if (element.dataset.dragMoved === "true") {
          event.preventDefault();
          event.stopPropagation();
        }
      },
      true,
    );
  });
}

function checkTextOverflow() {
  const targets = document.querySelectorAll(
    "#overviewPage .panel-head h2, #overviewPage .focus-title, #overviewPage .focus-meta, #overviewPage .focus-state, #overviewPage .risk-verdict h3, #overviewPage .ai-judgement li, #overviewPage .case-item span, #overviewPage .case-item em, #overviewPage .rank-item strong, #overviewPage .rank-item span, #overviewPage td, #overviewPage th, #overviewPage .mini-card h3, #overviewPage .mini-card span, #overviewPage .metric-card span, #overviewPage .metric-card em",
  );

  targets.forEach((element) => {
    element.classList.remove("text-overflowed");
    const overflowed = element.scrollWidth > element.clientWidth + 1 || element.scrollHeight > element.clientHeight + 1;
    if (!overflowed) return;
    element.classList.add("text-overflowed");
    if (!element.title) element.title = element.textContent.trim();
  });
}

function afterOverviewLayoutUpdate() {
  enableDragScroll("#focusList, #aiJudgement, #caseList, #riskRank, .table-panel, #bottomCards, #traceCaseSelector, #traceSummary, #traceNodeDetail, #traceHitStats, .trace-evidence, #analysisCaseSelector, .analysis-assistant, #analysisAssistantPrompts, #analysisJudgement, #analysisReasonCards, .analysis-case-panel, #analysisActionAdvice, .analysis-task-panel, #analysisReportCenter");
  window.requestAnimationFrame(checkTextOverflow);
}

function closeOverviewModules() {
  document.querySelectorAll(".overview-module-panel").forEach((panel) => panel.classList.remove("active"));
  document.querySelectorAll("[data-overview-module]").forEach((button) => button.classList.remove("active"));
}

function toggleOverviewModule(moduleId) {
  const panel = document.getElementById(moduleId);
  const button = document.querySelector(`[data-overview-module="${moduleId}"]`);
  if (!panel || !button) return;
  const shouldOpen = !panel.classList.contains("active");
  closeOverviewModules();
  if (!shouldOpen) return;
  panel.classList.add("active");
  button.classList.add("active");

  if (moduleId === "typeModule") initDonut();
  if (moduleId === "modelModule") initSparks();
  window.setTimeout(() => {
    charts.forEach((chart) => chart.resize());
    afterOverviewLayoutUpdate();
  }, 0);
}

function renderAiJudgement() {
  const data = dashboardData.aiJudgement;
  document.querySelector("#aiJudgement").innerHTML = `
    <div class="risk-verdict">
      <span>综合风险判断</span>
      <strong>${data.level}</strong>
      <em>置信度 ${data.confidence}</em>
    </div>
    <h3>${data.title}</h3>
    <div class="ai-columns">
      <div>
        <b>主要原因</b>
        <ol>${data.reasons.map((item) => `<li>${item}</li>`).join("")}</ol>
      </div>
      <div>
        <b>建议处理</b>
        <ol>${data.actions.map((item) => `<li>${item}</li>`).join("")}</ol>
      </div>
    </div>
  `;
}

function renderCases() {
  document.querySelector("#caseList").innerHTML = dashboardData.cases
    .map(
      (item) => `
        <article class="case-item">
          <div>
            <strong>${item.name}</strong>
            <span>${item.reason}</span>
            <em>处理结果：${item.result}</em>
          </div>
          <b>${item.score}</b>
        </article>
      `,
    )
    .join("");
}

function renderFocusEvents() {
  document.querySelector("#focusList").innerHTML = dashboardData.focusEvents
    .map(
      (event) => `
        <article class="focus-item ${event.tone}">
          <div class="focus-icon">${event.icon}</div>
          <div>
            <div class="focus-title"><span class="badge ${event.tone === "high" ? "high" : event.tone === "orange" ? "orange" : "mid"}">${event.level}</span>${event.title}</div>
            <div class="focus-meta">${event.meta.join("<br />")}</div>
          </div>
          <div class="focus-state">${event.state.join("<br />")}</div>
        </article>
      `,
    )
    .join("");
}

function renderSignals() {
  document.querySelector("#signalGrid").innerHTML = dashboardData.signals
    .map(
      (item) => `
        <article class="signal-card ${item.tone}">
          <span>${item.name}</span>
          <strong>${item.state}</strong>
          <em>${item.value}</em>
        </article>
      `,
    )
    .join("");
}

function renderRiskRank() {
  document.querySelector("#riskRank").innerHTML = dashboardData.riskRanks
    .map(
      (item, index) => `
        <article class="rank-item">
          <b>${index + 1}</b>
          <div>
            <strong>${item.name}</strong>
            <span>${item.type}｜${item.desc}</span>
          </div>
          <em>${item.score}</em>
          <i style="width:${item.score}%"></i>
        </article>
      `,
    )
    .join("");
}

function renderTypeLegend() {
  document.querySelector("#typeLegend").innerHTML = dashboardData.typeData
    .map(
      (item) => `
        <div class="legend-row">
          <i style="background:${item.color}"></i>
          <span>${item.name}</span>
          <b>${item.value}</b>
          <em>${item.percent}</em>
        </div>
      `,
    )
    .join("");
}

function renderTaskTable() {
  document.querySelector("#taskTable").innerHTML = dashboardData.taskRows
    .map(([task, event, owner, priority, status]) => {
      const levelClass = priority === "高" ? "high" : priority === "中" ? "orange" : "low";
      const statusClass = status === "已闭环" || status === "已生成" ? "done" : status === "处理中" ? "processing" : "warning";
      return `
        <tr>
          <td>${task}</td>
          <td>${event}</td>
          <td>${owner}</td>
          <td><span class="badge ${levelClass}">${priority}</span></td>
          <td><span class="status ${statusClass}">${status}</span></td>
        </tr>
      `;
    })
    .join("");
}

function renderBottomCards() {
  document.querySelector("#bottomCards").innerHTML = dashboardData.bottomCards
    .map(
      (item, index) => `
        <article class="mini-card">
          <h3>${item.title}</h3>
          <div>
            <strong>${item.value}</strong>
            <span>${item.base} <b class="${item.good ? "" : "warn"}">${item.delta}</b></span>
          </div>
          <div class="spark" id="spark${index}"></div>
        </article>
      `,
    )
    .join("");
}

function renderNodeCard() {
  const item = dashboardData.knowledgeNode;
  document.querySelector("#nodeCard").innerHTML = `
    <span>${item.type}</span>
    <strong>${item.name}</strong>
    <p>${item.explanation}</p>
    <dl>
      <dt>关联风险</dt><dd>${item.risks}</dd>
      <dt>历史问题</dt><dd>${item.history}</dd>
      <dt>建议动作</dt><dd>${item.action}</dd>
    </dl>
  `;
}

function makeChart(id, option) {
  disposeChartById(id);
  const chart = echarts.init(document.getElementById(id), null, { renderer: "svg" });
  chart.setOption(option);
  charts.push(chart);
  return chart;
}

function disposeChartById(id) {
  const element = document.getElementById(id);
  if (!element) return;
  const chart = echarts.getInstanceByDom(element);
  if (!chart) return;
  chart.dispose();
  const index = charts.indexOf(chart);
  if (index >= 0) charts.splice(index, 1);
}

function initChinaMap() {
  const colorByLevel = {
    high: "#ff4e49",
    higher: "#ff9b22",
    mid: "#1d83ff",
    low: "#23d9ff",
  };
  makeChart("chinaRiskMap", {
    tooltip: {
      trigger: "item",
      formatter: (params) => {
        if (Array.isArray(params.value)) return `${params.name}<br />风险指数：${params.value[2]}`;
        return `${params.name}`;
      },
    },
    geo: {
      map: "china",
      roam: true,
      zoom: 1.32,
      scaleLimit: { min: 1, max: 3.5 },
      top: 14,
      bottom: 8,
      label: { show: false },
      itemStyle: {
        areaColor: "rgba(15, 70, 132, 0.78)",
        borderColor: "rgba(67, 162, 255, 0.9)",
        borderWidth: 1.1,
        shadowBlur: 20,
        shadowColor: "rgba(29, 131, 255, 0.55)",
      },
      emphasis: {
        itemStyle: {
          areaColor: "rgba(30, 105, 180, 0.9)",
          borderColor: "#68d9ff",
        },
        label: { show: false },
      },
      regions: [
        { name: "南海诸岛", itemStyle: { opacity: 0 } },
      ],
    },
    series: [
      {
        type: "map",
        map: "china",
        geoIndex: 0,
        data: [],
      },
      {
        name: "风险点位",
        type: "effectScatter",
        coordinateSystem: "geo",
        rippleEffect: { brushType: "stroke", scale: 4.2 },
        symbolSize: (value) => Math.max(10, Math.min(20, value[2] / 4)),
        itemStyle: {
          color: (params) => colorByLevel[params.data.level],
          shadowBlur: 18,
          shadowColor: (params) => colorByLevel[params.data.level],
        },
        data: dashboardData.mapPoints,
      },
    ],
  });
}

function initRiskGraph() {
  const graphNodes =
    dashboardData.graphNodes || [
      { name: "酸角美式风味异常", x: 70, y: 180, symbolSize: 72, category: 0 },
      { name: "酸角美式", x: 210, y: 130, symbolSize: 54, category: 1 },
      { name: "酸角原浆", x: 340, y: 130, symbolSize: 54, category: 2 },
      { name: "供应商A", x: 470, y: 92, symbolSize: 52, category: 3 },
      { name: "20250518批次", x: 470, y: 176, symbolSize: 64, category: 4 },
      { name: "华东仓", x: 610, y: 176, symbolSize: 52, category: 5 },
      { name: "上海/杭州门店", x: 740, y: 132, symbolSize: 58, category: 6 },
      { name: "小红书负评上升", x: 740, y: 230, symbolSize: 52, category: 7 },
      { name: "PQNC异常风味", x: 610, y: 278, symbolSize: 52, category: 7 },
      { name: "果酸原料风味波动案例", x: 340, y: 278, symbolSize: 62, category: 8 },
    ];
  const graphLinks =
    dashboardData.graphLinks || [
      ["酸角美式风味异常", "酸角美式"],
      ["酸角美式", "酸角原浆"],
      ["酸角原浆", "供应商A"],
      ["酸角原浆", "20250518批次"],
      ["20250518批次", "华东仓"],
      ["华东仓", "上海/杭州门店"],
      ["上海/杭州门店", "小红书负评上升"],
      ["华东仓", "PQNC异常风味"],
      ["酸角原浆", "果酸原料风味波动案例"],
    ];
  makeChart("riskGraph", {
    tooltip: { trigger: "item" },
    series: [
      {
        type: "graph",
        layout: "none",
        roam: false,
        edgeSymbol: ["none", "arrow"],
        edgeSymbolSize: 8,
        lineStyle: { color: "rgba(35,217,255,0.55)", width: 2, curveness: 0.08 },
        label: { show: true, color: "#e8f5ff", fontSize: 13 },
        emphasis: { focus: "adjacency" },
        data: graphNodes,
        links: graphLinks.map(([source, target]) => ({ source, target })),
        categories: [
          { name: "事件" },
          { name: "产品" },
          { name: "原料" },
          { name: "供应商" },
          { name: "批次" },
          { name: "仓库" },
          { name: "门店" },
          { name: "信号" },
          { name: "案例" },
        ],
        itemStyle: {
          color: (params) => ["#ff4e49", "#23d9ff", "#1d83ff", "#ff9b22", "#725cff", "#26e2b2", "#24d7cb", "#ff9b22", "#7aa7ff"][params.data.category],
          shadowBlur: 18,
          shadowColor: "rgba(35,217,255,0.5)",
        },
      },
    ],
  });
}

function bindViewSwitch() {
  const mapView = document.querySelector("#mapView");
  const graphView = document.querySelector("#graphView");
  document.querySelectorAll("#viewSwitch button").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("#viewSwitch button").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      const isGraph = button.dataset.view === "graph";
      mapView.classList.toggle("active", !isGraph);
      graphView.classList.toggle("active", isGraph);
      if (isGraph) {
        initRiskGraph();
      } else if (chinaMapReady) {
        initChinaMap();
      }
      window.setTimeout(() => charts.forEach((chart) => chart.resize()), 0);
    });
  });
}

function getTraceCase(caseId = activeTraceCaseId) {
  return traceCases.find((item) => item.id === caseId) || traceCases[0];
}

function renderTraceCaseSelector() {
  document.querySelector("#traceCaseSelector").innerHTML = traceCases
    .map(
      (item) => `
        <button class="trace-case-card ${item.id === activeTraceCaseId ? "active" : ""}" data-case-id="${item.id}">
          <strong>${item.name}</strong>
          <span>${item.short}</span>
        </button>
      `,
    )
    .join("");

  document.querySelectorAll(".trace-case-card").forEach((button) => {
    button.addEventListener("click", () => {
      const nextCase = getTraceCase(button.dataset.caseId);
      activeTraceCaseId = nextCase.id;
      selectedTraceNodeId = nextCase.defaultSelectedNodeId;
      renderTracePage();
    });
  });
}

function renderTraceEventInfo(caseId = activeTraceCaseId) {
  const info = getTraceCase(caseId).eventInfo;
  const cells = [
    ["风险等级", info.level, "risk"],
    ["事件编号", info.code],
    ["发生时间", info.time],
    ["涉及区域", info.regions],
    ["涉及产品", info.products],
    ["当前状态", info.status],
    ["AI置信度", info.confidence],
    ["图谱命中节点", info.hitNodes, "hit"],
  ];

  document.querySelector("#traceEventInfo").innerHTML = `
    <article class="event-title-card">
      <span>当前追溯事件</span>
      <strong>${info.name}</strong>
    </article>
    ${cells
      .map(
        ([label, value, tone]) => `
          <article class="event-info-cell ${tone || ""}">
            <span>${label}</span>
            <strong>${value}</strong>
          </article>
        `,
      )
      .join("")}
  `;
}

function renderTraceSummary(caseId = activeTraceCaseId) {
  const summary = getTraceCase(caseId).linkSummary;
  document.querySelector("#traceSummary").innerHTML = `
    <div class="trace-chain">
      ${summary.chain
        .map(
          (item) => `
            <div class="chain-node ${summary.hotNodes.includes(item) ? "hot" : ""}">
              <i></i>
              <span>${item}</span>
            </div>
          `,
        )
        .join("")}
    </div>
    <div class="summary-facts">
      <div class="summary-fact"><b>疑似源头</b><span>${summary.source}</span></div>
      <div class="summary-fact"><b>影响范围</b><span>${summary.scope}</span></div>
      <div class="summary-fact"><b>主要证据</b><span>${summary.evidence}</span></div>
      <div class="summary-fact"><b>建议动作</b><span>${summary.action}</span></div>
    </div>
  `;
}

function getTraceNode(caseId = activeTraceCaseId, nodeId = selectedTraceNodeId) {
  const traceCase = getTraceCase(caseId);
  if (traceCase.nodeDetails[nodeId]) return traceCase.nodeDetails[nodeId];
  const graphNode = traceCase.graphNodes.find((node) => node.id === nodeId);
  if (!graphNode) return traceCase.nodeDetails[traceCase.defaultSelectedNodeId];
  return {
    name: graphNode.name,
    type: graphNode.type,
    products: traceCase.eventInfo.products,
    supplier: "见图谱上游节点",
    batches: "见关联链路",
    abnormal: `${Math.max(1, Math.round(graphNode.score / 12))}`,
    history: `${Math.max(1, Math.round(graphNode.score / 22))}`,
    level: graphNode.score > 85 ? "中高" : graphNode.score > 70 ? "中" : "低",
    tags: ["图谱命中", "关联节点", `风险分${graphNode.score}`],
    explanation: `该节点已被知识图谱命中，当前节点风险分为 ${graphNode.score}。建议结合相邻上下游节点和底部证据数据继续排查。`,
  };
}

function renderNodeDetail(nodeId = selectedTraceNodeId) {
  const detail = getTraceNode(activeTraceCaseId, nodeId);
  document.querySelector("#traceNodeRisk").textContent = `${detail.level}风险`;
  document.querySelector("#traceNodeDetail").innerHTML = `
    <div class="node-summary-card">
      <span>${detail.type}</span>
      <strong>${detail.name}</strong>
      <div class="risk-tags">${detail.tags.map((tag) => `<i>${tag}</i>`).join("")}</div>
      <div class="node-kpis">
        <div class="node-kpi"><b>${detail.abnormal}</b><span>近30日异常</span></div>
        <div class="node-kpi"><b>${detail.history}</b><span>历史问题</span></div>
        <div class="node-kpi"><b>${detail.level}</b><span>风险等级</span></div>
      </div>
    </div>
    <dl class="node-field-list">
      <dt>关联产品</dt><dd>${detail.products}</dd>
      <dt>关联供应商</dt><dd>${detail.supplier}</dd>
      <dt>关联批次</dt><dd>${detail.batches}</dd>
    </dl>
    <div class="node-explain">${detail.explanation}</div>
  `;
}

function renderHitStats(caseId = activeTraceCaseId) {
  document.querySelector("#traceHitStats").innerHTML = getTraceCase(caseId).hitStats
    .map(
      ([label, value]) => `
        <article class="hit-stat">
          <span>${label}</span>
          <strong>${value}</strong>
        </article>
      `,
    )
    .join("");
}

function renderEvidenceTable(caseId = activeTraceCaseId) {
  document.querySelector("#traceEvidenceTable").innerHTML = getTraceCase(caseId).evidenceRows
    .map(
      ([type, source, content, node, time, confidence]) => `
        <tr>
          <td>${type}</td>
          <td>${source}</td>
          <td>${content}</td>
          <td>${node}</td>
          <td>${time}</td>
          <td>
            <div class="confidence-cell">
              <span>${confidence}%</span>
              <div class="confidence-bar"><i style="width:${confidence}%"></i></div>
            </div>
          </td>
        </tr>
      `,
    )
    .join("");
}

function initTraceGraph(caseId = activeTraceCaseId) {
  const traceCase = getTraceCase(caseId);
  const nodeColor = {
    event: "#ff4e49",
    product: "#23d9ff",
    formula: "#24d7cb",
    ingredient: "#26e2b2",
    supplier: "#725cff",
    batch: "#ff9b22",
    warehouse: "#26e2b2",
    pqnc: "#ff9b22",
    feedback: "#ff9b22",
    case: "#185296",
    control: "#26e2b2",
    quality: "#1d83ff",
  };
  const nodesById = new Map(traceCase.graphNodes.map((node) => [node.id, node]));

  if (traceChart) {
    traceChart.dispose();
    const index = charts.indexOf(traceChart);
    if (index >= 0) charts.splice(index, 1);
    traceChart = null;
  }

  traceChart = makeChart("traceGraph", {
    tooltip: {
      formatter: (params) => {
        if (params.dataType !== "node") return "";
        return `${params.data.name}<br />节点风险分：${params.data.score}`;
      },
    },
    series: [
      {
        type: "graph",
        layout: "none",
        roam: false,
        edgeSymbol: ["none", "arrow"],
        edgeSymbolSize: 8,
        label: {
          show: true,
          color: "#e8f5ff",
          fontSize: 12,
          position: "bottom",
          distance: 8,
        },
        emphasis: { focus: "adjacency" },
        data: traceCase.graphNodes.map((node) => {
          const isSelected = node.id === selectedTraceNodeId;
          return {
            ...node,
            symbolSize: node.type === "event" ? 76 : node.score > 85 ? 62 : 50,
            itemStyle: {
              color: nodeColor[node.type],
              borderColor: isSelected ? "#ffffff" : node.type === "case" ? "#23d9ff" : nodeColor[node.type],
              borderWidth: isSelected ? 3 : 1,
              shadowBlur: isSelected ? 28 : 16,
              shadowColor: node.type === "event" || node.score > 85 ? "rgba(255,155,34,0.62)" : "rgba(24,82,150,0.58)",
            },
          };
        }),
        links: traceCase.graphLinks.map(([source, target, type]) => ({
          source: nodesById.get(source).name,
          target: nodesById.get(target).name,
          lineStyle: {
            color: type === "risk" ? "#ff9b22" : "#185296",
            width: type === "risk" ? 4 : 2,
            curveness: 0.08,
            shadowBlur: 10,
            shadowColor: type === "risk" ? "rgba(255,155,34,0.56)" : "rgba(24,82,150,0.72)",
          },
        })),
      },
    ],
  });

  traceChart.on("click", (params) => {
    if (params.dataType !== "node") return;
    selectedTraceNodeId = params.data.id;
    renderNodeDetail(selectedTraceNodeId);
    initTraceGraph(activeTraceCaseId);
  });
}

function renderTracePage() {
  renderTraceCaseSelector();
  renderTraceEventInfo();
  renderTraceSummary();
  renderNodeDetail();
  renderHitStats();
  renderEvidenceTable();
  initTraceGraph();
}

function getAnalysisCase(caseId = activeAnalysisCaseId) {
  return analysisCases.find((item) => item.id === caseId) || analysisCases[0];
}

function renderAnalysisCaseSelector() {
  document.querySelector("#analysisCaseSelector").innerHTML = analysisCases
    .map(
      (item) => `
        <button class="analysis-case-card ${item.id === activeAnalysisCaseId ? "active" : ""}" data-analysis-case-id="${item.id}">
          <strong>${item.name}</strong>
          <span>${item.short}</span>
        </button>
      `,
    )
    .join("");

  document.querySelectorAll(".analysis-case-card").forEach((button) => {
    button.addEventListener("click", () => {
      activeAnalysisCaseId = button.dataset.analysisCaseId;
      renderAnalysisPage();
    });
  });
}

function renderAnalysisEventInfo(caseId = activeAnalysisCaseId) {
  const info = getAnalysisCase(caseId).eventInfo;
  const cells = [
    ["风险等级", info.level, "risk"],
    ["事件编号", info.code],
    ["AI置信度", info.confidence, "hit"],
    ["图谱命中节点", info.graphHits, "hit"],
    ["相似历史案例", info.historyCases, "hit"],
    ["涉及产品", info.products],
    ["涉及供应商", info.suppliers],
    ["当前状态", info.status],
  ];

  document.querySelector("#analysisEventInfo").innerHTML = `
    <article class="event-title-card">
      <span>当前研判事件</span>
      <strong>${info.name}</strong>
    </article>
    ${cells
      .map(
        ([label, value, tone]) => `
          <article class="event-info-cell ${tone || ""}">
            <span>${label}</span>
            <strong>${value}</strong>
          </article>
        `,
      )
      .join("")}
  `;
}

function renderJudgement(caseId = activeAnalysisCaseId) {
  const judgement = getAnalysisCase(caseId).judgement;
  document.querySelector("#analysisConfidence").textContent = `置信度 ${judgement.confidence}`;
  document.querySelector("#analysisJudgement").innerHTML = `
    <div class="ai-mark">AI</div>
    <div class="judgement-copy">
      <strong>${judgement.level}</strong>
      <p>${judgement.text}</p>
      <div class="judgement-kpis">
        <span><b>主要疑似原因</b>${judgement.primaryCause}</span>
        <span><b>次要可能原因</b>${judgement.secondaryCause}</span>
        <span><b>建议优先级</b>${judgement.priority}</span>
        <span><b>置信度</b>${judgement.confidence}</span>
      </div>
    </div>
  `;
}

function riskClass(level) {
  if (level === "高") return "high";
  if (level === "中高") return "high";
  if (level === "中") return "mid";
  return "low";
}

function statusClass(status) {
  if (status === "待处理") return "warning";
  if (status === "处理中") return "processing";
  if (status === "已完成") return "done";
  if (status === "已生成") return "generated";
  return "mid";
}

function renderReasonCards(caseId = activeAnalysisCaseId) {
  document.querySelector("#analysisReasonCards").innerHTML = getAnalysisCase(caseId).reasonCards
    .map(
      ([dimension, judgement, evidence, level, confidence]) => `
        <article class="reason-card ${riskClass(level)}">
          <div class="reason-card-head">
            <strong>${dimension}</strong>
            <span>${level}风险</span>
          </div>
          <p>${judgement}</p>
          <em>${evidence}</em>
          <div class="confidence-cell">
            <span>${confidence}%</span>
            <div class="confidence-bar"><i style="width:${confidence}%"></i></div>
          </div>
        </article>
      `,
    )
    .join("");
}

function renderSimilarCases(caseId = activeAnalysisCaseId) {
  document.querySelector("#analysisSimilarCases").innerHTML = getAnalysisCase(caseId).similarCases
    .map(
      ([name, score, reason, action, reuse]) => `
        <tr>
          <td>${name}</td>
          <td>
            <div class="confidence-cell">
              <span>${score}%</span>
              <div class="confidence-bar"><i style="width:${score}%"></i></div>
            </div>
          </td>
          <td>${reason}</td>
          <td>${action}</td>
          <td>${reuse}</td>
        </tr>
      `,
    )
    .join("");
}

function renderActionAdvice(caseId = activeAnalysisCaseId) {
  const advice = getAnalysisCase(caseId).actionAdvice;
  const groups = [
    ["立即处理", "immediate", advice.immediate],
    ["短期跟踪", "short", advice.shortTerm],
    ["长期沉淀", "long", advice.longTerm],
  ];

  document.querySelector("#analysisActionAdvice").innerHTML = groups
    .map(
      ([title, tone, items]) => `
        <article class="advice-group ${tone}">
          <strong>${title}</strong>
          ${items.map((item) => `<span>${item}</span>`).join("")}
        </article>
      `,
    )
    .join("");
}

function renderAnalysisTasks(caseId = activeAnalysisCaseId) {
  document.querySelector("#analysisTaskRows").innerHTML = getAnalysisCase(caseId).taskRows
    .map(
      ([task, source, advice, owner, priority, due, status]) => `
        <tr>
          <td>${task}</td>
          <td>${source}</td>
          <td>${advice}</td>
          <td>${owner}</td>
          <td><span class="badge ${priority === "高" ? "high" : "orange"}">${priority}</span></td>
          <td>${due}</td>
          <td><span class="status ${statusClass(status)}">${status}</span></td>
        </tr>
      `,
    )
    .join("");
}

function renderAssistantPanel(caseId = activeAnalysisCaseId) {
  document.querySelector("#analysisAssistantPrompts").innerHTML = getAnalysisCase(caseId).assistantPrompts
    .map((item) => `<button>${item}</button>`)
    .join("");
}

function renderReportCenter(caseId = activeAnalysisCaseId) {
  const report = getAnalysisCase(caseId).reportSummary;
  const buttons = ["生成风险研判报告", "生成事件复盘", "生成周报摘要", "生成供应商风险报告", "导出处置建议"];
  document.querySelector("#analysisReportCenter").innerHTML = `
    <div class="report-actions">${buttons.map((item) => `<button>${item}</button>`).join("")}</div>
    <article class="report-preview">
      <strong>报告摘要预览</strong>
      <p>${report}</p>
    </article>
  `;
}

function renderAnalysisPage() {
  renderAnalysisCaseSelector();
  renderAnalysisEventInfo();
  renderJudgement();
  renderReasonCards();
  renderSimilarCases();
  renderActionAdvice();
  renderAnalysisTasks();
  renderAssistantPanel();
  renderReportCenter();
}

function getAssistantPrompts() {
  if (document.querySelector("#analysisPage").classList.contains("active")) {
    return getAnalysisCase().assistantPrompts;
  }
  if (document.querySelector("#tracePage").classList.contains("active")) {
    const currentCase = getTraceCase();
    return [`解释${currentCase.name}的关键风险链路`, "哪些节点需要优先排查？", "证据可信度最高的是哪几条？", "帮我生成处置建议。"];
  }
  const product = getOverviewProduct();
  return [`概括${product.name}当前风险`, "哪些风险需要优先处理？", "当前知识图谱命中了哪些链路？", "帮我生成一份管理层摘要。"];
}

function getAssistantContextText() {
  if (document.querySelector("#analysisPage").classList.contains("active")) return `当前页面：智能研判 / ${getAnalysisCase().name}`;
  if (document.querySelector("#tracePage").classList.contains("active")) return `当前页面：风险追溯 / ${getTraceCase().name}`;
  return `当前页面：质量总览 / ${getOverviewProduct().name}`;
}

function renderAssistantDialog() {
  const context = document.querySelector("#assistantContext");
  const prompts = document.querySelector("#assistantDialogPrompts");
  if (!context || !prompts) return;
  context.textContent = getAssistantContextText();
  prompts.innerHTML = getAssistantPrompts().map((item) => `<button type="button" data-assistant-prompt="${item}">${item}</button>`).join("");
}

function togglePopover(targetId) {
  document.querySelectorAll(".header-popover").forEach((panel) => {
    const open = panel.id === targetId && !panel.classList.contains("open");
    panel.classList.toggle("open", open);
    panel.setAttribute("aria-hidden", String(!open));
  });
}

function setCurrentPage(page) {
  const knownPages = new Set(["overview", "trace", "analysis"]);
  const normalizedPage = knownPages.has(page) ? page : "overview";
  document.querySelectorAll(".page-view").forEach((view) => view.classList.remove("active"));
  document.querySelectorAll("[data-page]").forEach((button) => button.classList.toggle("active", button.dataset.page === normalizedPage));

  const view = document.querySelector(`#${normalizedPage}Page`);
  if (view) view.classList.add("active");

  if (normalizedPage === "trace") {
    renderTracePage();
  }

  if (normalizedPage === "analysis") {
    renderAnalysisPage();
  }

  if (normalizedPage === "overview") {
    ensureOverviewCharts();
    afterOverviewLayoutUpdate();
  }

  renderAssistantDialog();

  if (window.location.hash.slice(1) !== normalizedPage) {
    window.history.replaceState(null, "", `#${normalizedPage}`);
  }

  window.setTimeout(() => {
    fitStage();
    charts.forEach((chart) => chart.resize());
  }, 0);
}

function bindPageNav() {
  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-close-overview-module]")) {
      event.preventDefault();
      closeOverviewModules();
      return;
    }

    const filterToggle = event.target.closest("[data-overview-filter-toggle]");
    if (filterToggle) {
      event.preventDefault();
      toggleOverviewProductFilter();
      return;
    }

    const filterOption = event.target.closest("[data-overview-filter-option]");
    if (filterOption) {
      event.preventDefault();
      selectOverviewProduct(filterOption.dataset.overviewFilterOption);
      return;
    }

    if (overviewFilterOpen && !event.target.closest("#overviewProductFilter")) {
      closeOverviewProductFilter();
    }

    const navButton = event.target.closest("[data-page]");
    if (navButton) {
      event.preventDefault();
      setCurrentPage(navButton.dataset.page);
      return;
    }

    const overviewModuleButton = event.target.closest("[data-overview-module]");
    if (overviewModuleButton) {
      event.preventDefault();
      toggleOverviewModule(overviewModuleButton.dataset.overviewModule);
      return;
    }

    if (event.target.closest("#traceAnalysisBtn")) {
      event.preventDefault();
      setCurrentPage("analysis");
      return;
    }

    if (event.target.closest("#settingsBtn")) {
      event.preventDefault();
      togglePopover("settingsPanel");
      return;
    }

    if (event.target.closest("#peopleBtn")) {
      event.preventDefault();
      togglePopover("peoplePanel");
      return;
    }

    if (event.target.closest("[data-close-popover]")) {
      event.preventDefault();
      document.querySelectorAll(".header-popover").forEach((panel) => {
        panel.classList.remove("open");
        panel.setAttribute("aria-hidden", "true");
      });
      return;
    }

    if (event.target.closest("#assistantEntry")) {
      event.preventDefault();
      renderAssistantDialog();
      const assistantDialog = document.querySelector("#assistantDialog");
      const nextOpen = !assistantDialog.classList.contains("open");
      assistantDialog.classList.toggle("open", nextOpen);
      assistantDialog.setAttribute("aria-hidden", String(!nextOpen));
      return;
    }

    if (event.target.closest("#assistantClose")) {
      event.preventDefault();
      document.querySelector("#assistantDialog").classList.remove("open");
      document.querySelector("#assistantDialog").setAttribute("aria-hidden", "true");
      return;
    }

    const promptButton = event.target.closest("[data-assistant-prompt]");
    if (promptButton) {
      event.preventDefault();
      const text = promptButton.dataset.assistantPrompt;
      document.querySelector("#assistantInput").value = text;
      document.querySelector("#assistantReply").textContent = `已选择问题：“${text}”。演示模式下，我会结合当前页面的风险链路、证据数据和处置任务生成分析摘要。`;
      return;
    }

    if (event.target.closest("#assistantSend")) {
      event.preventDefault();
      const input = document.querySelector("#assistantInput");
      const text = input.value.trim() || "请概括当前风险";
      document.querySelector("#assistantReply").textContent = `收到：“${text}”。当前为展示态助手，可用于模拟风险解释、案例匹配、任务建议和报告摘要生成。`;
    }
  });

  window.addEventListener("hashchange", () => setCurrentPage(window.location.hash.slice(1)));
}

function initDonut() {
  makeChart("typeDonut", {
    color: dashboardData.typeData.map((item) => item.color),
    series: [
      {
        type: "pie",
        radius: ["46%", "72%"],
        center: ["52%", "52%"],
        avoidLabelOverlap: true,
        label: { show: false },
        labelLine: { show: false },
        data: dashboardData.typeData,
      },
      {
        type: "pie",
        radius: ["0%", "34%"],
        center: ["52%", "52%"],
        silent: true,
        label: {
          position: "center",
          formatter: "合计\n238",
          color: "#eaf6ff",
          fontSize: 18,
          lineHeight: 32,
          fontWeight: 700,
        },
        data: [{ value: 238, itemStyle: { color: "rgba(2, 15, 36, 0.88)" } }],
      },
    ],
  });
}

function initTrend() {
  makeChart("eventTrend", {
    color: ["#1d83ff", "#ff5a4f"],
    grid: { left: 38, right: 18, top: 34, bottom: 34 },
    legend: {
      top: 8,
      left: 34,
      itemWidth: 18,
      textStyle: { color: chartText },
      data: ["事件总数", "高风险事件"],
    },
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ["04-21", "04-26", "05-01", "05-06", "05-11", "05-16", "05-20"],
      axisLine: { lineStyle: { color: axisColor } },
      axisLabel: { color: chartText },
      axisTick: { show: false },
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 100,
      splitLine: { lineStyle: { color: gridLine } },
      axisLabel: { color: chartText },
    },
    series: [
      {
        name: "事件总数",
        type: "line",
        smooth: true,
        symbolSize: 8,
        data: [54, 56, 60, 73, 62, 69, 76],
        areaStyle: { color: "rgba(29,131,255,0.16)" },
        markPoint: { symbolSize: 42, data: [{ type: "max", name: "Max" }] },
      },
      {
        name: "高风险事件",
        type: "line",
        smooth: true,
        symbolSize: 7,
        data: [11, 15, 12, 21, 14, 17, 23],
        areaStyle: { color: "rgba(255,90,79,0.08)" },
      },
    ],
  });
}

function initSupplierScatter() {
  makeChart("supplierScatter", {
    grid: { left: 42, right: 24, top: 42, bottom: 42 },
    tooltip: { trigger: "item" },
    xAxis: {
      name: "供应量占比(%)",
      nameTextStyle: { color: "#eaf6ff" },
      min: 0,
      max: 50,
      splitLine: { lineStyle: { color: gridLine } },
      axisLine: { lineStyle: { color: axisColor } },
      axisLabel: { color: chartText },
    },
    yAxis: {
      name: "风险发生率(%)",
      nameTextStyle: { color: chartText },
      min: 0,
      max: 5,
      splitLine: { lineStyle: { color: gridLine } },
      axisLine: { lineStyle: { color: axisColor } },
      axisLabel: { color: chartText },
    },
    series: [
      {
        type: "scatter",
        symbolSize: (data) => data[2],
        itemStyle: { color: (params) => params.data[3] },
        label: {
          show: true,
          formatter: (params) => params.data[4],
          color: chartText,
          position: "top",
        },
        data: [
          [42, 4.2, 36, "#ff5a4f", "味群"],
          [27, 3.0, 22, "#ff9b22", "扬雅"],
          [32, 2.4, 20, "#ff9b22", "德乐"],
          [13, 2.7, 30, "#1d83ff", "凯爱瑞"],
          [10, 1.0, 18, "#1d83ff", "领航"],
        ],
      },
    ],
  });
}

function initMonthCompare() {
  makeChart("monthCompare", {
    color: ["#1d83ff", "#ff5a4f"],
    grid: { left: 42, right: 18, top: 44, bottom: 40 },
    legend: {
      top: 10,
      left: 34,
      itemWidth: 14,
      textStyle: { color: chartText },
      data: ["事件总数", "高风险事件"],
    },
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: ["2024-12", "2025-01", "2025-02", "2025-03", "2025-04", "2025-05"],
      axisLine: { lineStyle: { color: axisColor } },
      axisLabel: { color: chartText },
      axisTick: { show: false },
    },
    yAxis: {
      type: "value",
      splitLine: { lineStyle: { color: gridLine } },
      axisLabel: { color: chartText },
    },
    series: [
      { name: "事件总数", type: "bar", barWidth: 16, data: [162, 175, 189, 204, 221, 238] },
      { name: "高风险事件", type: "bar", barWidth: 16, data: [15, 17, 19, 22, 21, 23] },
    ],
  });
}

function initSparks() {
  dashboardData.bottomCards.forEach((item, index) => {
    makeChart(`spark${index}`, {
      grid: { left: 4, right: 4, top: 8, bottom: 4 },
      xAxis: { type: "category", show: false, data: item.data.map((_, i) => i) },
      yAxis: { type: "value", show: false },
      series: [
        {
          type: "line",
          smooth: true,
          symbol: "none",
          lineStyle: { width: 2, color: "#eaf6ff" },
          areaStyle: { color: "rgba(29,131,255,0.08)" },
          data: item.data,
        },
      ],
    });
  });
}

function ensureOverviewCharts() {
  const mapVisible = document.querySelector("#mapView").classList.contains("active");
  const graphVisible = document.querySelector("#graphView").classList.contains("active");

  if (mapVisible && chinaMapReady) {
    initChinaMap();
    overviewMapInitialized = true;
  }

  if (graphVisible) {
    initRiskGraph();
  }

  initDonut();
  initSparks();
  overviewChartsInitialized = true;

  window.setTimeout(() => charts.forEach((chart) => chart.resize()), 0);
}

function startClock() {
  const clock = document.querySelector("#clock");
  window.setInterval(() => {
    const now = new Date();
    clock.textContent = now.toLocaleTimeString("zh-CN", { hour12: false });
  }, 1000);
}

async function init() {
  fitStage();
  await loadDashboardData();
  setDashboardDataForProduct(activeOverviewProductId);
  renderOverviewModules();
  afterOverviewLayoutUpdate();
  bindViewSwitch();
  bindPageNav();
  setCurrentPage(window.location.hash.slice(1) || "overview");
  try {
    const chinaGeoJson = await loadChinaGeoJson();
    echarts.registerMap("china", chinaGeoJson);
    chinaMapReady = true;
    if (document.querySelector("#overviewPage").classList.contains("active")) {
      ensureOverviewCharts();
    }
  } catch (error) {
    console.warn(error);
  }
  startClock();
}

window.addEventListener("resize", () => {
  fitStage();
  charts.forEach((chart) => chart.resize());
  afterOverviewLayoutUpdate();
});

init();



