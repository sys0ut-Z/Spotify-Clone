import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { Outlet } from 'react-router-dom'
import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/FriendsActivity';
import AudioPlayer from './components/AudioPlayer';
import PlaybackControls from './components/PlaybackControls';
import { useEffect, useState } from 'react';

const MainLayout = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();

    // when user resizes screen
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className='h-screen bg-black text-white flex flex-col'>
      {/* For Audio Controls */}
      <AudioPlayer />

      {/* Main Layout */}
      <ResizablePanelGroup className='flex-1 flex h-full overflow-hidden p-2'>
        
        {/* Left Sidebar : Playlist */}
        <ResizablePanel defaultSize={20} minSize={isMobile ? 0 : 10} maxSize={25}>
          <LeftSidebar />
        </ResizablePanel>
        <ResizableHandle withHandle />

        {/* Content Body */}
        <ResizablePanel defaultSize={isMobile ? 100 : 60} maxSize={80} className='rounded-md'>
          <Outlet />
        </ResizablePanel>

        {/* Right Sidebar : Friends Activity */}
        {
          !isMobile && (
            <>
              <ResizableHandle withHandle />
              <ResizablePanel minSize={0} maxSize={25} collapsedSize={0}>
                <RightSidebar />
              </ResizablePanel>  
            </>
          )
        }
      </ResizablePanelGroup>

      {/* Playback Controls */}
      <PlaybackControls />
    </div>
  )
}

export default MainLayout