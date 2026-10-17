import { forwardRef, useId } from 'react';
import { classes } from '~/utils/style';
import styles from './monogram.module.css';

export const Monogram = forwardRef(({ highlight, className, ...props }, ref) => {
  const id = useId();
  const clipId = `${id}monogram-clip`;

  return (
    <svg
      aria-hidden
      className={classes(styles.monogram, className)}
      width="48"
      height="29"
      viewBox="0 0 48 29"
      ref={ref}
      {...props}
    >
      <defs>
        <clipPath id={clipId}>
          <path d="M0 0h12c9 0 15 5.8 15 14.5S21 29 12 29H0V0Zm8 7v15h4c4.3 0 7-3 7-7.5S16.3 7 12 7H8Zm22 0c0-4.4 3.7-7 9-7 5.3 0 8.9 2.3 9 7h-7c-.1-1.3-.9-2-2.3-2-1.3 0-2.1.6-2.1 1.6 0 1.2 1.4 1.6 4.2 2.3 4.5 1.2 7.2 3.3 7.2 7.8 0 5-3.9 8-9.3 8-5.9 0-9.7-3.2-9.7-8.5h7.2c.1 1.8 1 2.7 2.6 2.7 1.5 0 2.4-.7 2.4-1.8 0-1.4-1.3-1.8-4.3-2.6-4.2-1.1-6.9-3.3-6.9-7.6Z" />
        </clipPath>
      </defs>
      <rect clipPath={`url(#${clipId})`} width="100%" height="100%" />
      {highlight && (
        <g clipPath={`url(#${clipId})`}>
          <rect className={styles.highlight} width="100%" height="100%" />
        </g>
      )}
    </svg>
  );
});
