import styles from "./videoPlayer.module.css";

type VideoPlayerProps = {
  src: string;
};

const VideoPlayer = ({ src }: VideoPlayerProps) => {
  return (
    <video
      autoPlay={true}
      className={styles.video}
      loop={true}
      muted={true}
      playsInline
      src={src}
    >
      Votre navigateur ne prend pas en charge la lecture vidéo.
    </video>
  );
};

export default VideoPlayer;
