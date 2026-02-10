"use client";

import { useLeadModal } from '@/context/LeadModalContext';
import { Modal } from '@/components/ui/Modal';
import { LeadForm } from '@/components/forms/LeadForm';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { IoCheckmarkCircle } from 'react-icons/io5';

export const LeadModal = () => {
  const { isOpen, closeModal } = useLeadModal();
  const [isSuccess, setIsSuccess] = useState(false);

  const handleClose = () => {
    closeModal();
    // Reset success state after animation/close
    setTimeout(() => setIsSuccess(false), 300);
  };

  const handleSuccess = () => {
    setIsSuccess(true);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isSuccess ? undefined : "Start Your Journey"}
    >
      {isSuccess ? (
        <div className="text-center py-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-block text-green-500 mb-4"
          >
            <IoCheckmarkCircle size={64} />
          </motion.div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
          <p className="text-gray-600 mb-6">
            We have received your details. Our expert consultants will contact you shortly.
          </p>
          <button
            onClick={handleClose}
            className="text-primary font-medium hover:underline"
          >
            Close
          </button>
        </div>
      ) : (
        <>
           <p className="text-gray-600 mb-6">
            Fill out the form below to get a free profile evaluation and expert immigration advice.
          </p>
          <LeadForm onSuccess={handleSuccess} />
        </>
      )}
    </Modal>
  );
};
