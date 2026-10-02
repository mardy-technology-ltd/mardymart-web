import styles from "./page.module.css";
import { 
  FiSearch, 
  FiShoppingCart, 
  FiUser, 
  FiHeart, 
  FiChevronDown, 
  FiHelpCircle,
  FiShoppingBag
} from "react-icons/fi";

const curatedCategories = [
  { id: 1, title: 'ড্রাইড ফ্রুটস ও নাটস', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&auto=format&fit=crop&q=80' },
  { id: 2, title: 'অর্গানিক স্ন্যাকস', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop&q=80' },
  { id: 3, title: 'প্রাকৃতিক গ্রিন টি ও পাউডার', image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500&auto=format&fit=crop&q=80' },
  { id: 4, title: 'প্রিমিয়াম নাট বাটার ও মধু', image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=80' },
];

const featuredProducts = [
  { 
    id: 1, 
    category: 'অর্গানিক ফুড', 
    title: 'প্রিমিয়াম মেদজুল খেজুর (৫০০ গ্রাম)', 
    oldPrice: 160, 
    newPrice: 99, 
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&auto=format&fit=crop&q=80' 
  },
  { 
    id: 2, 
    category: 'কিচেন ও ডাইনিং', 
    title: 'সিলিকন কুকিং স্প্যাচুলা ও ব্রাশ সেট', 
    oldPrice: 180, 
    newPrice: 99, 
    image: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=500&auto=format&fit=crop&q=80' 
  },
  { 
    id: 3, 
    category: 'গ্যাজেট ও এক্সেসরিজ', 
    title: 'রিচার্জেবল মিনি ডেস্ক ও টেবিল ফ্যান', 
    oldPrice: 220, 
    newPrice: 99, 
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&auto=format&fit=crop&q=80' 
  },
  { 
    id: 4, 
    category: 'লাইফস্টাইল', 
    title: 'থার্মাল ইনসুলেটেড ভ্যাকুয়াম বোতল', 
    oldPrice: 150, 
    newPrice: 99, 
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&auto=format&fit=crop&q=80' 
  },
];

export default function Home() {
  return (
    <div className={styles.appContainer}>
      {/* 1. Top Notice Announcement */}
      <div className={styles.noticeBar}>
        🔔 বিশেষ মূল্যছাড়: মার্ডি মার্ট-এ পাচ্ছেন প্রতিটি দরকারি পণ্যে অবিশ্বাস্য ৯৯৳ অফার! 🔔
      </div>

      {/* 2. Top Utility Subheader */}
      <div className={styles.utilityBar}>
        <div className={styles.utilityInner}>
          <div className={styles.utilityLeft}>
            <div className={styles.utilityItem}>🚀 দ্রুত ডেলিভারি</div>
            <div className={styles.utilityItem}>⚖️ ন্যায্য ও সাশ্রয়ী মূল্য</div>
            <div className={styles.utilityItem}>⭐ ৪.৮ কাস্টমার রেটিং (১২k+ রিভিউ)</div>
          </div>
          <div className={styles.utilityRight}>
            <div className={styles.utilityItem}>🇧🇩 বাংলাদেশ <FiChevronDown size={12} /></div>
            <div className={styles.utilityItem}>বাংলা (BN) <FiChevronDown size={12} /></div>
            <div className={styles.utilityItem}><FiHelpCircle size={14} /> হেল্প ও সাপোর্ট <FiChevronDown size={12} /></div>
          </div>
        </div>
      </div>

      {/* 3. Main Header */}
      <header className={styles.mainHeader}>
        <div className={styles.headerInner}>
          <div className={styles.logo}>
            Mardy<span>Mart</span>
          </div>

          <div className={styles.searchContainer}>
            <FiSearch className={styles.searchIcon} size={18} />
            <input 
              type="text" 
              className={styles.searchInput} 
              placeholder="পণ্য, ক্যাটাগরি বা ব্র্যান্ড খুঁজুন..." 
            />
          </div>

          <div className={styles.headerActions}>
            <div className={styles.actionBtn}>
              <FiHeart size={20} />
            </div>
            <div className={styles.actionBtn}>
              <FiUser size={20} />
            </div>
            <div className={styles.cartBtn}>
              <FiShoppingBag size={19} color="#000000" />
              <span>৳০.০০</span>
            </div>
          </div>
        </div>
      </header>

      {/* 4. Category Navigation Row */}
      <nav className={styles.navRow}>
        <div className={styles.navInner}>
          <div className={`${styles.navLinkItem} ${styles.active}`}>
            সব পণ্য <FiChevronDown size={14} />
          </div>
          <div className={styles.navLinkItem}>
            ড্রাইড ফ্রুটস ও বাদাম <FiChevronDown size={14} />
          </div>
          <div className={styles.navLinkItem}>
            কিচেন ও হোম <FiChevronDown size={14} />
          </div>
          <div className={styles.navLinkItem}>
            ইলেকট্রনিক্স ও গ্যাজেট <FiChevronDown size={14} />
          </div>
          <div className={styles.navLinkItem}>
            বিউটি ও কেয়ার
          </div>
          <div className={styles.navLinkItem}>
            স্টেশনারি ও কিডস
          </div>
          <div className={styles.navLinkItem}>
            সুপারফুড
          </div>
          <div className={styles.navLinkItem}>
            হট ডিলস
          </div>
          <div className={styles.navLinkItem} style={{ color: '#ef4444', fontWeight: 800 }}>
            🔥 ৯৯৳ সেল
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className={styles.contentWrapper}>
        {/* 5. KoRo Style Hero Section */}
        <section className={styles.heroSection}>
          {/* Left Column: Bold Typography & CTA */}
          <div className={styles.heroLeft}>
            <h1 className={styles.heroTitle}>
              ORGANIC<br />
              COMES<br />
              KNOCKING
            </h1>
            <p className={styles.heroDesc}>
              আমাদের প্রিমিয়াম ও ফ্রেশ কালেকশন এখন সবচেয়ে সেরা মূল্যে আপনার হাতের নাগালে। আপনার পছন্দের পণ্যটি বেছে নিন!
            </p>
            <button className={styles.heroBtn}>
              SEE PRODUCTS
            </button>
          </div>

          {/* Center Column: Floating Center Product on Podium */}
          <div className={styles.heroCenter}>
            <img 
              src="https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=80" 
              alt="Organic Nut Butter Glass Jar" 
              className={styles.productDisplayImg}
            />
          </div>

          {/* Right Column: Stacked Color Cards */}
          <div className={styles.heroRight}>
            <div className={`${styles.sidePromoCard} ${styles.pinkCard}`}>
              <div className={styles.cardThumb}>
                <img 
                  src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=200&auto=format&fit=crop&q=80" 
                  alt="Dried Fruits" 
                />
              </div>
              <div className={styles.cardDetails}>
                <h4>Dried fruits</h4>
                <span>Explore →</span>
              </div>
            </div>

            <div className={`${styles.sidePromoCard} ${styles.blueCard}`}>
              <div className={styles.cardThumb}>
                <img 
                  src="https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=200&auto=format&fit=crop&q=80" 
                  alt="Advent Calendars Gift" 
                />
              </div>
              <div className={styles.cardDetails}>
                <h4>Special Gifts</h4>
                <span>Explore →</span>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Feature Badges Row */}
        <div className={styles.featuresRow}>
          <div className={styles.featureItem}>
            <span className={styles.featureEmoji}>🚚</span> সরাসরি উৎস থেকে আমদানি
          </div>
          <div className={styles.featureItem}>
            <span className={styles.featureEmoji}>⚖️</span> ন্যায্য ও সাশ্রয়ী দাম
          </div>
          <div className={styles.featureItem}>
            <span className={styles.featureEmoji}>🥜</span> ১০০% খাঁটি মান
          </div>
          <div className={styles.featureItem}>
            <span className={styles.featureEmoji}>🌿</span> সম্পূর্ণ প্রাকৃতিক ও ফ্রেশ
          </div>
          <div className={styles.featureItem}>
            <span className={styles.featureEmoji}>📦</span> সুরক্ষিত প্রিমিয়াম প্যাকেজিং
          </div>
          <div className={styles.featureItem}>
            <span className={styles.featureEmoji}>🚀</span> ফাস্ট ডেলিভারি
          </div>
        </div>

        {/* 7. Curated Photo Banner Grid */}
        <div className={styles.curatedGrid}>
          {curatedCategories.map((cat) => (
            <div key={cat.id} className={styles.curatedCard}>
              <img src={cat.image} alt={cat.title} />
              <div className={styles.curatedOverlay}>
                <span>{cat.title}</span>
              </div>
            </div>
          ))}
        </div>

        {/* 8. Products Section */}
        <section className={styles.productSection}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>সেরা ৯৯৳ কালেকশন</h2>
              <p className={styles.sectionSubtitle}>আপনার নিত্যপ্রয়োজনীয় অর্গানিক ও দৈনন্দিন সব সেরা পণ্য</p>
            </div>
            <span className={styles.viewAllLink}>সবগুলো দেখুন →</span>
          </div>

          <div className={styles.productGrid}>
            {featuredProducts.map((prod) => (
              <div key={prod.id} className={styles.productCard}>
                <div className={styles.productImgWrap}>
                  <img src={prod.image} alt={prod.title} />
                </div>
                <span className={styles.productCategoryTag}>{prod.category}</span>
                <h3 className={styles.productItemTitle}>{prod.title}</h3>
                <div className={styles.productPriceRow}>
                  <span className={styles.newPrice}>৳{prod.newPrice}</span>
                  <span className={styles.oldPrice}>৳{prod.oldPrice}</span>
                </div>
                <button className={styles.cardAddBtn}>
                  কার্টে যোগ করুন
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* 9. Clean Modern Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerGrid}>
            <div className={styles.footerBrand}>
              <h3>Mardy<span>Mart</span></h3>
              <p>
                খাঁটি, ফ্রেশ এবং সাশ্রয়ী মূল্যের সেরা পণ্য নিয়ে মার্ডি মার্ট আপনার পাশে। সরাসরি বিশ্বমানের সরবরাহকারীদের থেকে পাওয়া নির্ভরযোগ্য সেবা।
              </p>
            </div>

            <div className={styles.footerCol}>
              <h4>কুইক লিংক</h4>
              <ul>
                <li><a href="#">আমাদের সম্পর্কে</a></li>
                <li><a href="#">সেরা অফার ও ডিসকাউন্ট</a></li>
                <li><a href="#">৯৯৳ স্পেশাল কর্নার</a></li>
                <li><a href="#">ব্লগ ও রেসিপি</a></li>
              </ul>
            </div>

            <div className={styles.footerCol}>
              <h4>কাস্টমার সাপোর্ট</h4>
              <ul>
                <li><a href="#">হেল্প ও এফএকিউ</a></li>
                <li><a href="#">ডেলিভারি পলিসি</a></li>
                <li><a href="#">রিটার্ন ও রিফান্ড</a></li>
                <li><a href="#">প্রাইভেসি ও শর্তাবলী</a></li>
              </ul>
            </div>

            <div className={styles.footerCol}>
              <h4>যোগাযোগ</h4>
              <ul>
                <li>📍 ঢাকা, বাংলাদেশ</li>
                <li>📞 +৮৮০ ১২৩৪ ৫৬৭৮৯০</li>
                <li>✉️ support@mardymart.com</li>
              </ul>
            </div>
          </div>

          <div className={styles.footerBottom}>
            <p>© ২০২৬ Mardy Mart. সর্বস্বত্ব সংরক্ষিত।</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
