import React from 'react'
import ContactPage from './page'
import { getDictionary } from '@/services/dictionaries';
import Header from '@/components/header';

const LayoutContact = async({children,params}) => {
    const { lang } = params;

  const dict = await getDictionary(lang);
    
  return (
    <>
    <Header dict={dict} lang={lang}/>
    <ContactPage dict={dict}/>
    </>
  )
};

export default LayoutContact