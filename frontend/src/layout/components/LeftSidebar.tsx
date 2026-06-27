import { useEffect } from 'react'
import PlaylistSkeleton from '@/components/skeletons/PlaylistSkeleton'
import { buttonVariants } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { Show } from '@clerk/react'
import { useMusicStore } from '@/store/music.store'
import { HomeIcon, Library, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

const LeftSidebar = () => {
  const {isLoading, albums, fetchAlbums} = useMusicStore();

  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);

  // console.log({albums});
  return (
    <div className='h-full flex flex-col gap-2 mr-1.5'>

      {/* Navigation Menu */}
      <div className='rounded-lg bg-zinc-900 p-4'>
        <div className='space-y-2'>
          <Link to={"/"} className={cn(buttonVariants({
            variant:'ghost',
            className: 'w-full flex justify-start text-white hover:bg-zinc-100 '
          }))}>
            <HomeIcon className='mr-2 size-5' />
            <span className='hidden md:inline'>Home</span>
          </Link>

          <Show when={"signed-in"}>
            <Link to={"/chat"} className={cn(buttonVariants({
              variant:'ghost',
              className: 'w-full flex justify-start text-white hover:bg-zinc-100 '
            }))}>
              <MessageCircle className='mr-2 size-5' />
              <span className='hidden md:inline'>Messages</span>
            </Link>
          </Show>
        </div>
      </div>

      {/* Library Section */}
      <div className='flex-1 rounded-lg bg-zinc-900 p-4'>
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center text-white px-2'>
            <Library className='size-5 mr-2'/>
            <span className='hidden md:inline'>Playlist</span>
          </div>
        </div>
        <ScrollArea className='h-[calc(100vh-300px)]'>
          <div className='space-y-2'>
            {
              isLoading ? (
                <PlaylistSkeleton />
              ) : (
                <div>
                  {
                    albums?.map((album) => (
                      <Link to={`/albums/${album._id}`} key={album._id}
                        className='group p-2 hover:bg-zinc-800 rounded-md flex items-center gap-3 cursor-pointer'
                      >
                        <img src={album.imageUrl} alt="cover-image" 
                          className='size-12 rounded-md shrink-0 object-cover'
                        />
                        <div className='flex-1 min-w-0 hidden md:block'>
                          <h3 className='font-md truncate'>{album.title}</h3>
                          <p className='text-sm text-zinc-400 truncate'>Album •  {album.artist}</p>
                        </div>
                      </Link>
                    ))
                  }
                </div>
              )
            }
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

export default LeftSidebar