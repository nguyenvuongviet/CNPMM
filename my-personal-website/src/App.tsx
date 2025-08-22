import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Thông Tin Cá Nhân Của Tôi</h1>
        <p><strong>Tên:</strong> Nguyễn Vương Việt</p>
        <p><strong>Tuổi:</strong> 21</p>
        <p><strong>Sở thích:</strong> Du lịch, đi bộ, lập trình, nghe nhạc</p>
        <p><strong>Email:</strong> nguyenvuongviet2k4@gmail.com</p>
        <p><strong>Github</strong> <a href="https://github.com/nguyenvuongviet">nguyenvuongviet</a></p>
      </header>
    </div>
  );
}

export default App
