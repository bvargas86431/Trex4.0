import styles from "../styles/BackgroundVideo.module.css";

interface BackgroundVideoProps {
  videoSrc: string;
  children?: React.ReactNode;
}

export default function BackgroundVideo({ videoSrc, children }: BackgroundVideoProps) {
  return (
    <div className={styles.videoContainer}>
      <video autoPlay loop muted className={styles.videoBackground}>
        <source src={videoSrc} type="video/mp4" />
        Tu navegador no soporta el video.
      </video>
      <div className={styles.overlay}>{children}</div>
    </div>
  );
}

