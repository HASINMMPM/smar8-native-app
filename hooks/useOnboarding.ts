import { useState, useCallback, useRef } from 'react';

interface OnboardingState {
  currentStep: number;
  totalSteps: number;
  isCompleted: boolean;
  startTime: number;
  stepHistory: number[];
}

export function useOnboarding(totalSteps: number = 3) {
  const [state, setState] = useState<OnboardingState>({
    currentStep: 0,
    totalSteps,
    isCompleted: false,
    startTime: Date.now(),
    stepHistory: [0],
  });

  const stepRef = useRef(state.currentStep);
  stepRef.current = state.currentStep;

  const handleNext = useCallback(() => {
    setState(prevState => {
      if (prevState.currentStep < prevState.totalSteps - 1) {
        const newStep = prevState.currentStep + 1;
        return {
          ...prevState,
          currentStep: newStep,
          stepHistory: [...prevState.stepHistory, newStep],
          isCompleted: newStep === prevState.totalSteps - 1,
        };
      }
      return prevState;
    });
  }, [totalSteps]);

  const handlePrevious = useCallback(() => {
    setState(prevState => {
      if (prevState.currentStep > 0) {
        const newStep = prevState.currentStep - 1;
        return {
          ...prevState,
          currentStep: newStep,
          stepHistory: [...prevState.stepHistory, newStep],
          isCompleted: false,
        };
      }
      return prevState;
    });
  }, []);

  const goToStep = useCallback((targetStep: number) => {
    setState(prevState => {
      if (targetStep >= 0 && targetStep < prevState.totalSteps) {
        return {
          ...prevState,
          currentStep: targetStep,
          stepHistory: [...prevState.stepHistory, targetStep],
          isCompleted: targetStep === prevState.totalSteps - 1,
        };
      }
      return prevState;
    });
  }, [totalSteps]);

  const resetOnboarding = useCallback(() => {
    setState(prevState => ({
      ...prevState,
      currentStep: 0,
      isCompleted: false,
      startTime: Date.now(),
      stepHistory: [0],
    }));
  }, []);

  const getStepProgress = useCallback(() => {
    return {
      current: state.currentStep + 1,
      total: state.totalSteps,
      percentage: ((state.currentStep + 1) / state.totalSteps) * 100,
      isFirst: state.currentStep === 0,
      isLast: state.currentStep === state.totalSteps - 1,
    };
  }, [state.currentStep, state.totalSteps]);

  const getOnboardingStats = useCallback(() => {
    const duration = Date.now() - state.startTime;
    return {
      duration,
      stepHistory: state.stepHistory,
      totalStepsTaken: state.stepHistory.length,
      averageTimePerStep: duration / state.stepHistory.length,
      isCompleted: state.isCompleted,
    };
  }, [state.startTime, state.stepHistory, state.isCompleted]);

  return {
    // State
    currentStep: state.currentStep,
    totalSteps: state.totalSteps,
    isCompleted: state.isCompleted,
    
    // Actions
    handleNext,
    handlePrevious,
    goToStep,
    resetOnboarding,
    
    // Computed values
    getStepProgress,
    getOnboardingStats,
    
    // Validation
    canGoNext: state.currentStep < state.totalSteps - 1,
    canGoPrevious: state.currentStep > 0,
    isFirstStep: state.currentStep === 0,
    isLastStep: state.currentStep === state.totalSteps - 1,
  };
}
