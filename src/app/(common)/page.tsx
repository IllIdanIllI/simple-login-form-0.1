"use server";
import styles from './page.module.css';
import HamsterLayout from '@/components/hamster/HamsterLayout';

export default async function Home() {
  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Please watch the hamster</h1>
      <h2 className={styles.subtitle}>Keep mouse next to him</h2>
      <HamsterLayout />
    </section>
  );
}
