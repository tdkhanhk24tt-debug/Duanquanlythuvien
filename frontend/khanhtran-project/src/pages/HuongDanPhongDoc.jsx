import "../App.css";

function HuongDanPhongDoc() {
  const rooms = [
    {
      title: "Phòng học nhóm",
      data: [
        ["Số lượng phòng", "02"],
        ["Vị trí", "Tầng 1"],
        ["Mục đích sử dụng", "Thảo luận nhóm phục vụ cho mục đích học tập"],
        ["Trang thiết bị", "Bàn ghế, quạt, bảng viết"],
        ["Số lượng chỗ ngồi", "05 – 07 người"],
        ["Thời gian sử dụng", "02 giờ/lượt, được phép gia hạn khi không có người chờ mượn"],
      ]
    },
    {
      title: "Phòng đọc",
      data: [
        ["Số lượng phòng", "01"],
        ["Vị trí", "Tầng 1"],
        ["Mục đích sử dụng", "Đọc sách, học tập cá nhân trong không gian yên tĩnh"],
        ["Trang thiết bị", "Bàn ghế, quạt, đèn chiếu sáng"],
        ["Số lượng chỗ ngồi", "20 – 30 người"],
        ["Thời gian sử dụng", "Mở cửa theo giờ hành chính và buổi tối"],
      ]
    }
  ];

  // 🔥 HƯỚNG DẪN
  const steps = [
    "Đăng ký sử dụng phòng học nhóm, phòng đọc của Thư viện trực tiếp tại Quầy thông tin",
    "Nhận kết quả đặt phòng: Buổi sáng từ 7g30 - 11g00; Buổi chiều từ 13g30 - 17g00 qua địa chỉ email mà người đăng ký cung cấp khi đặt phòng.",
    "Đến trực tiếp Quầy thông tin Lầu 1 để thực hiện thủ tục mượn/trả phòng (Người sử dụng kiểm tra thiết bị có trong phòng khi nhận và trả; tắt máy lạnh, đèn trước khi rời khỏi phòng)"
  ];

  const notes = [
    "- Kết quả đặt phòng sẽ bị hủy trong trường hợp người đặt đến trễ trên 15 phút so với thời gian đăng ký ",
    "- Người sử dụng có thể tự hủy kết quả đăng ký trên giao diện đặt phòng hoặc bằng cách thông báo cho cán bộ phụ trách thông qua email thuvien@kontum.udn.vn hoặc Hotline 0260.6287.775",
    "- Thời gian sử dụng sẽ được tính bằng thời gian kết thúc giao dịch trừ cho thời gian bắt đầu thực hiện giao dịch.",
    "- Đề có thể đáp ứng đúng nhu cầu, người sử dụng vui lòng đăng ký sớm cho Thư viện",
  ];

  return (
    <div className="guide-container">

      {/* TITLE */}
      <h1 className="guide-title">
        HƯỚNG DẪN SỬ DỤNG PHÒNG HỌC NHÓM - PHÒNG ĐỌC
      </h1>
      <div className="table-row">
        {rooms.map((room, index) => (
          <div className="table-wrapper" key={index}>
            <table className="guide-table">

              <thead>
                <tr>
                  <th colSpan="2" className="table-header">
                    {room.title}
                  </th>
                </tr>
              </thead>

              <tbody>
                {room.data.map((row, i) => (
                  <tr key={i}>
                    <td>{row[0]}</td>
                    <td><b>{row[1]}</b></td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        ))}
      </div>
      <div className="guide-text">
        <h1 className="guide-title2">
        Lưu ý: 
      </h1>
        {steps.map((step, index) => (
          <p key={index}>
            <b>Bước {index + 1}:</b> {step}
          </p>
        ))}

        <p className="note-title">Lưu ý:</p>

        <ul className="note-list">
          {notes.map((note, index) => (
            <li key={index}>{note}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default HuongDanPhongDoc;