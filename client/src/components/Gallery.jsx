import React from "react";
import videoframe from "../assets/videoframe_2183.png";
import noidung from "../assets/noidung.png";
import trangchu from "../assets/video-trang-chu.gif";
import tuhoc from "../assets/online-education.png";
import online from "../assets/reading.png";
import reading from "../assets/artificial-intelligence.png";
import iconVideo from "../assets/video.svg";
import iconFlash from "../assets/card.svg";
import iconLab from "../assets/microscope.svg";
import iconQuestion from "../assets/doubts.svg";
import iconExam from "../assets/checklist.svg";
import iconDGNL from "../assets/qualified.svg";
import iconAI from "../assets/artificial-intelligence-ico.png";
import iconSpeak from "../assets/robot.png";
import iconAssistant from "../assets/machine-learning.png";



const images = import.meta.glob('../assets/*.{png,jpg,jpeg,svg}', { eager: true });
console.log(images);


export default function Gallery() {

  const pressImages = [
    "chinhphu.png",
    "vtv2.png",
    "vnexpress.png",
    "giaoduc.png",
    "vtcnews.png",
    "haugiang.png",
    "haiduong.png",
    "danviet.png",
  ];

  const items = [
    { img: images["../assets/amc.png"].default, title: "Cuộc thi AMC" },
    { img: images["../assets/bebras-1.png"].default, title: "Cuộc thi Bebras" },
    { img: images["../assets/veo-2.png"].default, title: "Cuộc thi VEO" },
    { img: images["../assets/topik-150x150.png"].default, title: "Edmico TOPIK" },
    { img: images["../assets/ols.png"].default, title: "Onluyen.vn", },
    { img: images["../assets/ed_ielts.png"].default, title: "Edmicro IELTS", },
  ];

  const subjects = [
    { img: images["../assets/calculator.svg"].default, name: "Toán" },
    { img: images["../assets/book.svg"].default, name: "Ngữ Văn" },
    { img: images["../assets/audiobook.svg"].default, name: "Tiếng Anh" },
    { img: images["../assets/atom.svg"].default, name: "Vật lí" },
    { img: images["../assets/chemistry.svg"].default, name: "Hóa học" },
    { img: images["../assets/dna.svg"].default, name: "Sinh học" },
    { img: images["../assets/history.svg"].default, name: "Lịch sử" },
    { img: images["../assets/world-book-day.svg"].default, name: "Địa lí" },
    { img: images["../assets/sprout.svg"].default, name: "GDCD" },
    { img: images["../assets/computer.svg"].default, name: "Tin học" },
    { img: images["../assets/artificial-intelligence.svg"].default, name: "Công nghệ" },
    { img: images["../assets/dragon-boat-festival.svg"].default, name: "GD địa phương" },
  ];

  return (
    <>

      <section className="py-5" style={{ background: "#e8f0ff" }}>
        <div className="container">
          <h2 className="text-center fw-bold mb-4">Sản phẩm</h2>
          <p className="text-center text-muted mb-5">
            Ứng dụng công nghệ vào học tập và giảng dạy
          </p>


          <div className="row g-4 justify-content-center">
            {items.map((item, i) => (
              <div className="col-md-4 col-lg-2" key={i}>
                <div
                  className="p-3 shadow-sm"
                  style={{
                    background: "#fff",
                    borderRadius: "14px",
                    cursor: "pointer",
                    transition: "0.3s",
                  }}
                >
                  <div className="d-flex align-items-center gap-3">
                    <img
                      src={item.img}
                      alt={item.title}
                      style={{ width: 45, height: 45 }}
                    />
                    <div>
                      <h6 className="m-0 fw-bold">{item.title}</h6>
                      {item.sub && (
                        <small className="text-warning fw-semibold">
                          {item.sub}
                        </small>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>


          <div className="row align-items-center mt-5 pt-4">
            <div className="col-lg-6">
              <h2 className="fw-bold">Dành cho học sinh</h2>
              <h2 className="fw-bold mb-3">Lớp 1 – Lớp 12</h2>

              <p className="text-muted">Onluyen.vn – Học mọi lúc, mọi nơi</p>

              <div className="d-flex gap-3 mt-4">
                <img src={noidung} alt="kn" height="170" />
              </div>
            </div>

            <div className="col-lg-6 text-center">
              <img
                src={trangchu}
                alt="Laptop"
                className="img-fluid"
                style={{ maxWidth: "480px" }}
              />
            </div>
          </div>
        </div>
      </section>


      <section className="py-5" style={{ background: "#f5f7ff" }}>
        <div className="container text-center">
          <h3 className="fw-bold mb-4">Nội dung</h3>
          <p className="text-muted mb-5">
            Đầy đủ các môn học trong chương trình giáo dục phổ thông
          </p>

          <div className="row g-4 justify-content-center">
            {subjects.map((s, i) => (
              <div className="col-4 col-md-2" key={i}>
                <div>
                  <img
                    src={s.img}
                    alt={s.name}
                    style={{ width: 55, height: 55 }}
                  />
                  <p className="mt-2 fw-semibold">{s.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section style={{ background: "#001A72", padding: "80px 0" }}>
        <div className="container">
          <div className="row align-items-center">

            <div className="col-lg-6 text-white">
              <h1 className="fw-bold mb-3">
                Ứng dụng<br />công nghệ<br />
                <span style={{ color: "#FFD447" }}>trí tuệ nhân tạo</span>
              </h1>

              <p style={{ maxWidth: 420, lineHeight: "1.7" }}>
                Edmicro tiên phong trong ứng dụng trí tuệ nhân tạo để tự động hóa việc chấm,
                chữa, gợi ý cải thiện bài nói và viết môn tiếng Anh, giúp học sinh có thể luyện tập
                thường xuyên hơn với chi phí thấp hơn nhiều phương pháp truyền thống.
              </p>
            </div>

            <div className="col-lg-6 text-center">
              <img
                src={videoframe}
                alt="AI"
                className="img-fluid"
                style={{ maxHeight: 340 }}
              />
            </div>

          </div>
        </div>
      </section>

      <section style={{ background: "#F7F9FF", padding: "80px 0" }}>
        <div className="container text-center">

          <h2 className="fw-bold" style={{ fontSize: 36 }}>Onluyen.vn</h2>
          <p className="text-muted mb-5" style={{ fontSize: 18 }}>
            Ứng dụng tự học phong phú, toàn diện nhất
          </p>

          <div className="row justify-content-center g-4">

            {/* CARD 1 */}
            <div className="col-md-4">
              <div
                className="p-4 shadow-sm h-100"
                style={{
                  background: "#fff",
                  borderRadius: 22,
                  padding: "40px 30px",
                }}
              >
                <img src={tuhoc} alt="" width={70} />
                <h4 className="fw-bold mt-3">Tự học</h4>

                <ul className="text-start mt-4" style={{ fontSize: 16, lineHeight: "28px" }}>
                  <li className="d-flex align-items-start gap-2">
                    <img src={iconVideo} width={22} alt="" />
                    <span><b>+10.000 video bài giảng</b><br />Bao phủ toàn bộ các môn học từ lớp 1 – 12</span>
                  </li>
                  <li className="d-flex align-items-start gap-2 mt-3">
                    <img src={iconFlash} width={22} alt="" />
                    <span><b>+50.000 Flashcard</b><br />Ứng dụng công nghệ giúp tăng hứng thú và khả năng ghi nhớ trong quá trình học</span>
                  </li>
                  <li className="d-flex align-items-start gap-2 mt-3">
                    <img src={iconLab} width={22} alt="" />
                    <span><b>+500 Thí nghiệm ảo</b><br />Ứng dụng thực tiễn vào bài học, giúp hiểu sâu bản chất của kiến thức</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* CARD 2 */}
            <div className="col-md-4">
              <div
                className="p-4 shadow-sm h-100"
                style={{
                  background: "#fff",
                  borderRadius: 22,
                  padding: "40px 30px",
                }}
              >
                <img src={online} alt="" width={70} />
                <h4 className="fw-bold mt-3">Luyện tập</h4>

                <ul className="text-start mt-4" style={{ fontSize: 16, lineHeight: "28px" }}>
                  <li className="d-flex align-items-start gap-2">
                    <img src={iconQuestion} width={22} alt="" />
                    <span><b>+300.000 câu hỏi</b><br />Được sắp xếp khoa học từ dễ đến khó theo từng mạch nội dung</span>
                  </li>
                  <li className="d-flex align-items-start gap-2 mt-3">
                    <img src={iconExam} width={22} alt="" />
                    <span><b>+12.000 đề kiểm tra</b><br />Bám sát đề thi thực tế, giúp chuẩn bị tốt nhất trước mỗi kì thi</span>
                  </li>
                  <li className="d-flex align-items-start gap-2 mt-3">
                    <img src={iconDGNL} width={22} alt="" />
                    <span><b>Phòng luyện thi ĐGNL</b><br />Ứng dụng đầu tiên ở Việt Nam cung cấp phòng luyện cho hai kì thi ĐGNL của ĐHQG Hà Nội và TP.HCM</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* CARD 3 */}
            <div className="col-md-4">
              <div
                className="p-4 shadow-sm h-100"
                style={{
                  background: "#fff",
                  borderRadius: 22,
                  padding: "40px 30px",
                }}
              >
                <img src={reading} alt="" width={70} />
                <h4 className="fw-bold mt-3">Trí tuệ nhân tạo</h4>

                <ul className="text-start mt-4" style={{ fontSize: 16, lineHeight: "28px" }}>
                  <li className="d-flex align-items-start gap-2">
                    <img src={iconAI} width={22} alt="" />
                    <span><b>Adaptive Engine</b><br />Lưu trữ toàn bộ dữ liệu làm bài để gợi ý nội dung học/luyện tập phù hợp với năng lực từng người học</span>
                  </li>
                  <li className="d-flex align-items-start gap-2 mt-3">
                    <img src={iconSpeak} width={22} alt="" />
                    <span><b>Speak & Writing AI</b><br />Ứng dụng công nghệ AI để chấm bài luyện nói và viết tiếng Anh tương đương chất lượng giáo viên thật</span>
                  </li>
                  <li className="d-flex align-items-start gap-2 mt-3">
                    <img src={iconAssistant} width={22} alt="" />
                    <span><b>Trợ lý ảo</b><br />Trợ lý AI hỗ trợ giải đáp thắc mắc của học sinh trong quá trình học</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section style={{ padding: "60px 0", background: "#fff" }}>
        <div className="container text-center">

          <h2 className="fw-bold">
            Báo chí nói về <span style={{ color: "#F4B400" }}>Onluyen.vn</span>
          </h2>

          <div className="news-grid mt-5 d-flex flex-wrap justify-content-center gap-4">
            {pressImages.map((file, i) => (
              <img
                key={i}
                src={images[`../assets/${file}`].default}
                alt={file}
                style={{ width: 120, height: "auto", objectFit: "contain" }}
              />
            ))}
          </div>

        </div>
      </section>

    </>
  );
}
