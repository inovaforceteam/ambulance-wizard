import React from 'react'
import styles from '@/styles/components/label.module.scss'

const Label = ({title}) => {
  return (
    <div className={styles.label}>
         <span className={styles.title}>{ title}</span>      
    </div>
  )
}

export default Label
