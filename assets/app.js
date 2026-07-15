// ========== 课程结构 ==========
const CURRICULUM = {
  geography: {
    label: '地理',
    icon: '🌍',
    color: 'geo',
    grades: {
      g7s: {
        label: '七年级上册',
        chapters: [
          { id: 'ch01', title: '地球与地图', desc: '地球的形状、大小、经纬度、地图' },
          { id: 'ch02', title: '陆地和海洋', desc: '七大洲四大洋、海陆变迁' },
          { id: 'ch03', title: '天气与气候', desc: '气温、降水、气候类型' },
          { id: 'ch04', title: '居民与聚落·发展与合作', desc: '人口、语言、宗教、聚落' }
        ]
      },
      g7x: {
        label: '七年级下册',
        chapters: [
          { id: 'ch01', title: '我们生活的大洲——亚洲', desc: '亚洲的位置、地形、气候' },
          { id: 'ch02', title: '邻近的地区和国家', desc: '日本、东南亚、印度、俄罗斯' },
          { id: 'ch03', title: '东半球其他的地区和国家', desc: '中东、欧洲西部、撒哈拉以南非洲' },
          { id: 'ch04', title: '西半球的国家', desc: '美国、巴西' },
          { id: 'ch05', title: '极地地区', desc: '南极、北极地区' }
        ]
      },
      g8s: {
        label: '八年级上册',
        chapters: [
          { id: 'ch01', title: '从世界看中国', desc: '疆域、人口、民族' },
          { id: 'ch02', title: '中国的自然环境', desc: '地形地势、气候、河流' },
          { id: 'ch03', title: '中国的自然资源', desc: '土地资源、水资源' },
          { id: 'ch04', title: '中国的经济发展', desc: '交通、农业、工业' }
        ]
      },
      g8x: {
        label: '八年级下册',
        chapters: [
          { id: 'ch01', title: '中国的地理差异', desc: '四大地理区域划分' },
          { id: 'ch02', title: '北方地区', desc: '东北、华北、黄土高原' },
          { id: 'ch03', title: '南方地区', desc: '长江三角洲、港澳、台湾' },
          { id: 'ch04', title: '西北地区', desc: '塔里木盆地、草原与荒漠' },
          { id: 'ch05', title: '青藏地区·中国在世界中', desc: '青藏高原、三江源' }
        ]
      }
    }
  },
  biology: {
    label: '生物',
    icon: '🧬',
    color: 'bio',
    grades: {
      b7s: {
        label: '七年级上册',
        chapters: [
          { id: 'ch01', title: '认识生物', desc: '生物的特征、调查周边环境中的生物' },
          { id: 'ch02', title: '了解生物圈', desc: '生物与环境的关系、生态系统' },
          { id: 'ch03', title: '细胞是生命活动的基本单位', desc: '显微镜、植物细胞、动物细胞' },
          { id: 'ch04', title: '细胞怎样构成生物体', desc: '细胞分裂、动物体和植物体的结构层次' },
          { id: 'ch05', title: '生物圈中的绿色植物', desc: '藻类、苔藓、蕨类、种子植物' },
          { id: 'ch06', title: '被子植物的一生', desc: '种子的萌发、开花与结果' },
          { id: 'ch07', title: '绿色植物与生物圈', desc: '光合作用、呼吸作用' }
        ]
      },
      b7x: {
        label: '七年级下册',
        chapters: [
          { id: 'ch01', title: '人的由来', desc: '人类的起源和发展、人的生殖' },
          { id: 'ch02', title: '人体的营养', desc: '食物中的营养物质、消化和吸收' },
          { id: 'ch03', title: '人体的呼吸', desc: '呼吸道和肺、发生在肺内的气体交换' },
          { id: 'ch04', title: '人体内物质的运输', desc: '血液、血管、血液循环' },
          { id: 'ch05', title: '人体内废物的排出', desc: '泌尿系统、尿的形成和排出' },
          { id: 'ch06', title: '人体生命活动的调节', desc: '神经调节、激素调节' },
          { id: 'ch07', title: '人类活动对生物圈的影响', desc: '环境污染、生态保护' }
        ]
      },
      b8s: {
        label: '八年级上册',
        chapters: [
          { id: 'ch01', title: '动物的主要类群', desc: '无脊椎动物、脊椎动物' },
          { id: 'ch02', title: '动物的运动和行为', desc: '运动系统、先天性行为和学习行为' },
          { id: 'ch03', title: '动物在生物圈中的作用', desc: '生态平衡、动物与人类' },
          { id: 'ch04', title: '细菌和真菌', desc: '分布、结构、在自然界中的作用' },
          { id: 'ch05', title: '病毒', desc: '病毒的种类、结构、繁殖' },
          { id: 'ch06', title: '生物的多样性及其保护', desc: '分类、生物多样性保护' }
        ]
      },
      b8x: {
        label: '八年级下册',
        chapters: [
          { id: 'ch01', title: '生物的生殖和发育', desc: '植物的生殖、昆虫/两栖动物/鸟的生殖发育' },
          { id: 'ch02', title: '生物的遗传与变异', desc: '基因、DNA、遗传规律、变异' },
          { id: 'ch03', title: '生命起源和生物进化', desc: '自然选择、生物进化的历程' },
          { id: 'ch04', title: '传染病和免疫', desc: '传染病、免疫与计划免疫' },
          { id: 'ch05', title: '用药与急救', desc: '安全用药、急救方法' },
          { id: 'ch06', title: '了解自己，增进健康', desc: '健康生活方式' }
        ]
      }
    }
  }
};

// ========== 错题管理（localStorage） ==========
const ERRORS_KEY = 'dshk_errors';

function getErrors() {
  try {
    return JSON.parse(localStorage.getItem(ERRORS_KEY) || '[]');
  } catch (e) {
    return [];
  }
}

function saveErrors(errors) {
  localStorage.setItem(ERRORS_KEY, JSON.stringify(errors));
}

function addError(error) {
  var errors = getErrors();
  // 避免重复添加同一道题
  if (!errors.some(function(e) { return e.id === error.id; })) {
    errors.push(error);
    saveErrors(errors);
  }
}

function removeError(id) {
  var errors = getErrors().filter(function(e) { return e.id !== id; });
  saveErrors(errors);
}

function clearAllErrors() {
  saveErrors([]);
}

// ========== 导航辅助 ==========
function getActiveNav() {
  var path = location.pathname;
  if (path.indexOf('/errors/') !== -1) return 'errors';
  if (path.indexOf('/exams/') !== -1) return 'exams';
  return 'home';
}

function highlightNav() {
  var active = getActiveNav();
  var links = document.querySelectorAll('.top-nav a');
  links.forEach(function(link) {
    link.classList.toggle('active', link.dataset.nav === active);
  });
}

// ========== 页面初始化 ==========
document.addEventListener('DOMContentLoaded', function() {
  highlightNav();
});
