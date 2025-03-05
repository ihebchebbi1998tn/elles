
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface QuoteRequestStepsProps {
  currentStep: number;
}

export const QuoteRequestSteps = ({ currentStep }: QuoteRequestStepsProps) => {
  const steps = [
    { number: 1, name: "Contact" },
    { number: 2, name: "Produit" },
    { number: 3, name: "Finalisation" },
  ];

  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex items-center w-full max-w-md">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center w-full">
            <div className="relative flex flex-col items-center">
              <div
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors z-10",
                  currentStep === step.number
                    ? "border-primary bg-primary text-white"
                    : currentStep > step.number
                    ? "border-primary/60 bg-primary/60 text-white"
                    : "border-gray-300 bg-white text-gray-500"
                )}
              >
                {currentStep > step.number ? (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                ) : (
                  <span className="text-sm font-semibold">{step.number}</span>
                )}
              </div>
              <span
                className={cn(
                  "absolute top-12 text-xs font-medium whitespace-nowrap",
                  currentStep === step.number
                    ? "text-primary font-semibold"
                    : currentStep > step.number
                    ? "text-primary/70"
                    : "text-gray-500"
                )}
              >
                {step.name}
              </span>
            </div>

            {index < steps.length - 1 && (
              <div className="w-full">
                <div className="relative h-0.5 w-full bg-gray-200">
                  <motion.div
                    className="absolute h-full bg-primary"
                    initial={{ width: "0%" }}
                    animate={{
                      width:
                        currentStep > step.number
                          ? "100%"
                          : currentStep === step.number
                          ? "50%"
                          : "0%",
                    }}
                    transition={{ duration: 0.3 }}
                  ></motion.div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
