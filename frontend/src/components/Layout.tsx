import type { ReactNode } from "react";

import Navbar from "./Navbar";

type Props = {
  children: ReactNode;
};

export default function Layout({
  children,
}: Props) {
  return (
    <>
      <Navbar />

      <main style={styles.main}>
        {children}
      </main>
    </>
  );
}

const styles = {
  main: {
    padding: "20px",
  },
};