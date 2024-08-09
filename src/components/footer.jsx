"use client"
import React, { useEffect } from 'react'
import styles from '@/styles/components/footer.module.scss'
const Footer = () => {
    useEffect(() => {
        const copyrightDate = document.querySelector(".copyright-date");
        let date = new Date();
        copyrightDate.innerText = date.getFullYear();
      }, []);
  return (
    <footer className={styles.footer}>
      <span className={styles.copyright}>
         &copy;
        <span className="copyright-date "></span>
        <span className="copyright-link">
          - Made by InovaForce. All rights reserved.
        </span>
      </span>
    </footer>
  )
}

export default Footer
