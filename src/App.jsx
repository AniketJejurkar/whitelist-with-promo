import { useState } from "react";
import Hero from "./components/Hero";
import Form from "./components/Form";

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isWalletOpen, setIsWalletOpen] = useState(false);

  return (
    <>
      <Hero onOpenForm={() => setIsFormOpen(true)} />
      {isFormOpen && (
        <Form
          onOpenWallet={() => setIsWalletOpen(true)}
          onClose={() => setIsFormOpen(false)}
        />
      )}
      {isWalletOpen && <Connect onClose={() => setIsWalletOpen(false)} />}
    </>
  );
}

export default App;
