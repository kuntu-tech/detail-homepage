'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';

interface WaitlistDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onJoined?: () => void;
}

const roles = ['DESIGNER', 'ENGINEER', 'MARKETER', 'GROWTH', 'SALES', 'OTHER'];
const companySizes = ['JUST ME', '2 - 49', '50 - 249', '250 - 999', '1,000 - 2,000', '2,000+'];

export const WaitlistDialog = ({ open, onOpenChange, onJoined }: WaitlistDialogProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [selectedCompanySize, setSelectedCompanySize] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);

  // Reset form when dialog closes
  useEffect(() => {
    if (!open) {
      setName('');
      setEmail('');
      setSelectedRole('');
      setSelectedCompanySize('');
    }
  }, [open]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.trim() === '' || email.trim() === '' || !email.includes('@') || !selectedRole || !selectedCompanySize) {
      return;
    }
    setSubmitted(true);
    // Save to localStorage
    localStorage.setItem('waitlist_joined', 'true');
    // Notify parent component
    if (onJoined) {
      onJoined();
    }
  };

  const isFormValid = name.trim() !== '' && email.trim() !== '' && email.includes('@') && selectedRole !== '' && selectedCompanySize !== '';

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
              className="p-8"
            >
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
                          ${selectedRole === role
                            ? 'bg-gray-800 text-white'
                            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
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
                          ${selectedCompanySize === size
                            ? 'bg-gray-800 text-white'
                            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
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
                  disabled={!isFormValid}
                  className={`
                    w-full py-3 px-4 rounded-lg text-sm font-medium transition-all
                    ${isFormValid
                      ? 'bg-gray-200 text-gray-800 hover:bg-gray-300 cursor-pointer'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-50'
                    }
                  `}
                >
                  JOIN WAITLIST
                </button>
              </motion.form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="bg-gray-100 min-h-[400px] flex flex-col"
            >
           

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
                  We got your request. You will receive an email once you have access to Datail.
                </motion.p>

              
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};
