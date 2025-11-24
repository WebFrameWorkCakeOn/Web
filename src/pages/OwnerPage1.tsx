import React from 'react';
import { useNavigate } from 'react-router-dom'; // 1. navigate 훅 불러오기
import storeImg1 from '../assets/storeImg/store1.png';
import storeImg2 from '../assets/storeImg/store2.png';
import storeImg3 from '../assets/storeImg/store3.png';

const OwnerPage1 = () => {
  const navigate = useNavigate(); // 2. navigate 함수 선언

  const stores = [
    {
      id: 1,
      name: "베이커리24",
      description: "아침식사로 좋은 신선한 빵과 베이커리 전문점.",
      rating: 4.8,
      totalOrders: 3,
      preparing: 1,
      image: storeImg1,
    },
    {
      id: 2,
      name: "카페모카",
      description: "특색 있는 모카 커피와 디저트가 유명한 카페.",
      rating: 4.7,
      totalOrders: 1,
      preparing: 1,
      image: storeImg2,
    },
    {
      id: 3,
      name: "플레인케이크",
      description: "전통적인 케이크와 디저트를 제공하는 따뜻한 분위기.",
      rating: 4.8,
      totalOrders: 1,
      preparing: 1,
      image: storeImg3,
    },
  ];

  return (
    <div style={styles.pageContainer}>
      {/* --- Main Content --- */}
      <main style={styles.mainContainer}>
        {/* Title Section */}
        <div style={styles.contentHeader}>
          <div style={styles.titleGroup}>
            <div style={styles.breadcrumb}>
              <div style={styles.breadcrumbIcon}>🏠</div>
              <div style={styles.breadcrumbText}>내 가게 관리</div>
              <div style={styles.breadcrumbSubText}>3개의 가게를 운영중입니다</div>
            </div>
          </div>
          <button style={styles.addStoreBtn}>
            <span style={{ fontSize: '18px', marginRight: '6px' }}>+</span>
            새 가게 추가
          </button>
        </div>

        {/* Section Title */}
        <h2 style={styles.sectionTitle}>운영 중인 가게</h2>

        {/* Grid Cards */}
        <div style={styles.cardGrid}>
          {stores.map((store) => (
            <div key={store.id} style={styles.card}>
              {/* Card Image Area */}
              <div style={{ ...styles.cardImage, backgroundImage: `url(${store.image})` }}>
                {/* Image overlay gradient or effects could go here */}
              </div>

              {/* Card Content Area */}
              <div style={styles.cardContent}>
                <div style={styles.cardHeader}>
                  <h3 style={styles.storeName}>{store.name}</h3>
                  <p style={styles.storeDesc}>{store.description}</p>
                </div>

                {/* Stats Row */}
                <div style={styles.statsRow}>
                  <div style={styles.statItem}>
                    <span style={styles.statLabel}>평점</span>
                    <span style={styles.ratingValue}>⭐ {store.rating}</span>
                  </div>
                  <div style={styles.statItem}>
                    <span style={styles.statLabel}>총 주문</span>
                    <span style={styles.orderValue}>{store.totalOrders}건</span>
                  </div>
                </div>

                {/* Status Badge */}
                <div style={styles.statusBadge}>
                  <span style={styles.statusText}>제조중 {store.preparing}건</span>
                </div>

                {/* Manage Button */}
                <button 
                  style={styles.manageBtn}
                  // 👇 3. 클릭 시 페이지 이동 이벤트 추가
                  onClick={() => navigate('/owner-page2')}
                >
                  <span style={{ marginRight: '6px' }}>⚙️</span>
                  가게 관리하기
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

// --- Styles Object ---
const styles: { [key: string]: React.CSSProperties } = {
  pageContainer: {
    fontFamily: "'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif",
    backgroundColor: '#F9FAFB',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 60px',
    height: '70px',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #E5E7EB',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  logoIcon: {
    width: '32px',
    height: '32px',
    backgroundColor: '#f3f4f6',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#4B5563',
  },
  logoText: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#5C3A21',
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
  },
  userName: {
    fontWeight: '600',
    color: '#1F2937',
  },
  userRole: {
    color: '#E17100',
    fontWeight: '600',
    marginLeft: '4px',
    marginRight: '8px',
  },
  userGreeting: {
    color: '#4B5563',
  },
  viewStoreBtn: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#E17100',
    color: '#ffffff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
  },
  iconGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  iconButton: {
    position: 'relative',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: '#ffffff',
    border: '1px solid #E5E7EB',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  notificationBadge: {
    position: 'absolute',
    top: '-4px',
    right: '-4px',
    backgroundColor: '#16A34A',
    color: 'white',
    fontSize: '10px',
    fontWeight: 'bold',
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePlaceholder: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: '#D1D5DB',
  },
  mainContainer: {
    padding: '40px 100px',
    maxWidth: '1600px',
    margin: '0 auto',
    width: '100%',
    boxSizing: 'border-box',
  },
  contentHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '24px',
  },
  titleGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  breadcrumb: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
    backgroundColor: '#fff',
    padding: '12px 20px',
    borderRadius: '8px',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
    width: 'fit-content',
  },
  breadcrumbIcon: {
    marginRight: '10px',
    fontSize: '18px',
  },
  breadcrumbText: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#111827',
    marginRight: '12px',
  },
  breadcrumbSubText: {
    fontSize: '14px',
    color: '#6B7280',
    borderLeft: '1px solid #E5E7EB',
    paddingLeft: '12px',
  },
  addStoreBtn: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#111827',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    marginTop: '8px',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#111827',
    marginBottom: '20px',
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
    gap: '24px',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
    display: 'flex',
    flexDirection: 'column',
    height: '420px',
  },
  cardImage: {
    height: '180px',
    width: '100%',
    backgroundColor: '#E5E7EB',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  cardContent: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
  },
  cardHeader: {
    marginBottom: '16px',
  },
  storeName: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#111827',
    marginBottom: '8px',
    marginTop: 0,
  },
  storeDesc: {
    fontSize: '14px',
    color: '#6B7280',
    margin: 0,
    lineHeight: '1.4',
  },
  statsRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '16px',
  },
  statItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: '14px',
  },
  statLabel: {
    color: '#4B5563',
  },
  ratingValue: {
    fontWeight: '600',
    color: '#E17100',
  },
  orderValue: {
    fontWeight: '600',
    color: '#111827',
  },
  statusBadge: {
    backgroundColor: '#EFF6FF',
    color: '#2563EB',
    padding: '8px 12px',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: '600',
    marginBottom: 'auto',
    display: 'flex',
    alignItems: 'center',
    width: 'fit-content',
  },
  statusText: {
    display: 'flex',
    alignItems: 'center',
  },
  manageBtn: {
    width: '100%',
    backgroundColor: '#000000',
    color: '#ffffff',
    border: 'none',
    padding: '14px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20px',
  },
};

export default OwnerPage1;