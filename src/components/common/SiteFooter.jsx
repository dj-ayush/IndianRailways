import React from 'react'

const FooterColumn = ({ title, links }) => (
  <div>
    <h4 className='text-white/90 font-[font2] mb-3'>{title}</h4>
    <ul className='space-y-2'>
      {links.map((l) => (
        <li key={l} className='text-white/70 hover:text-white transition-colors text-sm cursor-pointer'>{l}</li>
      ))}
    </ul>
  </div>
)

const SiteFooter = () => {
  return (
    <footer className='bg-black lg:py-16 py-12 mt-12'>
      <div className='max-w-6xl mx-auto px-4'>
        <div className='flex items-center gap-3 mb-10'>
          <div className='h-10 w-10 rounded-md bg-[#0b1426] flex items-center justify-center text-white font-[font2]'>IR</div>
          <span className='text-white font-[font2] text-lg'>Indian Railways</span>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8'>
          <FooterColumn title='Pricing' links={['Pricing Plans','API Pricing']} />
          <FooterColumn title='Products' links={['Video Avatar','Voice Cloning','Video Translator','AI Tools']} />
          <FooterColumn title='Industry' links={['Agencies','E-Learning','Marketing','Localization']} />
          <FooterColumn title='Resources' links={['Blog','Help Center','API Docs','FAQ']} />
          <FooterColumn title='Enterprise' links={['For Enterprise','Enterprise Pricing','Contact Sales']} />
          <FooterColumn title='Company' links={['About Us','Careers','Privacy Policy','Terms of Service']} />
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter


