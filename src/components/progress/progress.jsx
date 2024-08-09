"use client"
import styles from  './progress.scss'

const Progress = ({step=5 ,active=0,setActive}) => { 
  return (
    <div className={styles.progress}>
      {[...Array(step - 1).keys()].map((i) => (
        <>
          <button
            onClick={() => setActive(i + 1)}
            className={styles.progress-dot}
            style={{ backgroundColor: active - 1 === i ? "#da4d5e" : "" }}

          >
            {i + 1}
          </button>
          <div
            className={styles.progress-dot}
            style={{
              width: `${100 / (step - 1)}%`,
              backgroundColor: active - 1 > i ? "#da4d5e" : "",
            }}
          ></div>
        </>
      ))}
      <button
        onClick={() => setActive(step)}
        className={styles.progress-dot}
        style={{ backgroundColor: active  === step ? "#da4d5e" : "" }}
      >
        {step}
      </button>
    </div>
  );
}

export default Progress