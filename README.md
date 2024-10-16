# Travel App

## Mô tả

**Travel App** là một ứng dụng cho phép người dùng nhập địa điểm và ngày khởi hành để nhận dự báo thời tiết và hình ảnh liên quan đến địa điểm đó. Ứng dụng sử dụng các API sau để lấy thông tin:

- **GeoNames API**: Để lấy tọa độ (lat, lng) dựa trên tên thành phố.
- **Weatherbit API**: Để nhận dự báo thời tiết hiện tại và trong tương lai dựa trên tọa độ.
- **Pixabay API**: Để hiển thị hình ảnh liên quan đến địa điểm.

## Chức năng chính

1. Nhập địa điểm và ngày khởi hành.
2. Nếu chuyến đi diễn ra trong vòng một tuần, nhận được dự báo thời tiết hiện tại.
3. Nếu chuyến đi diễn ra trong tương lai xa hơn một tuần, nhận được dự báo thời tiết cho ngày cụ thể.
4. Hiển thị hình ảnh liên quan đến địa điểm.

## Cài đặt và chạy ứng dụng

### Yêu cầu

- Node.js (>= v14.0.0)
- npm (>= 6.0.0)

### Các bước cài đặt

1. **Clone repository:**

    ```bash
    git clone https://github.com/ntt188/TravelApp.git
    cd TravelApp
    ```

2. **Cài đặt các package cần thiết:**
    ```bash
    npm i
    ```

3. **Cấu hình file `.env`:**
Tạo một file .env trong thư mục gốc của dự án và thêm các biến môi trường sau:
    ```bash
    GEONAMES_USERNAME=your_geonames_username
    WEATHERBIT_API_KEY=your_weatherbit_api_key
    PIXABAY_API_KEY=your_pixabay_api_key
    ```
Thay thế `your_geonames_username`, `your_weatherbit_api_key`, và `your_pixabay_api_key` bằng giá trị API key của bạn.

4. **Chạy ứng dụng trong môi trường phát triển:**
Chạy lệnh sau để khởi động server trong chế độ phát triển:
    ```bash
    npm run build-dev
    ```
Server sẽ chaỵ tại `http://localhost:8081`.

5. **Xây dựng ứng dụng cho môi trường sản xuất:**
Để build ứng dụng cho môi trường sản xuất:
    ```bash
    npm run build-prod
    ```

6. **Chạy ứng dụng với Nodemone (tự động restart khi có thay đổi):**
    ```bash
    npm start
    ```

## Testing
Dự án đã bao gồm các bài kiểm tra **unit test** với **Jest**. Để chạy test, bạn có thể sử dụng lệnh sau:
    ```bash
    npm run test
    ```

## Các công nghệ sử dụng
- **Node.js**: Môi trường chạy Javascript.
- **Express.js**: Framewỏk để xây dựng server.
- **Axios**: Thư viện HTTP client để gửi yêu cầu đến các API.
- **Webpack**: Công cụ đóng gói mã nguồn.
- **Sass**: CSS với các tính năng nâng cao.
- **Jest**: Framework để kiểm thử.

## Tài nguyên API
1. **GeoNames API**: https://www.geonames.org/
2. **Weatherbit API**: https://www.weatherbit.io/
3. **Pixabay API**: https://pixabay.com/api/docs/

## Tác giả
Nguyen Thanh Thang