import { useEffect, useState } from 'react';


export const Toast = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)

  const handelCloseToInstall = async () => {
    setIsOpen(false);
    if (!deferredPrompt) return ;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
  } 
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsOpen(true);
      // console.log("Test");
      // (e as BeforeInstallPromptEvent).prompt();
    }
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);  
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, [])

  return (
    <div className="fixed w-56 h-16 -top-20 left-1/2 -translate-x-1/2 bg-cyan-900 rounded-md z-20">
      <div className='flex flex-row h-full items-center justify-evenly'>
        <img className='rounded-2xl' src='/icons/iconX48.png' alt='smartphone data'/>
        <div className='flex flex-col justify-center gap-1 text-sm'>
          <p className='text-white'>스마트 정보</p>
          <button type='button' className='bg-transparent text-cyan-300' onClick={handelCloseToInstall}>설치</button>
        </div>
      </div>
    </div>
  )
}