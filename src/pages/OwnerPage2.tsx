import React from 'react';

// 👇 1. 로컬 이미지 파일들을 불러옵니다. (경로와 파일명을 실제 파일에 맞게 수정하세요)
// 예: src/assets/storeImg/ 폴더 안에 이미지가 있다고 가정
import localStoreCover from '../assets/storeImg/store1.png'; 
import localCoffee from '../assets/cakeImg/IMG_5969.jpg';
import localBread from '../assets/cakeImg/IMG_5970 2.jpg';
import localLatte from '../assets/cakeImg/IMG_5972.jpg';
import localCake from '../assets/cakeImg/IMG_5978.jpg';

const OwnerPage2 = () => {
  // 상단 요약 통계 데이터
  const storeStats = {
    totalOrders: 3,
    preparing: 1,
    completed: 2,
  };

  // 👇 2. 불러온 이미지를 변수에 할당합니다.
  const storeCoverImg = localStoreCover;
  const coffeeImg = localCoffee;
  const breadImg = localBread;
  const latteImg = localLatte;
  const cakeImg = localCake;

  // 주문 목록 데이터
  const orders = [
    {
      id: "ORD00001",
      timeAgo: "2시간 전",
      status: "완료",
      totalPrice: 13800,
      items: [
        { name: "시그니처 아메리카노", count: 2, price: 10000, image: coffeeImg },
        { name: "크루아상", count: 1, price: 3800, image: breadImg },
      ],
    },
    {
      id: "ORD00003",
      timeAgo: "5시간 전",
      status: "완료",
      totalPrice: 18500,
      items: [
        { name: "바닐라 라떼", count: 1, price: 5500, image: latteImg },
        { name: "티라미수", count: 2, price: 13000, image: cakeImg },
      ],
    },
    {
      id: "ORD00005",
      timeAgo: "27분 전",
      status: "제조중",
      totalPrice: 12600,
      items: [
        { name: "시그니처 아메리카노", count: 1, price: 5000, image: coffeeImg },
        { name: "크루아상", count: 2, price: 7600, image: breadImg },
      ],
    },
  ];

  return (
    <div style={styles.container}>
     

      {/* --- Page Content --- */}
      <div style={styles.contentWrapper}>
        
        {/* Page Title & Breadcrumb */}
        <div style={styles.pageTitleSection}>
          <div style={styles.breadcrumbIcon}>🏠</div>
          <div>
            <h2 style={styles.pageTitleText}>내 가게 관리</h2>
            <p style={styles.storeNameText}>3개의 가게를 운영중입니다</p>
          </div>
        </div>

        {/* Store Cover Image Banner */}
        <div style={{...styles.storeBanner, backgroundImage: `url(${storeCoverImg})`}}>
          <div style={styles.storeBannerOverlay}>
            <h1 style={styles.bannerStoreName}>커피스미스</h1>
            <p style={styles.bannerStoreDesc}>프리미엄 원두로 정성껏 내린 스페셜티 커피</p>
          </div>
        </div>

        {/* Dashboard Main Area */}
        <div style={styles.dashboardArea}>
          
          {/* Top Stats Cards */}
          <div style={styles.statsContainer}>
            <div style={styles.statCard}>
              <div style={{...styles.statIcon, backgroundColor: '#FEF3C7'}}>📦</div>
              <div>
                <div style={styles.statLabel}>총 주문</div>
                <div style={styles.statValue}>{storeStats.totalOrders}건</div>
              </div>
            </div>
            <div style={styles.statCard}>
              <div style={{...styles.statIcon, backgroundColor: '#DBEAFE'}}>🔥</div>
              <div>
                <div style={styles.statLabel}>제조중</div>
                <div style={styles.statValue}>{storeStats.preparing}건</div>
              </div>
            </div>
            <div style={styles.statCard}>
              <div style={{...styles.statIcon, backgroundColor: '#DCFCE7'}}>✅</div>
              <div>
                <div style={styles.statLabel}>완료</div>
                <div style={styles.statValue}>{storeStats.completed}건</div>
              </div>
            </div>
          </div>

          {/* Menu Management Banner */}
          <div style={styles.menuManageBanner}>
            <div>
              <h3 style={styles.bannerTitle}>메뉴 관리</h3>
              <p style={styles.bannerSubtitle}>현재 4개의 메뉴가 등록되어 있습니다</p>
            </div>
            <button style={styles.menuManageBtn}>
              <span style={{marginRight: '6px'}}>⚙️</span> 메뉴 관리
            </button>
          </div>

          {/* Order List Section */}
          <div style={styles.orderListSection}>
            <h3 style={styles.sectionTitle}>주문 목록</h3>
            
            <div style={styles.orderList}>
              {orders.map((order, index) => (
                <div key={order.id} style={styles.orderCard}>
                  {/* Order Header */}
                  <div style={styles.orderHeader}>
                    <div>
                      <div style={styles.orderId}>주문번호: {order.id}</div>
                      <div style={styles.orderTime}>{order.timeAgo}</div>
                    </div>
                    <div style={{
                      ...styles.statusBadge, 
                      backgroundColor: order.status === '완료' ? '#DCFCE7' : '#DBEAFE',
                      color: order.status === '완료' ? '#166534' : '#1E40AF'
                    }}>
                      {order.status === '완료' ? '✅' : '🔥'} 
                      <span style={{marginLeft: '4px'}}>{order.status}</span>
                    </div>
                  </div>

                  <div style={styles.divider}></div>

                  {/* Order Items */}
                  <div style={styles.orderItems}>
                    {order.items.map((item, i) => (
                      <div key={i} style={styles.itemRow}>
                        <div style={styles.itemInfo}>
                          <div 
                            style={{
                              ...styles.itemImage, 
                              backgroundImage: `url(${item.image})` 
                            }}
                          ></div>
                          <div>
                            <div style={styles.itemName}>{item.name}</div>
                            <div style={styles.itemCount}>{item.count}개</div>
                          </div>
                        </div>
                        <div style={styles.itemPrice}>{item.price.toLocaleString()}원</div>
                      </div>
                    ))}
                  </div>

                  <div style={styles.divider}></div>

                  {/* Order Total */}
                  <div style={styles.orderTotal}>
                    <span style={styles.totalLabel}>총 금액</span>
                    <span style={styles.totalPrice}>{order.totalPrice.toLocaleString()}원</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// --- Styles ---
const styles: { [key: string]: React.CSSProperties } = {
  container: {
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
  profileIcon: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: '#D1D5DB',
  },
  contentWrapper: {
    maxWidth: '1280px',
    width: '100%',
    margin: '0 auto',
    padding: '40px 20px',
    boxSizing: 'border-box',
  },
  pageTitleSection: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '24px',
    backgroundColor: '#fff',
    padding: '12px 20px',
    borderRadius: '12px',
    border: '1px solid #E5E7EB',
    width: 'fit-content',
  },
  breadcrumbIcon: {
    width: '32px',
    height: '32px',
    backgroundColor: '#F3F4F6',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '12px',
    fontSize: '16px',
  },
  pageTitleText: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#111827',
    margin: 0,
    marginRight: '12px',
  },
  storeNameText: {
    fontSize: '14px',
    color: '#6B7280',
    margin: 0,
    borderLeft: '1px solid #E5E7EB',
    paddingLeft: '12px',
  },
  storeBanner: {
    width: '100%',
    height: '240px',
    borderRadius: '16px',
    marginBottom: '32px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  },
  storeBannerOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    padding: '32px',
    background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  bannerStoreName: {
    color: '#ffffff',
    fontSize: '32px',
    fontWeight: '800',
    margin: 0,
    marginBottom: '8px',
    textShadow: '0 2px 4px rgba(0,0,0,0.3)',
  },
  bannerStoreDesc: {
    color: '#e5e7eb',
    fontSize: '16px',
    margin: 0,
    fontWeight: '500',
  },
  dashboardArea: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  statsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
  },
  statCard: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    border: '1px solid #E5E7EB',
  },
  statIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    marginRight: '16px',
  },
  statLabel: {
    fontSize: '14px',
    color: '#6B7280',
    marginBottom: '4px',
  },
  statValue: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#111827',
  },
  menuManageBanner: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    border: '1px solid #E5E7EB',
  },
  bannerTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#111827',
    margin: 0,
    marginBottom: '4px',
  },
  bannerSubtitle: {
    fontSize: '14px',
    color: '#6B7280',
    margin: 0,
  },
  menuManageBtn: {
    backgroundColor: '#E17100',
    color: '#ffffff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  orderListSection: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#111827',
    marginBottom: '16px',
  },
  orderList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  orderCard: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    border: '1px solid #E5E7EB',
  },
  orderHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '16px',
  },
  orderId: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#111827',
    marginBottom: '4px',
  },
  orderTime: {
    fontSize: '14px',
    color: '#6B7280',
  },
  statusBadge: {
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
  },
  divider: {
    height: '1px',
    backgroundColor: '#E5E7EB',
    margin: '16px 0',
  },
  orderItems: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  itemRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  itemImage: {
    width: '48px',
    height: '48px',
    backgroundColor: '#F3F4F6',
    borderRadius: '8px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  itemImagePlaceholder: {
    width: '48px',
    height: '48px',
    backgroundColor: '#F3F4F6',
    borderRadius: '8px',
  },
  itemName: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#111827',
    marginBottom: '2px',
  },
  itemCount: {
    fontSize: '13px',
    color: '#6B7280',
  },
  itemPrice: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#111827',
  },
  orderTotal: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '16px',
  },
  totalLabel: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#374151',
  },
  totalPrice: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#E17100',
  },
};

export default OwnerPage2;