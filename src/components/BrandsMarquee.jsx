// import "../images/brand-1";
import Brand1 from "/images/brand-1.png";
import Brand2 from "/images/brand-2.png";
import Brand3 from "/images/brand-3.png";
import Brand4 from "/images/brand-4.png";
import Brand5 from "/images/brand-5.png";
import Brand6 from "/images/brand-6.png";
import Brand7 from "/images/brand-7.png";
const BRANDS = ["Google", "Microsoft", "Amazon", "Meta", "Apple", "Shopify", "Stripe", "Vercel"];
const BrandImage = [Brand1,Brand2,Brand3,Brand4,Brand5,Brand6,Brand7];
function BrandsMarquee() {
  const double = [...BRANDS, ...BRANDS];
  const showBrands = [...BrandImage,...BrandImage];
  return (
    <section className="brands-section">
      <div className="marquee-overflow">
        <div className="marquee-track" style={{ gap: 0 }}>
          {/* {double.map((b, i) => (
            <div key={i} className="brand-item">
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, letterSpacing: "-0.02em", color: "var(--white)" }}>{b}</span>
            </div>
          ))} */}
          {
            showBrands.map((Brand,i)=> (
              <div key={i} className="brand-item">
                <img src={Brand} alt = "Maruthesh"></img>
              </div>
            ))
          }
        </div>
      </div>
    </section>
  );
}
export default BrandsMarquee