"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface WaitlistDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onJoined?: () => void;
}

const roles = ["DESIGNER", "ENGINEER", "MARKETER", "GROWTH", "SALES", "OTHER"];
const companySizes = [
  "JUST ME",
  "2 - 49",
  "50 - 249",
  "250 - 999",
  "1,000 - 2,000",
  "2,000+",
];

export const WaitlistDialog = ({
  open,
  onOpenChange,
  onJoined,
}: WaitlistDialogProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [selectedCompanySize, setSelectedCompanySize] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  // Reset form when dialog closes
  useEffect(() => {
    if (!open) {
      setName("");
      setEmail("");
      setSelectedRole("");
      setSelectedCompanySize("");
      setSubmitted(false);
      setLoading(false);
      setError("");
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(1132);

    if (
      name.trim() === "" ||
      email.trim() === "" ||
      !email.includes("@") ||
      !selectedRole ||
      !selectedCompanySize
    ) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          role: selectedRole,
          company_size: selectedCompanySize,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "提交失败，请重试");
      }

      // 保存到 localStorage
      localStorage.setItem("waitlist_joined", "true");

      // 显示成功页面
      setSubmitted(true);

      // 通知父组件
      if (onJoined) {
        onJoined();
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "提交失败，请重试";
      setError(errorMessage);
      console.error("Waitlist 提交错误:", err);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    name.trim() !== "" &&
    email.trim() !== "" &&
    email.includes("@") &&
    selectedRole !== "" &&
    selectedCompanySize !== "";

  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        showCloseButton={false}
        className="bg-gray-100 border border-gray-300 max-w-lg p-0 overflow-hidden"
      >
        <DialogTitle className="sr-only">
          {submitted ? "You're on the waitlist!" : "Get early access"}
        </DialogTitle>
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="p-8 relative"
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 transition-colors rounded-full hover:bg-gray-200"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="text-center mb-8">
                <motion.h2
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="text-gray-800 text-3xl font-semibold mb-3"
                >
                  Get early access
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="text-gray-700 text-base"
                >
                  The first vibe-crafting tool, for a new wave of builders.
                </motion.p>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 bg-red-100 border border-red-300 rounded-lg text-red-700 text-sm"
                >
                  {error}
                </motion.div>
              )}

              <motion.form
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* Name Input */}
                <div>
                  <label className="block text-gray-800 text-sm font-medium mb-2">
                    NAME
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-gray-200 rounded-lg py-3 px-4 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 border border-transparent"
                    placeholder=""
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label className="block text-gray-800 text-sm font-medium mb-2">
                    EMAIL
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-200 rounded-lg py-3 px-4 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 border border-transparent"
                    placeholder=""
                  />
                </div>

                {/* Role Selection */}
                <div>
                  <label className="block text-gray-800 text-sm font-medium mb-3">
                    WHAT DESCRIBES YOU BEST?
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {roles.map((role) => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => setSelectedRole(role)}
                        className={`
                          py-2.5 px-4 rounded-lg text-sm font-medium transition-all
                          ${
                            selectedRole === role
                              ? "bg-gray-800 text-white"
                              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                          }
                        `}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Company Size Selection */}
                <div>
                  <label className="block text-gray-800 text-sm font-medium mb-3">
                    WHAT'S YOUR COMPANY SIZE?
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {companySizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedCompanySize(size)}
                        className={`
                          py-2.5 px-4 rounded-lg text-sm font-medium transition-all
                          ${
                            selectedCompanySize === size
                              ? "bg-gray-800 text-white"
                              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                          }
                        `}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!isFormValid || loading}
                  className={`
                    w-full py-3 px-4 rounded-lg text-sm font-medium transition-all
                    ${
                      isFormValid && !loading
                        ? "bg-gray-200 text-gray-800 hover:bg-gray-300 cursor-pointer"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed opacity-50"
                    }
                  `}
                >
                  {loading ? "Submitting..." : "JOIN WAITLIST"}
                </button>
              </motion.form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="bg-gray-100 min-h-[400px] flex flex-col relative"
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 transition-colors rounded-full hover:bg-gray-200 z-10"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Main Content */}
              <div className="flex-1 flex flex-col items-center justify-center px-8 py-12 text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mb-8 flex justify-center"
                >
                  <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center border-4 border-green-200">
                    <CheckCircle2 className="w-14 h-14 text-black-600" />
                  </div>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="text-gray-900 text-3xl font-bold mb-4"
                >
                  You're on the waitlist!
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className="text-gray-700 text-base mb-8 max-w-md"
                >
                  We got your request. You will receive an email once you have
                  access to Datail.
                </motion.p>

                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  onClick={handleClose}
                  className="px-6 py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};
