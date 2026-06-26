import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  const isMobile = false;
  return (
    <div className='h-screen bg-black text-white flex flex-col'>
      <ResizablePanelGroup className='flex-1 flex h-full overflow-hidden p-2'>
        {/* Left Sidebar : Playlist */}
        <ResizablePanel defaultSize={20} minSize={isMobile ? 0 : 10} maxSize={30}>
          Left Sidebar
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={isMobile ? 100 : 60} maxSize={80}>
          <Outlet />
        </ResizablePanel>

        {/* Right Sidebar : Friends Activity */}
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={20} minSize={0} maxSize={30} collapsedSize={0}>
          Right Sidebar
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

export default MainLayout