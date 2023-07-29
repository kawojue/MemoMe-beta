import { create } from 'zustand'


const initialStore = {
    otp: '',
    pswd: '',
    user: '',
    email: '',
    userId: '',
    currentPswd: '',
    confirmPswd: '',
    eligible: false,
    showPswd: false,
    validUser: false,
    validPswd: false,
    validEmail: false,
}

const useStore = create<Store>()((set) => ({
    token: '',
    dialog: false,
    toggles: null,
    ...initialStore,
    setOtp: (otp: string) => set({ otp }),
    setPswd: (pswd: string) => set({ pswd }),
    setUser: (user: string) => set({ user }),
    setToken: (token: string) => set({ token }),
    setEmail: (email: string) => set({ email }),
    setToggles: (toggles: any) => set({ toggles }),
    setUserId: (userId: string) => set({ userId }),
    setDialog: (dialog: boolean) => set({ dialog }),
    setEligible: (eligible: boolean) => set({ eligible }),
    setShowPswd: (showPswd: boolean) => set({ showPswd }),
    setValidUser: (validUser: boolean) => set({ validUser }),
    setValidPswd: (validPswd: boolean) => set({ validPswd }),
    setValidEmail: (validEmail: boolean) => set({ validEmail }),
    setCurrentPswd: (currentPswd: string) => set({ currentPswd }),
    setConfirmPswd: (confirmPswd: string) => set({ confirmPswd }),
}))

export default useStore