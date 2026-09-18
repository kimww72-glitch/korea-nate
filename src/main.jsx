import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowRight, CalendarDays, ChevronDown, Clock3, Globe2, MapPin, Menu, Search, ShieldCheck, Star, Users, X } from 'lucide-react';
import './styles.css';
import './booking.css';
import './results.css';
import './admin.css';
import matesData from './data/mates.json';

const copy = {
  ko: {
    navServices: '서비스', navHow: '이용 방법', navLogin: '로그인', book: '예약하기',
    kicker: '당신의 한국, 더 깊고 편안하게', title1: '여행자를 위한', title2: '진짜 한국의 하루',
    subtitle: '검증된 현지 메이트와 함께 나만의 속도로 한국을 경험하세요.', explore: '서비스 둘러보기', trusted: '전 세계 여행자가 선택한 현지 동행',
    popular: '인기 있는 경험', find: '나에게 꼭 맞는 한국 여행을 찾아보세요', viewAll: '전체 서비스 보기',
    why: 'KoreaMate와 함께하는 이유', whyTitle: '낯선 곳에서도,\n당신답게 여행하세요.',
    guide1: '검증된 현지 메이트', guide1d: '언어와 지역 전문성을 갖춘 메이트만 엄선합니다.',
    guide2: '투명한 시간당 가격', guide2d: '예약 전, 필요한 시간과 총 비용을 명확히 확인하세요.',
    guide3: '여행자 맞춤 경험', guide3d: '관심사와 일정에 맞춰 유연하게 계획할 수 있어요.',
    chooseKicker: '맞춤 여행의 시작', chooseTitle: '어떤 하루를\n함께 만들어볼까요?', chooseSub: '원하는 경험을 골라 시간과 메이트를 정해보세요.',
    duration: '이용 시간', hours: '시간', next: '다음 단계', selected: '선택한 서비스', from: '부터', perHour: '/ 시간',
    date: '날짜 선택', people: '인원', guests: '명', total: '예상 총 금액', groupRate: '그룹 기준 · 세금 포함', findMate: '메이트 찾기', resultsKicker: '메이트 검색 결과', resultsTitle: '당신을 기다리는\n현지 메이트', resultFor: '선택 조건', available: '예약 가능', languages: '가능 언어', selectMate: '이 메이트 선택', backToServices: '다시 선택하기', detailKicker: '예약 상세', detailTitle: '여행의 마지막\n확인을 해주세요', mate: '선택한 메이트', service: '선택한 서비스', bookingDate: '예약 날짜', bookingTime: '이용 시간', travelers: '여행 인원', request: '요청사항', requestPlaceholder: '방문하고 싶은 장소, 음식 알레르기 등 메이트에게 전할 내용을 적어주세요.', requestRequired: '요청사항을 써주세요.', confirm: '예약 요청하기', backToResults: '결과로 돌아가기', confirmationKicker: '예약 요청 완료', confirmationTitle: '메이트에게\n요청을 보냈어요!', requestSent: '전달된 요청사항', confirmationNote: '메이트가 24시간 안에 예약 가능 여부를 알려드릴 예정입니다.',
    footer: 'Travel like a local.', footerLinks: '회사 소개 · 도움말 · 이용약관 · 개인정보처리방침'
  },
  en: {
    navServices: 'Services', navHow: 'How it works', navLogin: 'Log in', book: 'Book now',
    kicker: 'Your Korea, made more personal', title1: 'Travel Korea', title2: 'like a local',
    subtitle: 'Experience Korea at your own pace with a trusted local mate.', explore: 'Explore services', trusted: 'Chosen by travelers from around the world',
    popular: 'Popular experiences', find: 'Find the Korea trip that feels just right for you', viewAll: 'View all services',
    why: 'Why KoreaMate', whyTitle: 'Feel at home,\neven far from home.',
    guide1: 'Trusted local mates', guide1d: 'We select only mates with local expertise and language skills.',
    guide2: 'Clear hourly pricing', guide2d: 'See your time and total price clearly before you book.',
    guide3: 'Travel made for you', guide3d: 'Shape each day around your interests and schedule.',
    chooseKicker: 'Start your tailored trip', chooseTitle: 'What kind of day\nshall we create?', chooseSub: 'Choose an experience, then set your time and mate.',
    duration: 'Duration', hours: 'hours', next: 'Continue', selected: 'Selected service', from: 'From', perHour: '/ hour',
    date: 'Select date', people: 'Travelers', guests: 'guests', total: 'Estimated total', groupRate: 'Per group · taxes included', findMate: 'Find a mate', resultsKicker: 'Mate search results', resultsTitle: 'Local mates\nwaiting for you', resultFor: 'Your selection', available: 'Available', languages: 'Languages', selectMate: 'Choose this mate', backToServices: 'Choose again', detailKicker: 'Booking details', detailTitle: 'One final check\nfor your trip', mate: 'Your mate', service: 'Selected service', bookingDate: 'Date', bookingTime: 'Duration', travelers: 'Travelers', request: 'Special request', requestPlaceholder: 'Share places you want to visit, food allergies, or anything your mate should know.', requestRequired: 'Please write a request.', confirm: 'Request booking', backToResults: 'Back to results', confirmationKicker: 'Booking request sent', confirmationTitle: 'Your request is\non its way!', requestSent: 'Your request', confirmationNote: 'Your mate will confirm availability within 24 hours.',
    footer: 'Travel like a local.', footerLinks: 'About · Help · Terms · Privacy'
  },
  zh: {
    navServices: '服务', navHow: '使用方法', navLogin: '登录', book: '立即预订',
    kicker: '更深入、更自在地探索韩国', title1: '像当地人一样', title2: '旅行韩国',
    subtitle: '与值得信赖的当地伙伴一起，按自己的节奏体验韩国。', explore: '探索服务', trusted: '受到全球旅行者的信赖',
    popular: '热门体验', find: '找到最适合您的韩国旅行方式', viewAll: '查看全部服务',
    why: '为什么选择 KoreaMate', whyTitle: '即使身在异乡，\n也能自在旅行。',
    guide1: '可靠的当地伙伴', guide1d: '我们只精选具备当地专业知识和语言能力的伙伴。',
    guide2: '透明的小时价格', guide2d: '预订前即可清楚确认时长和总费用。',
    guide3: '为您定制的旅行', guide3d: '根据您的兴趣和日程灵活安排每一天。',
    chooseKicker: '定制旅行的开始', chooseTitle: '今天想一起创造\n怎样的一天？', chooseSub: '选择体验，再设定时间和伙伴。',
    duration: '使用时长', hours: '小时', next: '下一步', selected: '已选服务', from: '起', perHour: '/ 小时',
    date: '选择日期', people: '人数', guests: '位', total: '预计总额', groupRate: '按团体计费 · 含税', findMate: '寻找伙伴', resultsKicker: '伙伴搜索结果', resultsTitle: '等待与您同行的\n当地伙伴', resultFor: '您的选择', available: '可预约', languages: '可用语言', selectMate: '选择这位伙伴', backToServices: '重新选择', detailKicker: '预约详情', detailTitle: '请确认您的\n旅行安排', mate: '您的伙伴', service: '已选服务', bookingDate: '预约日期', bookingTime: '使用时长', travelers: '旅行人数', request: '特别要求', requestPlaceholder: '请告诉伙伴想去的地点、食物过敏或其他需要注意的事项。', requestRequired: '请填写您的要求。', confirm: '提交预约', backToResults: '返回结果', confirmationKicker: '预约请求已发送', confirmationTitle: '已向伙伴\n发送您的请求！', requestSent: '已发送的要求', confirmationNote: '伙伴将在 24 小时内确认是否可以预约。',
    footer: '像当地人一样旅行。', footerLinks: '关于我们 · 帮助 · 条款 · 隐私'
  }
};

const services = [
  { id: 'food', icon: '🍜', image: 'https://images.unsplash.com/photo-1553163147-622ab57be1c7?auto=format&fit=crop&w=1200&q=85', rate: 35000, title: { ko: '음식 탐방', en: 'Food discovery', zh: '美食探索' }, desc: { ko: '숨은 맛집부터 시장 먹거리까지', en: 'Hidden gems to market bites', zh: '从隐藏美食到市场小吃' } },
  { id: 'shopping', icon: '🛍️', image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=1200&q=85', rate: 32000, title: { ko: '쇼핑 동행', en: 'Shopping mate', zh: '购物陪同' }, desc: { ko: '취향에 맞는 쇼핑을 함께', en: 'Shop Seoul your way', zh: '陪您寻找心仪好物' } },
  { id: 'kpop', icon: '💿', image: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=1200&q=85', rate: 38000, title: { ko: 'K-POP 굿즈 쇼핑', en: 'K-POP merch hunt', zh: 'K-POP 周边购物' }, desc: { ko: '최애를 위한 특별한 굿즈 찾기', en: 'Find special pieces for your fave', zh: '寻找偶像的特别周边' } },
  { id: 'seoul', icon: '🏯', image: 'https://images.unsplash.com/photo-1538485399081-7c8979e3381a?auto=format&fit=crop&w=1200&q=85', rate: 40000, title: { ko: '서울 도시 여행', en: 'Seoul city tour', zh: '首尔城市之旅' }, desc: { ko: '로컬의 시선으로 만나는 서울', en: 'See Seoul through local eyes', zh: '用当地人的视角看首尔' } },
  { id: 'interpret', icon: '💬', image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1200&q=85', rate: 45000, title: { ko: '통역 / 동행', en: 'Interpret & assist', zh: '翻译 / 陪同' }, desc: { ko: '언어가 필요한 순간, 곁에서', en: 'A helping voice when you need it', zh: '需要语言帮助时就在身边' } }
];

const cities = { seoul: { ko: '서울', zh: '首尔' }, busan: { ko: '부산', zh: '釜山' }, incheon: { ko: '인천', zh: '仁川' }, jeju: { ko: '제주', zh: '济州' } };
const purposes = { tourism: { ko: '관광', zh: '观光' }, business: { ko: '비즈니스', zh: '商务' }, medical: { ko: '의료', zh: '医疗' }, concert: { ko: '콘서트', zh: '演唱会' }, shopping: { ko: '쇼핑', zh: '购物' } };
const bookingStatuses = { requested: { ko: '예약 요청', zh: '预约请求' }, pending: { ko: '승인 대기', zh: '等待批准' }, confirmed: { ko: '예약 확정', zh: '预约确认' }, cancelled: { ko: '취소', zh: '已取消' } };

const savedSearch = () => {
  try { return JSON.parse(localStorage.getItem('koreamate-search')) || {}; } catch { return {}; }
};
const savedBooking = () => {
  try { return JSON.parse(localStorage.getItem('koreamate-booking')) || {}; } catch { return {}; }
};
const savedBookings = () => {
  try { return JSON.parse(localStorage.getItem('koreamate-bookings')) || []; } catch { return []; }
};
const savedMates = () => {
  try { return JSON.parse(localStorage.getItem('koreamate-mates')) || []; } catch { return []; }
};

function App() {
  const [lang, setLang] = useState('ko');
  const [menu, setMenu] = useState(false);
  const [selection, setSelection] = useState(() => savedSearch().service || null);
  const [hours, setHours] = useState(() => savedSearch().hours || 3);
  const [date, setDate] = useState(() => savedSearch().date || '');
  const [guests, setGuests] = useState(() => savedSearch().guests || 1);
  const [city, setCity] = useState(() => savedSearch().city || 'seoul');
  const [purpose, setPurpose] = useState(() => savedSearch().purpose || 'tourism');
  const [showResults, setShowResults] = useState(false);
  const [selectedMate, setSelectedMate] = useState(() => matesData.find(mate => mate.id === savedBooking().mateId) || null);
  const [requestNote, setRequestNote] = useState('');
  const [requestError, setRequestError] = useState(false);
  const [reservationConfirmed, setReservationConfirmed] = useState(false);
  const [bookings, setBookings] = useState(savedBookings);
  const [registeredMates, setRegisteredMates] = useState(savedMates);
  const [adminAuthenticated, setAdminAuthenticated] = useState(() => localStorage.getItem('koreamate-admin-auth') === 'true');
  const [adminError, setAdminError] = useState(false);
  const [mateSubmitted, setMateSubmitted] = useState(false);
  const [route, setRoute] = useState(() => window.location.pathname);
  const t = copy[lang];
  const selectedService = useMemo(() => services.find(s => s.id === selection), [selection]);
  const formatWon = amount => new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW', maximumFractionDigits: 0 }).format(amount);
  const total = selectedService ? selectedService.rate * hours : 0;
  const searchableMates = useMemo(() => [...matesData.map(mate => ({ ...mate, approvalStatus: 'approved' })), ...registeredMates.filter(mate => mate.approvalStatus === 'approved')], [registeredMates]);
  const matchedMates = useMemo(() => searchableMates.filter(mate => mate.available && mate.city === city && mate.serviceCategories.includes(selection) && mate.purposes.includes(purpose)), [searchableMates, city, purpose, selection]);
  const minimumDate = new Date(Date.now() + (9 * 60 * 60 * 1000)).toISOString().slice(0, 10);
  const handleDateChange = (event) => {
    const selectedDate = event.currentTarget.value;
    setDate(/^\d{4}-\d{2}-\d{2}$/.test(selectedDate) ? selectedDate : '');
  };
  const handleFindMate = () => {
    setSelectedMate(null);
    setReservationConfirmed(false);
    setShowResults(true);
    setTimeout(() => document.querySelector('#results')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
  };
  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setRoute(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const handleMateSelect = (mate) => {
    setRequestNote('');
    setRequestError(false);
    setReservationConfirmed(false);
    setSelectedMate(mate);
    navigate(`/mate/${mate.id}`);
  };
  const handleReservationRequest = () => {
    if (!requestNote.trim()) {
      setRequestError(true);
      return;
    }
    if (!selectedMate?.availableDates.includes(date)) {
      setRequestError(true);
      return;
    }
    setRequestError(false);
    const booking = { id: `KM-${Date.now().toString().slice(-6)}`, mateId: selectedMate.id, mateName: selectedMate.name, service: selection, city, date, hours, guests, status: 'requested', request: requestNote };
    const updatedBookings = [booking, ...bookings];
    setBookings(updatedBookings);
    localStorage.setItem('koreamate-bookings', JSON.stringify(updatedBookings));
    setReservationConfirmed(true);
    navigate('/my-bookings');
  };
  useEffect(() => {
    const onPopState = () => setRoute(window.location.pathname);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);
  useEffect(() => {
    const mateId = route.match(/^\/mate\/([^/]+)$/)?.[1];
    if (mateId) setSelectedMate(matesData.find(mate => mate.id === mateId) || null);
  }, [route]);
  useEffect(() => {
    localStorage.setItem('koreamate-search', JSON.stringify({ service: selection, date, hours, guests, city, purpose }));
  }, [selection, date, hours, guests, city, purpose]);
  useEffect(() => {
    if (!selectedMate) return;
    localStorage.setItem('koreamate-booking', JSON.stringify({ service: selection, date, hours, guests, mateId: selectedMate.id }));
  }, [selection, date, hours, guests, selectedMate]);
  useEffect(() => {
    localStorage.setItem('koreamate-mates', JSON.stringify(registeredMates));
  }, [registeredMates]);
  const goServices = () => {
    if (route !== '/') { navigate('/'); return; }
    document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const submitMate = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const selectedServices = data.getAll('services');
    const mate = {
      id: `custom-${Date.now()}`,
      name: data.get('name'), gender: data.get('gender'), age: Number(data.get('age')), city: data.get('city'),
      languages: String(data.get('languages')).split(',').map(value => value.trim()).filter(Boolean),
      serviceCategories: selectedServices, purposes: ['tourism', 'shopping', 'business'], hourlyRate: Number(data.get('hourlyRate')),
      rating: 0, reviewCount: 0, available: true, approvalStatus: 'pending',
      availableDates: ['2026-09-18', '2026-09-19', '2026-09-29', '2026-09-30'],
      image: data.get('image') || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=85',
      bio: { ko: data.get('bio'), zh: data.get('bio') }, areas: { ko: [cities[data.get('city')].ko], zh: [cities[data.get('city')].zh] }
    };
    setRegisteredMates(current => [mate, ...current]);
    setMateSubmitted(true);
    event.currentTarget.reset();
  };
  const updateMateStatus = (id, approvalStatus) => setRegisteredMates(current => current.map(mate => mate.id === id ? { ...mate, approvalStatus } : mate));
  const deleteMate = (id) => setRegisteredMates(current => current.filter(mate => mate.id !== id));
  const updateBookingStatus = (id, status) => {
    const updated = bookings.map(booking => booking.id === id ? { ...booking, status } : booking);
    setBookings(updated);
    localStorage.setItem('koreamate-bookings', JSON.stringify(updated));
  };
  const adminLogin = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get('id') === 'admin' && data.get('password') === '1234') {
      localStorage.setItem('koreamate-admin-auth', 'true');
      setAdminAuthenticated(true); setAdminError(false);
    } else setAdminError(true);
  };
  return <>
    <header className="nav">
      <button className="brand" onClick={scrollTop}>Korea<span>Mate</span></button>
      <nav className={menu ? 'navlinks open' : 'navlinks'}>
        <button onClick={() => { goServices(); setMenu(false); }}>{t.navServices}</button><button onClick={() => { if(route !== '/') navigate('/'); setTimeout(()=>document.querySelector('#why')?.scrollIntoView({behavior:'smooth'}), 0); setMenu(false); }}>{t.navHow}</button><button onClick={() => navigate('/become-mate')}>{lang==='ko'?'메이트 등록':'伙伴注册'}</button>
      </nav>
      <div className="nav-actions"><div className="language"><Globe2 size={16}/><select value={lang} onChange={e=>setLang(e.target.value)} aria-label="Language"><option value="ko">한국어</option><option value="zh">中文</option></select></div><button className="book-mini" onClick={goServices}>{t.book}</button><button className="menu" onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button></div>
    </header>
    <main>
      {route === '/become-mate' && <section className="admin-page section"><div className="admin-heading"><p className="eyebrow">{lang==='ko'?'KoreaMate 메이트':'KoreaMate 伙伴'}</p><h2>{lang==='ko'?'메이트로\n등록하기':'注册成为\n旅行伙伴'}</h2><p>{lang==='ko'?'승인 후 여행자 검색 결과에 노출됩니다.':'审核通过后将显示在游客搜索结果中。'}</p></div><form className="admin-form" onSubmit={submitMate}><label>{lang==='ko'?'이름':'姓名'}<input name="name" required /></label><div className="form-grid"><label>{lang==='ko'?'성별':'性别'}<select name="gender"><option>{lang==='ko'?'여성':'女性'}</option><option>{lang==='ko'?'남성':'男性'}</option><option>{lang==='ko'?'기타':'其他'}</option></select></label><label>{lang==='ko'?'나이':'年龄'}<input name="age" type="number" min="18" required /></label></div><label>{lang==='ko'?'도시':'城市'}<select name="city">{Object.entries(cities).map(([id, labels])=><option key={id} value={id}>{labels[lang]}</option>)}</select></label><label>{lang==='ko'?'사용 언어 (쉼표로 구분)':'可用语言（以逗号分隔）'}<input name="languages" placeholder="한국어, 中文" required /></label><fieldset><legend>{lang==='ko'?'가능한 서비스':'可提供服务'}</legend>{services.map(service=><label className="check" key={service.id}><input name="services" type="checkbox" value={service.id}/>{service.title[lang]}</label>)}</fieldset><label>{lang==='ko'?'시간당 요금 (원)':'每小时费用（韩元）'}<input name="hourlyRate" type="number" min="10000" step="1000" required /></label><label>{lang==='ko'?'자기소개':'自我介绍'}<textarea name="bio" required /></label><label>{lang==='ko'?'프로필 사진 URL':'头像图片 URL'}<input name="image" type="url" placeholder="https://" /></label><button className="primary full" type="submit">{lang==='ko'?'등록 신청하기':'提交申请'}<ArrowRight size={18}/></button>{mateSubmitted && <p className="form-success">{lang==='ko'?'등록되었습니다. 관리자 승인 후 검색에 노출됩니다.':'申请已提交，管理员批准后将显示在搜索中。'}</p>}</form></section>}
      {route.startsWith('/admin') && !adminAuthenticated && <section className="admin-login section"><form className="login-card" onSubmit={adminLogin}><p className="eyebrow">KoreaMate Admin</p><h2>{lang==='ko'?'관리자 로그인':'管理员登录'}</h2><label>ID<input name="id" autoComplete="username" required /></label><label>PW<input name="password" type="password" autoComplete="current-password" required /></label>{adminError && <p className="request-error">{lang==='ko'?'ID 또는 비밀번호가 올바르지 않습니다.':'账号或密码不正确。'}</p>}<button className="primary full" type="submit">{lang==='ko'?'로그인':'登录'}<ArrowRight size={18}/></button></form></section>}
      {route.startsWith('/admin') && adminAuthenticated && <section className="admin-page section"><div className="admin-heading"><p className="eyebrow">KoreaMate Admin</p><h2>{route==='/admin/stats' ? (lang==='ko'?'운영 통계':'运营统计') : route==='/admin/bookings' ? (lang==='ko'?'예약 관리':'预约管理') : (lang==='ko'?'메이트 관리':'伙伴管理')}</h2><div className="admin-nav"><button onClick={()=>navigate('/admin')}>{lang==='ko'?'메이트':'伙伴'}</button><button onClick={()=>navigate('/admin/bookings')}>{lang==='ko'?'예약':'预约'}</button><button onClick={()=>navigate('/admin/stats')}>{lang==='ko'?'통계':'统计'}</button></div></div>{route==='/admin' && <div className="admin-list">{registeredMates.map(mate=><article key={mate.id}><img src={mate.image} alt=""/><div><b>{mate.name}</b><span>{cities[mate.city][lang]} · {bookingStatuses[mate.approvalStatus === 'approved' ? 'confirmed' : mate.approvalStatus === 'rejected' ? 'cancelled' : 'pending'][lang]}</span></div><div className="admin-actions"><button onClick={()=>updateMateStatus(mate.id,'approved')}>{lang==='ko'?'승인':'批准'}</button><button onClick={()=>updateMateStatus(mate.id,'rejected')}>{lang==='ko'?'거절':'拒绝'}</button><button onClick={()=>deleteMate(mate.id)}>{lang==='ko'?'삭제':'删除'}</button></div></article>)}{registeredMates.length===0&&<p>{lang==='ko'?'등록된 메이트가 없습니다.':'暂无已注册伙伴。'}</p>}</div>}{route==='/admin/bookings' && <div className="admin-list">{bookings.map(booking=><article key={booking.id}><div><b>{booking.id} · {booking.mateName}</b><span>{booking.date} · {booking.hours}{t.hours} · {booking.guests}{t.guests}</span></div><select value={booking.status} onChange={event=>updateBookingStatus(booking.id,event.target.value)}>{Object.entries(bookingStatuses).map(([id, label])=><option key={id} value={id}>{label[lang]}</option>)}</select></article>)}{bookings.length===0&&<p>{lang==='ko'?'예약 내역이 없습니다.':'暂无预约记录。'}</p>}</div>}{route==='/admin/stats' && <div className="stats-grid"><article><span>{lang==='ko'?'등록 메이트':'注册伙伴'}</span><b>{registeredMates.length}</b></article><article><span>{lang==='ko'?'승인 메이트':'已批准伙伴'}</span><b>{registeredMates.filter(mate=>mate.approvalStatus==='approved').length}</b></article><article><span>{lang==='ko'?'총 예약':'总预约'}</span><b>{bookings.length}</b></article><article className="stats-wide"><span>{lang==='ko'?'도시별 예약':'各城市预约'}</span>{Object.entries(cities).map(([id, labels])=><p key={id}>{labels[lang]} <b>{bookings.filter(booking=>booking.city===id).length}</b></p>)}</article><article className="stats-wide"><span>{lang==='ko'?'서비스별 예약':'各服务预约'}</span>{services.map(service=><p key={service.id}>{service.title[lang]} <b>{bookings.filter(booking=>booking.service===service.id).length}</b></p>)}</article></div>}</section>}
      {route === '/' && <>
      <section className="hero">
        <div className="hero-photo" />
        <div className="hero-grain" />
        <div className="hero-content"><p className="eyebrow light">{t.kicker}</p><h1>{t.title1}<em>{t.title2}</em></h1><p className="hero-sub">{t.subtitle}</p><button className="primary" onClick={goServices}>{t.explore}<ArrowRight size={18}/></button></div>
        <div className="hero-note"><div className="avatars"><span>J</span><span>M</span><span>A</span></div><span>{t.trusted}</span><div className="rating"><Star size={14} fill="currentColor"/> 4.9</div></div>
        <div className="scroll">SCROLL <span /></div>
      </section>
      <section className="services section" id="services">
        <div className="section-intro"><div><p className="eyebrow">{t.popular}</p><h2>{t.find}</h2></div><button className="text-link" onClick={goServices}>{t.viewAll}<ArrowRight size={16}/></button></div>
        <div className="service-grid">{services.map((service, i) => <article className={'service-card service-'+i} key={service.id} onClick={() => { setSelection(service.id); setTimeout(()=>document.querySelector('#booking').scrollIntoView({behavior:'smooth'}), 50); }}><img src={service.image} alt={service.title[lang]}/><div className="card-overlay"/><div className="card-number">0{i+1}</div><div className="card-content"><span className="service-icon">{service.icon}</span><h3>{service.title[lang]}</h3><p>{service.desc[lang]}</p><div className="card-bottom"><span>{t.from} <b>{formatWon(service.rate)}</b> {t.perHour}</span><span className="round-arrow"><ArrowRight size={17}/></span></div></div></article>)}</div>
      </section>
      <section className="booking section" id="booking">
        <div className="booking-copy"><p className="eyebrow">{t.chooseKicker}</p><h2>{t.chooseTitle.split('\n').map((line,i)=><React.Fragment key={line}>{line}{i===0&&<br/>}</React.Fragment>)}</h2><p>{t.chooseSub}</p><div className="booking-decoration">✦</div></div>
        <div className="booking-panel">
          <p className="panel-label">{t.selected}</p>
          <div className="selector"><select value={selection || ''} onChange={e=>setSelection(e.target.value)}><option value="" disabled>{lang==='ko'?'서비스를 선택해주세요':lang==='en'?'Choose a service':'请选择服务'}</option>{services.map(s=><option key={s.id} value={s.id}>{s.icon} {s.title[lang]} — {formatWon(s.rate)}{t.perHour}</option>)}</select><ChevronDown size={18}/></div>
          {selectedService && <div className="selection-preview"><span>{selectedService.icon}</span><div><b>{selectedService.title[lang]}</b><small>{t.from} {formatWon(selectedService.rate)} {t.perHour}</small></div></div>}
          <div className="duration-row"><span><Clock3 size={18}/>{t.duration}</span><div className="stepper"><button onClick={()=>setHours(Math.max(1,hours-1))}>−</button><strong>{hours} <small>{t.hours}</small></strong><button onClick={()=>setHours(hours+1)}>+</button></div></div>
          <div className="booking-fields"><label><MapPin size={18}/><span>{lang==='ko'?'도시':'城市'}</span><select value={city} onChange={e=>setCity(e.target.value)}>{Object.entries(cities).map(([id, labels])=><option key={id} value={id}>{labels[lang]}</option>)}</select></label><label><Search size={18}/><span>{lang==='ko'?'목적':'目的'}</span><select value={purpose} onChange={e=>setPurpose(e.target.value)}>{Object.entries(purposes).map(([id, labels])=><option key={id} value={id}>{labels[lang]}</option>)}</select></label><label className="date-field"><CalendarDays size={18}/><span>{t.date}</span><input type="date" value={date} min={minimumDate} onChange={handleDateChange} aria-label={t.date} /></label><label><Users size={18}/><span>{t.people}</span><select value={guests} onChange={e=>setGuests(Number(e.target.value))}>{[1,2,3,4,5,6].map(count=><option key={count} value={count}>{count} {t.guests}</option>)}</select></label></div>
          <div className="total"><div><span>{t.total}</span><small>{hours} {t.hours} · {guests} {t.guests}</small></div><strong>{selectedService ? formatWon(total) : '—'}</strong></div>
          <button className="primary full" disabled={!selection || !date} onClick={handleFindMate}>{t.findMate}<ArrowRight size={18}/></button>
          <p className="safe"><ShieldCheck size={15}/>{lang==='ko'?'예약 전까지 결제되지 않습니다':lang==='en'?'You will not be charged yet':'预订前无需付款'}</p>
        </div>
      </section>
      {showResults && <section className="results section" id="results">
        <div className="section-intro results-head"><div><p className="eyebrow">{t.resultsKicker}</p><h2>{t.resultsTitle.split('\n').map((line,i)=><React.Fragment key={line}>{line}{i===0&&<br/>}</React.Fragment>)}</h2></div><button className="text-link" onClick={goServices}>{t.backToServices}<ArrowRight size={16}/></button></div>
        <div className="search-summary"><Search size={17}/><span>{t.resultFor}</span><b>{selectedService?.icon} {selectedService?.title[lang]}</b><i>·</i><b>{cities[city][lang]}</b><i>·</i><b>{purposes[purpose][lang]}</b><i>·</i><b>{date}</b></div>
        <div className="mate-grid">{matchedMates.map(mate => { const dateAvailable = mate.availableDates.includes(date); return <article className="mate-card" key={mate.id}><img src={mate.image} alt={mate.name}/><div className="mate-info"><div className="mate-top"><div><span className={dateAvailable ? 'available' : 'unavailable'}><i />{dateAvailable ? t.available : (lang==='ko'?'예약 불가':'不可预约')}</span><h3>{mate.name}</h3></div><div className="mate-rating"><Star size={14} fill="currentColor"/>{mate.rating}<small>({mate.reviewCount})</small></div></div><p><MapPin size={14}/>{mate.areas[lang].join(' · ')}</p><p><Globe2 size={14}/>{mate.languages.join(' · ')}</p><div className="mate-bottom"><strong>{formatWon(mate.hourlyRate)} <small>{t.perHour}</small></strong><button className="choose-mate" onClick={() => handleMateSelect(mate)}>{lang==='ko'?'프로필 보기':'查看资料'}<ArrowRight size={15}/></button></div></div></article>})}</div>
      </section>}
      <section className="why section" id="why"><div className="why-image"><img src="https://images.unsplash.com/photo-1548115184-bc6544d06a58?auto=format&fit=crop&w=1200&q=85" alt="Seoul travel"/><div className="image-tag"><MapPin size={16}/><span>SEOUL, KOREA</span></div></div><div className="why-content"><p className="eyebrow">{t.why}</p><h2>{t.whyTitle.split('\n').map((line,i)=><React.Fragment key={line}>{line}{i===0&&<br/>}</React.Fragment>)}</h2><div className="reasons">{[[t.guide1,t.guide1d],[t.guide2,t.guide2d],[t.guide3,t.guide3d]].map(([title,desc],i)=><div className="reason" key={title}><span>0{i+1}</span><div><h3>{title}</h3><p>{desc}</p></div></div>)}</div></div></section></>}
      {selectedMate && route.startsWith('/mate/') && <section className="detail section" id="booking-detail"><div className="detail-copy"><p className="eyebrow">{lang==='ko'?'메이트 프로필':'伙伴资料'}</p><h2>{selectedMate.name}<br/>{lang==='ko'?'님과의 여행':'的旅行'}</h2><button className="text-link" onClick={() => navigate('/')}>{t.backToResults}<ArrowRight size={16}/></button></div><div className="detail-panel"><div className="detail-mate"><img src={selectedMate.image} alt={selectedMate.name}/><div><span>{t.mate}</span><h3>{selectedMate.name}</h3><p><Star size={13} fill="currentColor"/>{selectedMate.rating} · {selectedMate.reviewCount} {lang==='ko'?'후기':'条评价'}</p></div></div><p className="mate-bio">{selectedMate.bio[lang]}</p><div className="profile-facts"><div><span>{lang==='ko'?'사용 가능 언어':'可用语言'}</span><b>{selectedMate.languages.join(' · ')}</b></div><div><span>{lang==='ko'?'서비스 가능 지역':'服务地区'}</span><b>{selectedMate.areas[lang].join(' · ')}</b></div><div><span>{lang==='ko'?'서비스 카테고리':'服务类别'}</span><b>{selectedMate.serviceCategories.map(id=>services.find(service=>service.id===id)?.title[lang]).join(' · ')}</b></div><div><span>{lang==='ko'?'예약 가능 날짜':'可预约日期'}</span><b>{selectedMate.availableDates.join(' · ')}</b></div><div><span>{lang==='ko'?'시간당 가격':'每小时价格'}</span><b>{formatWon(selectedMate.hourlyRate)} {t.perHour}</b></div></div><div className="detail-list"><div><span>{t.service}</span><b>{selectedService?.icon} {selectedService?.title[lang]}</b></div><div><span>{t.bookingDate}</span><b>{date}</b></div><div><span>{t.bookingTime}</span><b>{hours} {t.hours}</b></div><div><span>{t.travelers}</span><b>{guests} {t.guests}</b></div></div><label className="request-field"><span>{t.request}</span><textarea value={requestNote} onChange={e => { setRequestNote(e.target.value); setRequestError(false); }} placeholder={t.requestPlaceholder} aria-invalid={requestError} /></label>{requestError && <p className="request-error">{selectedMate.availableDates.includes(date) ? t.requestRequired : (lang==='ko'?'선택한 날짜는 예약 불가입니다.':'所选日期不可预约。')}</p>}<div className="detail-total"><span>{t.total}</span><strong>{formatWon(selectedMate.hourlyRate * hours)}</strong></div><button className="primary full" onClick={handleReservationRequest}>{t.confirm}<ArrowRight size={18}/></button></div></section>}
      {route === '/my-bookings' && <section className="confirmation section" id="my-bookings"><div className="confirmation-card"><p className="eyebrow">{lang==='ko'?'내 예약':'我的预约'}</p><h2>{lang==='ko'?'예약 내역':'预约记录'}</h2><p className="confirmation-note">{lang==='ko'?'예약 상태는 메이트 승인 후 업데이트됩니다.':'伙伴确认后将更新预约状态。'}</p><div className="confirmation-summary">{bookings.map(booking=><div key={booking.id}><span>{booking.id}<br/>{booking.date} · {booking.hours}{t.hours} · {booking.guests}{t.guests}</span><b>{booking.mateName}<br/>{bookingStatuses[booking.status]?.[lang] || bookingStatuses.requested[lang]}</b></div>)}</div></div></section>}
    </main>
    <footer><button className="brand" onClick={scrollTop}>Korea<span>Mate</span></button><p>{t.footer}</p><small>© 2026 KoreaMate. {t.footerLinks}</small></footer>
  </>;
}
createRoot(document.getElementById('root')).render(<App />);
