import { ScrollArea } from '@/components/ui/scroll-area'
import { Clock } from 'lucide-react'

const AlbumPageSkeleton = () => {
  return (
    <div className='h-full'>
      <ScrollArea className='h-full rounded-md'>
        <div className='relative min-h-full'>
          <div className='absolute left-0 top-0 inset-0 bg-zinc-900 pointer-events-none'></div>
          <div className='relative z-10 animate-pulse'>
            
            {/* Header Section */}
            <div className='flex flex-col md:flex-row p-6 gap-6 pb-8'>
              {/* Cover Image Skeleton */}
              <div className='w-35 h-35 sm:h-45 sm:w-45 lg:w-60 lg:h-60 bg-zinc-800 shadow-xl rounded shrink-0'></div>
              
              <div className='flex flex-col justify-end w-full'>
                <div className='h-4 w-12 bg-zinc-800 rounded mb-4'></div>
                <div className='h-12 lg:h-20 w-3/4 max-w-2xl bg-zinc-800 rounded my-4'></div>
                
                {/* Meta Info Skeleton (Artist, Song Count, Year) */}
                <div className='flex items-center gap-2'>
                  <div className='h-4 w-24 bg-zinc-800 rounded'></div>
                  <div className='h-4 w-20 bg-zinc-800 rounded'></div>
                  <div className='h-4 w-16 bg-zinc-800 rounded'></div>
                </div>
              </div>
            </div>

            <div className='px-6 pb-4 flex items-center gap-6'>
              <div className='h-14 w-14 rounded-full bg-zinc-800'></div>
            </div>

            <div className='bg-black/20 backdrop-blur-sm'>
              {/* Table Header */}
              <div className='grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm text-zinc-400 border-b border-white/5 items-center'>
                <div className='text-center'>#</div>
                <div className='h-4 w-10 bg-zinc-800 rounded'></div>
                <div className='h-4 w-24 bg-zinc-800 rounded'></div>
                <div>
                  <Clock className='h-4 w-4 text-zinc-600'/>
                </div>
              </div>

              {/* Songs List Skeleton */}
              <div className='space-y-2 py-4'>
                {Array.from({ length: 5 }).map((_, i) => (
                  <div 
                    key={i} 
                    className='grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 border-b border-white/5 items-center'
                  >
                    <div className='flex justify-center'>
                      <div className='h-4 w-3 bg-zinc-800 rounded'></div>
                    </div>
                    
                    {/* Image & Title/Artist */}
                    <div className='flex items-center gap-3'>
                      <div className='size-10 bg-zinc-800 rounded shrink-0'></div>
                      <div className='flex flex-col gap-2'>
                        <div className='h-4 w-32 sm:w-48 bg-zinc-800 rounded'></div>
                        <div className='h-3 w-20 sm:w-24 bg-zinc-800 rounded'></div>
                      </div>
                    </div>
                    
                    {/* Date */}
                    <div>
                      <div className='h-4 w-20 sm:w-24 bg-zinc-800 rounded'></div>
                    </div>
                    
                    {/* Duration */}
                    <div>
                      <div className='h-4 w-10 bg-zinc-800 rounded'></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
            
        </div>
      </ScrollArea>
    </div>
  )
}

export default AlbumPageSkeleton