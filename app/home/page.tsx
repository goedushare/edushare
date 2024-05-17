import {Button} from '@nextui-org/button'; 

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <header className="py-5 px-10 justify-between flex items-center bg-[#003366] text-white">
        <h1 className="font-bold inline-block">NSL Forever</h1>
        <div className="inline-block">
          <Button className="bg-[#00A651]">Upload</Button>
          <div className="inline-block">150217</div>
        </div>
      </header>
      <div className="main-content">
        <aside className="sidebar">
          <div className="course-header">
            <h2>AP®/College US Government and...</h2>
          </div>
          <nav className="lesson-nav">
            <div className="lesson-item active">
              <span className="icon">▶</span>
              The social contract
            </div>
            <div className="lesson-item">
              <span className="icon">▶</span>
              Democratic ideals of US government
            </div>
            <div className="lesson-item">
              <span className="icon">▶</span>
              The ideas at the heart of US government
            </div>
            <div className="lesson-item">
              <span className="icon">▶</span>
              Democratic ideals in the Declaration...
            </div>
            <div className="lesson-item">
              <span className="icon">▶</span>
              Democratic ideals in the Declaration...
            </div>
            <div className="lesson-item">
              <span className="icon">▶</span>
              The Declaration of Independence
            </div>
            <div className="lesson-item">
              <span className="icon">▶</span>
              Democratic ideals in the Preamble...
            </div>
          </nav>
        </aside>
        <section className="video-content">
          <div className="video-header">
            <h1>The social contract</h1>
          </div>
          <div className="video-container"></div>
          <div className="video-details">
            <div className="tabs">
              <button className="tab active">About</button>
              <button className="tab">Transcript</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
