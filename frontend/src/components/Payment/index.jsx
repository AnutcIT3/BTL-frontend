import React from 'react';

const PaymentPage = ({ selectedSeats, movie, showtime }) => {
  const pricePerSeat = 100000; // 100.000 VNĐ
  const totalAmount = selectedSeats.length * pricePerSeat;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Cột 1 & 2: Thông tin đơn hàng */}
        <div className="md:col-span-2 bg-gray-800 p-6 rounded-lg shadow-xl">
          <h2 className="text-2xl font-bold mb-6 border-b border-gray-700 pb-2">Thông Tin Đặt Vé</h2>
          
          <div className="flex gap-4 mb-6">
            <img src={movie.poster_url} alt="Poster" className="w-32 rounded-md" />
            <div>
              <h3 className="text-xl font-semibold text-yellow-500">{movie.title}</h3>
              <p className="text-gray-400">Suất chiếu: <span className="text-white">{showtime.start_time}</span></p>
              <p className="text-gray-400">Rạp: <span className="text-white">Cinema Hall 01</span></p>
              <p className="text-gray-400 font-bold">Ghế: 
                <span className="text-green-400 ml-2">{selectedSeats.join(", ")}</span>
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Chọn phương thức thanh toán</h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="border-2 border-blue-500 p-4 rounded-lg hover:bg-blue-900 transition">
                Ví MoMo / ZaloPay
              </button>
              <button className="border-2 border-yellow-500 p-4 rounded-lg hover:bg-yellow-900 transition text-yellow-500">
                Cardano Wallet (TADA Rewards)
              </button>
            </div>
          </div>
        </div>

        {/* Cột 3: Tổng kết & Thanh toán */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-xl h-fit border-l-4 border-yellow-500">
          <h2 className="text-xl font-bold mb-6 text-center">Tổng Kết</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Giá vé ({selectedSeats.length}x):</span>
              <span>{totalAmount.toLocaleString()} VNĐ</span>
            </div>
            <div className="flex justify-between">
              <span>Phí dịch vụ:</span>
              <span>0 VNĐ</span>
            </div>
            <hr className="border-gray-700" />
            <div className="flex justify-between text-xl font-bold text-yellow-500">
              <span>Tổng cộng:</span>
              <span>{totalAmount.toLocaleString()} VNĐ</span>
            </div>
          </div>

          <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-md mt-8 transition duration-300">
            XÁC NHẬN THANH TOÁN
          </button>
          
          <p className="text-xs text-center text-gray-500 mt-4 italic">
            * Nhận ngay 10 tADA sau khi thanh toán thành công.
          </p>
        </div>

      </div>
    </div>
  );
};

export default PaymentPage;