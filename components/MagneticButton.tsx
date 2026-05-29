// components/MagneticButton.tsx
import React from "react";
import { motion } from "framer-motion";

// Define your own props, excluding 'ref' completely
type MagneticButtonProps = {
  children: React.ReactNode;
  // add any other custom props you need
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  // ... other attributes you want to pass manually
};

const MagneticButton = React.forwardRef<HTMLButtonElement, MagneticButtonProps>(
  ({ children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

MagneticButton.displayName = "MagneticButton";
export default MagneticButton;
