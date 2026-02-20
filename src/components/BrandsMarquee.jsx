// import "../images/brand-1";
import Brand1 from "/images/brand-1.png";
import Brand2 from "/images/brand-2.png";
import Brand3 from "/images/brand-3.png";
import Brand4 from "/images/brand-4.png";
import Brand5 from "/images/brand-5.png";
import Brand6 from "/images/brand-6.png";
import Brand7 from "/images/brand-7.png";
const BrandImage = [Brand1,Brand2,Brand3,Brand4,Brand5,Brand6,Brand7];
function BrandsMarquee() {
  const showBrands = [...BrandImage,...BrandImage];
  return (
    <section className="brands-section">
      <div className="marquee-overflow">
        <div className="marquee-track" >
          {
            showBrands.map((Brand,i)=> (
              <div key={i} className="brand-item">
                <img src={Brand} alt = "TechLand Solutions"></img>
              </div>
            ))
          }
        </div>
      </div>
    </section>
  );
}
export default BrandsMarquee
//style={{ gap: 0 }}