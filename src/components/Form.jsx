import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import bg from "./assets/bg.png";
import copy from "./assets/icons/copy.png";
import logo from "./assets/logo2.png";
import coins from "./assets/coins.png";
import WhitelistDialog from "./WhiteListDialog";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useDisconnect } from "wagmi";

export default function Form({ onClose, onOpenWallet }) {
  // 🔹 FORM STATE
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [xUsername, setXUsername] = useState("");
  const [country, setCountry] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [refLink, setRefLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);

  // 🔹 Wallet hooks
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  // Update referral code and link automatically
  useEffect(() => {
    if (isConnected && address) {
      setReferralCode(address);
      setRefLink(`${window.location.origin}?ref=${address}`);
    } else {
      setReferralCode("");
      setRefLink("");
    }
  }, [isConnected, address]);

  // Read referral from URL (if provided)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref) setReferralCode(ref);
  }, []);

  // Copy referral link
  const onCopy = async () => {
    if (!refLink) return;
    try {
      await navigator.clipboard.writeText(refLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error("Copy failed", e);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !xUsername || !country || !referralCode) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          xUsername,
          country,
          walletAddress: referralCode,
          referralCode,
        }),
      });

      const data = await res.json();
      console.log("SERVER RESPONSE:", data);
      setOpen(true);
    } catch (err) {
      console.error("SUBMIT ERROR:", err);
      alert("Submission failed");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex text-white overflow-y-auto bg-black/40 backdrop-blur-sm pt-2 lg:pt-0"
      style={{ fontFamily: "'Tektur', sans-serif" }}
    >
      <div className="relative flex border mx-auto border-cyan-300 w-full max-w-4xl p-[2px] bg rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.6)]">
        {copied && (
          <div className="fixed z-50 bottom-6 left-1/2 -translate-x-1/2 bg-white text-black px-4 py-2 rounded-lg shadow-lg text-sm animate-fadeIn">
            Copied!
          </div>
        )}

        <div
          className="absolute rounded-3xl inset-0 m-[1px] bg-cover bg-center"
          style={{ backgroundImage: `url(${bg})` }}
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl lg:h-full py-8 lg:p-10 overflow-y-auto"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <img
            src={coins}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-h-[280px] object-cover rounded-t-3xl pointer-events-none"
          />

          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-white/60 hover:text-white transition"
          >
            <X size={22} />
          </button>

          <div className="absolute lg:top-23 lg:left-8 left-5 w-16 lg:w-34 rounded-full">
            <img src={logo} className="w-34" />
          </div>

          <div className="lg:mt-30 mt-16 mx-6 lg:mx-20 lg:left-[10%] relative">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide">
              SPICA <span className="text-[#ee42d4]">(SPCA)</span> Whitelist
            </h1>

            <p className="text-[13.5px] text-white/80 leading-relaxed mt-2">
              Join the whitelist for early access to the Ezzstar ecosystem.{" "}
              <br />⚡ Only whitelist members will receive{" "}
              <span className="text-amber-300">10% extra SPCA bonus</span>{" "}
              during the <span className="text-pink-600">presale phase</span> —
              plus your own referral link to invite friends and earn an
              additional{" "}
              <span className="text-teal-500">
                10% bonus in SPCA and Crypto
              </span>
              . Enjoy exclusive perks, access to the test platform, rewards,
              private Discord channels, and early invitations to community
              events.
            </p>

            <form onSubmit={handleSubmit} className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-4">
                <div>
                  <label className="text-lg font-semibold">
                    Name<span className="text-red-400">*</span>
                  </label>
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-xl mt-1 focus:outline-none focus:border-cyan-400 placeholder:text-white/40 text-white"
                  />
                </div>

                <div>
                  <label className="text-lg font-semibold">
                    Email<span className="text-red-400">*</span>
                  </label>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-xl mt-1 focus:outline-none focus:border-cyan-400 placeholder:text-white/40 text-white"
                  />
                </div>

                <div>
                  <label className="text-lg font-semibold">
                    X (Username)<span className="text-red-400">*</span>
                  </label>
                  <input
                    required
                    value={xUsername}
                    onChange={(e) => setXUsername(e.target.value)}
                    className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-xl mt-1 focus:outline-none focus:border-cyan-400 placeholder:text-white/40 text-white"
                  />
                </div>

                <div>
                  <ConnectButton.Custom>
                    {({ openConnectModal }) => (
                      <>
                        {isConnected ? (
                          <div className="flex flex-col gap-2">
                            <div className="truncate px-4 py-2 w-full bg-black/30 border border-white/10 rounded-xl text-white">
                              {address}
                            </div>
                            <button
                              type="button"
                              onClick={() => disconnect()}
                              className="px-4 py-2 bg-red-600 rounded-xl hover:bg-red-700 transition text-white"
                            >
                              Disconnect
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={openConnectModal}
                            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl mt-1 hover:bg-white/10 transition text-white"
                          >
                            Connect Wallet
                          </button>
                        )}
                      </>
                    )}
                  </ConnectButton.Custom>
                </div>

                <div>
                  <label className="text-lg font-semibold">
                    Country<span className="text-red-400">*</span>
                  </label>
                  <input
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-xl mt-1 focus:outline-none focus:border-cyan-400 placeholder:text-white/40 text-white"
                  />
                </div>
              </div>

              {/* Referral Link & Submit */}
              <div className="flex lg:flex-row flex-col items-center gap-4 mt-4">
                <div>
                  <label className="text-lg font-semibold">Referral Link</label>
                  <div
                    onClick={onCopy}
                    className="flex w-[320px] rounded-xl hover:bg-black/50 cursor-pointer"
                  >
                    <button
                      type="button"
                      className="flex-1 truncate bg-black/30 rounded-tr-none rounded-br-none border-r-0 border border-white/10 px-4 py-3 rounded-xl text-white/60 text-left"
                    >
                      {refLink || "Connect your wallet first"}
                    </button>
                    <button
                      type="button"
                      disabled={!refLink}
                      className="pr-4 bg-black/30 rounded-xl rounded-bl-none rounded-tl-none border border-l-0 border-white/10 hover:bg-black/50 transition"
                    >
                      <img src={copy} alt="copy icon" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-1 justify-center items-center">
                  <button
                    type="submit"
                    className="px-16 py-2 bg-[#ff00d4] rounded-full text-lg shadow-[0_12px_40px_rgba(184,75,255,0.35)] hover:opacity-95 transition"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </motion.div>
      </div>

      {open && <WhitelistDialog onClose={() => setOpen(false)} />}
    </div>
  );
}
