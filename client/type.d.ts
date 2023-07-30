interface Store {
    otp: string
    pswd: string
    user: string
    toggles: any
    email: string
    token: string
    userId: string
    dialog: boolean
    showPswd: boolean
    eligible: boolean
    validPswd: boolean
    validUser: boolean
    validEmail: boolean
    currentPswd: string
    confirmPswd: string
    setOtp: (otp: string) => void
    setPswd: (pswd: string) => void
    setUser: (User: string) => void
    setEmail: (email: string) => void
    setToken: (token: string) => void
    setToggles: (toggles: any) => void
    setUserId: (userId: string) => void
    setDialog: (dialog: boolean) => void
    setShowPswd: (showPswd: boolean) => void
    setEligible: (eligible: boolean) => void
    setValidPswd: (validPswd: boolean) => void
    setValidUser: (validUser: boolean) => void
    setCurrentPswd: (currentPswd: string) => void
    setConfirmPswd: (confirmPswd: string) => void
}